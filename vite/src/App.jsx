import './App.css';

import {
  useEffect,
  useState,
} from 'react';

function App() {
  // State hooks
  const [games, setGames] = useState([]); // Initialize games as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// Set environment variables
  const API_BASE = process.env.NODE_ENV === "development"
    ? `http://localhost:3000`
    : process.env.REACT_APP_BASE_URL;

// Function to get the games
  const getGames = async () => {
    try {
      const response = await fetch(`${API_BASE}/games`);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      const games = result.data;
      setGames(games);
      console.log(games);
    } catch (error) {
      console.error(error);
      setError(error.message || `Consult error >>> ${error}`);
    } finally {
      setLoading(false);
    }
  };

// useEffect to fetch games on component mount
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getGames();
    }
    return () => {
      ignore = true;
    };
  },[]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {games.map((game, index) => (
            <li key={index}>{game.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
