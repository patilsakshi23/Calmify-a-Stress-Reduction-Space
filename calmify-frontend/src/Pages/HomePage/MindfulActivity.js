import React from "react";
import styled from "styled-components";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const YouTubeCard = ({ videoUrl, thumbnail }) => {
  const handleClick = () => {
    window.open(videoUrl, "_blank");
  };

  return (
    <Card onClick={handleClick}>
      <Thumbnail src={thumbnail} alt="YouTube Thumbnail" />
    </Card>
  );
};

const MindfulActivity = () => {
  
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/mindfuloption");
  };
  
  return (
    <Section>
      <LeftSection>
        <Content>
          <Heading as="h2" size="2xl" mb={10}>
            Importance of Mindfulness
          </Heading>
          Mindfulness exercises help you stay grounded and focused. They reduce
          stress, improve mental clarity, and enhance emotional regulation.
          Incorporating these exercises into your daily routine can lead to a
          healthier, more balanced life.
          <StartButton onClick={handleStart}>
            <span>GET STARTED</span>
            <ArrowIcon
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h26M20 5l7 7-7 7"
              />
            </ArrowIcon>
          </StartButton>
        </Content>
      </LeftSection>
      <RightSection>
        <YouTubeCard
          videoUrl="https://youtu.be/JVwLjC5etEQ?si=0IXte-TOzJkfNLdL"
          thumbnail="https://img.youtube.com/vi/JVwLjC5etEQ/0.jpg"
        />
      </RightSection>
    </Section>
  );
};

export default MindfulActivity;

const Section = styled.div`
  display: flex;
  height: 100vh; /* Full view height */
  padding: 20px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
  padding-left: 20px;
`;

const Content = styled.p`
  font-size: 30px; /* Adjust the text size */
  line-height: 1.7; /* Adjust line spacing */
  max-width: 650px; /* Adjust the maximum width of text */
  text-align: justify;
`;

const Card = styled.div`
  width: 650px;
  height: 400px;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StartButton = styled.button`
  background-color: rgb(131, 172, 131);
  color: white;
  padding: 15px 25px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  margin-top: 20px;
  gap: 10px;
  width: 200px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a8cc9c;
  }
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;

  ${StartButton}:hover & {
    transform: translateX(5px);
  }
`;
