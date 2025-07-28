require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// اتصال قاعدة البيانات
connectDB()
  .then(() => {
    console.log('✅ اتصال قاعدة البيانات نجح');
    
    // بدء الخادم
    app.listen(PORT, () => {
      console.log(`🚀 الخادم يعمل على البورت ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}/api/v1`);
      console.log(`🌍 البيئة: ${process.env.NODE_ENV}`);
    });
  })
  .catch((error) => {
    console.error('❌ فشل في الاتصال بقاعدة البيانات:', error);
    process.exit(1);
  });

// معالجة الأخطاء غير المتوقعة
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
