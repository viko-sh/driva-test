const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'driva',
    database: 'driva',
    port: 4306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

export class DataAccess {
    async insert(data: any) {
        return pool.execute(
            `INSERT quotes (uuid, status, mobile, email, quote_data, created_at) VALUES (?, 0, ?, ?, ?, NOW())`,
             [data.guid, data.contact.mobileNumber, data.contact.email, JSON.stringify(data)]
        )
    }
}