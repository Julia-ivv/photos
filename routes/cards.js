const router = require('express').Router();
const { createCard, findAllCards, deleteCard } = require('../controllers/cards');

router.get('/', findAllCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

module.exports = router;
