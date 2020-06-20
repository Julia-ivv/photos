const express = require('express');
const app = express();
const path = require('path');
// const users = require('./routes/users');

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/users', users);

app.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'users.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return
    }

    res.send(data);
  });
});

app.get('/cards', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'cards.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return
    }

    res.send(data);
  });
});

app.get('/users/:id', (req, res) => {
  //res.send(req.params.id);
  const id = req.params.id;

  fs.readFile(path.join(__dirname, 'data', 'users.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return
    }

    //res.send(data);
    const usersArr = JSON.parse(data);
    //console.log(usersArr);
    const user = usersArr.find((elem) => {
      if (elem._id === id) {
        return elem;
      }
    });
    if (!user) {
      res.status(404).send({"message": "Нет пользователя с таким id"});
      return;
    }
    res.send(JSON.stringify(user));
  });

});

app.get(/\/\w+/, (req, res) => {
  res.send({"message": "Запрашиваемый ресурс не найден"});
  console.log(req.path);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
})