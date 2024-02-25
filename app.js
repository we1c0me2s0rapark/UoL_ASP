const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;

// routes
const pagesRouter = require('./routes/pages');
const postingsRouter = require('./routes/postings');
const usersRouter = require('./routes/users');

app.use(
    express.urlencoded({
        extended:true,
    })
)

// Set 'views' as the root folder to access the ejs files
app.set('view engine', 'ejs');
// app.set('views', './views');

app.get('/', (req, res) => {
    // Launch main.ejs file
    res.render('./pages/main.ejs');
});

app.use('/pages', pagesRouter);
app.use('/postings', postingsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});