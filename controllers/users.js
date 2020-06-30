const modelUser = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  modelUser.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err));
};

const findAllUsers = (req, res) => {
  modelUser.find({})
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => res.status(500).send(err));
};

const findUserById = (req, res) => {
  modelUser.findById(req.params.id)
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => res.status(500).send(err));
};

module.exports = { createUser, findAllUsers, findUserById };
