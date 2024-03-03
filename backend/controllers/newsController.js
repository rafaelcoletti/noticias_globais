// newsController.js

const News = require('../models/newsModel');

exports.createNews = async (req, res) => {
  try {
    const { news } = req.body;

    // Itera sobre cada notícia enviada pelo frontend e salva no banco de dados
    const insertedNews = await Promise.all(news.map(async (item) => {
      // Cria um novo objeto de notícia com os dados fornecidos
      const newNews = new News({
        title: item.title,
        content: item.content,
        date: item.date
      });

      // Salva a notícia no banco de dados
      return await newNews.save();
    }));

    res.status(201).json({ success: true, insertedNews });
    } catch (error) {
        console.error('Erro ao adicionar notícias:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
