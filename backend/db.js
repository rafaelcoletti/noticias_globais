const mongoose = require('mongoose');

// URL de conexão com o MongoDB, incluindo as credenciais
const uri = 'mongodb://rafael_coletti:12345@localhost:27017/noticias_globais';

// Conexão com o banco de dados MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Lidar com eventos de conexão
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

module.exports = db;
