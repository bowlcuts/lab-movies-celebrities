const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
});

router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then(() => {
        res.redirect('/celebrities');
    })
    .catch(() =>  {
        res.render('celebrities/new-celebrity.hbs');
    });
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render('celebrities/celebrities.hbs', { allCelebrities });
    })
    .catch(err => console.log(err));
})

module.exports = router;