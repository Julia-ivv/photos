const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data', 'cards.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return
    };

    res.send(data);
  });
});

module.exports = router;
