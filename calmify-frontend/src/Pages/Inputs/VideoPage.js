// src/components/VideoPage.js

import React, { useRef, useState } from 'react';
import styled from 'styled-components';

// Styled components for a cohesive theme
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: #f0f8ff; /* Soft pastel background */
  min-height: 100vh;
  font-family: 'Poppins', sans-serif; /* Use Poppins for a modern look */
`;

const Heading = styled.h1`
  font-size: 2.5em;
  color: #2c3e50; /* Dark color for the heading */
  margin-bottom: 20px;
  font-weight: 600;
`;

const VideoContainer = styled.video`
  width: 650px;
  height: auto;
  border: 2px solid #d1d1d1; /* Light gray border */
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.show ? 'block' : 'none')}; /* Control visibility */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #6a89cc; /* Soft blue */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #4a69bd; /* Darker shade on hover */
  }
`;

const UploadButton = styled.input`
  display: none;
`;

const Label = styled.label`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #6a89cc; /* Soft green for success */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #4a69bd; /* Darker shade on hover */
  }
`;

const EmotionFrame = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmotionImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const EmotionText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const VideoPage = () => {
  const videoRef = useRef(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [emotion, setEmotion] = useState([]);
  const [recording, setRecording] = useState(false);
  const [showButtons, setShowButtons] = useState(true); // Initially, show only record/upload buttons
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const [showEmotionResults, setShowEmotionResults] = useState(false); // To control display of emotion results

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      videoRef.current.play();
      setVideoBlob(file);
      setShowButtons(false); // Hide initial buttons after upload
      setShowEmotionResults(false); // Reset emotion results display
    }
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    mediaRecorderRef.current = new MediaRecorder(stream);
    recordedChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, {
        type: 'video/webm',
      });
      const videoUrl = URL.createObjectURL(blob);
      videoRef.current.srcObject = null;  // Stop the live stream
      videoRef.current.src = videoUrl;    // Load the recorded video
      setVideoBlob(blob);  // Store the recorded video as a blob
      setShowButtons(false); // Hide initial buttons after recording
      setShowEmotionResults(false); // Reset emotion results display
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());  // Stop the camera stream
    setRecording(false);
  };

  const handleProcessVideo = async () => {
    if (!videoBlob) return;
    const formData = new FormData();
    formData.append('file', videoBlob);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload_video/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.frames) {
        setEmotion(data.frames);
        setShowEmotionResults(true); // Show emotion results
      }
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  const handleBack = () => {
    setShowButtons(true); // Show the initial buttons again
    setVideoBlob(null); // Reset video blob
    setEmotion([]); // Clear emotions
    videoRef.current.src = ""; // Clear video source
    setShowEmotionResults(false); // Hide emotion results
  };

  return (
    <Container>
      <Heading>Video Emotion Detection</Heading>

      {/* Video Element: Show when recording or after upload */}
      <VideoContainer ref={videoRef} autoPlay playsInline muted show={recording || !!videoBlob}></VideoContainer>

      {/* Display record/upload buttons initially */}
      {showButtons && (
        <ButtonGroup>
          <Label htmlFor="upload">Upload Video</Label>
          <UploadButton id="upload" type="file" accept="video/*" onChange={handleUpload} />
          
          {recording ? (
            <Button onClick={handleStopRecording}>Stop Recording</Button>
          ) : (
            <Button onClick={handleStartRecording}>Start Recording</Button>
          )}
        </ButtonGroup>
      )}

      {/* Process video and Back buttons (only after video upload or recording) */}
      {!showButtons && (
        <ButtonGroup>
          <Button onClick={handleProcessVideo}>Process Video</Button>
          <Button onClick={handleBack}>Back</Button>
        </ButtonGroup>
      )}

      {/* Display the frames with detected emotions */}
      {showEmotionResults && emotion.length > 0 && (
        <EmotionFrame>
          <h2>Detected Emotions:</h2>
          {emotion.map((emo, index) => (
            <div key={index}>
              {emo.frame ? (
                <EmotionImage
                  src={`data:image/jpeg;base64,${emo.frame}`}
                  alt={`Frame ${index}`}
                />
              ) : (
                <EmotionText>No frame available</EmotionText>
              )}
              <EmotionText>Emotion: {emo.emotion}</EmotionText>
            </div>
          ))}
        </EmotionFrame>
      )}
    </Container>
  );
};

export default VideoPage;
