import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../utils/utils';
import { EditBtn, DeleteBtn } from '../components/Buttons/Btn';
import { ItemContainer, ItemTitle, Title, Options, TextInput, DropDown, BtnCnt, GameContainer, ItemDescription, Container } from "../utils/styled";

export default function Edit() {
  const navigate = useNavigate()
  const { paramID } = useParams();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState({
    title: false,
    genre: false,
    release_year: false,
    platform: false,
    rating: false
  });

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    release_year: "",
    platform: "",
    rating: "",
  });

  // Fetch game data
  const fetchGameData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/games/${paramID}`);
      const gameData = response.data.data;
      setFormData({
        title: gameData.title || "",
        genre: gameData.genre || "",
        release_year: gameData.release_year || "",
        platform: gameData.platform || "",
        rating: gameData.rating || "",
      });
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  // Handle Return to Main Menu
  const handleBack = (e) =>{
    e.preventDefault();
    console.log("returning to main menu")
    navigate("/")
  }


  // Handle field click (toggle edit state)
  const handleItemClick = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsEditing({
      title: false,
      genre: false,
      release_year: false,
      platform: false,
    });
    try{
      await axios.patch(`${API_BASE}/games/${paramID}`,{
        ...formData
      })
      
    }catch(error){
      console.error(error.message);
      setError(error.message)
    }
  };

  const handleBlur = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <Container>
      <Title>GAME EDITOR</Title>
      <ItemTitle>CLICK ON AN ITEM TO EDIT</ItemTitle>
      <GameContainer>

        <ItemContainer>
          <ItemTitle>Title:</ItemTitle>
          {isEditing.title ? (
            <TextInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              onBlur={() => handleBlur('title')}
              autoFocus
            />
          ) : (
            <ItemDescription onClick={() => handleItemClick('title')}>
              {formData.title || "Click to edit"}
            </ItemDescription>
          )}
        </ItemContainer>


        <ItemContainer>
          <ItemTitle>Genre:</ItemTitle>
          {isEditing.genre ? (
            <DropDown
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              onBlur={() => handleBlur('genre')}
              autoFocus
            >
              <Options value="">Select a Genre</Options>
              <Options value="Maze">Maze</Options>
              <Options value="Platformer">Platformer</Options>
              <Options value="Shooter">Shooter</Options>
              <Options value="Fighting">Fighting</Options>
              <Options value="Action">Action</Options>
              <Options value="Puzzle">Puzzle</Options>
              <Options value="Interactive Movie">Interactive Movie</Options>
              <Options value="Beat 'em up">Beat 'em up</Options>
              <Options value="Action RPG">Action RPG</Options>
              <Options value="Run-and-gun">Run-and-gun</Options>
              <Options value="Sports">Sports</Options>
              <Options value="Racing">Racing</Options>
              <Options value="Rhythm">Rhythm</Options>

            </DropDown>
          ) : (
            <ItemDescription onClick={() => handleItemClick('genre')}>
              {formData.genre || "Click to edit"}
            </ItemDescription>
          )}
        </ItemContainer>


        <ItemContainer>
          {/* RELEASE YEAR FIELD */}
          <ItemTitle>Release Year:</ItemTitle>
          {isEditing.release_year ? (
            <TextInput
              type="number"
              name="release_year"
              value={formData.release_year}
              onChange={handleInputChange}
              onBlur={() => handleBlur('release_year')}
              autoFocus
            />
          ) : (
            <ItemDescription onClick={() => handleItemClick('release_year')}>
              {formData.release_year || release_year}
            </ItemDescription>
          )}
        </ItemContainer>

        <ItemContainer>
          {/* PLATFORM FIELD */}
          <ItemTitle>Platform:</ItemTitle>
          {isEditing.platform ? (
            <DropDown
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              onBlur={() => handleBlur('platform')}
              autoFocus
            >
              <Options value="">Select a Platform</Options>
              <Options value="Arcade">Arcade</Options>
              <Options value="Atari 2600">Atari 2600</Options>
              <Options value="Neo Geo">Neo Geo</Options>
              <Options value="Sega Genesis">Sega Genesis</Options>
            </DropDown>
          ) : (
            <ItemDescription onClick={() => handleItemClick('platform')}>
              {formData.platform || platform}
            </ItemDescription>
          )}
        </ItemContainer>

        <ItemContainer>
          {/* RATING FIELD */}
          <ItemTitle>Rating:</ItemTitle>
          {isEditing.rating ? (
            <TextInput
              type="number"
              min="0"
              max="9"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              onBlur={() => handleBlur('rating')}
              autoFocus
            />
          ) : (
            <ItemDescription onClick={() => handleItemClick('rating')}>
              {formData.rating || rating}
            </ItemDescription>
          )}
        </ItemContainer>

      </GameContainer>
      <BtnCnt>
        <DeleteBtn onClick={handleBack}>BACK</DeleteBtn>
        <EditBtn onClick={handleSubmit}>SUBMIT</EditBtn>
      </BtnCnt>
      <ItemDescription>{error}</ItemDescription>
    </Container>
  )
}




