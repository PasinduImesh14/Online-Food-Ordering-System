const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middleware/authenticate');

router.get('/restaurant/:id', authenticate, categoryController.getRestaurantsCategory);

module.exports = router;