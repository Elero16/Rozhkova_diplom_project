const express = require('express');
const router = express.Router();
const specialistController = require('../controllers/specialistController');

router.get('/', specialistController.getSpecialists);
router.get('/:id', specialistController.getSpecialistById);
router.post('/', specialistController.createSpecialist);

module.exports = router;