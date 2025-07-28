const { getPool, sql } = require('../config/database');
const { generateUUID, sanitizeString } = require('../utils/helpers');
const QRCode = require('qrcode');
const UploadService = require('../services/uploadService');

class QRController {
  // إنشاء رمز QR مخصص
  static async generateQR(req, res) {
    try {
      const {
        title,
        type, // url, text, email, phone, sms, wifi, vcard
        content,
        settings = {}
      } = req.body;

      const pool = getPool();
      const qrId = generateUUID();

      // إعدادات افتراضية للـ QR
      const defaultSettings = {
        size: 300,
        margin: 2,
        colorDark: '#2D2D2D',
        colorLight: '#FFFFFF',
        errorCorrectionLevel: 'M',
        format: 'PNG'
      };

      const qrSettings = { ...defaultSettings, ...settings };

      // إنشاء محتوى QR حسب النوع
      let qrContent = content;
      
      switch (type) {
        case 'email':
          qrContent = `mailto:${content.email}?subject=${encodeURIComponent(content.subject || '')}&body=${encodeURIComponent(content.body || '')}`;
          break;
        case 'phone':
          qrContent = `tel:${content}`;
          break;
        case 'sms':
          qrContent = `sms:${content.phone}?body=${encodeURIComponent(content.message || '')}`;
          break;
        case 'wifi':
          qrContent = `WIFI:T:${content.security};S:${content.ssid};P:${content.password};H:${content.hidden || false};;`;
          break;
        case 'vcard':
          qrContent = this.generateVCard(content);
          break;
      }

      // إنشاء رمز QR
      const qrCodeOptions = {
        width: qrSettings.size,
        margin: qrSettings.margin,
        color: {
          dark: qrSettings.colorDark,
          light: qrSettings.colorLight
        },
        errorCorrectionLevel: qrSettings.errorCorrectionLevel
      };

      const qrCodeDataUrl = await QRCode.toDataURL(qrContent, qrCodeOptions);

      // حفظ QR في قاعدة البيانات
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, qrId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('title', sql.NVarChar, sanitizeString(title))
        .input('type', sql.NVarChar, type)
        .input('content', sql.NVarChar, JSON.stringify({ original: content, generated: qrContent }))
        .input('settings', sql.NVarChar, JSON.stringify(qrSettings))
        .input('qrImageUrl', sql.NVarChar, qrCodeDataUrl)
        .query(`
          INSERT INTO QRCodes (
            Id, UserId, Title, Type, Content, Settings,
            QRImageUrl, IsActive, Scans, CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @title, @type, @content, @settings,
            @qrImageUrl, 1, 0, GETDATE(), GETDATE()
          )
        `);

      res.status(201).json({
        success: true,
        message: 'تم إنشاء رمز QR بنجاح',
        data: {
          qrId,
          title,
          type,
          qrCode: qrCodeDataUrl,
          settings: qrSettings
        }
      });

    } catch (error) {
      console.error('Generate QR error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إنشاء رمز QR'
      });
    }
  }

  // الحصول على جميع رموز QR للمستخدم
  static async getUserQRCodes(req, res) {
    try {
      const { page = 1, limit = 20, type = '', search = '' } = req.query;
      const offset = (page - 1) * limit;
      const pool = getPool();

      let whereClause = 'WHERE UserId = @userId AND IsActive = 1';
      const inputs = [{ name: 'userId', type: sql.UniqueIdentifier, value: req.user.id }];

      if (type) {
        whereClause += ' AND Type = @type';
        inputs.push({ name: 'type', type: sql.NVarChar, value: type });
      }

      if (search) {
        whereClause += ' AND Title LIKE @search';
        inputs.push({ name: 'search', type: sql.NVarChar, value: `%${search}%` });
      }

      const request = pool.request();
      inputs.forEach(input => request.input(input.name, input.type, input.value));
      request.input('offset', sql.Int, offset);
      request.input('limit', sql.Int, parseInt(limit));

      const result = await request.query(`
        SELECT 
          Id, Title, Type, Content, Settings, QRImageUrl,
          Scans, CreatedAt, UpdatedAt,
          COUNT(*) OVER() as TotalCount
        FROM QRCodes
        ${whereClause}
        ORDER BY CreatedAt DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

      const qrCodes = result.recordset.map(qr => ({
        ...qr,
        Content: JSON.parse(qr.Content),
        Settings: JSON.parse(qr.Settings)
      }));

      const totalCount = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;

      res.json({
        success: true,
        data: {
          qrCodes,
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
      console.error('Get user QR codes error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب رموز QR'
      });
    }
  }

  // حذف رمز QR
  static async deleteQR(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // التحقق من ملكية رمز QR
      const result = await pool
        .request()
        .input('qrId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM QRCodes WHERE Id = @qrId AND UserId = @userId');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'رمز QR غير موجود أو غير مملوك لك'
        });
      }

      // حذف رمز QR
      await pool
        .request()
        .input('qrId', sql.UniqueIdentifier, id)
        .query('DELETE FROM QRCodes WHERE Id = @qrId');

      res.json({
        success: true,
        message: 'تم حذف رمز QR بنجاح'
      });

    } catch (error) {
      console.error('Delete QR error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف رمز QR'
      });
    }
  }

  // تتبع مسح رمز QR
  static async trackScan(req, res) {
    try {
      const { id } = req.params;
      const pool = getPool();

      // تحديث عداد المسح
      await pool
        .request()
        .input('qrId', sql.UniqueIdentifier, id)
        .query('UPDATE QRCodes SET Scans = Scans + 1 WHERE Id = @qrId AND IsActive = 1');

      // تسجيل الإحصائية
      const qrResult = await pool
        .request()
        .input('qrId', sql.UniqueIdentifier, id)
        .query('SELECT UserId FROM QRCodes WHERE Id = @qrId');

      if (qrResult.recordset.length > 0) {
        await pool
          .request()
          .input('id', sql.UniqueIdentifier, generateUUID())
          .input('userId', sql.UniqueIdentifier, qrResult.recordset[0].UserId)
          .input('resourceId', sql.UniqueIdentifier, id)
          .input('eventType', sql.NVarChar, 'scan')
          .input('ipAddress', sql.NVarChar, req.ip)
          .input('userAgent', sql.NVarChar, req.get('User-Agent'))
          .query(`
            INSERT INTO Analytics (
              Id, UserId, ResourceType, ResourceId, EventType,
              IPAddress, UserAgent, CreatedAt
            )
            VALUES (
              @id, @userId, 'qr', @resourceId, @eventType,
              @ipAddress, @userAgent, GETDATE()
            )
          `);
      }

      res.json({
        success: true,
        message: 'تم تسجيل المسح بنجاح'
      });

    } catch (error) {
      console.error('Track QR scan error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تسجيل المسح'
      });
    }
  }

  // إنشاء vCard
  static generateVCard(contact) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name || ''}
ORG:${contact.company || ''}
TITLE:${contact.title || ''}
TEL:${contact.phone || ''}
EMAIL:${contact.email || ''}
URL:${contact.website || ''}
ADR:;;${contact.address || ''};;;;
END:VCARD`;
  }

  // إنشاء QR متعدد
  static async bulkGenerate(req, res) {
    try {
      const { qrData } = req.body; // مصفوفة من بيانات QR

      if (!Array.isArray(qrData) || qrData.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'يجب إرسال مصفوفة من بيانات QR'
        });
      }

      const pool = getPool();
      const results = [];
      const errors = [];

      for (let i = 0; i < qrData.length; i++) {
        try {
          const qr = qrData[i];
          const qrId = generateUUID();

          // إنشاء رمز QR
          const qrCodeDataUrl = await QRCode.toDataURL(qr.content, {
            width: 300,
            margin: 2,
            errorCorrectionLevel: 'M'
          });

          // حفظ في قاعدة البيانات
          await pool
            .request()
            .input('id', sql.UniqueIdentifier, qrId)
            .input('userId', sql.UniqueIdentifier, req.user.id)
            .input('title', sql.NVarChar, sanitizeString(qr.title))
            .input('type', sql.NVarChar, qr.type || 'url')
            .input('content', sql.NVarChar, JSON.stringify({ original: qr.content, generated: qr.content }))
            .input('settings', sql.NVarChar, JSON.stringify({ size: 300, margin: 2 }))
            .input('qrImageUrl', sql.NVarChar, qrCodeDataUrl)
            .query(`
              INSERT INTO QRCodes (
                Id, UserId, Title, Type, Content, Settings,
                QRImageUrl, IsActive, Scans, CreatedAt, UpdatedAt
              )
              VALUES (
                @id, @userId, @title, @type, @content, @settings,
                @qrImageUrl, 1, 0, GETDATE(), GETDATE()
              )
            `);

          results.push({
            id: qrId,
            title: qr.title,
            qrCode: qrCodeDataUrl
          });

        } catch (error) {
          errors.push({
            index: i,
            title: qrData[i].title,
            error: 'خطأ في إنشاء رمز QR'
          });
        }
      }

      res.json({
        success: true,
        message: `تم إنشاء ${results.length} رمز QR بنجاح`,
        data: {
          successful: results,
          errors,
          successCount: results.length,
          errorCount: errors.length
        }
      });

    } catch (error) {
      console.error('Bulk generate QR error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إنشاء رموز QR المتعددة'
      });
    }
  }
}

module.exports = QRController;
