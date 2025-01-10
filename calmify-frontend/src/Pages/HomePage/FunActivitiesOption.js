import React, { useState } from "react";
import styled from "styled-components";
import { Heading } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import CalmifyLogo from "../../assets/logocalmify.png";
import GameImage from "../../assets/games.jpg";
import MusicImage from "../../assets/music.jpg";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:rgb(239, 241, 244);
  padding: 15px 20px;
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 20px;
  cursor: pointer;
`;

const StyledStack = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
`;

const StyledCard = styled.div`
  width: 350px;
  height: 450px; /* Increase height to accommodate stars */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    transform: translateY(-10px);
  }
`;

const StyledImage = styled.img`
  width: 300px;
  height: 300px;
  margin-left: 25px;
  margin-top: 20px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const StyledHeading = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align:center;
  font-weight: 600;
`;

const StyledText = styled.p`
  font-size: 1em;
  color: #555;
  text-align:center;
  
`;

function FunActivitiesOption() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/"); 
  };
  const handleGamesClick = () => {
    navigate("/games");
  };
  const handleMusicClick = () => {
    navigate("/music");
  };

  return (
    <div>
      <StyledNav>
        <Logo onClick={handleLogoClick} >
            <LogoImg src={CalmifyLogo} alt="Calmify" />
        </Logo>
      </StyledNav>
      <Heading justify="center" m={15} marginLeft={700}>Fun Activities</Heading>
      <StyledStack>
        <StyledCard onClick={handleGamesClick}>
            <StyledImage src={GameImage} alt="Audio" />
            <CardContent>
                <StyledHeading>Games</StyledHeading>
                <StyledText>A playful way to boost creativity and relieve stress.</StyledText>
            </CardContent>
        </StyledCard>
        <StyledCard onClick={handleMusicClick}>
            <StyledImage src={MusicImage} alt="Audio" />
            <CardContent>
                <StyledHeading>Music</StyledHeading>
                <StyledText>A therapeutic escape that calms the mind and uplifts the soul.</StyledText>
            </CardContent>
        </StyledCard>
      </StyledStack>
    </div>
  );
}

export default FunActivitiesOption;
