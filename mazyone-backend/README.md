# Mazyone Backend API

منصة البطاقات الرقمية الأولى في الشرق الأوسط - Backend API

## 🌟 المميزات

- ✅ **إدارة البطاقات الرقمية** - إنشاء وتخصيص بطاقات احترافية
- ✅ **إدارة جهات الاتصال** - نظام شامل مع الاستيراد والتصدير
- ✅ **مولد QR المتقدم** - رموز QR مخصصة بأنواع متعددة
- ✅ **بناء السير الذاتية** - قوالب احترافية متنوعة
- ✅ **نظام الاشتراكات** - خطط متدرجة مع المدفوعات
- ✅ **التحليلات والإحصائيات** - تتبع شامل للأداء
- ✅ **الأمان المتقدم** - JWT، تشفير، وحماية شاملة
- ✅ **رفع الملفات** - تكامل مع Cloudinary
- ✅ **إشعارات البريد الإلكتروني** - قوالب احترافية

## 🚀 التقنيات المستخدمة

- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل الرئيسي
- **SQL Server** - قاعدة البيانات
- **JWT** - المصادقة والتفويض
- **Cloudinary** - تخزين الصور
- **SendGrid** - خدمة البريد الإلكتروني
- **QRCode** - إنشاء رموز QR
- **Joi** - التحقق من البيانات
- **Multer** - رفع الملفات
- **bcryptjs** - تشفير كلمات المرور

## 📦 التثبيت والإعداد

### 1. استنساخ المشروع
git clone https://github.com/mazyone/backend.git
cd mazyone-backend

### 2. تثبيت المكتبات
npm install

### 3. إعداد متغيرات البيئة
cp .env.example .env

قم بتحديث ملف `.env` بالبيانات الصحيحة:


Server Configuration
NODE_ENV=production
PORT=5000
API_VERSION=v1

Database Configuration
DB_SERVER=your-sql-server
DB_DATABASE=mazyone_db
DB_USER=your-username
DB_PASSWORD=your-password
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true

JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

Email Configuration (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@mazyone.com
FROM_NAME=Mazyone

File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

Frontend URL
CLIENT_URL=https://mazyone.com



### 4. إعداد قاعدة البيانات
تشغيل سكريبت قاعدة البيانات
sqlcmd -S your-server -d master -i database-setup.sql


### 5. تشغيل الخادم
للتطوير
npm run dev

للإنتاج
npm start


## 📚 توثيق API

### 🔐 المصادقة
تسجيل مستخدم جديد
POST /api/v1/auth/register
{
"name": "أحمد محمد",
"email": "ahmed@example.com",
"password": "SecurePass123!",
"phone": "+966501234567"
}

تسجيل الدخول
POST /api/v1/auth/login
{
"email": "ahmed@example.com",
"password": "SecurePass123!"
}

### 💳 البطاقات الرقمية
إنشاء بطاقة جديدة
POST /api/v1/cards
Authorization: Bearer <token>
{
"name": "أحمد محمد",
"title": "مطور تطبيقات",
"company": "شركة التقنية المتقدمة",
"phone": "+966501234567",
"email": "ahmed@company.com",
"template": "modern",
"colors": {
"primary": "#4CAF50",
"secondary": "#2196F3"
}
}

الحصول على جميع البطاقات
GET /api/v1/cards
Authorization: Bearer <token>

### 📇 جهات الاتصال

إضافة جهة اتصال
POST /api/v1/contacts
Authorization: Bearer <token>
{
"name": "سارة أحمد",
"email": "sara@example.com",
"company": "شركة الابتكار",
"tags": ["عميل", "مهم"]
}

استيراد جهات اتصال من CSV
POST /api/v1/contacts/import
Authorization: Bearer <token>
Content-Type: multipart/form-data


### 📄 السير الذاتية

إنشاء سيرة ذاتية
POST /api/v1/cv
Authorization: Bearer <token>
{
"title": "سيرتي الذاتية",
"template": "professional",
"personalInfo": {
"fullName": "أحمد محمد",
"email": "ahmed@example.com"
}
}



## 🏗️ هيكل المشروع

mazyone-backend/
├── src/
│ ├── config/ # ملفات التكوين
│ ├── controllers/ # منطق العمليات
│ ├── middleware/ # وسطاء Express
│ ├── models/ # نماذج البيانات
│ ├── routes/ # مسارات API
│ ├── services/ # الخدمات المساعدة
│ ├── utils/ # الأدوات المساعدة
│ └── app.js # تطبيق Express
├── database/ # سكريبتات قاعدة البيانات
├── docs/ # التوثيق
├── tests/ # الاختبارات
├── package.json
└── server.js # نقطة البداية



## 🗄️ قاعدة البيانات

### الجداول الرئيسية:
- **Users** - المستخدمون
- **Cards** - البطاقات الرقمية  
- **Contacts** - جهات الاتصال
- **Subscriptions** - الاشتراكات
- **Payments** - المدفوعات
- **QRCodes** - رموز QR
- **CVs** - السير الذاتية
- **Analytics** - الإحصائيات

## 🔒 الأمان

- ✅ **JWT Authentication** - مصادقة آمنة
- ✅ **Password Hashing** - تشفير كلمات المرور
- ✅ **Rate Limiting** - تحديد معدل الطلبات
- ✅ **Input Validation** - التحقق من البيانات
- ✅ **SQL Injection Protection** - حماية من الحقن
- ✅ **CORS Configuration** - إعداد آمن للـ CORS
- ✅ **Helmet Security** - حماية إضافية




## 🚀 النشر

### 1. إعداد الخادم
تثبيت PM2 للإدارة
npm install -g pm2

تشغيل التطبيق
pm2 start ecosystem.config.js





## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- الموقع: [https://mazyone.com](https://mazyone.com)
- البريد الإلكتروني: info@mazyone.com
- تويتر: [@MazyoneApp](https://twitter.com/MazyoneApp)

---

صُنع بـ ❤️ في المملكة العربية السعودية
