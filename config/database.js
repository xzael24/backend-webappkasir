import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Cek apakah kita punya connection string dari Railway
const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

let dbConfig;

if (dbUrl) {
    console.log('Using Database URL connection string');
    dbConfig = dbUrl;
} else {
    console.log('Using individual environment variables');
    dbConfig = {
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
}

const db = mysql.createPool(dbConfig);

db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ DATABASE CONNECTION FAILED:', err.code, err.message);

        // Debugging friendly output
        const usedHost = typeof dbConfig === 'string' ? 'Provided via URL' : dbConfig.host;
        console.error('⚠️  DIAGNOSTIC INFO:');
        console.error('   Running on:', process.env.RAILWAY_STATIC_URL ? 'Railway' : 'Local/Other');
        console.error('   Attempted Host:', usedHost);

        if (usedHost === 'localhost' && process.env.RAILWAY_STATIC_URL) {
            console.error('   🔴 CRITICAL: You are running on Railway but the app is trying to connect to "localhost".');
            console.error('   👉 FIX: Go to your Railway Project > Variables.');
            console.error('   👉 Ensure MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, etc. are set OR DATABASE_URL is present.');
        }
    } else {
        console.log('✅ Connected to MySQL Database successfully');
        connection.release();
    }
});

export default db;
