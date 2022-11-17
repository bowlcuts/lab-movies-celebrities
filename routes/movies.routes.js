
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
});

router.get('/movies/:id', (req, res, next) => {
    
    Movie.findById(req.params.id).populate('cast')
    .then((movieDetails) => {
        console.log(movieDetails);
        res.render('movies/movie-details.hbs', { movieDetails });

    })
    .catch(err => console.log(err))
});


router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then((movieDelete) => {
        console.log('movie was removed', movieDelete);
        res.redirect('/movies');
    })
    .catch(err => console.log('error while deleting movie: ', err));
});

router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id).populate('cast')
    .then((movies) => {
        console.log(movies)
        res.render('movies/edit-movie.hbs', { movies })
    })
    .catch(err => console.log('couldnt edit', err));
});

router.post('/movies/:id', (req, res, next) => {
    const {title, genre, plot, cast} = req.body

    Movie.findByIdAndUpdate(req.params, {title, genre, plot, cast})
    .then(() => {
        res.redirect('/movies/movies.hbs')
    })
    .catch(err => console.log(err))
})


module.exports = router;