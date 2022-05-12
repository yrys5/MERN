import React from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";

export const Flextest = () => {
  return (
      <Container>
          <Wrapper>
          <Left>
              <Humaaansstanding src={"https://file.rendit.io/n/kjdc7DoxwXdPXPCuYTFa.svg"}/>
              <Title>Thanks for registering! 🎉</Title>
              <Text>
              Check your inbox, we sent you a confirmation email. We wish you only
          pleasant shopping!
              </Text>
          </Left>
          <Right>
              <Copyright>enetcode 2022, all rights reserved</Copyright>
          </Right>
          </Wrapper>
      </Container>
  )
}

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.2)
  ),
  url("https://file.rendit.io/n/Lr3YdyeTUlwwnl9HMPRA.png")
    center;
background-size: cover;
${mobile({background:"none"})}
`;

const Wrapper = styled.div`
display: flex;
padding: 10vh 5vw;
${mobile({padding:"10vh 0vw"})}
`;

const Left = styled.div`
display: flex;
flex-direction: column;
border-radius:10px;
flex:0.6;
align-items: center;
justify-content: center;
${mobile({width:"90vw",height:"70vh",flex:"1"})}
`;

const Right = styled.div`
display: flex;
flex-direction: column;
border-radius:10px;
flex:0.4;
align-items: flex-end;
justify-content: end;
height:80vh;
${mobile({display:"none"})}
`;

const Copyright = styled.div`
font-size: 12px;
font-weight: 300;
padding: 10px 10px;
`;

const Title = styled.h1``;

const Text = styled.p`
max-width:320px;
`;

const Humaaansstanding = styled.img`
  display:none;
  width: 195px;
  height: 288px;
  align-self: center;
  ${mobile({display:"flex"})}
`;

export default Flextest