// App.js

// Importe os módulos necessários
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [keyword, setKeyword] = useState('');
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const apiKey = 'e2b489b9e52d4baf8d0b090a9c1d9319';
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${keyword}&pageSize=20`
      );

      // Atualiza o estado das notícias no frontend
      setNews(response.data.articles);

      // Ordena os resultados da pesquisa por data de publicação (mais recente primeiro)
      const sortedNews = response.data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
      for (const item of sortedNews) {
        // Insira os dados da notícia no banco de dados
        await axios.post('http://localhost:3000/api/news', {
          title: item.title,
          content: item.content,
          date: item.publishedAt
        });
      }

    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    }
  };
 
  const handleClick = async () => {
    try {
      
      await handleSearch();

      // Faça sua busca aqui...
      // Supondo que você tenha os dados da notícia disponíveis em title, content e date
   
      console.log('Notícias adicionadas com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar notícias:', error.message);
    }

    // Define a palavra-chave, marca que o botão de busca foi clicado e chama a busca
    setKeyword(''); // Limpa o estado da palavra-chave se desejar
    setSearchClicked(true);
  };

  return (
    <div>
      <h1>Notícias Globais</h1>
      <div>
        <label>Pesquisar por palavra-chave: </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleClick}>Buscar</button>
      </div>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{new Date(item.publishedAt).toLocaleDateString()}</p>
            {/* Outros detalhes da notícia... */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
