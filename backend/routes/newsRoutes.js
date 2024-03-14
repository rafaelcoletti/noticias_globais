// newsRoutes.js

const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Rota para adicionar uma única notícia
// router.post('/', newsController.createNews);

// Rota para adicionar várias notícias de uma vez
router.post('/add', newsController.addMultipleNews);

module.exports = router;