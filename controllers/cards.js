const modelCard = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  modelCard.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send(err));
};

const findAllCards = (req, res) => {
  modelCard.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  modelCard.findByIdAndRemove(req.params.id)
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { createCard, findAllCards, deleteCard };
