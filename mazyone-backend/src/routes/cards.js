const express = require('express');
const { authenticate, checkSubscription } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');
const CardController = require('../controllers/cardController');

const router = express.Router();

// المسارات العامة (لا تتطلب مصادقة)
router.get('/:id/public', CardController.getCard);

// جميع المسارات التالية تتطلب مصادقة
router.use(authenticate);

// الحصول على جميع بطاقات المستخدم
router.get('/', CardController.getUserCards);

// إنشاء بطاقة جديدة
router.post('/', 
  validateRequest(schemas.createCard),
  CardController.createCard
);

// رفع صورة للبطاقة
router.post('/upload-image', 
  upload.single('image'),
  handleUploadError,
  async (req, res) => {
    try {
      const UploadService = require('../services/uploadService');
      const result = await UploadService.uploadCardBackground(req.file.buffer);
      
      res.json({
        success: true,
        data: { imageUrl: result.url }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'خطأ في رفع الصورة'
      });
    }
  }
);

// الحصول على بطاقة محددة
router.get('/:id', CardController.getCard);

// تحديث البطاقة
router.put('/:id', 
  validateRequest(schemas.createCard),
  CardController.updateCard
);

// حذف البطاقة
router.delete('/:id', CardController.deleteCard);

// تغيير حالة البطاقة
router.put('/:id/status', CardController.toggleCardStatus);

// نسخ البطاقة
router.post('/:id/duplicate', CardController.duplicateCard);

// إنشاء رمز QR للبطاقة
router.get('/:id/qr', CardController.generateQRCode);

// مشاركة البطاقة
router.post('/:id/share', 
  validateRequest(Joi.object({
    method: Joi.string().valid('link', 'qr', 'sms', 'email').default('link')
  })),
  CardController.shareCard
);

// إحصائيات البطاقة
router.get('/:id/analytics', 
  checkSubscription('pro'),
  CardController.getCardAnalytics
);

module.exports = router;
