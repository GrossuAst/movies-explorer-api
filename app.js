// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

// настройка запуска в режиме разработки
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'dev-secret';
}

// загрузка переменных окружения
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

app.use(cors({
  origin: 'https://grossuast.movie.nomoreparties.sbs',
  credentials: true,
}));

// импорт роутов
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const nonExistenRoutes = require('./routes/non-existen-routes');

const { PORT = 3000 } = process.env;

// подключение к бд
mongoose.connect('mongodb://127.0.0.1/bitfilmsdb', {
  useNewUrlParser: true,
});

// мидлвэра авторизации
const auth = require('./middlewares/auth');

// логгеры
const { requestLogger, errorLogger } = require('./middlewares/loggers');
// обработчик ошибок
const errorsHandler = require('./middlewares/errorsHandler');

app.use(bodyParser.json());
app.use(cookieParser());

// логгер запросов
app.use(requestLogger);

// роуты
app.use(registerRouter);
app.use(loginRouter);
app.use(auth);
app.use(userRouter);
app.use(movieRouter);
app.use(logoutRouter);
app.use(nonExistenRoutes);

// логгер ошибок
app.use(errorLogger);

// подключение центрального обработчика ошибок
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {});
