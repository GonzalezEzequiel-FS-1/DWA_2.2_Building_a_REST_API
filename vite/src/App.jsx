import './App.css';

import {
  useEffect,
  useState,
} from 'react';

import styled from "styled-components"

function App() {
  // State hooks
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
      setFilteredGames(games); // Set filteredGames initially to display all
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

  // Filter games by genre
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Filter games by title (search)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter games based on genre and search term
  useEffect(() => {
    let filtered = games;

    if (selectedGenre) {
      filtered = filtered.filter((game) => game.genre === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredGames(filtered);
  }, [selectedGenre, searchTerm, games]);

  return (
    <Container>
      <Title>Game Vault</Title>
      
      <Filters>
        <SearchInput
          type="text"
          placeholder="Search by game title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
        <GenreSelect value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {/* Add unique genres dynamically based on your data */}
          {[...new Set(games.map((game) => game.genre))].map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </GenreSelect>
      </Filters>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <UnorganizedList>
          {filteredGames.map((game, index) => (
            <GameItem key={index}>
              <ItemTitle>Title:</ItemTitle>
              <Item>{game.title}</Item>

              <ItemTitle>Genre:</ItemTitle>
              <Item>{game.genre}</Item>

              <ItemTitle>Release Year:</ItemTitle>
              <Item>{game.release_year}</Item>

              <ItemTitle>Platform:</ItemTitle>
              <Item>{game.platform}</Item>

              <ItemTitle>Rating:</ItemTitle>
              <Item>{game.rating}</Item>
            </GameItem>
          ))}
        </UnorganizedList>
      )}
    </Container>
  );
}

export default App;

// Styled Components

const Title = styled.h1`
  font-family: "Press Start 2P", sans-serif;
  font-size: 3rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
`;

const Text = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #777;
  text-align: center;
  margin-top: 1rem;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 1.5rem auto;
`;

const SearchInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  width: 60%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #333;
  }
`;

const GenreSelect = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  width: 35%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #333;
  }
`;

const UnorganizedList = styled.ul`
  text-decoration: none;
  list-style: none;
  background-color: #f5f5f5;
  padding: 2rem;
  height: 60vh;
  overflow: scroll;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Item = styled.li`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  color: #333;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eee;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  overflow: hidden;
`;

const ItemTitle = styled.p`
  font-family: "Press Start 2P", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const GameItem = styled.div`
  padding-bottom: 2rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e0e0e0;
  padding-left: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`;
