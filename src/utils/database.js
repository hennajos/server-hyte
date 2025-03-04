import mysql from 'mysql2';
import 'dotenv/config';

const pool = mysql.createPool({
  // host: process.env.DB_HOST,
  socketPath: '/tmp/mysql.sock',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  authPlugins: {
    mysql_native_password: mysql.authPlugins.mysql_native_password
  }
});

const promisePool = pool.promise();
export default promisePool;
