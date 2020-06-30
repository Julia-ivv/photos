const router = require('express').Router();
const { createUser, findAllUsers, findUserById } = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.post('/', createUser);

module.exports = router;
