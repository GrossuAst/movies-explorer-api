const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

// окружение
const { NODE_ENV, MONGO_URL } = process.env;

// настройка запуска в режиме разработки
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'dev-secret';
}

// загрузка переменных окружения
require('dotenv').config();

app.use(cors({
  origin: 'https://grossuast.movie.nomoreparties.sbs',
  credentials: true,
}));

// импорт роутов
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

// подключение к бд
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1/bitfilmsdb', {
  useNewUrlParser: true,
});

// логгеры
const { requestLogger, errorLogger } = require('./middlewares/loggers');
// обработчик ошибок
const errorsHandler = require('./middlewares/errorsHandler');

app.use(bodyParser.json());
app.use(cookieParser());

// логгер запросов
app.use(requestLogger);

// роуты
app.use(routes);

// логгер ошибок
app.use(errorLogger);

// подключение центрального обработчика ошибок
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {});
