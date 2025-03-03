import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from "./../../assets/textpagebg.avif"; // Import your image here
import saveStressData from "../../FirebaseUtils";
import { useAuth } from "../Authentication/AuthContext";
import { db } from "../../firebaseConfig";
import { ref, push, get, update } from "firebase/database";


const TextPage = () => {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [videos, setVideos] = useState([]);
  const { user } = useAuth();

  // Array of 10 YouTube videos
  const youtubeVideos = [
    {
      id: 1,
      title:
        "3-Minute Stress Management: Reduce Stress With This Short Activity",
      url: "https://youtu.be/grfXR6FAsI8?si=Npm8XkqaYLTKe0Tz",
      thumbnail: "https://img.youtube.com/vi/grfXR6FAsI8/0.jpg",
    },
    {
      id: 2,
      title:
        "How to protect your brain from stress | Niki Korteweg | TEDxAmsterdamWomen",
      url: "https://youtu.be/Nz9eAaXRzGg?si=B8RAdhiWiRo9CeAL",
      thumbnail: "https://img.youtube.com/vi/Nz9eAaXRzGg/0.jpg",
    },
    {
      id: 3,
      title:
        "How stress is killing us (and how you can stop it). | Thijs Launspach | TEDxUniversiteitVanAmsterdam",
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
      title:
        "Reduce stress and anxiety with these mind-quieting tips | How to stop overthinking | Anxiety relief",
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
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/text/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setPrediction(data.stress);
  
      // If prediction is 'stressed', display 3 random videos
      if (data.stress === 1) {
        const shuffledVideos = shuffleArray(youtubeVideos).slice(0, 3);
        setVideos(shuffledVideos);
  
        if (user) {
          const saveTextData = async () => {
            const userRef = ref(db, `users/${user.uid}/input/text`);
            const stressRef = ref(db, `users/${user.uid}/input/stress_count`);
  
            // Extract video details for saving
            const videoSuggestions = shuffledVideos.map((video) => ({
              title: video.title,
              url: video.url,
            }));
  
            const newResponse = {
              prediction: "stressed",
              timestamp: new Date().toLocaleString(),
              suggestedVideos: videoSuggestions,
            };
  
            // Save quiz response to Firebase
            await push(userRef, newResponse);
  
            // Update stress count
            const snapshot = await get(stressRef);
            const currentCount = snapshot.exists() ? snapshot.val().count : 0;
            await update(stressRef, { count: currentCount + 1 });
  
            // Save stress data along with video suggestions
            await saveStressData(videoSuggestions);
          };
  
          saveTextData();
        }
      }
    } catch (error) {
      console.error("Error while submitting text:", error);
    }
  };
  

  return (
    <Container>
      <Tagline>Let's find your calm together!</Tagline>

      <TextArea
        placeholder="How was your day....."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

      {prediction !== "" && ( // Check if prediction is not an empty string
        <PredictionFrame>
          {prediction === 1 ? (
            <PredictionText>
              It seems you're feeling stressed. No worries, we're here to help
              you relax and feel better! Here are some videos to calm your mind.
            </PredictionText>
          ) : (
            <PredictionText>
              You're doing great! Keep it up, and remember to take breaks when
              needed. Stay positive!
            </PredictionText>
          )}
        </PredictionFrame>
      )}

      {videos.length > 0 && (
        <VideoSection>
          <h3>Suggested Videos to Reduce Stress:</h3>
          <VideoGrid>
            {videos.map((video) => (
              <VideoCard key={video.id}>
                <Thumbnail src={video.thumbnail} alt={video.title} />
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
    </Container>
  );
};

export default TextPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 90%;
  max-width: 800px;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #a8cc9c;
  font-size: 18px;
  color: #000000;
  outline: none;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  resize: vertical;

  @media (min-width: 768px) {
    height: 300px;
    font-size: 22px;
  }
`;

const SubmitButton = styled.button`
  background-color: rgb(131, 172, 131);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #a8cc9c;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const VideoSection = styled.div`
  margin-top: 20px;
  width: 90%;
  max-width: 1200px;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
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
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
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

const Tagline = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const PredictionText = styled.p`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PredictionFrame = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
