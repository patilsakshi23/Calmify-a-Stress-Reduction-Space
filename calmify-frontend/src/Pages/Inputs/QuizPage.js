import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  RadioGroup,
  Radio,
  Text,
  Stack,
  Card,
} from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import quiz from "../../assets/quiz.jpg";
import { db } from "../../firebaseConfig";
import { ref, push, update, get } from "firebase/database";
import { useAuth } from "../Authentication/AuthContext";


// const videoSuggestions = {
//   "Severely Stressed": [
//     "https://youtu.be/RKECKQWVlO4?si=n7uYJETMtjcQmxz7",
//     "https://youtu.be/4Tm6Z1y3h94?si=XCZn-wPAlAPKbODP",
//     "https://youtu.be/o18I23HCQtE?si=Oxog_coeMFyTVrHo",
//   ],
//   "Highly Stressed": [
//     "https://youtu.be/nX4dpGQ5wF4?si=sQSzu5fOvPOzKZWk",
//     "https://youtu.be/4YVOD6XId04?si=4DvOC-DrwA0kaa9n",
//     "https://youtu.be/grfXR6FAsI8?si=-WOH2YLy7DoS03vY",
//   ],
//   "Moderately Stressed": [
//     "https://youtu.be/sitAHu6uxtA?si=p7i_BTjuQkLNhgs5",
//     "https://youtu.be/7VfSCQnGfk4?si=QqAYQsXQohVP-5AC",
//     "https://youtu.be/o18I23HCQtE?si=I4i1H6H3iXLSsLvw",
//   ],
// };

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
  if (score <= 10) return { mood: "Relaxed", color: "#4caf50" };
  if (score <= 20) return { mood: "Moderately Stressed", color: "#ffeb3b" };
  if (score <= 28) return { mood: "Highly Stressed", color: "#f44336" };
  return { mood: "Severely Stressed", color: "#d32f2f" };
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const { user } = useAuth();
  // const [videos, setVideos] = useState([]);

  const handleNext = () => {
    if (selectedOption === null) return;

    const question = questions[currentQuestion];
    const selectedScore = question.options.find(
      (option) => option.text === selectedOption
    )?.score;

    setResponses((prev) => ({ ...prev, [question.question]: selectedOption }));
    setScore((prevScore) => prevScore + selectedScore);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const result = calculateMood(score);

  useEffect(() => {
    const updateStressData = async () => {
      if (!isFinished || !user) return;

      const userRef = ref(db, `users/${user.uid}/input/quiz`);
      const stressRef = ref(db, `users/${user.uid}/input/stress_count`);

      const newResponse = {
        ...responses,
        prediction: result.mood,
        score,
        timestamp: new Date().toLocaleString(),
      };

      await push(userRef, newResponse);

      const snapshot = await get(stressRef);
      const currentCount = snapshot.exists() ? snapshot.val().count : 0;

      await update(stressRef, { count: currentCount + 1 });
    };

    updateStressData();
  });

  // useEffect(() => {
  //   if (isFinished) {
  //     const result = calculateMood(score);
  //     // setVideos(videoSuggestions[result.mood] || []);
  //   }
  // }, [isFinished, score]);

  return (
    
    <Section>
      <LeftSection>
        <Card h="600px" w="700px" alignItems="center" p="10" pt="100px">
          {!isFinished ? (
            <VStack spacing={5}>
              <Text fontSize="2xl" fontWeight="bold">
                Question {currentQuestion + 1} of {questions.length}
              </Text>
              <Text fontSize="xl" textAlign="center">
                {questions[currentQuestion].question}
              </Text>
              <RadioGroup
                onChange={setSelectedOption}
                value={selectedOption || ""}
              >
                <Stack spacing={6} direction="column" alignItems="start">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Radio key={index} value={option.text}>
                      {option.text}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <Button onClick={handleNext} isDisabled={selectedOption === null}>
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
                    pathColor: calculateMood(score).color,
                    textColor: calculateMood(score).color,
                    trailColor: "#d6d6d6",
                  })}
                />
              </Box>
              <Text fontSize="lg" textAlign="center">
                Your stress level is: <strong>{calculateMood(score).mood}</strong>
              </Text>
              <Text fontSize="sm" textAlign="center" color="gray.600">
                Total Score: {score}/28
              </Text>
              <Button onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
              {/* {videos.length > 0 && (
                <Box>
                  <Text fontSize="lg" fontWeight="bold">Recommended Videos:</Text>
                  {videos.map((video, index) => (
                    <Text key={index}>
                      <a href={video} target="_blank" rel="noopener noreferrer">
                        {video}
                      </a>
                    </Text>
                  ))}
                </Box>
              )} */}
            </VStack>
          )}
        </Card>
      </LeftSection>
      <RightSection>
          <Img src={quiz} alt="Quiz illustration" />
        </RightSection>
      </Section>
      
        // {videos.length > 0 && (
        //         <VideoSection>
        //           <Text fontSize="lg" fontWeight="bold">Recommended Videos:</Text>
        //           <VideoGrid>
        //             {videos.map((video, index) => (
        //               <VideoCard key={index}>
        //                 <Thumbnail src={`https://img.youtube.com/vi/${video.url.split("v=")[1]}/mqdefault.jpg`} alt={video.title} />
        //                 <VideoTitle>{video.title}</VideoTitle>
        //                 <VideoLink href={video.url} target="_blank" rel="noopener noreferrer">
        //                   Watch Video
        //                 </VideoLink>
        //               </VideoCard>
        //             ))}
        //           </VideoGrid>
        //         </VideoSection>
      
    // </div>
  );
};

export default QuizPage;

const Section = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Img = styled.img
`  width: 80%;
  height: 80%;
  object-fit: cover;
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

// const VideoSection = styled.div`
//   margin-top: 20px;
//   width: 80%;
// `;

// const VideoGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
// `;

// const VideoCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: white;
//   padding: 15px;
//   border-radius: 8px;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
// `;

// const Thumbnail = styled.img`
//   width: 100%;
//   border-radius: 8px;
//   margin-bottom: 10px;
// `;

// const VideoTitle = styled.h4`
//   text-align: center;
//   margin: 10px 0;
//   font-size: 16px;
//   color: #333;
// `;

// const VideoLink = styled.a`
//   text-decoration: none;
//   color: #4b9cdf;
//   font-weight: bold;
// `;
