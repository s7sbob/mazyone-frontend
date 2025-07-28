const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);

  // خطأ قاعدة البيانات
  if (err.code === 'EREQUEST') {
    const message = 'خطأ في قاعدة البيانات';
    error = { message, statusCode: 500 };
  }

  // خطأ التحقق من البيانات
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  // خطأ البحث عن مورد
  if (err.name === 'CastError') {
    const message = 'المورد غير موجود';
    error = { message, statusCode: 404 };
  }

  // خطأ التكرار في قاعدة البيانات
  if (err.code === 2627) {
    const message = 'البيانات موجودة مسبقاً';
    error = { message, statusCode: 400 };
  }

  // خطأ JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'رمز المصادقة غير صحيح';
    error = { message, statusCode: 401 };
  }

  // خطأ انتهاء صلاحية JWT
  if (err.name === 'TokenExpiredError') {
    const message = 'انتهت صلاحية رمز المصادقة';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'خطأ في الخادم',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`المسار ${req.originalUrl} غير موجود`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};
