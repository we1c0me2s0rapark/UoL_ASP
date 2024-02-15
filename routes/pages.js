/**
 * The routes for page management (main, buy, rent)
 */

const express = require('express');
const router = express.Router();

router.post('/buy', (req, res, next) => {
    return res.render('./pages/buy.ejs');
});

router.post('/rent', (req, res, next) => {
    return res.render('./pages/rent.ejs');
});

router.post('/sale', (req, res, next) => {
    return res.render('./pages/sale.ejs');
});

module.exports = router;