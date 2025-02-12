import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextImage from "../../assets/textoption.jpeg";
import AudioImage from "../../assets/audiooption.jpeg";
import VideoImage from "../../assets/videooption.jpeg";
import QuizeImage from "../../assets/quizeoption.jpeg";
import CalmifyLogo from "../../assets/logocalmify.png";
import ActiveAlert from "../../assets/activealert.png";
import Alert1 from "../../assets/alert.png";
import Mindful from "./Activities/Mindful.js";
import ConsultDr from "./Activities/ConsultDr.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../Authentication/AuthContext.js";
import { getDatabase, ref, onValue } from "firebase/database";

function InputsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({
    video: 0,
    audio: 0,
    text: 0,
    quiz: 0,
  });

  const [stressOverloaded, setStressOverloaded] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const stressCountRef = ref(db, `users/${userId}/input/stress_count`);

    onValue(stressCountRef, (snapshot) => {
      const stressCount = snapshot.val()?.count || 0;
      if (stressCount >= 4) {
        setStressOverloaded(true);
      } else {
        setStressOverloaded(false);
      }
    });
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  const handleAlertDR = () => {
    navigate("/alertDr");
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle star ratings
  const handleRating = (category, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [category]: rating }));
  };

  // Render star rating
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
      {/* Navbar with Logo and Logout */}
      <StyledNav>
        <Logo>
          <LogoImg src={CalmifyLogo} alt="Calmify" />
        </Logo>
        <AlertContainer>
          {stressOverloaded ? (
            <MotionAlert
              onClick={handleAlertDR}
              src={ActiveAlert}
              alt="Active alert"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ) : (
            <StaticAlert onClick={handleAlertDR} src={Alert1} alt="Alert" />
          )}
        </AlertContainer>
        <Button onClick={handleLogout}>Logout</Button>
      </StyledNav>

      {/* Greeting Message */}
      <GreetingContainer>
        <Heading as="h2" size="2xl">
          Hello, {user?.firstName} {user?.lastName}
        </Heading>
        <Text fontSize="2xl" color="grey" pt="5">
          Select any option to convey your thoughts or feelings to us!!
        </Text>
      </GreetingContainer>

      {/* Options for Input */}
      <StyledStack>
        <StyledCard onClick={() => handleNavigation("/video")}>
          <StyledImage src={VideoImage} alt="Video" />
          <CardContent>
            <StyledHeading>Video</StyledHeading>
            <StyledText>
              Convey your feelings or thoughts by uploading or recording a
              video.
            </StyledText>
            <StarRating>{renderStars("video")}</StarRating>
          </CardContent>
        </StyledCard>

        <StyledCard onClick={() => handleNavigation("/audio")}>
          <StyledImage src={AudioImage} alt="Audio" />
          <CardContent>
            <StyledHeading>Audio</StyledHeading>
            <StyledText>
              Convey your feelings or thoughts by uploading or recording
              audio.
            </StyledText>
            <StarRating>{renderStars("audio")}</StarRating>
          </CardContent>
        </StyledCard>

        <StyledCard onClick={() => handleNavigation("/text")}>
          <StyledImage src={TextImage} alt="Text" />
          <CardContent>
            <StyledHeading>Text</StyledHeading>
            <StyledText>
              Convey your feelings or thoughts by writing text.
            </StyledText>
            <StarRating>{renderStars("text")}</StarRating>
          </CardContent>
        </StyledCard>

        <StyledCard onClick={() => handleNavigation("/quiz")}>
          <StyledImage src={QuizeImage} alt="Quiz" />
          <CardContent>
            <StyledHeading>Quiz</StyledHeading>
            <StyledText>
              Convey your feelings or thoughts by taking a quiz.
            </StyledText>
            <StarRating>{renderStars("quiz")}</StarRating>
          </CardContent>
        </StyledCard>
      </StyledStack>

      {/* Mindfulness Section */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Mindful />
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ConsultDr />
      </div>
    </div>
  );
}

export default InputsPage;

// Styled Components
const StyledCard = styled.div`
  width: 100%;
  max-width: 360px;
  height: 510px;
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

  @media (max-width: 768px) {
    max-width: 48%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CardContent = styled.div`
  padding: 20px;
  text-align: center;
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
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
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

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    order: 2;
  }
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

const StaticAlert = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const MotionAlert = motion(StaticAlert); // Convert Alert to a motion component

const GreetingContainer = styled.div`
  padding: 30px 20px;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;
