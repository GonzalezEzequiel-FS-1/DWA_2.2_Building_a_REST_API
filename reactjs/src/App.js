import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Use environment variable to set the API base URL
  const API_BASE =
    process.env.REACT_APP_API_BASE || "http://localhost:3000/api/v1";

  // Function to fetch games
  const getGames = async () => {
    try {
      const response = await axios.get(`${API_BASE}/games`);
      const data = response.data;
      console.log(data); // Log the data to inspect it
      if (Array.isArray(data)) {
        setGames(data); // Set the games if response is an array
      } else {
        setGames([data]); // Handle the case when the response is a single object
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch games when the component mounts
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="App">
      <h1>Game List</h1>

      {/* Loading or Error messages */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {/* Display games if they exist */}
          {games.map((game) => (
            <li key={game._id}>
              <h2>{game.title}</h2>
              <p>Genre: {game.genre}</p>
              <p>Release Year: {game.release_year}</p>
              <p>Platform: {game.platform}</p>
              <p>Rating: {game.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
