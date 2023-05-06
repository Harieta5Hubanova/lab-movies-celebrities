const router = require('express').Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', async (req, res) => {
  const celebrities = await Celebrity.find();
  console.log(celebrities);
  res.render('movies/new-movie', { celebrities });
});
router.post('/movies/create', async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  await Movie.create({ title, genre, plot, cast });
  res.redirect('/movies');
});

router.get('/movies', async (req, res) => {
  const movies = await Movie.find({}, null, { sort: { name: 1 } }).populate(
    'cast'
  ); //gets all celebrities
  res.render('movies/movies', { movies });
});

router.get('/movies/:id/edit', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('cast');
  const celebrity = await Celebrity.find();
  res.render('movies/edit-movie', { movie, celebrity });
});

router.post('/movies/edit', async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  await Book.findByIdAndUpdate(req.query.id, {
    title,
    genre,
    plot,
    cast
  });
  res.redirect(`/movies/${req.query.id}`);
});

router.post('/movies/:id/delete', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/movies');
});

router.get('/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('cast');
  console.log(movie);
  res.render('movies/movie-details', movie);
});

module.exports = router;
