import React from "react";
import styled from "styled-components";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import exercise from "../../assets/funActivities.jpg";


// const YouTubeCard = ({ videoUrl, thumbnail }) => {
//   const handleClick = () => {
//     window.open(videoUrl, "_blank");
//   };

//   return (
//     <Card onClick={handleClick}>
//       <Thumbnail src={thumbnail} alt="YouTube Thumbnail" />
//     </Card>
//   );
// };

const MusicPage = () => {
  
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/funactivitiesoption");
  };
  
  return (
    <Section>
      <LeftSection>
        <Content>
          <Heading as="h2" size="2xl" mb={10}>
            Fun Activities
          </Heading>
          Engaging in fun activities like music and games is a delightful way to reduce stress and uplift your mood. Listening to soothing tunes or playing an instrument calms the mind, while games like puzzles or board games boost focus and creativity.
          <br/>
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
        <Img src={exercise} alt="yoga img" />
      </RightSection>
    </Section>
  );
};

export default MusicPage;


const Img = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
`;

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





const StartButton = styled.button`
  background-color: rgba(134, 115, 209, 0.69);
  color: white;
  padding: 15px 25px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  margin-top: 25px;
  margin-left: 150px;
  gap: 10px;
  width: 200px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(151, 126, 249, 0.69);
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
