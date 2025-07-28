const express = require('express');
const { authenticate } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');
const UserController = require('../controllers/userController');

const router = express.Router();

// جميع المسارات تتطلب مصادقة
router.use(authenticate);

// الحصول على الملف الشخصي
router.get('/profile', UserController.getProfile);

// تحديث الملف الشخصي
router.put('/profile', 
  validateRequest(schemas.updateProfile),
  UserController.updateProfile
);

// رفع صورة الأفاتار
router.post('/avatar', 
  upload.single('avatar'),
  handleUploadError,
  UserController.uploadAvatar
);

// تحديث التفضيلات
router.put('/preferences', 
  validateRequest(Joi.object({
    language: Joi.string().valid('ar', 'en').default('ar'),
    theme: Joi.string().valid('light', 'dark', 'system').default('system'),
    notifications: Joi.object({
      email: Joi.boolean().default(true),
      sms: Joi.boolean().default(false),
      push: Joi.boolean().default(true)
    }).optional()
  })),
  UserController.updatePreferences
);

// الحصول على حالة الاشتراك
router.get('/subscription', UserController.getSubscription);

// الحصول على الإشعارات
router.get('/notifications', UserController.getNotifications);

// تحديث حالة الإشعار (قراءة/عدم قراءة)
router.put('/notifications/:id', UserController.updateNotification);

// حذف الحساب
router.delete('/account', 
  validateRequest(Joi.object({
    password: Joi.string().required(),
    reason: Joi.string().optional()
  })),
  UserController.deleteAccount
);

module.exports = router;
