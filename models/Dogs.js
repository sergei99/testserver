const { Schema, model, mongoose } = require('mongoose');

const schema = new Schema({
  breedId: { type: Schema.ObjectId, required: true },
  title: { type: String, required: true },
});

module.exports = model('Dogs', schema);
