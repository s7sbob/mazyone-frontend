const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

// تكوين Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class UploadService {
  // رفع الصور
  static async uploadImage(buffer, options = {}) {
    try {
      const {
        folder = 'mazyone',
        width = 800,
        height = 800,
        crop = 'fill',
        quality = 'auto',
        format = 'auto'
      } = options;

      const publicId = crypto.randomBytes(16).toString('hex');

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: publicId,
            transformation: [
              { width, height, crop, quality, format },
              { flags: 'progressive' }
            ],
            use_filename: false,
            unique_filename: true,
            overwrite: false
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      };
    } catch (error) {
      console.error('Upload image error:', error);
      throw new Error('فشل في رفع الصورة');
    }
  }

  // رفع الأفاتار
  static async uploadAvatar(buffer) {
    return this.uploadImage(buffer, {
      folder: 'mazyone/avatars',
      width: 400,
      height: 400,
      crop: 'fill'
    });
  }

  // رفع لوجو الشركة
  static async uploadLogo(buffer) {
    return this.uploadImage(buffer, {
      folder: 'mazyone/logos',
      width: 300,
      height: 300,
      crop: 'fit'
    });
  }

  // رفع خلفية البطاقة
  static async uploadCardBackground(buffer) {
    return this.uploadImage(buffer, {
      folder: 'mazyone/card-backgrounds',
      width: 600,
      height: 400,
      crop: 'fill'
    });
  }

  // حذف الصورة
  static async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Delete image error:', error);
      return false;
    }
  }

  // ضغط الصورة
  static async compressImage(buffer, quality = 80) {
    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            transformation: [
              { quality: `auto:${quality}` },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return {
        url: result.secure_url,
        originalSize: buffer.length,
        compressedSize: result.bytes,
        compressionRatio: Math.round((1 - result.bytes / buffer.length) * 100)
      };
    } catch (error) {
      console.error('Compress image error:', error);
      throw new Error('فشل في ضغط الصورة');
    }
  }

  // إنشاء URL مؤقت
  static generateTemporaryUrl(publicId, expiresIn = 3600) {
    const timestamp = Math.round(Date.now() / 1000) + expiresIn;
    const signature = cloudinary.utils.api_sign_request(
      { public_id: publicId, timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/` +
           `c_limit,h_1000,w_1000/${publicId}?timestamp=${timestamp}&signature=${signature}`;
  }
}

module.exports = UploadService;
