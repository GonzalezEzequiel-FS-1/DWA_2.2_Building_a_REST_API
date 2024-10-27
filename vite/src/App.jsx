import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import FourOhFour from "./pages/FourOhFour";
import NewGame from "./pages/NewGame";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthService from "./services/auth.service";
function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user)
    }
    const logOut = () =>{
      AuthService.logout()
    }
  }, [])
  return (
    <Container>
      <h1>Demo Logging in</h1>
      <div>
        {
          currentUser === false
          ? <h2>logged in</h2>
          : <h2>logged out</h2>
        }
      </div>
      <RouteContainer>
        <Routes>
          <Route path="*" element={<FourOhFour />} />
          <Route path="/signup" element={<SignUp />} />
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

const RouteContainer = styled.div``

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