import styled from "styled-components";
export const Title = styled.h1`
  font-family: "Press Start 2P", sans-serif;
  font-size: 3rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const Text = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #777;
  text-align: center;
  margin-top: 1rem;
`;

export const Item = styled.li`
font-family: "Roboto", sans-serif;
font-weight: 500;
font-size: 1.2rem;
color: #333;
padding: 0.5rem 0;
margin-bottom: 1rem;
transition: background-color 0.3s ease;

&:hover {
  background-color: #eee;
}
`;

export const ItemTitle = styled.p`
font-family: "Press Start 2P", sans-serif;
font-weight: 600;
font-size: 1.1rem;
color: #333;
margin-bottom: 0.5rem;
`;

export const UnorganizedList = styled.ul`
  text-decoration: none;
  list-style: none;
  background-color: #f5f5f5;
  padding: 2rem;
  height: 60vh;
  overflow: scroll;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const ItemContainer = styled.div`
text-align:center;
display:flex;
flex-direction:column;
`

export const Options = styled.option`
`

export const TextInput = styled.input`
`
export const DropDown = styled.select`

`
export const BtnCnt = styled.div`
display:flex;
align-items:center;
gap:2em;
`

export const GameContainer = styled.div`
background-color:red;
margin:0 auto;
width:fit-content;
display:flex;
align-items:center;
gap:2rem;
padding:2rem;
border-radius:20px;
background-color: #f5f5f5;
`

export const ItemDescription = styled.p`
font-family:"Roboto";
cursor:pointer;
`
export const Container = styled.div`
width:80%;
display:flex;
flex-direction:column;
align-items:center;
justify-contents:center;
`

