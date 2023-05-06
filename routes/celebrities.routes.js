const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', async (req, res) => {
  const celebrities = await Celebrity.find({}, null, { sort: { name: 1 } }); //gets all celebrities
  res.render('celebrities/celebrities', { celebrities });
});

router.get('/celebrities/create', async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render('celebrities/new-celebrity', { celebrities });
});
router.post('/celebrities/create', async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  await Celebrity.create({ name, occupation, catchPhrase });
  res.redirect('/celebrities');
});

module.exports = router;
