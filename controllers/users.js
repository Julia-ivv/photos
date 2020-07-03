const modelUser = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  modelUser.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err));
};

const findAllUsers = (req, res) => {
  modelUser.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const findUserById = (req, res) => {
  modelUser.findById(req.params.id)
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Пользователь не найден' });
      else res.send({ data });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  modelUser.findByIdAndUpdate(
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
  modelUser.findByIdAndUpdate(
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

module.exports = {
  createUser, findAllUsers, findUserById, updateUserProfile, updateUserAvatar,
};
