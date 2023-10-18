const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Thay đổi tùy theo thông tin đăng nhập của bạn
    password: '123456789', // Thay đổi tùy theo mật khẩu của bạn
    database: 'testdb' // Thay đổi tùy theo tên cơ sở dữ liệu của bạn
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.message);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = db;
