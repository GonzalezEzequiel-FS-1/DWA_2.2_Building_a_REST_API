import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteBtn, EditBtn } from "../components/Buttons/Btn";

import { BtnCnt } from "../utils/styled";
import AuthService from "../services/auth.service";

const SignIn = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const handleNavigateToSignUp =(e)=>{
        e.preventDefault()
        navigate("/signup")
    }


    const toggleShowPass = (e) => {
        e.preventDefault();
        setShowPass((prevState) => !prevState);
    };
    const handleSignIn = async (e)=>{
        e.preventDefault();
        try{
            const response = await AuthService.signIn(user, password);
            if(response.valid === true){
                console.log(response.message)
                navigate('/')
            }if(response.valid === false){
                setError(response.message)
            }
            
        }catch(error){
            
            setError(error.message)
        }
    }
    

    return (
        <Container>
            <Title>G4M3V4UL7</Title>
            <FormContainer onSubmit={handleSignIn}>
                <InputContainer>
                    <Label>User Name:</Label>
                    <TextInput
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Password:</Label>
                    <TextInput
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                    />
                </InputContainer>
                {error && <ErrorLabel>{error}</ErrorLabel>}
                <ShowPassBTN onClick={toggleShowPass}>{showPass ? "Hide Password" : "Show Password"}</ShowPassBTN>
                <BtnCnt>
                <EditBtn type="submit">SIGN IN</EditBtn>
                <DeleteBtn onClick={handleNavigateToSignUp}>SIGN UP</DeleteBtn>
                </BtnCnt>
            </FormContainer>
        </Container>
    );
};

export default SignIn;

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    align-items: center;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    font-size: 2rem;
`;

const TextInput = styled.input`
    width: 20rem;
    height: 2rem;
`;

const Title = styled.h1`
    font-family: "Press Start 2P", "arial";
`;

const Label = styled.label`
    font-family: "Roboto";
    font-weight: 600;
`;

const ErrorLabel = styled.label`
    color: red;
    font-weight: bold;
    text-align: center;
`;
const ShowPassBTN = styled(DeleteBtn)`
    width:fit-content;
    font-size: .5rem;
`
