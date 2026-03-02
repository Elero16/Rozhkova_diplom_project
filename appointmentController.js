const Appointment = require('../models/Appointment');
const Specialist = require('../models/Specialist');

// Получение всех записей с фильтрацией
exports.getAppointments = async (req, res) => {
    try {
        const filter = req.query.filter;
        let query = {};
        
        if (filter && filter !== 'all') {
            query.status = filter;
        }
        
        const appointments = await Appointment.find(query);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создание новой записи
exports.createAppointment = async (req, res) => {
    try {
        // Получаем информацию о специалисте
        const specialist = await Specialist.findById(req.body.specialistId);
        if (!specialist) {
            return res.status(404).json({ message: 'Специалист не найден' });
        }

        const appointment = new Appointment({
            specialistId: req.body.specialistId,
            specialistName: specialist.name,
            date: req.body.date,
            time: req.body.time,
            service: req.body.service,
            patientName: req.body.patientName,
            phone: req.body.phone,
            email: req.body.email
        });

        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Отмена записи
exports.cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Запись не найдена' });
        }

        appointment.status = 'cancelled';
        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};