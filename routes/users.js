const router = require('express').Router();
const {
  findAllUsers, findUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
