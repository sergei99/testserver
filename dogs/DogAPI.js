const axios = require('axios');

const getBreeds = async () => {
  try {
    return await axios.get('https://dog.ceo/api/breeds/image/random/50');
  } catch (e) {
    console.error(e);
  }
};

const countBreeds = async () => {
  const breeds = [
    ...(await getBreeds().then((result) => result.data.message)),
    ...(await getBreeds().then((result) => result.data.message)),
  ];

  if (breeds) {
    return breeds;
  }
};

module.exports = countBreeds;
