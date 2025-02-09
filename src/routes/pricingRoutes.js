const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

router.get('/price', pricingController.calculatePrice);

module.exports = router;
