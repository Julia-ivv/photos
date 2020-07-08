const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = { _id: '5efc80dd035ce094a0bf0faf' };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.post('/signin', login);
app.post('/signup', createUser);

app.get(/\/\w+/, (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port 3000');
});
