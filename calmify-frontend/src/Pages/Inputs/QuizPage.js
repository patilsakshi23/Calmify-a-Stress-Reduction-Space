// src/Pages/QuizPage.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  Stepper,
  StepIcon,
  StepNumber,
} from '@chakra-ui/react';

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

  const handleResponse = (response) => {
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestionIndex] = response;
      return updatedResponses;
    });

    // Move to the next question only if all previous questions are answered
    if (responses.length === questions.length - 1) {
      analyzeEmotions();
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
        if (index === 0) emotionCounts.happy += 1; // Question 0
        if (index === 2) emotionCounts.happy += 1; // Question 2
        if (index === 4) emotionCounts.excited += 1; // Question 4
        if (index === 6) emotionCounts.happy += 1; // Question 6
      } else {
        if (index === 1) emotionCounts.stressed += 1; // Question 1
        if (index === 3) emotionCounts.sad += 1; // Question 3
        if (index === 5) emotionCounts.stressed += 1; // Question 5
        if (index === 6) emotionCounts.sad += 1; // Question 6
      }
    });

    const detectedEmotion = Object.keys(emotionCounts).reduce((a, b) =>
      emotionCounts[a] > emotionCounts[b] ? a : b
    );

    setDetectedEmotion(detectedEmotion.charAt(0).toUpperCase() + detectedEmotion.slice(1));
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
                <StepTitle>{step.title}</StepTitle>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box textAlign="center" mt={5}>
          {currentQuestionIndex < questions.length ? (
            <>
              <Text fontSize="lg" mt={4}>
                {steps[currentQuestionIndex].description}
              </Text>
              <Button
                onClick={() => handleResponse('yes')}
                colorScheme="teal"
                isDisabled={responses[currentQuestionIndex] === 'no'}
                bg={responses[currentQuestionIndex] === 'yes' ? 'teal.600' : 'teal.400'}
                color="white"
                isFullWidth
                m={2}
              >
                Yes
              </Button>
              <Button
                onClick={() => handleResponse('no')}
                colorScheme="teal"
                isDisabled={responses[currentQuestionIndex] === 'yes'}
                bg={responses[currentQuestionIndex] === 'no' ? 'teal.600' : 'teal.400'}
                color="white"
                isFullWidth
                m={2}
              >
                No
              </Button>
            </>
          ) : (
            <Text fontSize="lg" mt={4}>Answer all the questions asked to detect you emotion!</Text>
          )}
        </Box>

        {detectedEmotion && (
          <Text fontSize="xl" mt={4} color="blue.500">
            Detected Emotion: {detectedEmotion}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default QuizPage;
