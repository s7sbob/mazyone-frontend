const express = require('express');
const { authenticate } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');
const ContactController = require('../controllers/contactController');
const Joi = require('joi');

const router = express.Router();

// جميع المسارات تتطلب مصادقة
router.use(authenticate);

// مخطط التحقق من جهة الاتصال
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  company: Joi.string().max(255).optional().allow(''),
  position: Joi.string().max(255).optional().allow(''),
  avatar: Joi.string().uri().optional().allow(''),
  address: Joi.string().max(500).optional().allow(''),
  website: Joi.string().uri().optional().allow(''),
  source: Joi.string().valid('manual', 'card', 'qr', 'import', 'referral').default('manual'),
  tags: Joi.array().items(Joi.string().max(50)).default([]),
  notes: Joi.string().max(2000).default('').allow(''),
  socialLinks: Joi.array().items(
    Joi.object({
      platform: Joi.string().required(),
      url: Joi.string().uri().required()
    })
  ).default([]),
  customFields: Joi.array().items(
    Joi.object({
      label: Joi.string().max(100).required(),
      value: Joi.string().max(500).required(),
      type: Joi.string().valid('text', 'url', 'email', 'phone').default('text')
    })
  ).default([])
});

// الحصول على جميع جهات الاتصال
router.get('/', ContactController.getContacts);

// إضافة جهة اتصال جديدة
router.post('/', 
  validateRequest(contactSchema),
  ContactController.createContact
);

// استيراد جهات الاتصال من CSV
router.post('/import', 
  upload.single('contacts'),
  handleUploadError,
  ContactController.importContacts
);

// تصدير جهات الاتصال
router.get('/export', ContactController.exportContacts);

// الحصول على جميع التاغز
router.get('/tags', ContactController.getAllTags);

// حذف متعدد
router.delete('/bulk', 
  validateRequest(Joi.object({
    contactIds: Joi.array().items(Joi.string().uuid()).min(1).required()
  })),
  ContactController.bulkDeleteContacts
);

// تحديث جهة اتصال
router.put('/:id', 
  validateRequest(contactSchema),
  ContactController.updateContact
);

// حذف جهة اتصال
router.delete('/:id', ContactController.deleteContact);

// إضافة/إزالة من المفضلة
router.put('/:id/favorite', ContactController.toggleFavorite);

// تسجيل تفاعل
router.post('/:id/interaction', 
  validateRequest(Joi.object({
    type: Joi.string().valid('contact', 'call', 'email', 'meeting').default('contact')
  })),
  ContactController.recordInteraction
);

module.exports = router;
