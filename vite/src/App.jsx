import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home"
import {useState, useEffect} from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import FourOhFour from "./pages/FourOhFour";
import NewGame from "./pages/NewGame";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  /*useEffect(()=>{
    const user = AuthService.getCurrentUser()
    if(user){
      setCurrentUser(user) 
    }
  },[])*/
  return (
    <Container>
      <RouteContainer>
        <Routes>
          <Route path="*" element={<FourOhFour />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit/:paramID" element={<Edit />} />
          <Route path="/new" element={<NewGame />} />
        </Routes>
      </RouteContainer>
    </Container>
  );
}

export default App;

const RouteContainer  = styled.div``

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