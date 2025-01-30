import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  RadioGroup,
  Radio,
  Text,
  Progress,
  Stack,
  Card,
} from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import quiz from "../../assets/quiz.jpg";

const questions = [
  {
    id: 1,
    question: "How often do you feel stressed in your daily life?",
    options: [
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },
  {
    id: 2,
    question: "How well do you sleep at night?",
    options: [
      { text: "Very well", score: 1 },
      { text: "Fairly well", score: 2 },
      { text: "Poorly", score: 3 },
      { text: "Very poorly", score: 4 },
    ],
  },
  {
    id: 3,
    question: "How often do you feel overwhelmed by your tasks?",
    options: [
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },
  {
    id: 4,
    question: "How often do you take breaks during work or study?",
    options: [
      { text: "Frequently", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Rarely", score: 3 },
      { text: "Never", score: 4 },
    ],
  },
  {
    id: 5,
    question: "How would you describe your eating habits?",
    options: [
      { text: "Healthy", score: 1 },
      { text: "Moderate", score: 2 },
      { text: "Unhealthy", score: 3 },
      { text: "Very unhealthy", score: 4 },
    ],
  },
  {
    id: 6,
    question: "How much time do you spend on physical activities weekly?",
    options: [
      { text: "More than 5 hours", score: 1 },
      { text: "2-5 hours", score: 2 },
      { text: "Less than 2 hours", score: 3 },
      { text: "None", score: 4 },
    ],
  },
  {
    id: 7,
    question: "How often do you feel supported by friends or family?",
    options: [
      { text: "Always", score: 1 },
      { text: "Often", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Never", score: 4 },
    ],
  },
];

const calculateMood = (score) => {
  if (score <= 10) return { mood: "Relaxed", color: "#4caf50" }; // Green
  if (score <= 20) return { mood: "Moderately Stressed", color: "#ffeb3b" }; // Yellow
  if (score <= 28) return { mood: "Highly Stressed", color: "#ff9800" }; // Orange
  return { mood: "Severely Stressed", color: "#f44336" }; // Red
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) return;

    setScore((prevScore) => prevScore + selectedOption);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const result = calculateMood(score);

  return (
    <div>
      <Section>
        <LeftSection>
          <Card
            h="600px"
            w="700px"
            alignItems="center"
            // justifyContent="center"
            // display="flex"
            // maxW="700px"
            // mx="auto"
            // mt="10"
            p="10"
            pt="100px"

            // borderRadius="lg"
          >
            {!isFinished ? (
              <VStack spacing={5}>
                <Progress
                  value={((currentQuestion + 1) / questions.length) * 100}
                  size="sm"
                  width="400px"
                  color="#a693ec"
                />
                <Text fontSize="2xl" fontWeight="bold">
                  Question {currentQuestion + 1} of {questions.length}
                </Text>
                <Text fontSize="xl" textAlign="center">
                  {questions[currentQuestion].question}
                </Text>

                <RadioGroup
                  onChange={(value) => setSelectedOption(Number(value))}
                  value={selectedOption !== null ? String(selectedOption) : ""}
                >
                  <Stack spacing={6} direction="column" alignItems="start">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Radio
                        color="#a693ec"
                        key={index}
                        value={String(option.score)}
                      >
                        {option.text}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>

                <Button
                bgColor="#a693ec"
                  color="rgb(0, 0, 0)"
                  onClick={handleNext}
                  isDisabled={selectedOption === null}
                >
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </Button>
              </VStack>
            ) : (
              <VStack spacing={5}>
                <Text fontSize="2xl" fontWeight="bold">
                  Quiz Complete!
                </Text>
                <Box width="150px" height="150px">
                  <CircularProgressbar
                    value={(score / (questions.length * 4)) * 100}
                    text={`${score}`}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor: result.color,
                      textColor: result.color,
                      trailColor: "#d6d6d6",
                    })}
                  />
                </Box>
                <Text fontSize="lg" textAlign="center">
                  Your stress level is: <strong>{result.mood}</strong>
                </Text>
                <Text fontSize="sm" textAlign="center" color="gray.600">
                  Total Score: {score}
                </Text>
                <Button
                  color="#a693ec"
                  onClick={() => window.location.reload()}
                >
                  Retake Quiz
                </Button>
              </VStack>
            )}
          </Card>
        </LeftSection>

        <RightSection>
          <Img src={quiz} alt="img" />
        </RightSection>
      </Section>
    </div>
  );
};

export default QuizPage;
const Img = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
`;

const Section = styled.div`
  display: flex;
  height: 100vh;
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
  flex-direction: column;
`;
