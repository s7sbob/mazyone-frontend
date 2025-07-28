const { getPool, sql } = require('../config/database');
const UploadService = require('../services/uploadService');
const bcrypt = require('bcryptjs');
const { sanitizeString } = require('../utils/helpers');

class UserController {
  // الحصول على الملف الشخصي
  static async getProfile(req, res) {
    try {
      const pool = getPool();

      const result = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT 
            Id, Name, Email, Avatar, PhoneNumber, Role, SubscriptionType,
            IsEmailVerified, TwoFactorEnabled, Preferences, ReferralCode,
            CreatedAt, UpdatedAt
          FROM Users 
          WHERE Id = @userId AND IsActive = 1
        `);

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'المستخدم غير موجود'
        });
      }

      const user = result.recordset[0];
      user.Preferences = user.Preferences ? JSON.parse(user.Preferences) : {
        language: 'ar',
        theme: 'system',
        notifications: { email: true, sms: false, push: true }
      };

      res.json({
        success: true,
        data: { user }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الملف الشخصي'
      });
    }
  }

  // تحديث الملف الشخصي
  static async updateProfile(req, res) {
    try {
      const { name, phone, avatar } = req.body;
      const pool = getPool();

      const updateData = {
        name: name ? sanitizeString(name) : null,
        phone: phone || null,
        avatar: avatar || null
      };

      // إزالة القيم الفارغة
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === null) {
          delete updateData[key];
        }
      });

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'لا توجد بيانات للتحديث'
        });
      }

      // بناء استعلام التحديث
      const setClause = Object.keys(updateData)
        .map(key => `${key === 'phone' ? 'PhoneNumber' : key.charAt(0).toUpperCase() + key.slice(1)} = @${key}`)
        .join(', ');

      const request = pool.request().input('userId', sql.UniqueIdentifier, req.user.id);
      Object.keys(updateData).forEach(key => {
        request.input(key, sql.NVarChar, updateData[key]);
      });

      await request.query(`
        UPDATE Users 
        SET ${setClause}, UpdatedAt = GETDATE()
        WHERE Id = @userId
      `);

      // جلب البيانات المحدثة
      const updatedResult = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT 
            Id, Name, Email, Avatar, PhoneNumber, Role, SubscriptionType,
            IsEmailVerified, TwoFactorEnabled, Preferences, ReferralCode,
            CreatedAt, UpdatedAt
          FROM Users 
          WHERE Id = @userId
        `);

      const user = updatedResult.recordset[0];
      user.Preferences = user.Preferences ? JSON.parse(user.Preferences) : {};

      res.json({
        success: true,
        message: 'تم تحديث الملف الشخصي بنجاح',
        data: { user }
      });

    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث الملف الشخصي'
      });
    }
  }

  // رفع صورة الأفاتار
  static async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'يجب اختيار صورة'
        });
      }

      const pool = getPool();

      // الحصول على الأفاتار الحالي للحذف
      const currentUser = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Avatar FROM Users WHERE Id = @userId');

      // رفع الصورة الجديدة
      const uploadResult = await UploadService.uploadAvatar(req.file.buffer);

      // تحديث الأفاتار في قاعدة البيانات
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('avatar', sql.NVarChar, uploadResult.url)
        .query('UPDATE Users SET Avatar = @avatar, UpdatedAt = GETDATE() WHERE Id = @userId');

      // حذف الصورة القديمة
      if (currentUser.recordset[0]?.Avatar) {
        try {
          const oldPublicId = currentUser.recordset[0].Avatar.split('/').pop().split('.')[0];
          await UploadService.deleteImage(`mazyone/avatars/${oldPublicId}`);
        } catch (deleteError) {
          console.error('خطأ في حذف الصورة القديمة:', deleteError);
        }
      }

      res.json({
        success: true,
        message: 'تم رفع الصورة بنجاح',
        data: { avatarUrl: uploadResult.url }
      });

    } catch (error) {
      console.error('Upload avatar error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في رفع الصورة'
      });
    }
  }

  // تحديث التفضيلات
  static async updatePreferences(req, res) {
    try {
      const { language, theme, notifications } = req.body;
      const pool = getPool();

      // جلب التفضيلات الحالية
      const currentResult = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Preferences FROM Users WHERE Id = @userId');

      const currentPreferences = currentResult.recordset[0]?.Preferences ? 
        JSON.parse(currentResult.recordset[0].Preferences) : {};

      // دمج التفضيلات الجديدة
      const updatedPreferences = {
        ...currentPreferences,
        ...(language && { language }),
        ...(theme && { theme }),
        ...(notifications && { notifications })
      };

      // تحديث التفضيلات
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('preferences', sql.NVarChar, JSON.stringify(updatedPreferences))
        .query('UPDATE Users SET Preferences = @preferences, UpdatedAt = GETDATE() WHERE Id = @userId');

      res.json({
        success: true,
        message: 'تم تحديث التفضيلات بنجاح',
        data: { preferences: updatedPreferences }
      });

    } catch (error) {
      console.error('Update preferences error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث التفضيلات'
      });
    }
  }

  // الحصول على حالة الاشتراك
  static async getSubscription(req, res) {
    try {
      const pool = getPool();

      const result = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT 
            s.Id, s.PlanType, s.Status, s.StartDate, s.EndDate,
            s.AutoRenew, s.Price, s.Currency, s.BillingCycle,
            u.SubscriptionType
          FROM Users u
          LEFT JOIN Subscriptions s ON u.Id = s.UserId AND s.Status = 'ACTIVE'
          WHERE u.Id = @userId
        `);

      const subscription = result.recordset[0] || {};

      res.json({
        success: true,
        data: { subscription }
      });

    } catch (error) {
      console.error('Get subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب معلومات الاشتراك'
      });
    }
  }

  // الحصول على الإشعارات
  static async getNotifications(req, res) {
    try {
      const { page = 1, limit = 20, unreadOnly = false } = req.query;
      const offset = (page - 1) * limit;
      const pool = getPool();

      let whereClause = 'WHERE UserId = @userId AND (ExpiresAt IS NULL OR ExpiresAt > GETDATE())';
      if (unreadOnly === 'true') {
        whereClause += ' AND IsRead = 0';
      }

      const result = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('offset', sql.Int, offset)
        .input('limit', sql.Int, parseInt(limit))
        .query(`
          SELECT 
            Id, Type, Title, Message, Data, IsRead, ReadAt,
            ExpiresAt, CreatedAt,
            COUNT(*) OVER() as TotalCount
          FROM Notifications
          ${whereClause}
          ORDER BY CreatedAt DESC
          OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `);

      const notifications = result.recordset.map(notification => ({
        ...notification,
        Data: notification.Data ? JSON.parse(notification.Data) : null
      }));

      const totalCount = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;
      const unreadCount = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT COUNT(*) as Count 
          FROM Notifications 
          WHERE UserId = @userId AND IsRead = 0 
            AND (ExpiresAt IS NULL OR ExpiresAt > GETDATE())
        `);

      res.json({
        success: true,
        data: {
          notifications,
          unreadCount: unreadCount.recordset[0].Count,
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
      console.error('Get notifications error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الإشعارات'
      });
    }
  }

  // تحديث حالة الإشعار
  static async updateNotification(req, res) {
    try {
      const { id } = req.params;
      const { isRead } = req.body;
      const pool = getPool();

      // التحقق من ملكية الإشعار
      const notification = await pool
        .request()
        .input('notificationId', sql.UniqueIdentifier, id)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT Id FROM Notifications WHERE Id = @notificationId AND UserId = @userId');

      if (notification.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'الإشعار غير موجود'
        });
      }

      // تحديث حالة القراءة
      await pool
        .request()
        .input('notificationId', sql.UniqueIdentifier, id)
        .input('isRead', sql.Bit, isRead)
        .input('readAt', sql.DateTime2, isRead ? new Date() : null)
        .query(`
          UPDATE Notifications 
          SET IsRead = @isRead, ReadAt = @readAt
          WHERE Id = @notificationId
        `);

      res.json({
        success: true,
        message: `تم ${isRead ? 'تحديد' : 'إلغاء تحديد'} الإشعار كمقروء`
      });

    } catch (error) {
      console.error('Update notification error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث الإشعار'
      });
    }
  }

  // حذف الحساب
  static async deleteAccount(req, res) {
    try {
      const { password, reason } = req.body;
      const pool = getPool();

      // التحقق من كلمة المرور
      const user = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('SELECT PasswordHash FROM Users WHERE Id = @userId');

      const isValidPassword = await bcrypt.compare(password, user.recordset[0].PasswordHash);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: 'كلمة المرور غير صحيحة'
        });
      }

      // تسجيل سبب الحذف في سجل النشاطات
      if (reason) {
        await pool
          .request()
          .input('id', sql.UniqueIdentifier, generateUUID())
          .input('userId', sql.UniqueIdentifier, req.user.id)
          .input('action', sql.NVarChar, 'account_deletion')
          .input('details', sql.NVarChar, JSON.stringify({ reason }))
          .input('ipAddress', sql.NVarChar, req.ip)
          .input('userAgent', sql.NVarChar, req.get('User-Agent'))
          .query(`
            INSERT INTO ActivityLogs (
              Id, UserId, Action, Details, IPAddress, UserAgent, CreatedAt
            )
            VALUES (
              @id, @userId, @action, @details, @ipAddress, @userAgent, GETDATE()
            )
          `);
      }

      // تعديل حالة الحساب إلى غير نشط بدلاً من الحذف الكامل
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          UPDATE Users 
          SET IsActive = 0, 
              Email = CONCAT('deleted_', Id, '@mazyone.com'),
              UpdatedAt = GETDATE()
          WHERE Id = @userId
        `);

      res.json({
        success: true,
        message: 'تم حذف الحساب بنجاح'
      });

    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الحساب'
      });
    }
  }
}

module.exports = UserController;
