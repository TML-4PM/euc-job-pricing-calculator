const pricingModel = require('../models/pricingModel');

exports.calculatePrice = (req, res) => {
    const { cost } = req.query;
    if (!cost || isNaN(cost)) {
        return res.status(400).json({ error: 'Invalid job cost' });
    }

    const finalPrice = pricingModel.calculateFinalPrice(parseFloat(cost));
    res.json({ price: finalPrice });
};
