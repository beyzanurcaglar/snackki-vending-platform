// Usage:   npm run create-admin -- <userId> <password> [firstName] [lastName]
// Example: npm run create-admin -- 100 StrongPass123 Max Mustermann
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const [userId, password, name = 'Admin', surname = 'User'] = process.argv.slice(2);

if (!userId || !password) {
  console.error('Kullanım: npm run create-admin -- <userId> <şifre> [ad] [soyad]');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Şifre en az 8 karakter olmalı.');
  process.exit(1);
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'snackki',
});

try {
  const [existing] = await connection.execute('SELECT id FROM users WHERE userId = ?', [userId]);
  if (existing.length > 0) {
    console.error(`userId ${userId} zaten var.`);
    process.exit(1);
  }
  const hashed = await bcrypt.hash(password, 10);
  await connection.execute(
    `INSERT INTO users (userId, isAdmin, isActive, name, surname, phone, street, postNo, city, country, email, branch, companyName, contactPerson, password)
     VALUES (?, 1, 1, ?, ?, '', '', 0, '', '', NULL, 'Admin', NULL, NULL, ?)`,
    [userId, name, surname, hashed]
  );
  console.log(`✅ Admin oluşturuldu (userId: ${userId}). Panelde bu numara ve verdiğin şifreyle giriş yapabilirsin.`);
} catch (err) {
  console.error('❌ Hata:', err.message);
  process.exitCode = 1;
} finally {
  await connection.end();
}
