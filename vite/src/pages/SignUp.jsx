
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteBtn, EditBtn } from "../components/Buttons/Btn";
import { validateSignUp } from "../utils/validateSignup";
import AuthService from "../services/auth.service";

const SignUp = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const handleNavigateToSignIn = (e) =>{
        e.preventDefault()
        navigate('/signin')
    }

    const toggleShowPass = (e) => {
        e.preventDefault();
        setShowPass((prevState) => !prevState);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
        // Validate Sign Up form
        const { valid, message } = await AuthService.validateSignUp(user, email, password, confirmPassword);
        if (!valid) {
            setError(message);
            return;
        }
        // Attempt to create user
        const createdUser = await AuthService.createUser(user, email, password)
        if (createdUser.valid) {
            navigate('/home')
            console.log(createdUser.message)
        } else (setError(createdUser.message))

    }catch(error){
        setError(error);
    }
    };

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
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
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
                <InputContainer>
                    <Label>Confirm Password:</Label>
                    <TextInput
                        type={showPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError('');
                        }}
                    />
                    <ShowPassBTN onClick={toggleShowPass}>{showPass ? "Hide Password" : "Show Password"}</ShowPassBTN>
                </InputContainer>

                <BtnCnt>
                {error && <ErrorLabel>{error}</ErrorLabel>}
                
                <EditBtn type="submit">SIGN UP</EditBtn>
                <DeleteBtn onClick={handleNavigateToSignIn}>SIGN IN</DeleteBtn>
                </BtnCnt>
            </FormContainer>
        </Container>
    );
};

export default SignUp;

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
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 2rem;
`;

const TextInput = styled.input`
    width: 20rem;
    height: 2rem;
    background-color: #00000000;
    border:2px solid #00000050;
    border-radius:10px;
    box-shadow: 2px 2px 10px #00000050;
    text-align: center;
    color:#2f2f2f;
    text-transform: uppercase;
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
const BtnCnt = styled.div`
    width:100%;
    display:flex;
    justify-content: space-around;

`
const ShowPassBTN = styled(DeleteBtn)`
    width:fit-content;
    font-size: .5rem;
`