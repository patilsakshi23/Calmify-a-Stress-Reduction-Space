import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Step,
  StepIndicator,
  StepStatus,
  Stepper,
  StepIcon,
  StepNumber,
  StepSeparator,
} from '@chakra-ui/react';
import styled from "styled-components";

const YOUTUBE_API_KEY = 'AIzaSyDJmuL33cv6GiuksMNlVb6hXPp6XHItgCA';  // Replace with your YouTube API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const QuizPage = () => {
  const questions = [
    "Do you feel happy today?",
    "Are you feeling stressed about anything?",
    "Do you often find yourself laughing?",
    "Are you feeling sad lately?",
    "Do you get excited about things easily?",
    "Do you often feel overwhelmed?",
    "Are you enjoying your current activities?",
  ];

  const steps = questions.map((question, index) => ({
    title: `Question ${index + 1}`,
    description: question,
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [detectedEmotion, setDetectedEmotion] = useState('');
  const [videos, setVideos] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // New state to track quiz completion

  const handleResponse = (response) => {
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestionIndex] = response;
      return updatedResponses;
    });

    if (currentQuestionIndex === questions.length - 1) {
      analyzeEmotions();
      setQuizCompleted(true); // Mark quiz as completed after last question
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const analyzeEmotions = () => {
    const emotionCounts = {
      happy: 0,
      sad: 0,
      angry: 0,
      stressed: 0,
      excited: 0,
    };

    responses.forEach((response, index) => {
      if (response === 'yes') {
        if (index === 0) emotionCounts.happy += 1;
        if (index === 2) emotionCounts.happy += 1;
        if (index === 4) emotionCounts.excited += 1;
        if (index === 6) emotionCounts.happy += 1;
      } else {
        if (index === 1) emotionCounts.stressed += 1;
        if (index === 3) emotionCounts.sad += 1;
        if (index === 5) emotionCounts.stressed += 1;
        if (index === 6) emotionCounts.sad += 1;
      }
    });

    const detectedEmotion = Object.keys(emotionCounts).reduce((a, b) =>
      emotionCounts[a] > emotionCounts[b] ? a : b
    );

    const formattedEmotion = detectedEmotion.charAt(0).toUpperCase() + detectedEmotion.slice(1);
    setDetectedEmotion(formattedEmotion);

    // Skip fetching YouTube videos for "excited" or "happy"
    if (detectedEmotion !== 'excited' && detectedEmotion !== 'happy') {
      fetchYouTubeVideos(detectedEmotion);
    } else {
      setVideos([]);  // Clear any existing videos when "excited" or "happy" is detected
    }
  };

  const fetchYouTubeVideos = async (emotion) => {
    try {
      const query = `${emotion}+relief`;
      const response = await fetch(
        `${YOUTUBE_API_URL}?part=snippet&type=video&maxResults=3&q=${query}&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Stepper index={currentQuestionIndex} colorScheme="teal" size="lg">
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setCurrentQuestionIndex(index)}>
              <StepIndicator>
                <StepStatus
                  complete={responses[index] !== undefined ? <StepIcon /> : null}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <Text>{step.title}</Text>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box textAlign="center" mt={5}>
          {quizCompleted ? (  // Check if quiz is completed
            <>
              <Text fontSize="lg" mt={4}>All questions answered. Analyzing your emotion...</Text>
            </>
          ) : (
            <>
              <Text fontSize="lg" mt={4}>
                {steps[currentQuestionIndex].description}
              </Text>
              <Button
                onClick={() => handleResponse('yes')}
                colorScheme="teal"
                isFullWidth
                m={2}
              >
                Yes
              </Button>
              <Button
                onClick={() => handleResponse('no')}
                colorScheme="teal"
                isFullWidth
                m={2}
              >
                No
              </Button>
            </>
          )}
        </Box>

        {detectedEmotion && (
          <Text fontSize="xl" mt={4} color="blue.500">
            Detected Emotion: {detectedEmotion}
          </Text>
        )}

        {videos.length > 0 && (
          <VideoSection>
            <Text fontSize="xl" mt={4}>Suggested Videos for {detectedEmotion}:</Text>
            <VideoGrid>
              {videos.map((video) => (
                <VideoCard key={video.id.videoId}>
                  <Thumbnail
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                  <VideoTitle>{video.snippet.title}</VideoTitle>
                  <VideoLink
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </VideoLink>
                </VideoCard>
              ))}
            </VideoGrid>
          </VideoSection>
        )}
      </VStack>
    </Box>
  );
};

export default QuizPage;

const VideoSection = styled.div`
  margin-top: 20px;
  width: 80%;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const VideoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const VideoTitle = styled.h4`
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
  color: #333;
`;

const VideoLink = styled.a`
  text-decoration: none;
  color: #4b9cdf;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
