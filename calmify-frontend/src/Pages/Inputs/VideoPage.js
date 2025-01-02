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

const IconButton = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: #6a89cc;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a69bd;
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

const HiddenInput = styled.input`
  display: none;
`;

const VideoPage = () => {
  const videoRef = useRef(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [emotion, setEmotion] = useState([]);
  const [recording, setRecording] = useState(false);
  const [showMainButtons, setShowMainButtons] = useState(true);
  const [showRecordingScreen, setShowRecordingScreen] = useState(false);
  const [showProcessButtons, setShowProcessButtons] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const fileInputRef = useRef(null);

  const handleStartRecordingScreen = () => {
    setShowMainButtons(false);
    setShowRecordingScreen(true);
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
      videoRef.current.srcObject = null;
      videoRef.current.src = videoUrl;
      setVideoBlob(blob);
      setShowRecordingScreen(false);
      setShowProcessButtons(true);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
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
      }
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  const handleUploadVideo = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      videoRef.current.src = videoUrl;
      setVideoBlob(file);
      setShowMainButtons(false);
      setShowProcessButtons(true);
    }
  };

  const handleOpenFileSystem = () => {
    fileInputRef.current.click();
  };

  const handleBack = () => {
    setShowMainButtons(true);
    setShowRecordingScreen(false);
    setShowProcessButtons(false);
    setVideoBlob(null);
    setEmotion([]);
    videoRef.current.src = '';
  };

  return (
    <Container>
      <Heading>Video Emotion Detection</Heading>

      <VideoContainer ref={videoRef} autoPlay playsInline muted show={!showMainButtons}></VideoContainer>

      {showMainButtons && (
        <>
          <Button onClick={handleStartRecordingScreen}>Shoot Video</Button>
          <Button onClick={handleOpenFileSystem}>Upload Video</Button>
          <HiddenInput
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleUploadVideo}
          />
        </>
      )}

      {showRecordingScreen && (
        <ButtonGroup>
          <IconButton onClick={recording ? handleStopRecording : handleStartRecording}>
            {recording ? '🔴' : '🎥'}
          </IconButton>
          <Button onClick={handleBack}>Back</Button>
        </ButtonGroup>
      )}

      {showProcessButtons && (
        <ButtonGroup>
          <Button onClick={handleProcessVideo}>Process Video</Button>
          <Button onClick={handleBack}>Back</Button>
        </ButtonGroup>
      )}

      {emotion.length > 0 && (
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
