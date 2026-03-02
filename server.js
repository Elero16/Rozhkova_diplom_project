const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const specialistsRouter = require('./routes/specialists');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://mongo:27017/appointment-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', () => {
    console.log('Подключено к MongoDB');
});

// Маршруты
app.use('/api/specialists', specialistsRouter);
app.use('/api/appointments', appointmentsRouter);

// Заполнение базы данных тестовыми данными
const Specialist = require('./models/Specialist');
const Appointment = require('./models/Appointment');

const seedDatabase = async () => {
    try {
        // Проверяем, есть ли уже данные
        const specialistsCount = await Specialist.countDocuments();
        if (specialistsCount === 0) {
            // Создаем тестовых специалистов
            const specialists = [
                {
                    name: "Иванов Сергей Петрович",
                    specialty: "Терапевт",
                    category: "Высшая категория",
                    description: "Специалист широкого профиля с 15-летним стажем. Ведет прием взрослых пациентов."
                },
                {
                    name: "Петрова Анна Владимировна",
                    specialty: "Кардиолог",
                    category: "Первая категория",
                    description: "Специалист по заболеваниям сердечно-сосудистой системы. Проводит диагностику и лечение."
                },
                {
                    name: "Сидоров Михаил Александрович",
                    specialty: "Невролог",
                    category: "Высшая категория",
                    description: "Специалист по заболеваниям нервной системы. Занимается диагностикой и лечением головной боли, бессонницы и других неврологических заболеваний."
                },
                {
                    name: "Козлова Елена Сергеевна",
                    specialty: "Эндокринолог",
                    category: "Первая категория",
                    description: "Специалист по заболеваниям эндокринной системы. Ведет пациентов с сахарным диабетом, заболеваниями щитовидной железы и другими эндокринными патологиями."
                },
                {
                    name: "Морозов Дмитрий Иванович",
                    specialty: "Хирург",
                    category: "Высшая категория",
                    description: "Специалист по хирургическим вмешательствам. Проводит операции различной сложности."
                }
            ];

            await Specialist.insertMany(specialists);
            console.log('Тестовые данные специалистов добавлены');
        }
    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error);
    }
};

// Запуск заполнения базы данных
seedDatabase();

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});