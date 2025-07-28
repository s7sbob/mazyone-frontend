const Joi = require('joi');

const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors
      });
    }

    req[property] = value;
    next();
  };
};

// مخططات التحقق الشائعة
const schemas = {
  // تسجيل المستخدم
  register: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'الاسم يجب أن يكون أكثر من حرفين',
      'string.max': 'الاسم يجب أن يكون أقل من 100 حرف',
      'any.required': 'الاسم مطلوب'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'البريد الإلكتروني غير صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
    password: Joi.string().min(8).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    ).required().messages({
      'string.min': 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
      'string.pattern.base': 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم ورمز خاص',
      'any.required': 'كلمة المرور مطلوبة'
    }),
    phone: Joi.string().pattern(/^\+[1-9]\d{1,14}$/).optional().messages({
      'string.pattern.base': 'رقم الهاتف غير صحيح'
    })
  }),

  // تسجيل الدخول
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'البريد الإلكتروني غير صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
    password: Joi.string().required().messages({
      'any.required': 'كلمة المرور مطلوبة'
    }),
    rememberMe: Joi.boolean().optional()
  }),

  // إنشاء بطاقة
  createCard: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    title: Joi.string().min(2).max(100).required(),
    company: Joi.string().max(100).optional().allow(''),
    phone: Joi.string().pattern(/^\+[1-9]\d{1,14}$/).optional().allow(''),
    email: Joi.string().email().optional().allow(''),
    website: Joi.string().uri().optional().allow(''),
    avatar: Joi.string().uri().optional().allow(''),
    template: Joi.string().valid('modern', 'classic', 'creative', 'corporate', 'minimal').default('modern'),
    colors: Joi.object({
      primary: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required(),
      secondary: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required(),
      background: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).default('#FFFFFF'),
      text: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).default('#2D2D2D')
    }).required(),
    socialLinks: Joi.array().items(
      Joi.object({
        platform: Joi.string().required(),
        url: Joi.string().uri().required(),
        icon: Joi.string().optional(),
        isVisible: Joi.boolean().default(true),
        order: Joi.number().integer().min(1).optional()
      })
    ).optional(),
    customFields: Joi.array().items(
      Joi.object({
        label: Joi.string().max(50).required(),
        value: Joi.string().max(200).required(),
        type: Joi.string().valid('text', 'url', 'email', 'phone').default('text'),
        isVisible: Joi.boolean().default(true),
        order: Joi.number().integer().min(1).optional()
      })
    ).optional()
  }),

  // تحديث الملف الشخصي
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^\+[1-9]\d{1,14}$/).optional().allow(''),
    avatar: Joi.string().uri().optional().allow(''),
    preferences: Joi.object({
      language: Joi.string().valid('ar', 'en').default('ar'),
      theme: Joi.string().valid('light', 'dark', 'system').default('system'),
      notifications: Joi.object({
        email: Joi.boolean().default(true),
        sms: Joi.boolean().default(false),
        push: Joi.boolean().default(true)
      }).optional()
    }).optional()
  }),

  // إعادة تعيين كلمة المرور
  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    ).required()
  })
};

module.exports = {
  validateRequest,
  schemas
};
