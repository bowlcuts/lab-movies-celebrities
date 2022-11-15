const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render('movies/new-movie.hbs', { allCelebrities })
    })
    .catch(err => console.log(err))
});

router.post('/movies/create', (req, res, next) => {
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    })
    .then(() => {
        res.redirect('/movies');
    })
    .catch(() =>  {
        res.render('movies/new-movie.hbs');
    });
});

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((allMovies) => {
        res.render('movies/movies.hbs', { allMovies });
    })
    .catch(err => console.log(err));
})

module.exports = router;