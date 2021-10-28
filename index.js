const express = require('express');
const router = require('./Router');
const mongoose = require('mongoose');
const config = require('config');
const getTitle = require('./dogs/DogsCollectionFunction');
const Dogs = require('./models/Dogs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}`);
    });
    await getTitle();
  } catch (e) {
    console.log('Сервер не запущен', e);
  }
};

start();
