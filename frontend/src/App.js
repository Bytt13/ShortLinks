import { useState } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState(''); // Memória para o link que o usuário digita
  const [shortUrl, setShortUrl] = useState('');     // Memória para o link encurtado
  const [error, setError] = useState('');           // Memória para erros
  const [stats, setStats] = useState([]);           // Memória para os dados das estatísticas
  const [showStats, setShowStats] = useState(false); // Controla qual "visão" mostrar: formulário ou estatísticas
  const api = 'https://shortlinks-hhj7.onrender.com'; // Sua API (backend)

  // Lida com o envio do formulário para encurtar uma URL
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    
    // Limpa resultados antigos
    setShortUrl('');
    setError('');

    // Validação simples
    if (!originalUrl) {
      setError('Por favor, digite uma URL');
      return;
    }

    try {
      const response = await fetch(`${api}/short`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo deu errado');
      }
      setShortUrl(data.shortUrl);
    } catch (error) {
      setError(error.message);
    }
  };

  // Lida com a busca e exibição das estatísticas
  const handleShowStats = async () => {
    setError('');
    setOriginalUrl(''); // Limpamos a URL para não ficar "sobrando" no estado
    try {
      const response = await fetch(`${api}/stats`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Não foi possível buscar as estatísticas');
      }

      setStats(data);
      setShowStats(true); // AQUI ESTÁ A MÁGICA: MUDAMOS PARA A "VISÃO DE ESTATÍSTICAS"
    } catch (error) {
      setError(error.message);
    }
  };

  // Função para voltar para a tela do formulário
  const handleShowForm = () => {
    setShowStats(false); // VOLTAMOS PARA A "VISÃO DO FORMULÁRIO"
    setError('');
  };

  // --- RENDERIZAÇÃO CONDICIONAL DA PÁGINA ---
  // AQUI É A GRANDE MUDANÇA: Usamos um operador ternário para decidir o que renderizar.
  // Se `showStats` for verdadeiro, mostra a tabela. Senão, mostra o formulário.
  return (
    <div className="App">
      {showStats ? (
        // ========== VISÃO DE ESTATÍSTICAS ==========
        <>
          <header>
            <h1>Statistics</h1>
          </header>
          <div className="stats-container">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Original URL</th>
                    <th>Short URL</th>
                    <th>Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((link) => (
                    <tr key={link.short_code}>
                      <td>{link.original_link}</td>
                      <td>
                        <a href={`${api}/${link.short_code}`} target="_blank" rel="noopener noreferrer">
                          {`${api.replace('https://', '')}/${link.short_code}`}
                        </a>
                      </td>
                      <td>{link.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Botão para voltar */}
            <button type="button" onClick={handleShowForm} className="stats-button" style={{ marginTop: '20px' }}>
              Back
            </button>
          </div>
        </>
      ) : (
        // ========== VISÃO DO FORMULÁRIO (PADRÃO) ==========
        <>
          <header>
            <h1>Shorten Your Links</h1>
          </header>
          {/* Agora o formulário está dentro de uma tag <form> para semântica correta */}
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              placeholder="Paste your URL here"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button type="submit">Short</button>
            <button type="button" onClick={handleShowStats} className="stats-button">
              Show Stats
            </button>
          </form>

          {/* Container para os resultados e erros */}
          <div className='results-area'>
            {shortUrl && (
              <div className="result-container">
                <p>Your URL is ready:</p>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </div>
            )}
            {error && (
              <div className="result-container error-container" style={{ backgroundColor: '#ffdede', border: '1px solid #ffb5b5' }}>
                <p style={{ color: '#d32f2f' }}>{error}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;