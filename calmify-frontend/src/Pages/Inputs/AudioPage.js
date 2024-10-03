import React, { useState, useEffect } from "react";
import styled from "styled-components";
import microphoneImage from "../../assets/microphone.png"; // Import the image

const AudioPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    // Initialize the Speech Recognition API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
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
      setFeedbackGiven(false);
    } catch (error) {
      console.error("Error while submitting transcript:", error);
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
          {/* <p>Transcribed Text: {transcript}</p> */}
          
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
    </AudioPageContainer>
  );
};

export default AudioPage;

// Styled Components

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

  i {
    font-size: 40px;
    color: ${(props) => (props.isRecording ? "white" : "#ff5722")};
  }

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TranscriptContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PredictionContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  background-color: #a8cc9c;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: rgb(131, 172, 131);
  }
`;
