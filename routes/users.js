const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data', 'users.json'), 'utf-8')
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(path.join(__dirname, '../data', 'users.json'), 'utf-8')
    .then((data) => {
      const usersArr = JSON.parse(data);
      const user = usersArr.find((elem) => {
        if (elem._id === id) {
          return elem;
        }
        return undefined;
      });

      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
