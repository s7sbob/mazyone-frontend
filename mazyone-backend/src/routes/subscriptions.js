const express = require('express');
const { authenticate, checkSubscription } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const SubscriptionController = require('../controllers/subscriptionController');
const Joi = require('joi');

const router = express.Router();

// الحصول على خطط الاشتراك (عام)
router.get('/plans', SubscriptionController.getPlans);

// جميع المسارات التالية تتطلب مصادقة
router.use(authenticate);

// الاشتراك في خطة
router.post('/subscribe', 
  validateRequest(Joi.object({
    planType: Joi.string().valid('pro', 'pro-plus', 'business').required(),
    billingCycle: Joi.string().valid('monthly', 'yearly').default('monthly'),
    paymentMethodId: Joi.string().uuid().optional()
  })),
  SubscriptionController.subscribe
);

// ترقية الاشتراك
router.put('/upgrade', 
  validateRequest(Joi.object({
    newPlanType: Joi.string().valid('pro', 'pro-plus', 'business').required()
  })),
  SubscriptionController.upgrade
);

// إلغاء الاشتراك
router.put('/cancel', 
  validateRequest(Joi.object({
    reason: Joi.string().max(500).optional()
  })),
  SubscriptionController.cancel
);

// سجل المدفوعات
router.get('/payments', SubscriptionController.getPaymentHistory);

module.exports = router;
