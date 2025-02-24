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
import saveStressData from "../../FirebaseUtils"; 

const youtubeVideos = [
  {
    id: 1,
    title: "3-Minute Stress Management: Reduce Stress With This Short Activity",
    url: "https://youtu.be/grfXR6FAsI8?si=Npm8XkqaYLTKe0Tz",
    thumbnail: "https://img.youtube.com/vi/grfXR6FAsI8/0.jpg",
  },
  {
    id: 2,
    title: "How to protect your brain from stress | Niki Korteweg | TEDxAmsterdamWomen",
    url: "https://youtu.be/Nz9eAaXRzGg?si=B8RAdhiWiRo9CeAL",
    thumbnail: "https://img.youtube.com/vi/Nz9eAaXRzGg/0.jpg",
  },
  {
    id: 3,
    title: "How stress is killing us (and how you can stop it). | Thijs Launspach | TEDxUniversiteitVanAmsterdam",
    url: "https://youtu.be/NyyPZJrDfkM?si=U0eZ_3Yl13hRd8fa",
    thumbnail: "https://img.youtube.com/vi/NyyPZJrDfkM/0.jpg",
  },
  {
    id: 4,
    title: "Stress relief tips",
    url: "https://youtu.be/Q0m6MB7Dr30?si=DFjyiUFOp2imZULm",
    thumbnail: "https://img.youtube.com/vi/Q0m6MB7Dr30/0.jpg",
  },
  {
    id: 5,
    title: "Hack for Headaches & Stress",
    url: "https://youtube.com/shorts/_IfbUjoFdkk?si=Lb0-3tPn2vyCSwsn",
    thumbnail: "https://img.youtube.com/vi/_IfbUjoFdkk/0.jpg",
  },
  {
    id: 6,
    title: "Instant Anxiety Relief Point on Your Body | Dr. Meghana Dikshit",
    url: "https://youtube.com/shorts/QPyNeGHlMao?si=y_IPkrmy9lKGARRi",
    thumbnail: "https://img.youtube.com/vi/QPyNeGHlMao/0.jpg",
  },
  {
    id: 7,
    title: "The Science of Stress & How to Reduce It 5 Minute Stress Relief",
    url: "https://youtube.com/shorts/f8BqU9wUbP0?si=PsZU0MSumvWHCGok",
    thumbnail: "https://img.youtube.com/vi/f8BqU9wUbP0/0.jpg",
  },
  {
    id: 8,
    title: "Reduce stress and anxiety with these mind-quieting tips | How to stop overthinking | Anxiety relief",
    url: "https://youtu.be/bsaOBWUqdCU?si=SaOP1WGjJLkZPdHP",
    thumbnail: "https://img.youtube.com/vi/bsaOBWUqdCU/0.jpg",
  },
  {
    id: 9,
    title: "10 Minute Guided Imagery for Reducing Stress and Anxiety",
    url: "https://youtu.be/AbckuluEdM0?si=hc6dgs42rwCxgrpM",
    thumbnail: "https://img.youtube.com/vi/AbckuluEdM0/0.jpg",
  },
  {
    id: 10,
    title: "10 Minute Guided Imagery Meditation | City of Hope",
    url: "https://youtu.be/t1rRo6cgM_E?si=5GRImKLS5JB--3VA",
    thumbnail: "https://img.youtube.com/vi/t1rRo6cgM_E/0.jpg",
  },
];

// Shuffle function to randomize the order of videos
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

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
  const [videos, setVideos] = useState([]);

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
  
      // Save quiz response to Firebase
      await push(userRef, newResponse);
  
      // Update stress count
      const snapshot = await get(stressRef);
      const currentCount = snapshot.exists() ? snapshot.val().count : 0;
      await update(stressRef, { count: currentCount + 1 });
  
      // Check if stress is at a level that requires video suggestions
      if (["Moderately Stressed", "Highly Stressed", "Severely Stressed"].includes(result.mood)) {
        const shuffledVideos = shuffleArray(youtubeVideos).slice(0, 3);
        setVideos(shuffledVideos);
  
        // Extract video details for saving
        const videoSuggestions = shuffledVideos.map(video => ({
          title: video.title,
          url: video.url,
        }));
  
        // Save stress data along with video suggestions
        await saveStressData(videoSuggestions);
      }
    };
  
    updateStressData();
  // }, [isFinished, score, user]);  // Dependencies to trigger the effect
  });

//   useEffect(() => {
//     const updateStressData = async () => {
//       if (!isFinished || !user) return;

//       const userRef = ref(db, `users/${user.uid}/input/quiz`);
//       const stressRef = ref(db, `users/${user.uid}/input/stress_count`);

//       const newResponse = {
//         ...responses,
//         prediction: result.mood,
//         score,
//         timestamp: new Date().toLocaleString(),
//       };

//       await push(userRef, newResponse);

//       const snapshot = await get(stressRef);
//       const currentCount = snapshot.exists() ? snapshot.val().count : 0;

//       await update(stressRef, { count: currentCount + 1 });
//     };

//     updateStressData();
//   });

//   useEffect(() => {
//   //   if (isFinished) {
//   //     const result = calculateMood(score);
//   //     // setVideos(videoSuggestions[result.mood] || []);
//   //   }


//   const fetchData = async () => {
//     const shuffledVideos = shuffleArray(youtubeVideos).slice(0, 3);
//     setVideos(shuffledVideos);

//     // Extract necessary video details to store in Firebase
//     const videoSuggestions = shuffledVideos.map(video => ({
//       title: video.title,
//       url: video.url,
//     }));

//     // Save stress data along with video suggestions
//     await saveStressData(videoSuggestions);
//   };
// // }, [isFinished, score, videoSuggestions]);
//   }, [isFinished, score]);

  return (
    <div>
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
           
            </VStack>
          )}
        </Card>
      </LeftSection>
      <RightSection>
          <Img src={quiz} alt="Quiz illustration" />
        </RightSection>
      </Section>
      {videos.length > 0 && (
          <VideoSection>
            <VideoGrid>
              {videos.map((video) => (
                <VideoCard key={video.id}>
                  <Thumbnail
                    src={video.thumbnail}
                    alt={video.title}
                  />
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoLink
                    href={video.url}
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
      
    </div>
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
`;
