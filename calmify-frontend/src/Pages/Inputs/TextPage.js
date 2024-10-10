import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from './../../assets/textpagebg.avif'; // Import your image here

const YOUTUBE_API_KEY = 'AIzaSyDJmuL33cv6GiuksMNlVb6hXPp6XHItgCA'; // Replace with your YouTube API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const TextPage = () => {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [videos, setVideos] = useState([]);
  const [feedbackGiven, setFeedbackGiven] = useState(false);


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
      setFeedbackGiven(false);

      if (data.stress === 1) {
        fetchYouTubeVideos();
      }

    } catch (error) {
      console.error("Error while submitting text:", error);
    }
  };

  const fetchYouTubeVideos = async () => {
    try {
      const response = await fetch(
        `${YOUTUBE_API_URL}?part=snippet&type=video&maxResults=3&q=stress+relief&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  const handleFeedback = async (feedback) => {
    try {
      await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          prediction,
          feedback,
        }),
      });

      setFeedbackGiven(true);
    } catch (error) {
      console.error("Error while sending feedback:", error);
    }
  };

  return (
    <Container>
      <Tagline>Let's find your calm together!</Tagline>

      <TextArea
        placeholder="how was your day....."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

      {prediction !== "" && (
        <div>
          <p>Prediction: {prediction === 1 ? "Stressed" : "Not Stressed"}</p>
          {!feedbackGiven && (
            <div>
              <FeedbackButton onClick={() => handleFeedback("like")}>
                👍
              </FeedbackButton>
              <FeedbackButton onClick={() => handleFeedback("dislike")}>
                👎
              </FeedbackButton>
            </div>
          )}
        </div>
      )}

      {videos.length > 0 && (
        <VideoSection>
          <h3>Suggested Videos to Reduce Stress: </h3>
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
  background-image: url(${backgroundImage}); /* Update this with the correct path */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 1000px;
  height: 400px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #a8cc9c;
  font-size: 22px;
  outline: none;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  resize: none;
`;

const SubmitButton = styled.button`
  background-color:  rgb(131, 172, 131);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  &:hover {
    background-color: #a8cc9c;
  }
`;

const FeedbackButton = styled.button`
  background-color: #d9e2e8;
  color: #000;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 5px;
  transition: background-color 0.3s;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #c8d6db;
  }
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
  &:hover {
    text-decoration: underline;
  }
`;

const Tagline = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #a8cc9c;
`;