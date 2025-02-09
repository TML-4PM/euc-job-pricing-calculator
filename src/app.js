const express = require('express');
const cors = require('cors');
const pricingRoutes = require('./routes/pricingRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', pricingRoutes);

module.exports = app;
