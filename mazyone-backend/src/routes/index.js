const express = require('express');

// استيراد جميع المسارات
const authRoutes = require('./auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const contactRoutes = require('./contacts');
const subscriptionRoutes = require('./subscriptions');
const qrRoutes = require('./qr');
const cvRoutes = require('./cv');

const router = express.Router();

// ربط المسارات
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/contacts', contactRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/qr', qrRoutes);
router.use('/cv', cvRoutes);

// مسار صحة النظام
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mazyone API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'connected',
      storage: 'connected',
      email: 'connected'
    }
  });
});

// مسار الإحصائيات العامة
router.get('/stats', async (req, res) => {
  try {
    const { getPool } = require('../config/database');
    const pool = getPool();

    const stats = await pool.request().query(`
      SELECT 
        (SELECT COUNT(*) FROM Users WHERE IsActive = 1) as TotalUsers,
        (SELECT COUNT(*) FROM Cards WHERE IsActive = 1) as TotalCards,
        (SELECT COUNT(*) FROM Contacts) as TotalContacts,
        (SELECT COUNT(*) FROM QRCodes WHERE IsActive = 1) as TotalQRCodes,
        (SELECT COUNT(*) FROM CVs) as TotalCVs,
        (SELECT SUM(Views) FROM Cards) as TotalCardViews,
        (SELECT COUNT(*) FROM Subscriptions WHERE Status = 'ACTIVE') as ActiveSubscriptions
    `);

    res.json({
      success: true,
      data: {
        statistics: stats.recordset[0],
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الإحصائيات'
    });
  }
});

module.exports = router;
