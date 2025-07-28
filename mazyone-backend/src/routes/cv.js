const express = require('express');
const { authenticate, checkSubscription } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const CVController = require('../controllers/cvController');
const Joi = require('joi');

const router = express.Router();

// عرض السيرة الذاتية العامة
router.get('/:id/public', CVController.getPublicCV);

// الحصول على قوالب السير الذاتية
router.get('/templates', CVController.getTemplates);

// جميع المسارات التالية تتطلب مصادقة ومتاحة للمشتركين فقط
router.use(authenticate);
router.use(checkSubscription('pro'));

// مخطط التحقق من السيرة الذاتية
const cvSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  template: Joi.string().valid('professional', 'modern', 'creative', 'minimal', 'executive').default('professional'),
  personalInfo: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    website: Joi.string().uri().optional(),
    linkedin: Joi.string().uri().optional(),
    photo: Joi.string().uri().optional()
  }).required(),
  summary: Joi.string().max(1000).optional(),
  experience: Joi.array().items(Joi.object({
    company: Joi.string().required(),
    position: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().optional(),
    current: Joi.boolean().default(false),
    description: Joi.string().optional(),
    achievements: Joi.array().items(Joi.string()).optional()
  })).optional(),
  education: Joi.array().items(Joi.object({
    institution: Joi.string().required(),
    degree: Joi.string().required(),
    field: Joi.string().optional(),
    startDate: Joi.string().required(),
    endDate: Joi.string().optional(),
    gpa: Joi.string().optional(),
    description: Joi.string().optional()
  })).optional(),
  skills: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional(),
    category: Joi.string().optional()
  })).optional(),
  languages: Joi.array().items(Joi.object({
    language: Joi.string().required(),
    level: Joi.string().valid('basic', 'intermediate', 'advanced', 'native').required()
  })).optional(),
  certifications: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    issuer: Joi.string().required(),
    date: Joi.string().required(),
    expiryDate: Joi.string().optional(),
    credentialId: Joi.string().optional(),
    url: Joi.string().uri().optional()
  })).optional(),
  projects: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    technologies: Joi.array().items(Joi.string()).optional(),
    url: Joi.string().uri().optional(),
    github: Joi.string().uri().optional(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional()
  })).optional(),
  references: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    company: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional()
  })).optional(),
  customSections: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    order: Joi.number().optional()
  })).optional(),
  isPublic: Joi.boolean().default(false)
});

// إنشاء سيرة ذاتية جديدة
router.post('/', 
  validateRequest(cvSchema),
  CVController.createCV
);

// الحصول على جميع السير الذاتية للمستخدم
router.get('/', CVController.getUserCVs);

// تحديث السيرة الذاتية
router.put('/:id', 
  validateRequest(cvSchema.fork(['title', 'personalInfo'], (schema) => schema.optional())),
  CVController.updateCV
);

// حذف السيرة الذاتية
router.delete('/:id', CVController.deleteCV);

module.exports = router;
