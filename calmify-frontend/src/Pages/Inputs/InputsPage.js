import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import TextImage from "../../assets/textoption.jpeg";
import AudioImage from "../../assets/audiooption.jpeg";
import VideoImage from "../../assets/videooption.jpeg";
import QuizeImage from "../../assets/quizeoption.jpeg";

import Mindful from "./Activities/Mindful.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const StyledCard = styled.div`
  width: 360px;
  height: 510px; /* Increase height to accommodate stars */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
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
`;

const StyledText = styled.p`
  font-size: 1em;
  color: #555;
`;

const StyledStack = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Star = styled.span`
  font-size: 24px;
  color: ${({ filled }) => (filled ? "#FFD700" : "#dcdcdc")};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ffcc00;
  }
`;

function InputsPage({ user }) {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({ video: 0, audio: 0, text: 0, quiz: 0 });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  const handleRating = (category, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [category]: rating }));
  };

  const handleVideoClick = () => {
    navigate("/video");
  };

  const handleAudioClick = () => {
    navigate("/audio");
  };

  const handleTextClick = () => {
    navigate("/text");
  };

  const handleQuizClick = () => {
    navigate("/quiz");
  };

  const renderStars = (category) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        filled={index < ratings[category]}
        onClick={() => handleRating(category, index + 1)}
      >
        ★
      </Star>
    ));
  };

  return (
    <div>
      <StyledNav>
        <div>Calmify</div>
        <Button onClick={handleLogout}>Logout</Button>
      </StyledNav>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <StyledStack>
          <StyledCard onClick={handleVideoClick}>
            <StyledImage src={VideoImage} alt="Video" />
            <CardContent>
              <StyledHeading>Video</StyledHeading>
              <StyledText>Convey your feelings or thoughts by uploading or recording a video.</StyledText>
              <StarRating>{renderStars("video")}</StarRating>
            </CardContent>
          </StyledCard>
          <StyledCard onClick={handleAudioClick}>
            <StyledImage src={AudioImage} alt="Audio" />
            <CardContent>
              <StyledHeading>Audio</StyledHeading>
              <StyledText>Convey your feelings or thoughts by uploading or recording audio.</StyledText>
             
            </CardContent>
          </StyledCard>
          <StyledCard onClick={handleTextClick}>
            <StyledImage src={TextImage} alt="Text" />
            <CardContent>
              <StyledHeading>Text</StyledHeading>
              <StyledText>Convey your feelings or thoughts by uploading or recording text.</StyledText>
              <StarRating>{renderStars("text")}</StarRating>
            </CardContent>
          </StyledCard>
          <StyledCard onClick={handleQuizClick}>
            <StyledImage src={QuizeImage} alt="Quiz" />
            <CardContent>
              <StyledHeading>Quiz</StyledHeading>
              <StyledText>Convey your feelings or thoughts by taking a quiz.</StyledText>
              <StarRating>{renderStars("quiz")}</StarRating>
            </CardContent>
          </StyledCard>
        </StyledStack>
      </div>
      <div style={{ textAlign: "center", marginTop: "1000px" }}>
      <Mindful/></div>
    </div>
  );
}

export default InputsPage;
