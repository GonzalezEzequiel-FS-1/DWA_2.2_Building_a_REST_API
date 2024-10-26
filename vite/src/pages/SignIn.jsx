import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteBtn, EditBtn } from "../components/Buttons/Btn";
import { signIn } from "../utils/signIn";

const SignIn = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');



    const toggleShowPass = (e) => {
        e.preventDefault();
        setShowPass((prevState) => !prevState);
    };
    const handleSignIn = async (e)=>{
        e.preventDefault();
        try{
            const response = await signIn(user, password);
            if(response){
                console.log(response.message)
                navigate('/home')
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
                <DeleteBtn onClick={toggleShowPass}>{showPass ? "Hide Password" : "Show Password"}</DeleteBtn>
                <EditBtn type="submit">SIGN UP</EditBtn>
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
`;
