import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Item, ItemContainer, ItemTitle, Title, Options, TextInput, DropDown, BtnCnt, Container, GameContainer, Text } from "../utils/styled";
import { DeleteBtn, EditBtn } from "../components/Buttons/Btn";
import { API_BASE } from "../utils/utils"


export default function NewGame() {
    const formRef = useRef(null)
    const navigate = useNavigate();
    const [title, settitle] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [release_year, setRelease_year] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        platform: "",
        release_year: "",
        rating: "",
    })



    // Handle Return to Main Menu
    const handleBack = (e) => {
        e.preventDefault();
        console.log("returning to main menu")
        navigate("/")
    }

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.genre || !formData.platform || !formData.release_year || !formData.rating) {
            setError("Please complete all fields")
            return
        }
        try {
            console.log('Submitting form')
            await axios.post(`${API_BASE}/games`, {
                ...formData
            })
            navigate("/")
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }
    return (
        <Container>
            <Text>{error}</Text>
            <Title>Create New Game</Title>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <GameContainer>
                    <ItemContainer>
                        <ItemTitle>Title:</ItemTitle>
                        <TextInput
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }}
                            autoFocus
                        />
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Genre:</ItemTitle>
                        <DropDown
                            name="genre"
                            value={formData.genre}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    genre: e.target.value
                                })
                            }}
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
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Platform:</ItemTitle>
                        <DropDown
                            name="platform"
                            value={formData.platform}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    platform: e.target.value
                                })
                            }}
                        >
                            <Options value="">Select a Platform</Options>
                            <Options value="Arcade">Arcade</Options>
                            <Options value="Atari 2600">Atari 2600</Options>
                            <Options value="Neo Geo">Neo Geo</Options>
                            <Options value="Sega Genesis">Sega Genesis</Options>
                        </DropDown>
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Release Year:</ItemTitle>
                        <TextInput
                            type="text"
                            maxLength="4"
                            inputMode="numeric"
                            value={formData.release_year}
                            onChange={(e) => {
                                const checkedDate  = e.target.value
                                if(/^\d*$/.test(checkedDate) && checkedDate.length <= 4){
                                    setFormData({
                                        ...formData,
                                        release_year:checkedDate
                                    })
                                }else{
                                    setError("Release Date should only include the year.")
                                }
                            }}
                        />
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Rating:</ItemTitle>
                        <TextInput
                            type="number"
                            min="0"
                            max="9"
                            name="rating"
                            value={formData.rating}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    rating: e.target.value
                                })
                            }}
                        />
                    </ItemContainer>

                </GameContainer>
                <BtnCnt>
                    <DeleteBtn type="button" onClick={handleBack}>BACK</DeleteBtn><EditBtn type="submit">SUBMIT</EditBtn>
                </BtnCnt>
            </Form>

        </Container>
    )
}


const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:.5rem;
    `