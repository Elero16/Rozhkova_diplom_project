const Specialist = require('../models/Specialist');

// Получение всех специалистов
exports.getSpecialists = async (req, res) => {
    try {
        const specialists = await Specialist.find();
        res.json(specialists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение специалиста по ID
exports.getSpecialistById = async (req, res) => {
    try {
        const specialist = await Specialist.findById(req.params.id);
        if (!specialist) {
            return res.status(404).json({ message: 'Специалист не найден' });
        }
        res.json(specialist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создание нового специалиста
exports.createSpecialist = async (req, res) => {
    const specialist = new Specialist({
        name: req.body.name,
        specialty: req.body.specialty,
        category: req.body.category,
        description: req.body.description,
        photo: req.body.photo
    });

    try {
        const newSpecialist = await specialist.save();
        res.status(201).json(newSpecialist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};