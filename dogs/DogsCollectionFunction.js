const axios = require('axios');
const Dogs = require('../models/Dogs');
const Breeds = require('../models/Breeds');
const countBreeds = require('./DogAPI');

const getTitle = async () => {
  try {
    const breeds = await countBreeds();
    const count = await Dogs.count();
    if (count < 100) {
      breeds.map(async (item) => {
        const breed = new Breeds({ breed: item.split('/')[4] });
        const dogs = new Dogs({ title: item.split('/')[5].split('.')[0], breedId: breed._id });
        await breed.save();
        await dogs.save();
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = getTitle;
