const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Specialist', specialistSchema);