const express = require('express');
const AuthController = require('../controllers/authController');
const { validateRequest, schemas } = require('../middleware/validation');
const { loginLimiter, registerLimiter, emailLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// تسجيل مستخدم جديد
router.post('/register', 
  registerLimiter,
  validateRequest(schemas.register),
  AuthController.register
);

// تسجيل الدخول
router.post('/login', 
  loginLimiter,
  validateRequest(schemas.login),
  AuthController.login
);

// نسيان كلمة المرور
router.post('/forgot-password', 
  emailLimiter,
  validateRequest(Joi.object({
    email: Joi.string().email().required()
  })),
  AuthController.forgotPassword
);

// إعادة تعيين كلمة المرور
router.post('/reset-password', 
  validateRequest(schemas.resetPassword),
  AuthController.resetPassword
);

// تأكيد البريد الإلكتروني
router.get('/verify-email/:token', AuthController.verifyEmail);

// إعادة إرسال رمز التأكيد
router.post('/resend-verification', 
  emailLimiter,
  validateRequest(Joi.object({
    email: Joi.string().email().required()
  })),
  async (req, res) => {
    try {
      const { email } = req.body;
      const { getPool, sql } = require('../config/database');
      const pool = getPool();

      // البحث عن المستخدم
      const result = await pool
        .request()
        .input('email', sql.NVarChar, email.toLowerCase())
        .query('SELECT Id, Name, IsEmailVerified FROM Users WHERE Email = @email AND IsActive = 1');

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'المستخدم غير موجود'
        });
      }

      const user = result.recordset[0];

      if (user.IsEmailVerified) {
        return res.status(400).json({
          success: false,
          message: 'البريد الإلكتروني مؤكد مسبقاً'
        });
      }

      // إنشاء رمز تأكيد جديد
      const crypto = require('crypto');
      const verificationToken = crypto.randomBytes(32).toString('hex');

      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, user.Id)
        .input('verificationToken', sql.NVarChar, verificationToken)
        .query('UPDATE Users SET VerificationToken = @verificationToken WHERE Id = @userId');

      // إرسال البريد
      const EmailService = require('../services/emailService');
      await EmailService.sendWelcomeEmail(email, user.Name, verificationToken);

      res.json({
        success: true,
        message: 'تم إرسال رمز التأكيد الجديد'
      });

    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إرسال رمز التأكيد'
      });
    }
  }
);

module.exports = router;
