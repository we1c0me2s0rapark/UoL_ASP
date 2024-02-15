/**
 * The routes for user management (login, signup, info, update)
 */

const express = require("express");
const router = express.Router();

router.post('/login', (req, res, next) => {
    return res.render('./users/login.ejs');
});

module.exports = router;