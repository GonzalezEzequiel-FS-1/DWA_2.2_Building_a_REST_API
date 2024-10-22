import styled from "styled-components";
import GamesCluster from '../components/GamesCluster';

export default function Home() {
  return (
    <Container>
      <Title>GameVault</Title>
      <GamesCluster />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-family: "Creation", Arial, Helvetica, sans-serif;
  font-size: 3rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
`;
