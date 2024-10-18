import React from 'react'
import styled from 'styled-components'
export default function FourOhFour() {
  return (
    <Container>
        <SubTitle>ERROR</SubTitle>
      <Title>404</Title>
      <SubTitle>PAGE NOT FOUND</SubTitle>
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  align-items:center;
  flex-direction:column;
  line-height:.5rem;
`
const Title = styled.h1`
  text-align:center;
  font-size:5rem;  
`
const SubTitle = styled.h3`
font-size:3rem`