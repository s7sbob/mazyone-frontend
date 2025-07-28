const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// تكوين التخزين المؤقت
const storage = multer.memoryStorage();

// فلترة أنواع الملفات
const fileFilter = (req, file, cb) => {
  // الصور
  if (file.fieldname === 'avatar' || file.fieldname === 'logo') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('يُسمح بالصور فقط'), false);
    }
  }
  // ملفات PDF للسير الذاتية
  else if (file.fieldname === 'cv') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('يُسمح بملفات PDF فقط'), false);
    }
  }
  // ملفات CSV للاستيراد
  else if (file.fieldname === 'contacts') {
    if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('يُسمح بملفات CSV فقط'), false);
    }
  }
  else {
    cb(new Error('نوع الملف غير مدعوم'), false);
  }
};

// إعدادات الرفع
const uploadConfig = {
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  }
};

const upload = multer(uploadConfig);

// معالج أخطاء الرفع
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'حجم الملف كبير جداً (الحد الأقصى 10MB)'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'عدد الملفات كبير جداً (الحد الأقصى 5 ملفات)'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'حقل الملف غير متوقع'
      });
    }
  }

  if (error.message) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  next(error);
};

module.exports = {
  upload,
  handleUploadError
};
