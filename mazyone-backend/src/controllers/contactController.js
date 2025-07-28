const { getPool, sql } = require('../config/database');
const { generateUUID, sanitizeString, formatSaudiPhone } = require('../utils/helpers');
const csv = require('csv-parser');
const { Readable } = require('stream');

class ContactController {
  // الحصول على جميع جهات الاتصال
  static async getContacts(req, res) {
    try {
      const { 
        page = 1, 
        limit = 20, 
        search = '', 
        tags = '', 
        source = '',
        favorite = '',
        sortBy = 'name',
        sortOrder = 'asc'
      } = req.query;

      const offset = (page - 1) * limit;
      const pool = getPool();

      let whereClause = 'WHERE c.UserId = @userId AND c.IsBlocked = 0';
      const inputs = [{ name: 'userId', type: sql.UniqueIdentifier, value: req.user.id }];

      // فلترة البحث
      if (search) {
        whereClause += ' AND (c.Name LIKE @search OR c.Email LIKE @search OR c.Company LIKE @search OR c.Position LIKE @search)';
        inputs.push({ name: 'search', type: sql.NVarChar, value: `%${search}%` });
      }

      // فلترة التاغز
      if (tags) {
        const tagList = tags.split(',').map(tag => `%"${tag.trim()}"%`);
        whereClause += ` AND (${tagList.map((_, index) => `c.Tags LIKE @tag${index}`).join(' OR ')})`;
        tagList.forEach((tag, index) => {
          inputs.push({ name: `tag${index}`, type: sql.NVarChar, value: tag });
        });
      }

      // فلترة المصدر
      if (source) {
        whereClause += ' AND c.Source = @source';
        inputs.push({ name: 'source', type: sql.NVarChar, value: source });
      }

      // فلترة المفضلة
      if (favorite === 'true') {
        whereClause += ' AND c.IsFavorite = 1';
      }

      // ترتيب النتائج
      const validSortFields = ['name', 'company', 'createdAt', 'lastInteraction', 'interactionCount'];
      const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
      const order = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
      
      let orderByClause = '';
      switch (sortField) {
        case 'name':
          orderByClause = `ORDER BY c.Name ${order}`;
          break;
        case 'company':
          orderByClause = `ORDER BY c.Company ${order}`;
          break;
        case 'createdAt':
          orderByClause = `ORDER BY c.CreatedAt ${order}`;
          break;
        case 'lastInteraction':
          orderByClause = `ORDER BY c.LastInteraction ${order}`;
          break;
        case 'interactionCount':
          orderByClause = `ORDER BY c.InteractionCount ${order}`;
          break;
      }

      // تنفيذ الاستعلام
      const request = pool.request();
      inputs.forEach(input => request.input(input.name, input.type, input.value));
      request.input('offset', sql.Int, offset);
      request.input('limit', sql.Int, parseInt(limit));

      const result = await request.query(`
        SELECT 
          c.Id, c.Name, c.Email, c.Phone, c.Company, c.Position,
          c.Avatar, c.Address, c.Website, c.Source, c.Tags, c.Notes,
          c.SocialLinks, c.CustomFields, c.InteractionCount, 
          c.LastInteraction, c.IsFavorite, c.CreatedAt, c.UpdatedAt,
          COUNT(*) OVER() as TotalCount
        FROM Contacts c
        ${whereClause}
        ${orderByClause}
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

      const contacts = result.recordset.map(contact => ({
        ...contact,
        Tags: contact.Tags ? JSON.parse(contact.Tags) : [],
        SocialLinks: contact.SocialLinks ? JSON.parse(contact.SocialLinks) : [],
        CustomFields: contact.CustomFields ? JSON.parse(contact.CustomFields) : []
      }));

      const totalCount = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;

      res.json({
        success: true,
        data: {
          contacts,
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
      console.error('Get contacts error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب جهات الاتصال'
      });
    }
  }

  // إضافة جهة اتصال جديدة
  static async createContact(req, res) {
    try {
      const {
        name, email, phone, company, position, avatar, address, website,
        source = 'manual', tags = [], notes = '', socialLinks = [], customFields = []
      } = req.body;

      const pool = getPool();
      const contactId = generateUUID();

      // تنظيف البيانات
      const cleanData = {
        name: sanitizeString(name),
        email: email ? email.toLowerCase().trim() : null,
        phone: phone ? formatSaudiPhone(phone) : null,
        company: sanitizeString(company),
        position: sanitizeString(position),
        avatar: avatar || null,
        address: sanitizeString(address),
        website: website || null
      };

      // التحقق من عدم تكرار البريد الإلكتروني
      if (cleanData.email) {
        const existingContact = await pool
          .request()
          .input('userId', sql.UniqueIdentifier, req.user.id)
          .input('email', sql.NVarChar, cleanData.email)
          .query('SELECT Id FROM Contacts WHERE UserId = @userId AND Email = @email AND IsBlocked = 0');

        if (existingContact.recordset.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'جهة الاتصال موجودة مسبقاً بنفس البريد الإلكتروني'
          });
        }
      }

      // إدراج جهة الاتصال الجديدة
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, contactId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('name', sql.NVarChar, cleanData.name)
        .input('email', sql.NVarChar, cleanData.email)
        .input('phone', sql.NVarChar, cleanData.phone)
        .input('company', sql.NVarChar, cleanData.company)
        .input('position', sql.NVarChar, cleanData.position)
        .input('avatar', sql.NVarChar, cleanData.avatar)
        .input('address', sql.NVarChar, cleanData.address)
        .input('website', sql.NVarChar, cleanData.website)
        .input('source', sql.NVarChar, source)
        .input('tags', sql.NVarChar, JSON.stringify(tags))
        .input('notes', sql.NVarChar, notes)
        .input('socialLinks', sql.NVarChar, JSON.stringify(socialLinks))
        .input('customFields', sql.NVarChar, JSON.stringify(customFields))
        .query(`
          INSERT INTO Contacts (
            Id, UserId, Name, Email, Phone, Company, Position,
            Avatar, Address, Website, Source, Tags, Notes,
            SocialLinks, CustomFields, InteractionCount,
            IsFavorite, IsBlocked, CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @name, @email, @phone, @company, @position,
            @avatar, @address, @website, @source, @tags, @notes,
            @socialLinks, @customFields, 0, 0, 0, GETDATE(), GETDATE()
          )
        `);

      // جلب جهة الاتصال المُنشأة
      const result = await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, contactId)
        .query(`
          SELECT 
            Id, Name, Email, Phone, Company, Position, Avatar,
            Address, Website, Source, Tags, Notes, SocialLinks,
            CustomFields, InteractionCount, LastInteraction,
            IsFavorite, CreatedAt, UpdatedAt
          FROM Contacts 
          WHERE Id = @contactId
        `);

      const contact = result.recordset[0];
      contact.Tags = JSON.parse(contact.Tags);
      contact.SocialLinks = JSON.parse(contact.SocialLinks);
      contact.CustomFields = JSON.parse(contact.CustomFields);

      res.status(201).json({
        success: true,
        message: 'تم إضافة جهة الاتصال بنجاح',
        data: { contact }
      });

    } catch (error) {
      console.error('Create contact error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إضافة جهة الاتصال'
      });
    }
  }

  // تحديث جهة اتصال
  static async updateContact(req, res) {
    try {
      const { id } = req.params;
      const {
        name, email, phone, company, position, avatar, address, website,
        tags = [], notes = '', socialLinks = [], customFields = []
      } = req.body;

      const pool = getPool();

      // التحقق من ملكية جهة الاتصال
      const ownerCheck = await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM Contacts WHERE Id = @contactId AND UserId = @userId AND IsBlocked = 0');

      if (ownerCheck.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'جهة الاتصال غير موجودة أو غير مملوكة لك'
        });
      }

      // تنظيف البيانات
      const cleanData = {
        name: sanitizeString(name),
        email: email ? email.toLowerCase().trim() : null,
        phone: phone ? formatSaudiPhone(phone) : null,
        company: sanitizeString(company),
        position: sanitizeString(position),
        avatar: avatar || null,
        address: sanitizeString(address),
        website: website || null
      };

      // التحقق من عدم تكرار البريد الإلكتروني
      if (cleanData.email) {
        const existingContact = await pool
          .request()
          .input('userId', sql.UniqueIdentifier, req.user.id)
          .input('email', sql.NVarChar, cleanData.email)
          .input('contactId', sql.UniqueIdentifier, id)
          .query('SELECT Id FROM Contacts WHERE UserId = @userId AND Email = @email AND Id != @contactId AND IsBlocked = 0');

        if (existingContact.recordset.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'البريد الإلكتروني مستخدم من قبل جهة اتصال أخرى'
          });
        }
      }

      // تحديث جهة الاتصال
      await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .input('name', sql.NVarChar, cleanData.name)
        .input('email', sql.NVarChar, cleanData.email)
        .input('phone', sql.NVarChar, cleanData.phone)
        .input('company', sql.NVarChar, cleanData.company)
        .input('position', sql.NVarChar, cleanData.position)
        .input('avatar', sql.NVarChar, cleanData.avatar)
        .input('address', sql.NVarChar, cleanData.address)
        .input('website', sql.NVarChar, cleanData.website)
        .input('tags', sql.NVarChar, JSON.stringify(tags))
        .input('notes', sql.NVarChar, notes)
        .input('socialLinks', sql.NVarChar, JSON.stringify(socialLinks))
        .input('customFields', sql.NVarChar, JSON.stringify(customFields))
        .query(`
          UPDATE Contacts SET
            Name = @name, Email = @email, Phone = @phone,
            Company = @company, Position = @position, Avatar = @avatar,
            Address = @address, Website = @website, Tags = @tags,
            Notes = @notes, SocialLinks = @socialLinks, 
            CustomFields = @customFields, UpdatedAt = GETDATE()
          WHERE Id = @contactId
        `);

      // جلب جهة الاتصال المحدثة
      const result = await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .query(`
          SELECT 
            Id, Name, Email, Phone, Company, Position, Avatar,
            Address, Website, Source, Tags, Notes, SocialLinks,
            CustomFields, InteractionCount, LastInteraction,
            IsFavorite, CreatedAt, UpdatedAt
          FROM Contacts 
          WHERE Id = @contactId
        `);

      const contact = result.recordset[0];
      contact.Tags = JSON.parse(contact.Tags);
      contact.SocialLinks = JSON.parse(contact.SocialLinks);
      contact.CustomFields = JSON.parse(contact.CustomFields);

      res.json({
        success: true,
        message: 'تم تحديث جهة الاتصال بنجاح',
        data: { contact }
      });

    } catch (error) {
      console.error('Update contact error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث جهة الاتصال'
      });
    }
  }

  // حذف جهة اتصال
  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // التحقق من ملكية جهة الاتصال
      const result = await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM Contacts WHERE Id = @contactId AND UserId = @userId');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'جهة الاتصال غير موجودة أو غير مملوكة لك'
        });
      }

      // حذف جهة الاتصال
      await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .query('DELETE FROM Contacts WHERE Id = @contactId');

      res.json({
        success: true,
        message: 'تم حذف جهة الاتصال بنجاح'
      });

    } catch (error) {
      console.error('Delete contact error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف جهة الاتصال'
      });
    }
  }

  // حذف متعدد لجهات الاتصال
  static async bulkDeleteContacts(req, res) {
    try {
      const { contactIds } = req.body;

      if (!Array.isArray(contactIds) || contactIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'يجب تحديد جهات اتصال للحذف'
        });
      }

      const pool = getPool();

      // التحقق من ملكية جميع جهات الاتصال
      const ownershipCheck = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT COUNT(*) as Count 
          FROM Contacts 
          WHERE UserId = @userId AND Id IN (${contactIds.map((_, i) => `@id${i}`).join(',')})
        `);

      // إضافة معرفات جهات الاتصال للاستعلام
      const request = pool.request().input('userId', sql.UniqueIdentifier, req.user.id);
      contactIds.forEach((id, index) => {
        request.input(`id${index}`, sql.UniqueIdentifier, id);
      });

      const countResult = await request.query(`
        SELECT COUNT(*) as Count 
        FROM Contacts 
        WHERE UserId = @userId AND Id IN (${contactIds.map((_, i) => `@id${i}`).join(',')})
      `);

      if (countResult.recordset[0].Count !== contactIds.length) {
        return res.status(400).json({
          success: false,
          message: 'بعض جهات الاتصال المحددة غير مملوكة لك'
        });
      }

      // حذف جهات الاتصال
      const deleteRequest = pool.request().input('userId', sql.UniqueIdentifier, req.user.id);
      contactIds.forEach((id, index) => {
        deleteRequest.input(`id${index}`, sql.UniqueIdentifier, id);
      });

      await deleteRequest.query(`
        DELETE FROM Contacts 
        WHERE UserId = @userId AND Id IN (${contactIds.map((_, i) => `@id${i}`).join(',')})
      `);

      res.json({
        success: true,
        message: `تم حذف ${contactIds.length} جهة اتصال بنجاح`
      });

    } catch (error) {
      console.error('Bulk delete contacts error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف جهات الاتصال'
      });
    }
  }

  // إضافة/إزالة من المفضلة
  static async toggleFavorite(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // التحقق من ملكية جهة الاتصال وجلب الحالة الحالية
      const result = await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT IsFavorite FROM Contacts WHERE Id = @contactId AND UserId = @userId AND IsBlocked = 0');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'جهة الاتصال غير موجودة أو غير مملوكة لك'
        });
      }

      const newFavoriteStatus = !result.recordset[0].IsFavorite;

      // تحديث حالة المفضلة
      await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .input('isFavorite', sql.Bit, newFavoriteStatus)
        .query('UPDATE Contacts SET IsFavorite = @isFavorite, UpdatedAt = GETDATE() WHERE Id = @contactId');

      res.json({
        success: true,
        message: `تم ${newFavoriteStatus ? 'إضافة' : 'إزالة'} جهة الاتصال ${newFavoriteStatus ? 'إلى' : 'من'} المفضلة`,
        data: { isFavorite: newFavoriteStatus }
      });

    } catch (error) {
      console.error('Toggle favorite error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث حالة المفضلة'
      });
    }
  }

  // استيراد جهات الاتصال من ملف CSV
  static async importContacts(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'يجب اختيار ملف CSV'
        });
      }

      const pool = getPool();
      const contacts = [];
      const errors = [];
      let importedCount = 0;
      let skippedCount = 0;

      // تحويل Buffer إلى Stream
      const stream = Readable.from(req.file.buffer.toString());

      return new Promise((resolve) => {
        stream
          .pipe(csv())
          .on('data', (data) => {
            // تنظيف البيانات المستوردة
            const contact = {
              name: sanitizeString(data.name || data.Name || ''),
              email: data.email || data.Email || '',
              phone: data.phone || data.Phone || '',
              company: sanitizeString(data.company || data.Company || ''),
              position: sanitizeString(data.position || data.Position || ''),
              tags: data.tags ? data.tags.split(',').map(t => t.trim()) : []
            };

            if (!contact.name) {
              errors.push({ row: contacts.length + 1, error: 'الاسم مطلوب' });
              return;
            }

            contacts.push(contact);
          })
          .on('end', async () => {
            try {
              // معالجة كل جهة اتصال
              for (let i = 0; i < contacts.length; i++) {
                const contact = contacts[i];
                
                try {
                  // التحقق من عدم وجود البريد الإلكتروني مسبقاً
                  if (contact.email) {
                    const existingContact = await pool
                      .request()
                      .input('userId', sql.UniqueIdentifier, req.user.id)
                      .input('email', sql.NVarChar, contact.email.toLowerCase())
                      .query('SELECT Id FROM Contacts WHERE UserId = @userId AND Email = @email AND IsBlocked = 0');

                    if (existingContact.recordset.length > 0) {
                      skippedCount++;
                      continue;
                    }
                  }

                  // إدراج جهة الاتصال
                  await pool
                    .request()
                    .input('id', sql.UniqueIdentifier, generateUUID())
                    .input('userId', sql.UniqueIdentifier, req.user.id)
                    .input('name', sql.NVarChar, contact.name)
                    .input('email', sql.NVarChar, contact.email || null)
                    .input('phone', sql.NVarChar, contact.phone ? formatSaudiPhone(contact.phone) : null)
                    .input('company', sql.NVarChar, contact.company || null)
                    .input('position', sql.NVarChar, contact.position || null)
                    .input('tags', sql.NVarChar, JSON.stringify(contact.tags))
                    .query(`
                      INSERT INTO Contacts (
                        Id, UserId, Name, Email, Phone, Company, Position,
                        Source, Tags, InteractionCount, IsFavorite, IsBlocked,
                        CreatedAt, UpdatedAt
                      )
                      VALUES (
                        @id, @userId, @name, @email, @phone, @company, @position,
                        'import', @tags, 0, 0, 0, GETDATE(), GETDATE()
                      )
                    `);

                  importedCount++;
                } catch (contactError) {
                  errors.push({ 
                    row: i + 1, 
                    name: contact.name,
                    error: 'خطأ في إدراج جهة الاتصال' 
                  });
                }
              }

              res.json({
                success: true,
                message: 'تم استيراد جهات الاتصال بنجاح',
                data: {
                  importedCount,
                  skippedCount,
                  errorsCount: errors.length,
                  errors: errors.slice(0, 10) // عرض أول 10 أخطاء فقط
                }
              });

            } catch (processingError) {
              console.error('Import processing error:', processingError);
              res.status(500).json({
                success: false,
                message: 'خطأ في معالجة ملف الاستيراد'
              });
            }
          })
          .on('error', (streamError) => {
            console.error('CSV stream error:', streamError);
            res.status(400).json({
              success: false,
              message: 'خطأ في قراءة ملف CSV'
            });
          });
      });

    } catch (error) {
      console.error('Import contacts error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في استيراد جهات الاتصال'
      });
    }
  }

  // تصدير جهات الاتصال إلى CSV
  static async exportContacts(req, res) {
    try {
      const { format = 'csv', tags = '', source = '' } = req.query;
      const pool = getPool();

      let whereClause = 'WHERE UserId = @userId AND IsBlocked = 0';
      const inputs = [{ name: 'userId', type: sql.UniqueIdentifier, value: req.user.id }];

      // فلترة التاغز
      if (tags) {
        const tagList = tags.split(',').map(tag => `%"${tag.trim()}"%`);
        whereClause += ` AND (${tagList.map((_, index) => `Tags LIKE @tag${index}`).join(' OR ')})`;
        tagList.forEach((tag, index) => {
          inputs.push({ name: `tag${index}`, type: sql.NVarChar, value: tag });
        });
      }

      // فلترة المصدر
      if (source) {
        whereClause += ' AND Source = @source';
        inputs.push({ name: 'source', type: sql.NVarChar, value: source });
      }

      // جلب جهات الاتصال
      const request = pool.request();
      inputs.forEach(input => request.input(input.name, input.type, input.value));

      const result = await request.query(`
        SELECT 
          Name, Email, Phone, Company, Position, Address, Website,
          Source, Tags, Notes, CreatedAt
        FROM Contacts
        ${whereClause}
        ORDER BY Name
      `);

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'لا توجد جهات اتصال للتصدير'
        });
      }

      if (format === 'csv') {
        // تحويل إلى CSV
        let csvContent = 'Name,Email,Phone,Company,Position,Address,Website,Source,Tags,Notes,CreatedAt\n';
        
        result.recordset.forEach(contact => {
          const tags = contact.Tags ? JSON.parse(contact.Tags).join(';') : '';
          const row = [
            contact.Name || '',
            contact.Email || '',
            contact.Phone || '',
            contact.Company || '',
            contact.Position || '',
            contact.Address || '',
            contact.Website || '',
            contact.Source || '',
            tags,
            (contact.Notes || '').replace(/"/g, '""'), // escape quotes
            contact.CreatedAt ? contact.CreatedAt.toISOString().split('T')[0] : ''
          ].map(field => `"${field}"`).join(',');
          
          csvContent += row + '\n';
        });

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="contacts-${Date.now()}.csv"`);
        res.send('\ufeff' + csvContent); // BOM for UTF-8
      } else {
        // إرجاع JSON
        const contacts = result.recordset.map(contact => ({
          ...contact,
          Tags: contact.Tags ? JSON.parse(contact.Tags) : []
        }));

        res.json({
          success: true,
          data: { contacts, count: contacts.length }
        });
      }

    } catch (error) {
      console.error('Export contacts error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تصدير جهات الاتصال'
      });
    }
  }

  // الحصول على جميع التاغز المستخدمة
  static async getAllTags(req, res) {
    try {
      const pool = getPool();

      const result = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT Tags
          FROM Contacts 
          WHERE UserId = @userId AND Tags IS NOT NULL AND Tags != '[]' AND IsBlocked = 0
        `);

      const allTags = new Set();

      result.recordset.forEach(contact => {
        if (contact.Tags) {
          try {
            const tags = JSON.parse(contact.Tags);
            tags.forEach(tag => allTags.add(tag.trim()));
          } catch (e) {
            // تجاهل الأخطاء في JSON
          }
        }
      });

      const uniqueTags = Array.from(allTags).sort();

      res.json({
        success: true,
        data: { tags: uniqueTags, count: uniqueTags.length }
      });

    } catch (error) {
      console.error('Get all tags error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب التاغز'
      });
    }
  }

  // تسجيل تفاعل مع جهة اتصال
  static async recordInteraction(req, res) {
    try {
      const { id } = req.params;
      const { type = 'contact' } = req.body; // contact, call, email, meeting
      const pool = getPool();

      // التحقق من ملكية جهة الاتصال
      const result = await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM Contacts WHERE Id = @contactId AND UserId = @userId AND IsBlocked = 0');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'جهة الاتصال غير موجودة أو غير مملوكة لك'
        });
      }

      // تحديث عداد التفاعل
      await pool
        .request()
        .input('contactId', sql.UniqueIdentifier, id)
        .query(`
          UPDATE Contacts 
          SET InteractionCount = InteractionCount + 1,
              LastInteraction = GETDATE(),
              UpdatedAt = GETDATE()
          WHERE Id = @contactId
        `);

      // تسجيل الإحصائية
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, generateUUID())
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('resourceId', sql.UniqueIdentifier, id)
        .input('eventType', sql.NVarChar, type)
        .input('ipAddress', sql.NVarChar, req.ip)
        .input('userAgent', sql.NVarChar, req.get('User-Agent'))
        .query(`
          INSERT INTO Analytics (
            Id, UserId, ResourceType, ResourceId, EventType,
            IPAddress, UserAgent, CreatedAt
          )
          VALUES (
            @id, @userId, 'contact', @resourceId, @eventType,
            @ipAddress, @userAgent, GETDATE()
          )
        `);

      res.json({
        success: true,
        message: 'تم تسجيل التفاعل بنجاح'
      });

    } catch (error) {
      console.error('Record interaction error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تسجيل التفاعل'
      });
    }
  }
}

module.exports = ContactController;
