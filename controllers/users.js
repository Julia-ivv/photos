const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ServerError = require('../errors/server-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');
const AuthorizationError = require('../errors/authorization-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') error = new BadRequest(`Ошибка валидации ${err.message}`);
      else if (err.code === 11000) error = new ConflictError('Пользователь с таким email существует');
      else error = new ServerError();
      next(error);
    });
};

const findAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(() => next(new ServerError()));
};

const findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) throw new NotFoundError('Пользователь не найден');
      else res.send({ data });
    })
    .catch((err) => next(err));
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      else res.send({ data: user });
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') error = new BadRequest(`Ошибка валидации ${err.message}`);
      else error = new ServerError();
      next(error);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      else res.send({ data: user });
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') error = new BadRequest(`Ошибка валидации ${err.message}`);
      else error = new ServerError();
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'best-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(new AuthorizationError(err.message)));
};

module.exports = {
  createUser, findAllUsers, findUserById, updateUserProfile, updateUserAvatar, login,
};
