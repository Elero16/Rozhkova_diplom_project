const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    specialistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialist',
        required: true
    },
    specialistName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);