const { Schema, model } = require('mongoose');

const schema = new Schema({
  breed: { type: String, required: true },
});

module.exports = model('Breeds', schema);
