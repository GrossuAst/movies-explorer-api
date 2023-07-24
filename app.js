// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
