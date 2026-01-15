import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi suport Railway (DATABASE_URL atau Env Vars terpisah)
const dbConfig = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || 'railway',
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

const db = mysql.createPool(dbConfig);

// Cek koneksi saat startup untuk debugging di logs Railway
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ DATABASE CONNECTION FAILED:', err.code, err.message);
        console.error('DEBUG INFO:', {
            host: process.env.DB_HOST || process.env.MYSQLHOST,
            port: process.env.DB_PORT || process.env.MYSQLPORT,
            user: process.env.DB_USER || process.env.MYSQLUSER,
            using_db_url: !!process.env.DATABASE_URL
        });
    } else {
        console.log('✅ Connected to MySQL Database successfully');
        console.log('🔗 Host:', process.env.DB_HOST || process.env.MYSQLHOST || 'via DATABASE_URL');
        connection.release();
    }
});

export default db;
