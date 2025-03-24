const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Новые импорты для работы с файлами
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(cors());
app.use(bodyParser.json());

setTimeout(() => {
  db.connect((err) => {
    if (err) {
      console.error('Ошибка подключения к базе данных:', err);
      throw err;
    }
    console.log('Подключение к базе данных успешно установлено');
  });
}, 10000); // Задержка 10 секунд

// Подключение к базе данных
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'portfolio'
});

// Настройка Multer для сохранения файлов
const storage = multer.diskStorage({
  destination: './uploads/', // Папка для хранения файлов
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  }
});
const upload = multer({ storage });

// Создание папки для загрузки файлов, если её нет
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Эндпоинт для загрузки изображений
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не загружен' });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Получение списка проектов
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Добавление проекта
app.post('/api/projects', (req, res) => {
  const { title, description, image_url, link } = req.body;
  db.query(
    'INSERT INTO projects (title, description, image_url, link) VALUES (?, ?, ?, ?)',
    [title, description, image_url, link],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId });
    }
  );
});

// Редактирование проекта
app.put('/api/projects/:id', (req, res) => {
  const { title, description, image_url, link } = req.body;
  db.query(
    'UPDATE projects SET title = ?, description = ?, image_url = ?, link = ? WHERE id = ?',
    [title, description, image_url, link, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

// Удаление проекта
app.delete('/api/projects/:id', (req, res) => {
  db.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});