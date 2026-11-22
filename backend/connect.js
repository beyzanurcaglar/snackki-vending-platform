import mysql2 from "mysql2"
import dotenv from "dotenv"
dotenv.config()

// Connection settings are read from .env (see .env.example)
export const db = mysql2.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "snackki",
});

db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error.message);
    } else {
        console.log('Connected to MySQL database!');
    }
});
