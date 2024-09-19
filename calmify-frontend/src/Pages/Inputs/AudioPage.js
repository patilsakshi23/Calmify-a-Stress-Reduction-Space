import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AudioPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/input");
  };

  useEffect(() => {
    // Initialize SpeechRecognition API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true; // Set continuous to true for continuous recognition
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          interimTranscript += transcriptPiece;
        }
        setTranscript((prev) => prev + interimTranscript);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recog.onend = () => {
        // Do not stop recording automatically; the stop will be handled by the button
        if (isRecording) {
          recog.start(); // Restart recognition automatically if still in recording mode
        }
      };

      setRecognition(recog);
    } else {
      console.error("SpeechRecognition API not supported.");
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    if (recognition && !isRecording) {
      setTranscript(""); // Clear transcript when starting a new recording session
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h2>Speech-to-Text Recorder</h2>
      <Button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </Button>
      <Button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </Button>
      <p>Transcribed Text: {transcript}</p>
      <Button onClick={handleBackClick} style={buttonStyle}>
        Back
      </Button>
    </div>
  );
};

export default AudioPage;

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};
