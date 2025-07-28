const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { getPool, sql } = require('../config/database');
const { generateTokens } = require('../config/jwt');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../services/emailService');
const { generateUUID } = require('../utils/helpers');

class AuthController {
  // تسجيل مستخدم جديد
  static async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const pool = getPool();

      // التحقق من وجود البريد الإلكتروني
      const existingUser = await pool
        .request()
        .input('email', sql.NVarChar, email.toLowerCase())
        .query('SELECT Id FROM Users WHERE Email = @email');

      if (existingUser.recordset.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'البريد الإلكتروني مسجل مسبقاً'
        });
      }

      // تشفير كلمة المرور
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // إنشاء المستخدم
      const userId = generateUUID();
      const verificationToken = crypto.randomBytes(32).toString('hex');

      await pool
        .request()
        .input('id', sql.UniqueIdentifier, userId)
        .input('name', sql.NVarChar, name)
        .input('email', sql.NVarChar, email.toLowerCase())
        .input('passwordHash', sql.NVarChar, hashedPassword)
        .input('phone', sql.NVarChar, phone || null)
        .input('verificationToken', sql.NVarChar, verificationToken)
        .query(`
          INSERT INTO Users (
            Id, Name, Email, PasswordHash, PhoneNumber, 
            Role, SubscriptionType, IsEmailVerified, 
            VerificationToken, CreatedAt, UpdatedAt, IsActive
          )
          VALUES (
            @id, @name, @email, @passwordHash, @phone,
            'USER', 'FREE', 0, @verificationToken, 
            GETDATE(), GETDATE(), 1
          )
        `);

      // إنشاء الـ tokens
      const tokens = generateTokens({
        userId: userId,
        email: email.toLowerCase(),
        role: 'USER',
        subscription: 'FREE'
      });

      // إرسال بريد الترحيب
      try {
        await sendWelcomeEmail(email, name, verificationToken);
      } catch (emailError) {
        console.error('خطأ في إرسال بريد الترحيب:', emailError);
      }

      res.status(201).json({
        success: true,
        message: 'تم إنشاء الحساب بنجاح',
        data: {
          user: {
            id: userId,
            name,
            email: email.toLowerCase(),
            role: 'USER',
            subscription: 'FREE',
            isEmailVerified: false
          },
          tokens
        }
      });

    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إنشاء الحساب'
      });
    }
  }

  // تسجيل الدخول
  static async login(req, res) {
    try {
      const { email, password, rememberMe } = req.body;
      const pool = getPool();

      // البحث عن المستخدم
      const result = await pool
        .request()
        .input('email', sql.NVarChar, email.toLowerCase())
        .query(`
          SELECT 
            Id, Name, Email, PasswordHash, Role, SubscriptionType,
            IsEmailVerified, TwoFactorEnabled, IsActive
          FROM Users 
          WHERE Email = @email AND IsActive = 1
        `);

      if (result.recordset.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
      }

      const user = result.recordset[0];

      // التحقق من كلمة المرور
      const isValidPassword = await bcrypt.compare(password, user.PasswordHash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
      }

      // تحديث آخر تسجيل دخول
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, user.Id)
        .input('lastLogin', sql.DateTime2, new Date())
        .query('UPDATE Users SET LastLoginAt = @lastLogin WHERE Id = @userId');

      // إنشاء الـ tokens
      const tokens = generateTokens({
        userId: user.Id,
        email: user.Email,
        role: user.Role,
        subscription: user.SubscriptionType
      });

      res.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        data: {
          user: {
            id: user.Id,
            name: user.Name,
            email: user.Email,
            role: user.Role,
            subscription: user.SubscriptionType,
            isEmailVerified: user.IsEmailVerified,
            twoFactorEnabled: user.TwoFactorEnabled
          },
          tokens
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تسجيل الدخول'
      });
    }
  }

  // نسيان كلمة المرور
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const pool = getPool();

      // البحث عن المستخدم
      const result = await pool
        .request()
        .input('email', sql.NVarChar, email.toLowerCase())
        .query('SELECT Id, Name, Email FROM Users WHERE Email = @email AND IsActive = 1');

      if (result.recordset.length === 0) {
        // لا نكشف إذا كان البريد موجود أم لا لأمان أكبر
        return res.json({
          success: true,
          message: 'إذا كان البريد الإلكتروني موجود، ستتلقى رابط إعادة تعيين كلمة المرور'
        });
      }

      const user = result.recordset[0];

      // إنشاء رمز إعادة التعيين
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // ساعة واحدة

      // حفظ رمز الإعادة
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, user.Id)
        .input('resetToken', sql.NVarChar, resetToken)
        .input('resetTokenExpiry', sql.DateTime2, resetTokenExpiry)
        .query(`
          UPDATE Users 
          SET PasswordResetToken = @resetToken, 
              PasswordResetExpiry = @resetTokenExpiry 
          WHERE Id = @userId
        `);

      // إرسال بريد إعادة التعيين
      try {
        await sendPasswordResetEmail(email, user.Name, resetToken);
      } catch (emailError) {
        console.error('خطأ في إرسال بريد إعادة كلمة المرور:', emailError);
      }

      res.json({
        success: true,
        message: 'تم إرسال رابط إعادة تعيين كلمة المرور'
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في معالجة الطلب'
      });
    }
  }

  // إعادة تعيين كلمة المرور
  static async resetPassword(req, res) {
    try {
      const { token, password } = req.body;
      const pool = getPool();

      // البحث عن رمز الإعادة
      const result = await pool
        .request()
        .input('resetToken', sql.NVarChar, token)
        .query(`
          SELECT Id, Name, Email 
          FROM Users 
          WHERE PasswordResetToken = @resetToken 
            AND PasswordResetExpiry > GETDATE()
            AND IsActive = 1
        `);

      if (result.recordset.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'رمز إعادة تعيين كلمة المرور غير صحيح أو منتهي الصلاحية'
        });
      }

      const user = result.recordset[0];

      // تشفير كلمة المرور الجديدة
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // تحديث كلمة المرور
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, user.Id)
        .input('passwordHash', sql.NVarChar, hashedPassword)
        .query(`
          UPDATE Users 
          SET PasswordHash = @passwordHash,
              PasswordResetToken = NULL,
              PasswordResetExpiry = NULL,
              UpdatedAt = GETDATE()
          WHERE Id = @userId
        `);

      res.json({
        success: true,
        message: 'تم تحديث كلمة المرور بنجاح'
      });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إعادة تعيين كلمة المرور'
      });
    }
  }

  // تأكيد البريد الإلكتروني
  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const pool = getPool();

      // البحث عن رمز التأكيد
      const result = await pool
        .request()
        .input('verificationToken', sql.NVarChar, token)
        .query(`
          SELECT Id, Name, Email 
          FROM Users 
          WHERE VerificationToken = @verificationToken AND IsActive = 1
        `);

      if (result.recordset.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'رمز التأكيد غير صحيح'
        });
      }

      // تأكيد البريد الإلكتروني
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, result.recordset[0].Id)
        .query(`
          UPDATE Users 
          SET IsEmailVerified = 1,
              VerificationToken = NULL,
              UpdatedAt = GETDATE()
          WHERE Id = @userId
        `);

      res.json({
        success: true,
        message: 'تم تأكيد البريد الإلكتروني بنجاح'
      });

    } catch (error) {
      console.error('Verify email error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تأكيد البريد الإلكتروني'
      });
    }
  }
}

module.exports = AuthController;
