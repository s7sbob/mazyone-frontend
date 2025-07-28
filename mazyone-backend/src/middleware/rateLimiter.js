const rateLimit = require('express-rate-limit');

// معدل تحديد عام
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب لكل IP
  message: {
    success: false,
    message: 'تم تجاوز عدد الطلبات المسموح، حاول مرة أخرى بعد 15 دقيقة'
  }
});

// معدل تحديد لتسجيل الدخول
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5, // 5 محاولات تسجيل دخول
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'تم تجاوز عدد محاولات تسجيل الدخول، حاول بعد 15 دقيقة'
  }
});

// معدل تحديد لإنشاء الحساب
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ساعة واحدة
  max: 3, // 3 حسابات جديدة لكل IP
  message: {
    success: false,
    message: 'تم تجاوز عدد الحسابات الجديدة المسموح، حاول بعد ساعة'
  }
});

// معدل تحديد لإرسال الإيميل
const emailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 دقائق
  max: 3, // 3 إيميلات
  message: {
    success: false,
    message: 'تم إرسال عدد كبير من الإيميلات، حاول بعد 5 دقائق'
  }
});

// معدل تحديد لرفع الملفات
const uploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 دقائق
  max: 20, // 20 ملف
  message: {
    success: false,
    message: 'تم تجاوز عدد الملفات المرفوعة، حاول بعد 10 دقائق'
  }
});

module.exports = {
  generalLimiter,
  loginLimiter,
  registerLimiter,
  emailLimiter,
  uploadLimiter
};
