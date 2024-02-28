/**
 * The routes for page management (main, buy, rent)
 */

const express = require('express');
const router = express.Router();

router.post('/about', (req, res, next) => {
    // Redirect to the about page
    return res.render('./pages/about.ejs');
});

router.post('/buy', (req, res, next) => {
    if (isAccessible(currentUser)) {
        return res.render('./pages/buy.ejs');
    }
    // Redirect to the login page if the user is not logged in
    return res.render('./users/login.ejs', {'error': 'None'});
});

router.post('/rent', (req, res, next) => {
    if (isAccessible(currentUser)) {
        return res.render('./pages/rent.ejs');
    }
    // Redirect to the login page if the user is not logged in
    return res.render('./users/login.ejs', {'error': 'None'});
});

router.post('/sale', (req, res, next) => {
    if (isAccessible(currentUser)) {
        return res.render('./pages/sale.ejs');
    }
    // Redirect to the login page if the user is not logged in
    return res.render('./users/login.ejs', {'error': 'None'});
});

function isAccessible(user) {
    // return (user != undefined);
    return true;
}

module.exports = router;