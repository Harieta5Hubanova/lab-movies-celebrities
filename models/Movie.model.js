const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: { type: Schema.Types.ObjectId, ref: 'Celebrity' }
});

const movieModel = model('Movie', movieSchema);

module.exports = movieModel;
