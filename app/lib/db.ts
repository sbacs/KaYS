import mysql from 'mysql2/promise';

declare global {
    var pool: mysql.Pool | undefined
}

const pool = globalThis.pool ?? mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

if (process.env.NODE_ENV === "development") {
    globalThis.pool = pool
}

export default pool;