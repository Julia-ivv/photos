const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllUsers, findUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', findAllUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), findUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^https?:\/\/(www\.)?(((\d{1,3}\.){3}\d{1,3})|([А-ЯЁа-яё0-9][0-9А-ЯЁа-яё\-.]*\.[А-ЯЁа-яё]+|[a-zA-Z0-9][a-zA-Z0-9\-.]*\.[a-zA-Z]+))(:[1-9]\d{1,4})?\/?([-0-9/a-zA-Z&=?+%._]+#?)?$/),
  }),
}), updateUserAvatar);

module.exports = router;
