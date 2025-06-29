import { useState } from 'react';
import './App.css';

function App()
{
  const [originalUrl, setOriginalUrl] = useState(''); //Memory for the link the user types
  const [shortUrl, setShortUrl] = useState(''); //Memory for the shortened link
  const [error, setError] = useState(''); //Errors
  const [stats, setStats] = useState([]); //stats for the stats page
  const [showStats, setShowStats] = useState(false);

  //to handle with the form
  const handleSubmit = async(e)=> {
    e.preventDefault(); // Prevent the default form submission behavior
    //clear old result
    setShortUrl('');
    setError('');
    setShowStats(false);
    //Simple Validation
    if(!originalUrl) 
    {
      setError('Please type an URL');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.131:5000/short', {
        method: 'POST',
        headers : {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({url : originalUrl})
      });
      const data = await response.json();

      if(!response.ok)
      {
        throw new Error(data.error || 'Something has gone wrong');
      }
      setShortUrl(data.shortUrl);
    } catch(error) {
      setError(error.message);
    }
  };

  //handle with the stats page
  const handleShowStats = async () => {
    setShortUrl('');
    setError('');

    try {
      const response = await fetch('http://192.168.0.131:5000/stats');
      const data = await response.json();

      if(!response.ok)
      {
        throw new Error('Could not fetch Status');
      }

      setStats(data);
      setShowStats(true);

    } catch (error) {
      setError(error.message);
    }
  };

  //web page
  return (
    <div className = "App">
      <header>
        <h1>Shorten Your Links</h1>
      </header>
      <div className = "form-container">
        <input
          type = "text"
          placeholder = "Paste your URL here"
          value = {originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}/>
          <button type = "submit" onClick = {handleSubmit}>Short</button>
          <button type = "button" onClick = {handleShowStats} className = "stats-button">Show Stats</button>
      </div>
    {shortUrl && (
      <div className = "result-container">
        <p>Your URL is ready:</p>
        <a href = {shortUrl} target = "_blank" rel = "noopener noreferrer">
          {shortUrl}
        </a>
      </div>
    )}
    {error && (
      <div className = "error-container" style = {{ backgroundColor: '#ffdede', borderColor: '#ffb5b5' }}>
        <p style = {{ color: '#d32f2f' }}>{error}</p>
      </div>
    )}
    {showStats && (
      <div className = "stats-container">
        <h2>Statistics</h2>
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
              <tr key = {link.short_code}>
                <td>{link.original_link}</td>
                <td>
                  <a href = {`http://192.168.0.131:5000/${link.short_code}`} target = "_blank" rel = "noopener noreferrer">
                    {`/${link.short_link}`}
                  </a>
                </td>
                <td>{link.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    </div>
  );
}

export default App;