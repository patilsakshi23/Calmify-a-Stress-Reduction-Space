import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FlipCard from "./FlipCard.js";
import {useDisclosure} from "@chakra-ui/react";
import FlipCardImage from "../../../../assets/Flipcardgame.jpg";
import CalmifyLogo from "../../../../assets/logocalmify.png";
import GameImage from "../../../../assets/games.jpg";


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
  margin-bottom: 50px;
  text-align:center;
  font-weight: 700;
`;

const StyledText = styled.p`
  font-size: 1em;
  color: #555;
  text-align:center;
  
`;


const GamePage = () => {
  
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogoClick = () => {
    navigate("/"); 
  };


const handleCardOpen = () => {
    setSelectedCard({});
    onOpen();
  };

  
  return (
    <div>
    <StyledNav>
        <Logo onClick={handleLogoClick} >
            <LogoImg src={CalmifyLogo} alt="Calmify" />
        </Logo>
    </StyledNav>

    <StyledStack>
            <StyledCard onClick={handleCardOpen}>
                <StyledImage src={FlipCardImage} alt="Game 1" />
                <CardContent>
                    <StyledHeading>Flip Card Memory Game</StyledHeading>
                    
                </CardContent>
            </StyledCard>
       
            <StyledCard >
                <StyledImage src={GameImage} alt="Audio" />
                <CardContent>
                    <StyledHeading>Game 2</StyledHeading>
                    <StyledText>A therapeutic escape that calms the mind and uplifts the soul.</StyledText>
                </CardContent>
            </StyledCard>

          </StyledStack>
          <FlipCard isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default GamePage;

