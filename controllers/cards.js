const Card = require('../models/card');
const ServerError = require('../errors/server-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequest = require('../errors/bad-request-error');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      const error = err.name === 'ValidationError' ? new BadRequest(`Ошибка валидации ${err.message}`) : new ServerError();
      next(error);
    });
};

const findAllCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(() => next(new ServerError()));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');
      else if (card.owner.equals(req.user._id)) {
        Card.deleteOne(card)
          .then(() => res.send({ card, message: 'Карточка удалена' }))
          .catch(() => next(new ServerError()));
      } else {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) throw new NotFoundError('Карточка не найдена');
      else res.send({ data });
    })
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) throw new NotFoundError('Карточка не найдена');
      else res.send({ data });
    })
    .catch((err) => next(err));
};

module.exports = {
  createCard, findAllCards, deleteCard, likeCard, dislikeCard,
};
