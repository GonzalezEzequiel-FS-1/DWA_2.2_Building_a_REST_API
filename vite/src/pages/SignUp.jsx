import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteBtn, EditBtn } from "../components/Buttons/Btn";

const SignUp = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')

    const handleSignUp = async (event) => {
        event.preventDefault();
       
    };
    const toggleShowPass = () => {
        setShowPass((prevState) => !prevState);
    };
    const passwordCkecker = (e) =>{
        e.preventDefault()
        if(password.length < 5){
            console.log("short password")
            return
        }
        if(!password  || !confirmPassword){
            setError("Please enter a Password")
            console.log("Please enter a password")
            return
        }
        if(password === confirmPassword){
            setError("Passwords Match")
            console.log("passwords Match")
        }else{
            setError("Passwords does not match")
            console.log("passwords does not Match")
        }
    }
    useEffect(() => {
            
    }, []);

    return (
        <Container>
            <Title>G4M3V4UL7</Title>
            
                <FormContainer onSubmit={handleSignUp}>
                <InputContainer>
                <Label>User Name:</Label>
                    <TextInput
                        type="text"
                        value={user} 
                        onChange={(e) => setUser(e.target.value)} 
                    />
                    </InputContainer>
                    <InputContainer>
                <Label>Email:</Label>
                    <TextInput
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    </InputContainer>
                    <InputContainer>
                <Label>Password:</Label>
                    <TextInput
                        type={showPass ? "text" : "password"}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    </InputContainer>
                    <InputContainer>
                <Label>Confirm Password:</Label>
                    <TextInput
                        type={showPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    </InputContainer>
                    <title>{error}</title>
                    <DeleteBtn onClick={toggleShowPass}>{showPass ? "Hide Password" : "Show Password"}</DeleteBtn>
                    <EditBtn onClick={passwordCkecker}>SIGN UP</EditBtn>
                </FormContainer>
          
        </Container>
    );
};

export default SignUp;

const Container = styled.div`
    display:flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`;

const FormContainer = styled.form`
    
    display:flex;
    flex-direction: column;
    gap:1rem;
    padding: 2rem;
    align-items: center;
`;
const InputContainer = styled.div`
    width:100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
    gap: 0.5rem;
    font-size:2rem;
    
`
const TextInput = styled.input`
    width:20rem;
    height:2rem;
`;
const Title = styled.h1`
    font-family: "Press Start 2P", "arial";
`;
const Label = styled.label`
    font-family: "Roboto";
    font-weight: 600;
`;