const pricingData = require('../../data/productList.json');

exports.calculateFinalPrice = (baseCost) => {
    return baseCost + (baseCost * pricingData.markupPercentage / 100);
};
