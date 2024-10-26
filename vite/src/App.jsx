import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import FourOhFour from "./pages/FourOhFour";
import NewGame from "./pages/NewGame";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="*" element={<FourOhFour />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit/:paramID" element={<Edit />} />
          <Route path="/new" element={<NewGame />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;



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