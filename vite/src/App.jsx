import './App.css';

import {
  useEffect,
  useState,
} from 'react';

import styled from "styled-components"

function App() {
  // State hooks
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Set environment variables
  const API_BASE = import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/v1" // Local development API
    : import.meta.env.VITE_REACT_APP_BASE_URL; // Heroku or production URL

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
  }, []);

  return (
    <>
    <Title>Hello World</Title>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {games.map((game, index) => (
            <div key={index}>
              <li>{game.title}</li>
              <li>{game.genre}</li>
              <li>{game.release_year}</li>
              <li>{game.platform}</li>
              <li>{game.rating}</li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

const Title = styled.h1`
`