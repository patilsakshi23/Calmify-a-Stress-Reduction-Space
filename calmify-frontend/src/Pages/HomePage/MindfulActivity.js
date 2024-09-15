import React from 'react';
import styled from 'styled-components';

const YouTubeCard = ({ videoUrl, thumbnail }) => {
  const handleClick = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <Card onClick={handleClick}>
      <Thumbnail src={thumbnail} alt="YouTube Thumbnail" />
    </Card>
  );
};

const MindfulActivity = () => {
  return (
    <Section>
      <LeftSection>
        <YouTubeCard 
          videoUrl="https://youtu.be/JVwLjC5etEQ?si=0IXte-TOzJkfNLdL"
          thumbnail="https://img.youtube.com/vi/JVwLjC5etEQ/0.jpg" 
        />
      </LeftSection>
      <RightSection>
        <Content>
          Mindfulness exercises help you stay grounded and focused. They reduce stress, improve mental clarity, and enhance emotional regulation. Incorporating these exercises into your daily routine can lead to a healthier, more balanced life.
        </Content>
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
