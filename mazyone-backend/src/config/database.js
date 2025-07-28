const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    enableArithAbort: true,
    instanceName: process.env.DB_INSTANCE_NAME || undefined,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 60000,
    destroyTimeoutMillis: 5000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },
  connectionTimeout: 60000,
  requestTimeout: 60000,
};

let pool;

const connectDB = async () => {
  try {
    if (pool) {
      return pool;
    }
    
    pool = await sql.connect(config);
    console.log('✅ اتصال SQL Server نجح');
    
    return pool;
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error);
    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('قاعدة البيانات غير متصلة');
  }
  return pool;
};

const closeDB = async () => {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('✅ تم إغلاق اتصال قاعدة البيانات');
    }
  } catch (error) {
    console.error('❌ خطأ في إغلاق قاعدة البيانات:', error);
  }
};

module.exports = {
  connectDB,
  getPool,
  closeDB,
  sql
};
