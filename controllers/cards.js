const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send(err));
};

const findAllCards = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) res.status(404).send({ message: 'Карточка не найдена' });
      else if (card.owner.equals(req.user._id)) {
        Card.deleteOne(card)
          .then(() => res.send({ card, message: 'Карточка удалена' }))
          .catch(() => res.status(500).send({ message: 'Произошла ошибка при удалении' }));
      } else {
        res.status(403).send({ message: 'Нельзя удалять чужие карточки' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при поиске' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Карточка не найдена' });
      else res.send({ data });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Карточка не найдена' });
      else res.send({ data });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createCard, findAllCards, deleteCard, likeCard, dislikeCard,
};
