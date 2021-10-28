const Router = require('express');
const Breeds = require('./models/Breeds');
const Dogs = require('./models/Dogs');

const router = new Router();

router.get('/dogs', async (req, res) => {
  try {
    const { breed, title } = req.query;

    const dogsBreedCollection = await Dogs.aggregate([
      {
        $lookup: {
          from: 'breeds',
          localField: 'breedId',
          foreignField: '_id',
          as: 'breed',
        },
      },
    ]);
    if (!dogsBreedCollection) {
      res.send({
        error: true,
        message: 'There are no dogs',
      });
    }
    if (breed != '' && title != '') {
      const dogsBreedCollectin = dogsBreedCollection.filter((item) => {
        if (item.breed[0].breed.indexOf(breed) !== -1 && item.title.indexOf(title) !== -1)
          return true;
      });
      res.send({
        dogsBreedCollectin,
      });
    } else if (breed != '') {
      const dogsBreedCollectin = dogsBreedCollection.filter((item) => {
        if (item.breed[0].breed.indexOf(breed) !== -1) return true;
      });
      res.send({
        dogsBreedCollectin,
      });
    } else if (title != '') {
      const dogsBreedCollectin = dogsBreedCollection.filter((item) => {
        if (item.title.indexOf(title) !== -1) return true;
      });
      res.send({
        dogsBreedCollectin,
      });
    } else {
      const dogsBreedCollectin = dogsBreedCollection;
      res.send({
        dogsBreedCollectin,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/breeds', async (req, res) => {
  try {
    const breedsCollectin = await Breeds.distinct('breed');
    if (!breedsCollectin) {
      res.send({
        error: true,
        message: 'There are no dogs',
      });
    }
    res.send({
      breedsCollectin,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
