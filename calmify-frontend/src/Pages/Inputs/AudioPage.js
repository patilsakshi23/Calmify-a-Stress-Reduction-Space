import React, { useState, useEffect } from "react";
import styled from "styled-components";
import microphoneImage from "../../assets/microphone.png";
import saveStressData from "../../FirebaseUtils"; // Import utility function

const YOUTUBE_API_KEY = 'AIzaSyDJmuL33cv6GiuksMNlVb6hXPp6XHItgCA'; // Replace with your YouTube API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const AudioPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [prediction, setPrediction] = useState("");
  // const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videos, setVideos] = useState([]); // To store fetched YouTube videos

  useEffect(() => {
    // Initialize the Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      setRecognition(recog);
    } else {
      console.error("SpeechRecognition API not supported.");
    }
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      recognition.stop(); // Stop speech recognition
      mediaRecorder.stop(); // Stop recording
      setIsRecording(false);
    } else {
      setTranscript("");
      setPrediction("");
      recognition.start(); // Start speech recognition
      setIsRecording(true);

      // Start recording audio
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (event) => {
          setAudioBlob(event.data);
          setAudioURL(URL.createObjectURL(event.data)); // Create a URL for the audio blob
        };
        
        recorder.start();
        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const handleSubmitTranscript = async () => {
    if (!transcript.trim()) {
      alert("No transcribed text available");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/text/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: transcript }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.stress);
      // setFeedbackGiven(false);

      // If stressed, fetch YouTube videos
      if (data.stress === 1) {
        await saveStressData("audio", transcript, "stressed");
        fetchYouTubeVideos();
      }
    } catch (error) {
      console.error("Error while submitting transcript:", error);
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

  return (
    <AudioPageContainer>
      <AudioHeading>Start Recording</AudioHeading>
      <MicrophoneButtonContainer>
        <MicrophoneButton
          isRecording={isRecording}
          onClick={toggleRecording}
          image={microphoneImage}
        >
          {isRecording ? <i className="fas fa-stop"></i> : <i className="fas fa-microphone"></i>}
        </MicrophoneButton>
      </MicrophoneButtonContainer>

      {transcript && (
        <TranscriptContainer>
          <p>Transcribed Text: {transcript}</p>
        </TranscriptContainer>
      )}

      {audioBlob && (
        <AudioPreviewContainer>
          <audio controls>
            <source src={audioURL} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <StyledButton onClick={handleSubmitTranscript}>Predict</StyledButton>
        </AudioPreviewContainer>
      )}

      {prediction !== "" && (
        <PredictionContainer>
          <p>Prediction: {prediction === 1 ? "Stressed" : "Not Stressed"}</p>
        </PredictionContainer>
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
    </AudioPageContainer>
  );
};

export default AudioPage;

// Styled Components (same as before)

const AudioPreviewContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const AudioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

const AudioHeading = styled.label`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold; 
  text-align: center; 
`;

const MicrophoneButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MicrophoneButton = styled.button`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  border: 2px solid #a8cc9c;
  background-image: url(${(props) => props.image});
  background-size: 60%; 
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  /* Glowing effect when recording */
  ${(props) =>
    props.isRecording &&
    `
    animation: glowing 1.5s infinite;
    border-color: #ff1744;
  `}

  @keyframes glowing {
    0% {
      box-shadow: 0 0 5px #ff1744;
    }
    50% {
      box-shadow: 0 0 20px #ff1744;
    }
    100% {
      box-shadow: 0 0 5px #ff1744;
    }
  }
`;

const PredictionContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
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

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4b9cdf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #3a7dbe;
  }
`;

const TranscriptContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;
