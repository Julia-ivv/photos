const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data', 'users.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return
    };

    res.send(data);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile(path.join(__dirname, '../data', 'users.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return
    };

    const usersArr = JSON.parse(data);
    const user = usersArr.find((elem) => {
      if (elem._id === id) {
        return elem;
      }
    });

    if (!user) {
      res.status(404).send({"message": "Нет пользователя с таким id"});
      return;
    };

    res.send(JSON.stringify(user));
  });
});

module.exports = router;