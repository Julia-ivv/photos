const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get(/\/\w+/, (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port 3000');
});
