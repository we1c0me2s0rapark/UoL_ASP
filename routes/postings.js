/**
 * The routes for posting management (write, edit)
 */

const express = require("express");
const router = express.Router();

// Redirect to the write page
router.post('/write', (req, res, next) => {
    return res.render('./postings/write.ejs');
});

// Redirect to the write page after storing the content in the database
router.post('/upload', (req, res, next) => {
    /*
        Data
        1. Title: req.body.title
        2. Content: req.body.content
        3. Author (user): currentUser
    */
    console.log('test >> ' + req.body.currentUser,', ' + req.body.title,', ' + req.body.content);
});

// Redirect to the view page
router.post('/view', (req, res, next) => {
    return res.render('./postings/view.ejs', {'author': req.body.author, 'title': req.body.title, 'time': req.body.created_time});
});

module.exports = router;