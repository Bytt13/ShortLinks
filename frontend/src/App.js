import { useState } from 'react';
import './App.css';

function App() {
  // State to store the URL typed by the user
  const [originalUrl, setOriginalUrl] = useState('');
  // State to store the shortened URL returned by the API
  const [shortUrl, setShortUrl] = useState('');
  // State to store error messages
  const [error, setError] = useState('');
  // State to store statistics data
  const [stats, setStats] = useState([]);
  // State to control which view to show: form or statistics
  const [showStats, setShowStats] = useState(false);
  // Your backend API endpoint
  const api = 'https://shortlinks-hhj7.onrender.com';

  // Handles the form submission to shorten a URL
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    
    // Clear previous results
    setShortUrl('');
    setError('');

    // Simple validation
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      // Send the URL to the backend to be shortened
      const response = await fetch(`${api}/short`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl }),
      });
      const data = await response.json();

      if (!response.ok) {
        // Handle backend errors
        throw new Error(data.error || 'Something went wrong');
      }
      setShortUrl(data.shortUrl); // Set the shortened URL
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // Handles fetching and displaying statistics
  const handleShowStats = async () => {
    setError('');
    setOriginalUrl(''); // Clear the URL input
    try {
      // Fetch statistics from the backend
      const response = await fetch(`${api}/stats`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Could not fetch statistics');
      }

      setStats(data); // Set statistics data
      setShowStats(true); // Switch to statistics view
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // Function to return to the form view
  const handleShowForm = () => {
    setShowStats(false); // Switch back to form view
    setError('');
  };

  // --- CONDITIONAL RENDERING OF THE PAGE ---
  // Use a ternary operator to decide what to render.
  // If `showStats` is true, show the statistics table. Otherwise, show the form.
  return (
    <div className="App">
      {showStats ? (
        // ========== STATISTICS VIEW ==========
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
            {/* Button to go back */}
            <button type="button" onClick={handleShowForm} className="stats-button" style={{ marginTop: '20px' }}>
              Back
            </button>
          </div>
        </>
      ) : (
        // ========== FORM VIEW (DEFAULT) ==========
        <>
          <header>
            <h1>Shorten Your Links</h1>
          </header>
          {/* The form is inside a <form> tag for correct semantics */}
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

          {/* Container for results and errors */}
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