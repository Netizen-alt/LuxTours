const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Simple routes without auth middleware for now, or add auth middleware later
router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);
router.post('/', tourController.createTour); // Protected?
router.put('/:id', tourController.updateTour); // Protected?
router.delete('/:id', tourController.deleteTour); // Protected?

module.exports = router;
