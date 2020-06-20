const express = require('express');
const app = express();
const path = require('path');

const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get(/\/\w+/, (req, res) => {
  res.status(404).send({"message": "Запрашиваемый ресурс не найден"});
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
})