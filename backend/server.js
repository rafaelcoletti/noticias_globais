// server.js


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const News = require('./models/newsModel');
const dbURL = 'mongodb://127.0.0.1:27017/noticias_globais';
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3001' // URL do servidor frontend
}));
app.use(bodyParser.json());

// Verificar se já existe uma conexão antes de tentar criar uma nova
if (mongoose.connection.readyState === 0) {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const dbConnection = mongoose.connection;

dbConnection.on('error', (error) => {
  console.error('Erro de conexão ao MongoDB:', error);
});

dbConnection.once('open', () => {
  console.log('Conexão ao MongoDB estabelecida com sucesso!');
});

// Definir rota para buscar notícias por palavra-chave
app.post('/search', async (req, res) => {
  try {
    const { keyword } = req.body;
    
    // Realiza a busca externa utilizando a API de notícias
    const apiKey = 'e2b489b9e52d4baf8d0b090a9c1d9319';
    const response = await axios.get(
      `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${keyword}&pageSize=20`
    );
    
    // Limpa o banco de dados antes de adicionar novas notícias
    // await News.deleteMany({});

    // Salva as notícias no MongoDB
    const newsArray = response.data.articles;
    const savedNews = [];
    
    for (const newsItem of newsArray) {
      const news = await News.create(newsItem);
      savedNews.push(news);
    }

    res.json({ success: true, news: savedNews });
  } catch (error) {
    console.error('Erro ao adicionar notícia:', error);
    res.json({ success: false, error: 'Erro ao adicionar notícia' });
  }
});

// Endpoint para adicionar notícias ao banco de dados
app.post('/api/news', async (req, res) => {
  try {
    const newsData = req.body;
    const savedNews = await News.insertMany(newsData); // Salvar as notícias recebidas no banco de dados
    res.json({ success: true, news: savedNews });
  } catch (error) {
    console.error('Erro ao adicionar notícias ao banco de dados:', error);
    res.json({ success: false, error: 'Erro ao adicionar notícias ao banco de dados' });
  }
});

// Outras configurações e rotas...
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
