const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data', 'cards.json'), 'utf-8')
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
