const { getPool, sql } = require('../config/database');
const UploadService = require('../services/uploadService');
const EmailService = require('../services/emailService');
const { generateUUID, sanitizeString } = require('../utils/helpers');
const QRCode = require('qrcode');

class CardController {
  // الحصول على جميع بطاقات المستخدم
  static async getUserCards(req, res) {
    try {
      const { page = 1, limit = 10, search = '', template = '', status = '' } = req.query;
      const offset = (page - 1) * limit;
      const pool = getPool();

      let whereClause = 'WHERE c.UserId = @userId';
      const inputs = [{ name: 'userId', type: sql.UniqueIdentifier, value: req.user.id }];

      if (search) {
        whereClause += ' AND (c.Name LIKE @search OR c.Title LIKE @search OR c.Company LIKE @search)';
        inputs.push({ name: 'search', type: sql.NVarChar, value: `%${search}%` });
      }

      if (template) {
        whereClause += ' AND c.Template = @template';
        inputs.push({ name: 'template', type: sql.NVarChar, value: template });
      }

      if (status) {
        const isActive = status === 'active' ? 1 : 0;
        whereClause += ' AND c.IsActive = @isActive';
        inputs.push({ name: 'isActive', type: sql.Bit, value: isActive });
      }

      // البحث عن البطاقات
      const request = pool.request();
      inputs.forEach(input => request.input(input.name, input.type, input.value));
      request.input('offset', sql.Int, offset);
      request.input('limit', sql.Int, parseInt(limit));

      const result = await request.query(`
        SELECT 
          c.Id, c.Name, c.Title, c.Company, c.Phone, c.Email, 
          c.Website, c.Avatar, c.Template, c.Colors, c.SocialLinks,
          c.CustomFields, c.IsActive, c.Views, c.Shares, c.Clicks,
          c.CreatedAt, c.UpdatedAt,
          COUNT(*) OVER() as TotalCount
        FROM Cards c
        ${whereClause}
        ORDER BY c.CreatedAt DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

      const cards = result.recordset.map(card => ({
        ...card,
        Colors: card.Colors ? JSON.parse(card.Colors) : null,
        SocialLinks: card.SocialLinks ? JSON.parse(card.SocialLinks) : [],
        CustomFields: card.CustomFields ? JSON.parse(card.CustomFields) : []
      }));

      const totalCount = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;

      res.json({
        success: true,
        data: {
          cards,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            hasNext: page * limit < totalCount,
            hasPrev: page > 1
          }
        }
      });

    } catch (error) {
      console.error('Get user cards error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب البطاقات'
      });
    }
  }

  // إنشاء بطاقة جديدة
  static async createCard(req, res) {
    try {
      const {
        name, title, company, phone, email, website, avatar,
        template, colors, socialLinks, customFields
      } = req.body;

      const pool = getPool();
      const cardId = generateUUID();

      // تنظيف البيانات
      const cleanData = {
        name: sanitizeString(name),
        title: sanitizeString(title),
        company: sanitizeString(company),
        phone: phone || null,
        email: email || null,
        website: website || null,
        avatar: avatar || null
      };

      // إدراج البطاقة الجديدة
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, cardId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('name', sql.NVarChar, cleanData.name)
        .input('title', sql.NVarChar, cleanData.title)
        .input('company', sql.NVarChar, cleanData.company)
        .input('phone', sql.NVarChar, cleanData.phone)
        .input('email', sql.NVarChar, cleanData.email)
        .input('website', sql.NVarChar, cleanData.website)
        .input('avatar', sql.NVarChar, cleanData.avatar)
        .input('template', sql.NVarChar, template)
        .input('colors', sql.NVarChar, JSON.stringify(colors))
        .input('socialLinks', sql.NVarChar, JSON.stringify(socialLinks || []))
        .input('customFields', sql.NVarChar, JSON.stringify(customFields || []))
        .query(`
          INSERT INTO Cards (
            Id, UserId, Name, Title, Company, Phone, Email, Website,
            Avatar, Template, Colors, SocialLinks, CustomFields,
            IsActive, Views, Shares, Clicks, CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @name, @title, @company, @phone, @email, 
            @website, @avatar, @template, @colors, @socialLinks, 
            @customFields, 1, 0, 0, 0, GETDATE(), GETDATE()
          )
        `);

      // جلب البطاقة المُنشأة
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, cardId)
        .query(`
          SELECT 
            Id, Name, Title, Company, Phone, Email, Website,
            Avatar, Template, Colors, SocialLinks, CustomFields,
            IsActive, Views, Shares, Clicks, CreatedAt, UpdatedAt
          FROM Cards 
          WHERE Id = @cardId
        `);

      const card = result.recordset[0];
      card.Colors = JSON.parse(card.Colors);
      card.SocialLinks = JSON.parse(card.SocialLinks);
      card.CustomFields = JSON.parse(card.CustomFields);

      // إرسال إشعار بالبطاقة الجديدة
      try {
        await EmailService.sendNewCardNotification(req.user.email, req.user.name, name);
      } catch (emailError) {
        console.error('خطأ في إرسال إشعار البطاقة الجديدة:', emailError);
      }

      res.status(201).json({
        success: true,
        message: 'تم إنشاء البطاقة بنجاح',
        data: { card }
      });

    } catch (error) {
      console.error('Create card error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إنشاء البطاقة'
      });
    }
  }

  // الحصول على بطاقة محددة
  static async getCard(req, res) {
    try {
      const { id } = req.params;
      const { trackView = false } = req.query;
      const pool = getPool();

      // جلب البطاقة
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user?.id || null)
        .query(`
          SELECT 
            c.Id, c.UserId, c.Name, c.Title, c.Company, c.Phone, 
            c.Email, c.Website, c.Avatar, c.Template, c.Colors,
            c.SocialLinks, c.CustomFields, c.IsActive, c.Views, 
            c.Shares, c.Clicks, c.CreatedAt, c.UpdatedAt,
            u.Name as OwnerName, u.Email as OwnerEmail
          FROM Cards c
          LEFT JOIN Users u ON c.UserId = u.Id
          WHERE c.Id = @cardId 
            AND c.IsActive = 1
            AND (c.UserId = @userId OR @userId IS NULL)
        `);

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة'
        });
      }

      const card = result.recordset[0];
      card.Colors = JSON.parse(card.Colors);
      card.SocialLinks = JSON.parse(card.SocialLinks);
      card.CustomFields = JSON.parse(card.CustomFields);

      // تتبع المشاهدة
      if (trackView === 'true' && (!req.user || req.user.id !== card.UserId)) {
        await pool
          .request()
          .input('cardId', sql.UniqueIdentifier, id)
          .query('UPDATE Cards SET Views = Views + 1 WHERE Id = @cardId');

        // تسجيل الإحصائية
        await pool
          .request()
          .input('id', sql.UniqueIdentifier, generateUUID())
          .input('userId', sql.UniqueIdentifier, card.UserId)
          .input('resourceId', sql.UniqueIdentifier, id)
          .input('eventType', sql.NVarChar, 'view')
          .input('ipAddress', sql.NVarChar, req.ip)
          .input('userAgent', sql.NVarChar, req.get('User-Agent'))
          .query(`
            INSERT INTO Analytics (
              Id, UserId, ResourceType, ResourceId, EventType,
              IPAddress, UserAgent, CreatedAt
            )
            VALUES (
              @id, @userId, 'card', @resourceId, @eventType,
              @ipAddress, @userAgent, GETDATE()
            )
          `);

        card.Views += 1;
      }

      res.json({
        success: true,
        data: { card }
      });

    } catch (error) {
      console.error('Get card error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب البطاقة'
      });
    }
  }

  // تحديث البطاقة
  static async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name, title, company, phone, email, website, avatar,
        template, colors, socialLinks, customFields
      } = req.body;

      const pool = getPool();

      // التحقق من ملكية البطاقة
      const ownerCheck = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM Cards WHERE Id = @cardId AND UserId = @userId');

      if (ownerCheck.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      // تنظيف البيانات
      const cleanData = {
        name: sanitizeString(name),
        title: sanitizeString(title),
        company: sanitizeString(company),
        phone: phone || null,
        email: email || null,
        website: website || null,
        avatar: avatar || null
      };

      // تحديث البطاقة
      await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('name', sql.NVarChar, cleanData.name)
        .input('title', sql.NVarChar, cleanData.title)
        .input('company', sql.NVarChar, cleanData.company)
        .input('phone', sql.NVarChar, cleanData.phone)
        .input('email', sql.NVarChar, cleanData.email)
        .input('website', sql.NVarChar, cleanData.website)
        .input('avatar', sql.NVarChar, cleanData.avatar)
        .input('template', sql.NVarChar, template)
        .input('colors', sql.NVarChar, JSON.stringify(colors))
        .input('socialLinks', sql.NVarChar, JSON.stringify(socialLinks || []))
        .input('customFields', sql.NVarChar, JSON.stringify(customFields || []))
        .query(`
          UPDATE Cards SET
            Name = @name, Title = @title, Company = @company,
            Phone = @phone, Email = @email, Website = @website,
            Avatar = @avatar, Template = @template, Colors = @colors,
            SocialLinks = @socialLinks, CustomFields = @customFields,
            UpdatedAt = GETDATE()
          WHERE Id = @cardId
        `);

      // جلب البطاقة المحدثة
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .query(`
          SELECT 
            Id, Name, Title, Company, Phone, Email, Website,
            Avatar, Template, Colors, SocialLinks, CustomFields,
            IsActive, Views, Shares, Clicks, CreatedAt, UpdatedAt
          FROM Cards 
          WHERE Id = @cardId
        `);

      const card = result.recordset[0];
      card.Colors = JSON.parse(card.Colors);
      card.SocialLinks = JSON.parse(card.SocialLinks);
      card.CustomFields = JSON.parse(card.CustomFields);

      res.json({
        success: true,
        message: 'تم تحديث البطاقة بنجاح',
        data: { card }
      });

    } catch (error) {
      console.error('Update card error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث البطاقة'
      });
    }
  }

  // حذف البطاقة
  static async deleteCard(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // التحقق من ملكية البطاقة
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Avatar FROM Cards WHERE Id = @cardId AND UserId = @userId');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      const card = result.recordset[0];

      // حذف صورة الأفاتار من التخزين السحابي
      if (card.Avatar) {
        try {
          const publicId = card.Avatar.split('/').pop().split('.')[0];
          await UploadService.deleteImage(`mazyone/avatars/${publicId}`);
        } catch (deleteError) {
          console.error('خطأ في حذف صورة الأفاتار:', deleteError);
        }
      }

      // حذف البطاقة من قاعدة البيانات
      await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .query('DELETE FROM Cards WHERE Id = @cardId');

      // حذف الإحصائيات المرتبطة
      await pool
        .request()
        .input('resourceId', sql.UniqueIdentifier, id)
        .query('DELETE FROM Analytics WHERE ResourceId = @resourceId AND ResourceType = \'card\'');

      res.json({
        success: true,
        message: 'تم حذف البطاقة بنجاح'
      });

    } catch (error) {
      console.error('Delete card error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف البطاقة'
      });
    }
  }

  // تغيير حالة البطاقة (تفعيل/إلغاء تفعيل)
  static async toggleCardStatus(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // التحقق من ملكية البطاقة وجلب الحالة الحالية
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT IsActive FROM Cards WHERE Id = @cardId AND UserId = @userId');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      const newStatus = !result.recordset[0].IsActive;

      // تحديث الحالة
      await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('isActive', sql.Bit, newStatus)
        .query('UPDATE Cards SET IsActive = @isActive, UpdatedAt = GETDATE() WHERE Id = @cardId');

      res.json({
        success: true,
        message: `تم ${newStatus ? 'تفعيل' : 'إلغاء تفعيل'} البطاقة بنجاح`,
        data: { isActive: newStatus }
      });

    } catch (error) {
      console.error('Toggle card status error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تغيير حالة البطاقة'
      });
    }
  }

  // نسخ البطاقة
  static async duplicateCard(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // جلب البطاقة الأصلية
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT 
            Name, Title, Company, Phone, Email, Website, Avatar,
            Template, Colors, SocialLinks, CustomFields
          FROM Cards 
          WHERE Id = @cardId AND UserId = @userId
        `);

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      const originalCard = result.recordset[0];
      const newCardId = generateUUID();

      // إنشاء نسخة جديدة
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, newCardId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('name', sql.NVarChar, `${originalCard.Name} - نسخة`)
        .input('title', sql.NVarChar, originalCard.Title)
        .input('company', sql.NVarChar, originalCard.Company)
        .input('phone', sql.NVarChar, originalCard.Phone)
        .input('email', sql.NVarChar, originalCard.Email)
        .input('website', sql.NVarChar, originalCard.Website)
        .input('avatar', sql.NVarChar, originalCard.Avatar)
        .input('template', sql.NVarChar, originalCard.Template)
        .input('colors', sql.NVarChar, originalCard.Colors)
        .input('socialLinks', sql.NVarChar, originalCard.SocialLinks)
        .input('customFields', sql.NVarChar, originalCard.CustomFields)
        .query(`
          INSERT INTO Cards (
            Id, UserId, Name, Title, Company, Phone, Email, Website,
            Avatar, Template, Colors, SocialLinks, CustomFields,
            IsActive, Views, Shares, Clicks, CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @name, @title, @company, @phone, @email, 
            @website, @avatar, @template, @colors, @socialLinks, 
            @customFields, 1, 0, 0, 0, GETDATE(), GETDATE()
          )
        `);

      // جلب البطاقة الجديدة
      const newCardResult = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, newCardId)
        .query(`
          SELECT 
            Id, Name, Title, Company, Phone, Email, Website,
            Avatar, Template, Colors, SocialLinks, CustomFields,
            IsActive, Views, Shares, Clicks, CreatedAt, UpdatedAt
          FROM Cards 
          WHERE Id = @cardId
        `);

      const newCard = newCardResult.recordset[0];
      newCard.Colors = JSON.parse(newCard.Colors);
      newCard.SocialLinks = JSON.parse(newCard.SocialLinks);
      newCard.CustomFields = JSON.parse(newCard.CustomFields);

      res.status(201).json({
        success: true,
        message: 'تم نسخ البطاقة بنجاح',
        data: { card: newCard }
      });

    } catch (error) {
      console.error('Duplicate card error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في نسخ البطاقة'
      });
    }
  }

  // إنشاء رمز QR للبطاقة
  static async generateQRCode(req, res) {
    try {
      const { id } = req.params;
      const { size = 300, color = '#2D2D2D', background = '#FFFFFF' } = req.query;
      const pool = getPool();

      // التحقق من ملكية البطاقة
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Name FROM Cards WHERE Id = @cardId AND UserId = @userId AND IsActive = 1');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      const cardUrl = `${process.env.CLIENT_URL}/card/${id}`;

      // إنشاء رمز QR
      const qrCodeOptions = {
        width: parseInt(size),
        margin: 2,
        color: {
          dark: color,
          light: background
        },
        errorCorrectionLevel: 'M'
      };

      const qrCodeDataUrl = await QRCode.toDataURL(cardUrl, qrCodeOptions);

      res.json({
        success: true,
        data: {
          qrCode: qrCodeDataUrl,
          url: cardUrl,
          cardName: result.recordset[0].Name
        }
      });

    } catch (error) {
      console.error('Generate QR code error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إنشاء رمز QR'
      });
    }
  }

  // مشاركة البطاقة
  static async shareCard(req, res) {
    try {
      const { id } = req.params;
      const { method = 'link' } = req.body; // link, qr, sms, email
      const pool = getPool();

      // التحقق من ملكية البطاقة
      const result = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Name, UserId FROM Cards WHERE Id = @cardId AND UserId = @userId AND IsActive = 1');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      // تحديث عداد المشاركات
      await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .query('UPDATE Cards SET Shares = Shares + 1 WHERE Id = @cardId');

      // تسجيل الإحصائية
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, generateUUID())
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('resourceId', sql.UniqueIdentifier, id)
        .input('eventType', sql.NVarChar, 'share')
        .input('ipAddress', sql.NVarChar, req.ip)
        .input('userAgent', sql.NVarChar, req.get('User-Agent'))
        .query(`
          INSERT INTO Analytics (
            Id, UserId, ResourceType, ResourceId, EventType,
            IPAddress, UserAgent, CreatedAt
          )
          VALUES (
            @id, @userId, 'card', @resourceId, @eventType,
            @ipAddress, @userAgent, GETDATE()
          )
        `);

      const shareUrl = `${process.env.CLIENT_URL}/card/${id}`;

      res.json({
        success: true,
        message: 'تم تسجيل المشاركة بنجاح',
        data: {
          shareUrl,
          method,
          cardName: result.recordset[0].Name
        }
      });

    } catch (error) {
      console.error('Share card error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في مشاركة البطاقة'
      });
    }
  }

  // إحصائيات البطاقة
  static async getCardAnalytics(req, res) {
    try {
      const { id } = req.params;
      const { period = '30' } = req.query; // آخر 30 يوم افتراضي
      const pool = getPool();

      // التحقق من ملكية البطاقة
      const cardResult = await pool
        .request()
        .input('cardId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT Name, Views, Shares, Clicks, CreatedAt
          FROM Cards 
          WHERE Id = @cardId AND UserId = @userId
        `);

      if (cardResult.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'البطاقة غير موجودة أو غير مملوكة لك'
        });
      }

      // جلب الإحصائيات التفصيلية
      const analyticsResult = await pool
        .request()
        .input('resourceId', sql.UniqueIdentifier, id)
        .input('days', sql.Int, parseInt(period))
        .query(`
          SELECT 
            EventType,
            COUNT(*) as Count,
            CAST(CreatedAt AS DATE) as Date
          FROM Analytics 
          WHERE ResourceId = @resourceId 
            AND ResourceType = 'card'
            AND CreatedAt >= DATEADD(day, -@days, GETDATE())
          GROUP BY EventType, CAST(CreatedAt AS DATE)
          ORDER BY Date DESC
        `);

      // إحصائيات حسب الأحداث
      const eventStats = {};
      const dailyStats = {};

      analyticsResult.recordset.forEach(row => {
        eventStats[row.EventType] = (eventStats[row.EventType] || 0) + row.Count;
        
        const dateStr = row.Date.toISOString().split('T')[0];
        if (!dailyStats[dateStr]) {
          dailyStats[dateStr] = {};
        }
        dailyStats[dateStr][row.EventType] = row.Count;
      });

      const card = cardResult.recordset[0];

      res.json({
        success: true,
        data: {
          card: {
            id,
            name: card.Name,
            totalViews: card.Views,
            totalShares: card.Shares,
            totalClicks: card.Clicks,
            createdAt: card.CreatedAt
          },
          analytics: {
            period: parseInt(period),
            eventStats,
            dailyStats
          }
        }
      });

    } catch (error) {
      console.error('Get card analytics error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب إحصائيات البطاقة'
      });
    }
  }
}

module.exports = CardController;
