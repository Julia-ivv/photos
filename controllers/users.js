const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (req, res) => {
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
    .catch((err) => res.status(400).send(err));
};

const findAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Пользователь не найден' });
      else res.send({ data });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) res.status(404).send({ message: 'Пользователь не найден' });
      else res.send({ data: user });
    })
    .catch((err) => res.status(500).send(err));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) res.status(404).send({ message: 'Пользователь не найден' });
      else res.send({ data: user });
    })
    .catch((err) => res.status(500).send(err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'best-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports = {
  createUser, findAllUsers, findUserById, updateUserProfile, updateUserAvatar, login,
};
