const { getPool, sql } = require('../config/database');
const { generateUUID } = require('../utils/helpers');

class SubscriptionController {
  // الحصول على خطط الاشتراك المتاحة
  static async getPlans(req, res) {
    try {
      const plans = {
        free: {
          id: 'free',
          name: 'مزيون الأصيل',
          nameEn: 'Mazyone Core',
          price: 0,
          currency: 'SAR',
          billingCycle: 'monthly',
          features: {
            cards: 1,
            contacts: 100,
            analytics: 'basic',
            qrCodes: 5,
            templates: 'basic',
            support: 'community',
            customDomain: false,
            advancedAnalytics: false,
            teamFeatures: false,
            apiAccess: false
          },
          limits: {
            cardsPerMonth: 1,
            contactsTotal: 100,
            qrCodesPerMonth: 5,
            viewsPerCard: 1000,
            storageGB: 0.5
          }
        },
        pro: {
          id: 'pro',
          name: 'مزيون برو',
          nameEn: 'Mazyone Pro',
          price: 99,
          currency: 'SAR',
          billingCycle: 'monthly',
          yearlyPrice: 990,
          features: {
            cards: 10,
            contacts: 5000,
            analytics: 'advanced',
            qrCodes: 100,
            templates: 'premium',
            support: 'email',
            customDomain: true,
            advancedAnalytics: true,
            teamFeatures: false,
            apiAccess: 'basic',
            cvBuilder: true,
            landingPages: 5
          },
          limits: {
            cardsPerMonth: 10,
            contactsTotal: 5000,
            qrCodesPerMonth: 100,
            viewsPerCard: 50000,
            storageGB: 10,
            landingPagesTotal: 5
          }
        },
        proPlusً: {
          id: 'pro-plus',
          name: 'مزيون برو بلس',
          nameEn: 'Mazyone Pro Plus',
          price: 199,
          currency: 'SAR',
          billingCycle: 'monthly',
          yearlyPrice: 1990,
          features: {
            cards: 50,
            contacts: 25000,
            analytics: 'premium',
            qrCodes: 500,
            templates: 'all',
            support: 'priority',
            customDomain: true,
            advancedAnalytics: true,
            teamFeatures: true,
            apiAccess: 'advanced',
            cvBuilder: true,
            landingPages: 25,
            jobsPosting: true
          },
          limits: {
            cardsPerMonth: 50,
            contactsTotal: 25000,
            qrCodesPerMonth: 500,
            viewsPerCard: 250000,
            storageGB: 50,
            landingPagesTotal: 25,
            teamMembers: 5
          }
        },
        business: {
          id: 'business',
          name: 'مزيون المؤسسي',
          nameEn: 'Mazyone Business',
          price: 299,
          currency: 'SAR',
          billingCycle: 'monthly',
          yearlyPrice: 2990,
          features: {
            cards: 'unlimited',
            contacts: 'unlimited',
            analytics: 'enterprise',
            qrCodes: 'unlimited',
            templates: 'all',
            support: 'dedicated',
            customDomain: true,
            advancedAnalytics: true,
            teamFeatures: true,
            apiAccess: 'full',
            cvBuilder: true,
            landingPages: 'unlimited',
            jobsPosting: true,
            whiteLabel: true
          },
          limits: {
            cardsPerMonth: -1,
            contactsTotal: -1,
            qrCodesPerMonth: -1,
            viewsPerCard: -1,
            storageGB: 500,
            landingPagesTotal: -1,
            teamMembers: 50
          }
        }
      };

      res.json({
        success: true,
        data: { plans }
      });

    } catch (error) {
      console.error('Get plans error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب خطط الاشتراك'
      });
    }
  }

  // اشتراك في خطة
  static async subscribe(req, res) {
    try {
      const { planType, billingCycle = 'monthly', paymentMethodId } = req.body;
      const pool = getPool();

      // التحقق من صحة الخطة
      const validPlans = ['pro', 'pro-plus', 'business'];
      if (!validPlans.includes(planType)) {
        return res.status(400).json({
          success: false,
          message: 'خطة الاشتراك غير صحيحة'
        });
      }

      // التحقق من عدم وجود اشتراك نشط
      const activeSubscription = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT Id FROM Subscriptions 
          WHERE UserId = @userId AND Status = 'ACTIVE' 
            AND (EndDate IS NULL OR EndDate > GETDATE())
        `);

      if (activeSubscription.recordset.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'لديك اشتراك نشط بالفعل'
        });
      }

      // حساب السعر
      const prices = {
        'pro': { monthly: 99, yearly: 990 },
        'pro-plus': { monthly: 199, yearly: 1990 },
        'business': { monthly: 299, yearly: 2990 }
      };

      const price = prices[planType][billingCycle];
      const subscriptionId = generateUUID();
      const startDate = new Date();
      const endDate = new Date();
      
      if (billingCycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      // إنشاء الاشتراك
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, subscriptionId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('planType', sql.NVarChar, planType.toUpperCase())
        .input('status', sql.NVarChar, 'ACTIVE')
        .input('startDate', sql.DateTime2, startDate)
        .input('endDate', sql.DateTime2, endDate)
        .input('paymentMethodId', sql.UniqueIdentifier, paymentMethodId || null)
        .input('price', sql.Decimal(10, 2), price)
        .input('currency', sql.NVarChar, 'SAR')
        .input('billingCycle', sql.NVarChar, billingCycle)
        .query(`
          INSERT INTO Subscriptions (
            Id, UserId, PlanType, Status, StartDate, EndDate,
            PaymentMethodId, AutoRenew, Price, Currency, BillingCycle,
            CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @planType, @status, @startDate, @endDate,
            @paymentMethodId, 1, @price, @currency, @billingCycle,
            GETDATE(), GETDATE()
          )
        `);

      // تحديث نوع الاشتراك في جدول المستخدمين
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('subscriptionType', sql.NVarChar, planType.toUpperCase())
        .query('UPDATE Users SET SubscriptionType = @subscriptionType WHERE Id = @userId');

      // إنشاء دفعة
      const paymentId = generateUUID();
      await pool
        .request()
        .input('id', sql.UniqueIdentifier, paymentId)
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('subscriptionId', sql.UniqueIdentifier, subscriptionId)
        .input('paymentMethodId', sql.UniqueIdentifier, paymentMethodId || null)
        .input('amount', sql.Decimal(10, 2), price)
        .input('currency', sql.NVarChar, 'SAR')
        .input('status', sql.NVarChar, 'completed')
        .query(`
          INSERT INTO Payments (
            Id, UserId, SubscriptionId, PaymentMethodId, Amount,
            Currency, Status, CreatedAt, UpdatedAt
          )
          VALUES (
            @id, @userId, @subscriptionId, @paymentMethodId, @amount,
            @currency, @status, GETDATE(), GETDATE()
          )
        `);

      res.status(201).json({
        success: true,
        message: 'تم الاشتراك بنجاح',
        data: {
          subscriptionId,
          planType,
          price,
          billingCycle,
          startDate,
          endDate
        }
      });

    } catch (error) {
      console.error('Subscribe error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في الاشتراك'
      });
    }
  }

  // ترقية الاشتراك
  static async upgrade(req, res) {
    try {
      const { newPlanType } = req.body;
      const pool = getPool();

      // الحصول على الاشتراك الحالي
      const currentSubscription = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT Id, PlanType, EndDate, Price, BillingCycle
          FROM Subscriptions 
          WHERE UserId = @userId AND Status = 'ACTIVE'
        `);

      if (currentSubscription.recordset.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'لا يوجد اشتراك نشط للترقية'
        });
      }

      const current = currentSubscription.recordset[0];
      
      // التحقق من أن الخطة الجديدة أعلى
      const planLevels = { 'PRO': 1, 'PRO-PLUS': 2, 'BUSINESS': 3 };
      if (planLevels[newPlanType.toUpperCase()] <= planLevels[current.PlanType]) {
        return res.status(400).json({
          success: false,
          message: 'لا يمكن الترقية إلى خطة أقل أو نفس المستوى'
        });
      }

      // حساب السعر الجديد والمبلغ المطلوب دفعه
      const prices = {
        'PRO': { monthly: 99, yearly: 990 },
        'PRO-PLUS': { monthly: 199, yearly: 1990 },
        'BUSINESS': { monthly: 299, yearly: 2990 }
      };

      const newPrice = prices[newPlanType.toUpperCase()][current.BillingCycle];
      const proratedAmount = this.calculateProration(current, newPrice);

      // تحديث الاشتراك
      await pool
        .request()
        .input('subscriptionId', sql.UniqueIdentifier, current.Id)
        .input('newPlanType', sql.NVarChar, newPlanType.toUpperCase())
        .input('newPrice', sql.Decimal(10, 2), newPrice)
        .query(`
          UPDATE Subscriptions 
          SET PlanType = @newPlanType, Price = @newPrice, UpdatedAt = GETDATE()
          WHERE Id = @subscriptionId
        `);

      // تحديث نوع الاشتراك في جدول المستخدمين
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('subscriptionType', sql.NVarChar, newPlanType.toUpperCase())
        .query('UPDATE Users SET SubscriptionType = @subscriptionType WHERE Id = @userId');

      // إنشاء دفعة للفرق
      if (proratedAmount > 0) {
        await pool
          .request()
          .input('id', sql.UniqueIdentifier, generateUUID())
          .input('userId', sql.UniqueIdentifier, req.user.id)
          .input('subscriptionId', sql.UniqueIdentifier, current.Id)
          .input('amount', sql.Decimal(10, 2), proratedAmount)
          .input('currency', sql.NVarChar, 'SAR')
          .input('status', sql.NVarChar, 'completed')
          .query(`
            INSERT INTO Payments (
              Id, UserId, SubscriptionId, Amount, Currency, Status,
              CreatedAt, UpdatedAt
            )
            VALUES (
              @id, @userId, @subscriptionId, @amount, @currency, @status,
              GETDATE(), GETDATE()
            )
          `);
      }

      res.json({
        success: true,
        message: 'تم ترقية الاشتراك بنجاح',
        data: {
          newPlanType,
          newPrice,
          proratedAmount
        }
      });

    } catch (error) {
      console.error('Upgrade subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في ترقية الاشتراك'
      });
    }
  }

  // إلغاء الاشتراك
  static async cancel(req, res) {
    try {
      const { reason } = req.body;
      const pool = getPool();

      // الحصول على الاشتراك الحالي
      const subscription = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query(`
          SELECT Id, PlanType, EndDate 
          FROM Subscriptions 
          WHERE UserId = @userId AND Status = 'ACTIVE'
        `);

      if (subscription.recordset.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'لا يوجد اشتراك نشط للإلغاء'
        });
      }

      const sub = subscription.recordset[0];

      // تحديث الاشتراك للإلغاء
      await pool
        .request()
        .input('subscriptionId', sql.UniqueIdentifier, sub.Id)
        .input('cancelReason', sql.NVarChar, reason || 'لا يوجد سبب محدد')
        .query(`
          UPDATE Subscriptions 
          SET Status = 'CANCELLED', 
              AutoRenew = 0,
              CancelledAt = GETDATE(),
              CancelReason = @cancelReason,
              UpdatedAt = GETDATE()
          WHERE Id = @subscriptionId
        `);

      // تحديث نوع الاشتراك في جدول المستخدمين (سيعود للمجاني بعد انتهاء الفترة)
      await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .query('UPDATE Users SET SubscriptionType = \'FREE\' WHERE Id = @userId');

      res.json({
        success: true,
        message: 'تم إلغاء الاشتراك بنجاح',
        data: {
          cancelledAt: new Date(),
          validUntil: sub.EndDate,
          reason
        }
      });

    } catch (error) {
      console.error('Cancel subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في إلغاء الاشتراك'
      });
    }
  }

  // سجل المدفوعات
  static async getPaymentHistory(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const pool = getPool();

      const result = await pool
        .request()
        .input('userId', sql.UniqueIdentifier, req.user.id)
        .input('offset', sql.Int, offset)
        .input('limit', sql.Int, parseInt(limit))
        .query(`
          SELECT 
            p.Id, p.Amount, p.Currency, p.Status, p.PaymentGateway,
            p.TransactionId, p.CreatedAt, p.RefundedAt, p.RefundAmount,
            s.PlanType, s.BillingCycle,
            COUNT(*) OVER() as TotalCount
          FROM Payments p
          LEFT JOIN Subscriptions s ON p.SubscriptionId = s.Id
          WHERE p.UserId = @userId
          ORDER BY p.CreatedAt DESC
          OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `);

      const payments = result.recordset;
      const totalCount = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;

      res.json({
        success: true,
        data: {
          payments,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            hasNext: page * limit < totalCount,
            hasPrev: page > 1
          }
        }
      });

    } catch (error) {
      console.error('Get payment history error:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب سجل المدفوعات'
      });
    }
  }

  // حساب التوزيع التناسبي للترقية
  static calculateProration(currentSubscription, newPrice) {
    const now = new Date();
    const endDate = new Date(currentSubscription.EndDate);
    const remainingDays = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    
    let totalDays;
    if (currentSubscription.BillingCycle === 'monthly') {
      totalDays = 30;
    } else {
      totalDays = 365;
    }

    const currentDailyRate = currentSubscription.Price / totalDays;
    const newDailyRate = newPrice / totalDays;
    const dailyDifference = newDailyRate - currentDailyRate;
    
    return Math.max(0, Math.round(dailyDifference * remainingDays * 100) / 100);
  }
}

module.exports = SubscriptionController;
