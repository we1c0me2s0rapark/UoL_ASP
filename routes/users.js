/**
 * The routes for user management (login, signup, info, update)
 */

const express = require("express");
const router = express.Router();

// Redirect to the signup page
router.post('/signup', (req, res, next) => {
    return res.render('./users/signup.ejs', {'error': 'None'});
});

// Redirect to the login page
router.post('/login', (req, res, next) => {
    return res.render('./users/login.ejs', {'error': 'None'});
});

// Verify user registration using the provided email and password
router.post('/login/submit', (req, res, next) => {
    /*
        Data
        1. req.body.email
        2. req.body.password
    */

    // Validate email format
    if (!isValidEmailFormat(req.body.email)) {
        return res.render('./users/login.ejs', {'error': 'email'});
    }

    // Check if user exists in the database and password matches
    if (!isRegistered(req.body)) {
        // Return an appropriate value
        // return res.render('./users/login.ejs', {'error': 'email'});
        // return res.render('./users/login.ejs', {'error': 'password'});
    }
    // User is valid and exists, proceed with login and access to functionalities (Buy, Rent, and Sale)
    return res.render('./pages/main.ejs');
});

// Store user email and password in the database
router.post('/signup/submit', (req, res, next) => {
    /*
        Data
        1. req.body.email
        2. req.body.password
    */

    // Validate email format
    if (!isValidEmailFormat(req.body.email)) {
        return res.render('./users/signup.ejs', {'error': 'email'});
    }

    // Check if user exists in the database
    if (isRegistered(req.body)) {
        // Return an appropriate value
        // return res.render('./users/signup.ejs', {'error': 'exist'});
    }
    return res.render('./users/registered.ejs', {'name': req.body.name});
});

function isValidEmailFormat(email) {
    var isValid = false;
    // Email must contain '@'
    const splitByAt = email.split('@');
    if (splitByAt.length == 2) {
        // Email must end with '.'
        const splitByDot = splitByAt[1].split('.');
        isValid = (splitByDot.length == 2);
    }
    return isValid;
}

function isRegistered(user) {
}

module.exports = router;