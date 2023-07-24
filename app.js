// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

// импорт роутов
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(registerRouter);
app.use(loginRouter);
// здесь будет защита авторизацией
app.use(userRouter);
app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
