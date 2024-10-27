import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { DeleteBtn, EditBtn } from "./Buttons/Btn";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../utils/utils";
import { Text, Item, ItemTitle, UnorganizedList} from "../utils/styled";
import AuthService from "../services/auth.service";

function GamesCluster() {
  //let { id, setID } = useState();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  let paramID = useParams();

  const handleSignOut = (e)=>{
    e.preventDefault();
    const signOffStatus = AuthService.logout();
    if(signOffStatus.valid === true){
      console.log(signOffStatus.message)
      navigate("/signin")
    }else{
      setError(signOffStatus.message)
    }
  }
  const getGames = async () => {
    try {
      const response = await axios.get(`${API_BASE}/games`);
      const games = response.data.data;
      setGames(games);
      setFilteredGames(games);
    } catch (error) {
      console.error(error);
      setError(error.message || "Error fetching games");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (game) => {
    let gameId = game._id;
    let gameTitle = game.title;
    try {
      await axios.delete(`${API_BASE}/games/${gameId}`);
      getGames();
      console.log(`Deleted ${gameTitle}`)
      
    } catch (error) {
      console.error("Failed to delete game", error);
    }
  };
  const handleEdit = (game) =>{
    paramID = game._id;
    let gameTitle = game.title;
    console.log(`${gameTitle}`)
    navigate(`edit/${paramID}`)

  } 

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const navigateToCreateNew = (e) => {
    e.preventDefault();
    navigate("/new")
  }


  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getGames();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let filtered = games.filter((game) => {
      return (
        (selectedGenre ? game.genre === selectedGenre : true) &&
        (searchTerm
          ? game.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    });
    setFilteredGames(filtered);
  }, [selectedGenre, searchTerm, games]);

  return (
    <Container>
      <Filters>
        <SearchInput
          type="text"
          placeholder="Search by game title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <GenreSelect value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
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
              <GameDivider>
                <ItemTitle>Title:</ItemTitle>
                <Item>{game.title}</Item>
              </GameDivider>
              <GameDivider>
                <ItemTitle>Genre:</ItemTitle>
                <Item>{game.genre}</Item>
              </GameDivider>
              <GameDivider>
                <ItemTitle>Release Year:</ItemTitle>
                <Item>{game.release_year}</Item>
              </GameDivider>
              <GameDivider>
                <ItemTitle>Platform:</ItemTitle>
                <Item>{game.platform}</Item>
              </GameDivider>
              <GameDivider>
                <ItemTitle>Rating:</ItemTitle>
                <Item>{game.rating}</Item>
              </GameDivider>
              <GameDivider>
                <DeleteBtn onClick={() => handleDelete(game)}>
                  Delete
                </DeleteBtn>
                <EditBtn onClick={ () => handleEdit(game)}>Edit</EditBtn>
              </GameDivider>
            </GameItem>
          ))}
        </UnorganizedList>
      )}
      <EditBtn onClick={navigateToCreateNew}>ADD GAME</EditBtn>
      <DeleteBtn onClick={handleSignOut}>SIGN OUT</DeleteBtn>
    </Container>
  );
}

export default GamesCluster;

// Specific Styled Components

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





const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  overflow: hidden;
`;



const GameDivider = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
