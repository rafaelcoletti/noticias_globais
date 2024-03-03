document.getElementById('buscar-noticias').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
  
    // Fazer uma requisição HTTP para o backend para buscar as notícias
    const response = await fetch(`/api/news?keyword=${keyword}`);
  
    if (response.ok) {
      // Notícias encontradas
      console.log('Notícias encontradas:', response.data);
    } else {
      // Erro ao buscar notícias
      console.error('Erro ao buscar notícias:', response.statusText);
    }
});
