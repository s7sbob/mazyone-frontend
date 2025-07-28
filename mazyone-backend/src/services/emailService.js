const nodemailer = require('nodemailer');

// إنشاء مرسل البريد
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'SendGrid',
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  });
};

class EmailService {
  // إرسال بريد الترحيب
  static async sendWelcomeEmail(email, name, verificationToken) {
    try {
      const transporter = createTransporter();
      const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>أهلاً بك في مزيون</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px 30px; }
            .content h2 { color: #2d3748; margin-bottom: 20px; font-size: 24px; }
            .content p { color: #4a5568; line-height: 1.6; margin-bottom: 20px; font-size: 16px; }
            .btn { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; transition: background 0.3s; }
            .btn:hover { background: #5a67d8; }
            .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
            .feature { text-align: center; padding: 20px; background: #f7fafc; border-radius: 8px; }
            .feature-icon { font-size: 24px; margin-bottom: 10px; }
            .footer { background: #2d3748; color: #cbd5e0; padding: 30px; text-align: center; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 أهلاً بك في مزيون</h1>
              <p>منصة البطاقات الرقمية الأولى في الشرق الأوسط</p>
            </div>
            
            <div class="content">
              <h2>مرحباً ${name}!</h2>
              <p>نحن سعداء لانضمامك إلى عائلة مزيون. الآن يمكنك إنشاء بطاقات أعمال رقمية احترافية ومشاركتها بسهولة.</p>
              
              <p>لبدء استخدام حسابك، يرجى تأكيد بريدك الإلكتروني:</p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="btn">تأكيد البريد الإلكتروني</a>
              </div>
              
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">💳</div>
                  <h3>بطاقات احترافية</h3>
                  <p>قوالب متنوعة وتخصيص كامل</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">📊</div>
                  <h3>تحليلات متقدمة</h3>
                  <p>تتبع المشاهدات والتفاعل</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🔗</div>
                  <h3>مشاركة سهلة</h3>
                  <p>رموز QR ومشاركة فورية</p>
                </div>
              </div>
              
              <p>إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذا البريد.</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 مزيون. جميع الحقوق محفوظة.</p>
              <p>المملكة العربية السعودية</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: '🎉 أهلاً بك في مزيون - أكد بريدك الإلكتروني',
        html: htmlContent
      });

      console.log(`✅ تم إرسال بريد الترحيب إلى: ${email}`);
    } catch (error) {
      console.error('خطأ في إرسال بريد الترحيب:', error);
      throw error;
    }
  }

  // إرسال بريد إعادة تعيين كلمة المرور
  static async sendPasswordResetEmail(email, name, resetToken) {
    try {
      const transporter = createTransporter();
      const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>إعادة تعيين كلمة المرور</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #f56565 0%, #ed8936 100%); padding: 40px 20px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px 30px; }
            .content h2 { color: #2d3748; margin-bottom: 20px; font-size: 24px; }
            .content p { color: #4a5568; line-height: 1.6; margin-bottom: 20px; font-size: 16px; }
            .btn { display: inline-block; background: #f56565; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; transition: background 0.3s; }
            .btn:hover { background: #e53e3e; }
            .warning { background: #fed7d7; border: 1px solid #fc8181; border-radius: 8px; padding: 15px; margin: 20px 0; color: #9b2c2c; }
            .footer { background: #2d3748; color: #cbd5e0; padding: 30px; text-align: center; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 إعادة تعيين كلمة المرور</h1>
            </div>
            
            <div class="content">
              <h2>مرحباً ${name}</h2>
              <p>تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في مزيون.</p>
              
              <p>اضغط على الزر التالي لإعادة تعيين كلمة المرور:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="btn">إعادة تعيين كلمة المرور</a>
              </div>
              
              <div class="warning">
                <strong>⚠️ تنبيه:</strong> هذا الرابط صالح لمدة ساعة واحدة فقط من وقت الإرسال.
              </div>
              
              <p>إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد بأمان. كلمة مرورك لن تتغير.</p>
              
              <p>للأمان، لا تشارك هذا البريد مع أي شخص آخر.</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 مزيون. جميع الحقوق محفوظة.</p>
              <p>إذا كنت تواجه مشاكل، تواصل معنا على: support@mazyone.com</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: '🔐 إعادة تعيين كلمة المرور - مزيون',
        html: htmlContent
      });

      console.log(`✅ تم إرسال بريد إعادة كلمة المرور إلى: ${email}`);
    } catch (error) {
      console.error('خطأ في إرسال بريد إعادة كلمة المرور:', error);
      throw error;
    }
  }

  // إرسال إشعار البطاقة الجديدة
  static async sendNewCardNotification(email, name, cardName) {
    try {
      const transporter = createTransporter();

      const htmlContent = `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <title>بطاقة جديدة تم إنشاؤها</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; }
            .header { background: #4CAF50; padding: 20px; text-align: center; color: white; }
            .content { padding: 30px; text-align: center; }
            .btn { background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ بطاقة جديدة تم إنشاؤها</h1>
            </div>
            <div class="content">
              <h2>مرحباً ${name}</h2>
              <p>تم إنشاء بطاقتك الجديدة <strong>"${cardName}"</strong> بنجاح!</p>
              <p>يمكنك الآن مشاركتها مع جهات اتصالك.</p>
              <a href="${process.env.CLIENT_URL}/cards" class="btn">عرض البطاقة</a>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: '✨ بطاقة جديدة تم إنشاؤها - مزيون',
        html: htmlContent
      });

    } catch (error) {
      console.error('خطأ في إرسال إشعار البطاقة الجديدة:', error);
    }
  }
}

module.exports = EmailService;
