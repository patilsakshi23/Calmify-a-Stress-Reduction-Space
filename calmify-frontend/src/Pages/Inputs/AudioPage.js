import React, { useState, useEffect } from "react";
import styled from "styled-components";
import microphoneImage from "../../assets/microphone.png"; // Import the image

const AudioPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState(false);


  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          interimTranscript += transcriptPiece;
        }
        setTranscript(interimTranscript);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recog.onend = () => {
        if (isRecording) {
          recog.start();
        }
      };

      setRecognition(recog);
    } else {
      console.error("SpeechRecognition API not supported.");
    }
  }, [isRecording]);

  const toggleRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else if (recognition && !isRecording) {
      setTranscript("");
      setPrediction("");
      recognition.start();
      setIsRecording(true);
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

  const handleFeedback = async (feedback) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: transcript,
          prediction,
          feedback,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Feedback response:", data);
      setFeedbackGiven(true);
    } catch (error) {
      console.error("Error while sending feedback:", error);
    }
  };

  return (
    <AudioPageContainer>
      <AudioHeading>Start Recording</AudioHeading>
      <MicrophoneButtonContainer>
        <MicrophoneButton
          isRecording={isRecording}
          onClick={toggleRecording}
          image={microphoneImage} // Pass the image to the component
        >
          {isRecording ? <i className="fas fa-stop"></i> : <i className="fas fa-microphone"></i>}
        </MicrophoneButton>
      </MicrophoneButtonContainer>

      {transcript && (
        <TranscriptContainer>
          <p>Transcribed Text: {transcript}</p>
          <StyledButton onClick={handleSubmitTranscript}>Predict</StyledButton>
        </TranscriptContainer>
      )}

      {prediction !== "" && (
        <PredictionContainer>
          <p>Prediction: {prediction === 1 ? "Stressed" : "Not Stressed"}</p>
          {!feedbackGiven && (
            <FeedbackContainer>
              <FeedbackButton onClick={() => handleFeedback("like")}>👍</FeedbackButton>
              <FeedbackButton onClick={() => handleFeedback("dislike")}>👎</FeedbackButton>
            </FeedbackContainer>
          )}
        </PredictionContainer>
      )}
    </AudioPageContainer>
  );
};

export default AudioPage;

// Styled Components
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
  font-weight: bold; // Make text bold
  text-align: center; // Center text
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
  background-image: url(${(props) => props.image}); // Ensure this is correct
  background-size: 60%; // Adjust size if needed
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  /* Small red accent circle */
  &::after {
    content: "";
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid ${(props) => (props.isRecording ? "#d32f2f" : "#ff5722")};
    background-color: transparent; /* Make center transparent */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  /* FontAwesome icons */
  i {
    font-size: 40px;
    color: ${(props) => (props.isRecording ? "white" : "#ff5722")};
  }

  /* Hover effect */
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

const FeedbackContainer = styled.div`
  margin-top: 10px;
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
