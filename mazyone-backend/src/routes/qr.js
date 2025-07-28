const express = require('express');
const { authenticate, checkSubscription } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const QRController = require('../controllers/qrController');
const Joi = require('joi');

const router = express.Router();

// تتبع مسح رمز QR (عام)
router.post('/:id/scan', QRController.trackScan);

// جميع المسارات التالية تتطلب مصادقة
router.use(authenticate);

// مخطط التحقق من QR
const qrSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  type: Joi.string().valid('url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard').required(),
  content: Joi.alternatives().try(
    Joi.string().when('type', { is: Joi.string().valid('url', 'text', 'phone'), then: Joi.required() }),
    Joi.object().when('type', { is: 'email', then: Joi.object({
      email: Joi.string().email().required(),
      subject: Joi.string().optional(),
      body: Joi.string().optional()
    }).required() }),
    Joi.object().when('type', { is: 'sms', then: Joi.object({
      phone: Joi.string().required(),
      message: Joi.string().optional()
    }).required() }),
    Joi.object().when('type', { is: 'wifi', then: Joi.object({
      ssid: Joi.string().required(),
      password: Joi.string().required(),
      security: Joi.string().valid('WPA', 'WEP', 'nopass').default('WPA'),
      hidden: Joi.boolean().default(false)
    }).required() }),
    Joi.object().when('type', { is: 'vcard', then: Joi.object({
      name: Joi.string().required(),
      company: Joi.string().optional(),
      title: Joi.string().optional(),
      phone: Joi.string().optional(),
      email: Joi.string().email().optional(),
      website: Joi.string().uri().optional(),
      address: Joi.string().optional()
    }).required() })
  ).required(),
  settings: Joi.object({
    size: Joi.number().min(100).max(1000).default(300),
    margin: Joi.number().min(0).max(10).default(2),
    colorDark: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).default('#2D2D2D'),
    colorLight: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).default('#FFFFFF'),
    errorCorrectionLevel: Joi.string().valid('L', 'M', 'Q', 'H').default('M'),
    format: Joi.string().valid('PNG', 'JPEG', 'SVG').default('PNG')
  }).optional()
});

// إنشاء رمز QR جديد
router.post('/generate', 
  validateRequest(qrSchema),
  QRController.generateQR
);

// الحصول على جميع رموز QR للمستخدم
router.get('/', QRController.getUserQRCodes);

// إنشاء رموز QR متعددة
router.post('/bulk-generate', 
  checkSubscription('pro'),
  validateRequest(Joi.object({
    qrData: Joi.array().items(Joi.object({
      title: Joi.string().required(),
      type: Joi.string().valid('url', 'text').default('url'),
      content: Joi.string().required()
    })).min(1).max(50).required()
  })),
  QRController.bulkGenerate
);

// حذف رمز QR
router.delete('/:id', QRController.deleteQR);

module.exports = router;
