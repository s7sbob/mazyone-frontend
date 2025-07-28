const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

class Helpers {
  // إنشاء UUID
  static generateUUID() {
    return uuidv4();
  }

  // إنشاء رمز عشوائي
  static generateRandomCode(length = 6) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // تشفير النص
  static encrypt(text) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.JWT_SECRET, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  // فك التشفير
  static decrypt(encryptedText) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.JWT_SECRET, 'salt', 32);
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encrypted = textParts.join(':');
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  // تنسيق التاريخ
  static formatDate(date, locale = 'ar-SA') {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  // تنظيف النص
  static sanitizeString(str) {
    if (!str) return '';
    return str.toString().trim().replace(/[<>]/g, '');
  }

  // التحقق من صحة البريد الإلكتروني
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // التحقق من صحة رقم الهاتف السعودي
  static isValidSaudiPhone(phone) {
    const phoneRegex = /^(\+966|966|0)?5[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  // تنسيق رقم الهاتف
  static formatSaudiPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('966')) {
      return '+' + cleaned;
    } else if (cleaned.startsWith('5') && cleaned.length === 9) {
      return '+966' + cleaned;
    } else if (cleaned.startsWith('05')) {
      return '+966' + cleaned.substring(1);
    }
    return phone;
  }

  // إنشاء slug
  static createSlug(text) {
    return text
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ة]/g, 'ه')
      .replace(/[ى]/g, 'ي')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-ا-ي]/g, '')
      .replace(/\-+/g, '-')
      .trim('-');
  }

  // حساب المسافة بين نقطتين جغرافيتين
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  static deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  // تقسيم المصفوفة إلى مجموعات
  static chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // إزالة المفاتيح الفارغة من الكائن
  static removeEmptyKeys(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }

  // تحويل البايتات إلى حجم قابل للقراءة
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // إنشاء رمز مرجعي
  static generateReferralCode(name, length = 8) {
    const nameCode = name.substring(0, 3).toUpperCase();
    const randomCode = this.generateRandomCode(length - 3);
    return nameCode + randomCode;
  }

  // التحقق من قوة كلمة المرور
  static checkPasswordStrength(password) {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(checks).filter(Boolean).length;
    let strength = 'ضعيف';
    if (score >= 4) strength = 'قوي';
    else if (score >= 3) strength = 'متوسط';

    return { checks, score, strength };
  }

  // معالجة الاستثناءات بشكل آمن
  static async safeAsync(asyncFn, defaultValue = null) {
    try {
      return await asyncFn();
    } catch (error) {
      console.error('Safe async error:', error);
      return defaultValue;
    }
  }

  // تأخير التنفيذ
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // إنشاء رمز QR للبطاقة
  static generateCardQRData(cardId, userId) {
    return {
      type: 'mazyone_card',
      cardId,
      userId,
      url: `${process.env.CLIENT_URL}/card/${cardId}`,
      timestamp: Date.now()
    };
  }
}

module.exports = Helpers;
