const { verifyToken } = require('../config/jwt');
const { getPool, sql } = require('../config/database');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'مطلوب رمز المصادقة'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    // التحقق من المستخدم في قاعدة البيانات
    const pool = getPool();
    const result = await pool
      .request()
      .input('userId', sql.UniqueIdentifier, decoded.userId)
      .query(`
        SELECT 
          Id, Name, Email, Role, SubscriptionType, 
          IsEmailVerified, TwoFactorEnabled, CreatedAt
        FROM Users 
        WHERE Id = @userId AND IsActive = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم غير موجود أو معطل'
      });
    }

    req.user = {
      id: result.recordset[0].Id,
      name: result.recordset[0].Name,
      email: result.recordset[0].Email,
      role: result.recordset[0].Role,
      subscription: result.recordset[0].SubscriptionType,
      isEmailVerified: result.recordset[0].IsEmailVerified,
      twoFactorEnabled: result.recordset[0].TwoFactorEnabled
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'رمز المصادقة غير صحيح'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'مطلوب مصادقة المستخدم'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذا المورد'
      });
    }

    next();
  };
};

const checkSubscription = (requiredPlan) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'مطلوب مصادقة المستخدم'
      });
    }

    const subscriptionLevels = {
      'free': 0,
      'core': 0,
      'pro': 1,
      'pro-plus': 2,
      'business': 3
    };

    const userLevel = subscriptionLevels[req.user.subscription] || 0;
    const requiredLevel = subscriptionLevels[requiredPlan] || 0;

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: 'تحتاج لترقية اشتراكك للوصول لهذه الميزة',
        requiredPlan,
        currentPlan: req.user.subscription
      });
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  checkSubscription
};
