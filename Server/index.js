const express = require('express');
const cors = require('cors');
const db = require('./lib/db');

const app = express();
app.use(express.json());
app.use(cors());

// GET danh sách người dùng
app.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, rows) => {
        if (err) res.status(500).send(err);
        res.json(rows);
    });
});

// POST tạo người dùng mới
app.post('/add', (req, res) => {
    const { 
        name, 
        address,
        Class,
        gpa 
    } = req.body;
    db.query('INSERT INTO students (name, address, class, gpa) VALUES (?, ?, ?, ?)', 
    [
        name, 
        address, 
        Class, 
        gpa
    ], 
    (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.send('User added to the database');
        }
    });
});

// Cập nhật thông tin sinh viên theo ID
app.patch('/:id', (req, res) => {
    const studentId = req.params.id;
    const updatedFields = req.body; // Lấy thông tin cần cập nhật từ req.body

    // Tạo một mảng chứa các trường cần cập nhật
    const updateFieldsArray = [];

    for (const key in updatedFields) {
        if (updatedFields.hasOwnProperty(key)) {
            updateFieldsArray.push(`${key} = ?`);
        }
    }

    // Tạo danh sách giá trị cần cập nhật
    const updateValues = Object.values(updatedFields);

    // Thực hiện truy vấn cập nhật
    db.query(`UPDATE students SET ${updateFieldsArray.join(', ')} WHERE id = ?`, [...updateValues, studentId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Thông tin sinh viên đã được cập nhật thành công.');
        }
    });
});

// Xóa sinh viên theo ID
app.delete('/:id', (req, res) => {
    const studentId = req.params.id;
    
    // Thực hiện truy vấn xóa từ cơ sở dữ liệu
    db.query('DELETE FROM students WHERE id = ?', [studentId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Sinh viên đã được xóa thành công.');
        }
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
