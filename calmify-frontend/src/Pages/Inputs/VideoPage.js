import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import videobg from "../../assets/videobg.jpg";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const ProcessingSpinner = styled.div`
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top: 6px solid rgb(116, 63, 238);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin-top: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255); /* Light warm color */
  min-height: 100vh;
  padding: 20px;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #fff7e6, rgba(220, 153, 99, 0.8));
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 80vw;
    min-height: 80vh;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    align-items: flex-start;
  }
`;

const RightContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Heading = styled.h1`
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 2.5em;
  }
`;

const Description = styled.p`
  font-size: 1em;
  color: #444;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 1.2em;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: auto;
  aspect-ratio: 4 / 3;
  border: 2px solid #d1d1d1;
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const Timer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1em;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 13px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;

const RecordingDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  animation: ${blink} 1s infinite;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    // justify-content: center;
    // margin-left: -200px;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: rgb(116, 63, 238);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: rgb(96, 53, 197);
  }
`;

const RecordingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const EmotionFrame = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 750px;
  height: auto;
  object-fit: cover;
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
  const [recording, setRecording] = useState(false);
  const [showMainButtons, setShowMainButtons] = useState(true);
  const [showRecordingScreen, setShowRecordingScreen] = useState(false);
  const [showProcessButtons, setShowProcessButtons] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const fileInputRef = useRef(null);
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const handleStartRecordingScreen = () => {
    setShowMainButtons(false);
    setShowRecordingScreen(true);
  };

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support video/audio recording. Please try a different browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (!videoRef.current) {
        console.error("videoRef is not initialized.");
        return;
      }

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
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);

        videoRef.current.srcObject = null;
        videoRef.current.src = videoUrl;
        videoRef.current.controls = true;

        setVideoBlob(blob);
        setShowRecordingScreen(false);
        setShowProcessButtons(true);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error("Error accessing camera/microphone:", error);
      alert("Please allow camera & microphone access in your browser settings.");
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  const handleProcessVideo = async () => {
    if (!videoBlob) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", videoBlob);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload_video/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (data["Final emotion"]) {
        setEmotion(data["Final emotion"]);
      } else {
        setEmotion("No emotion detected");
      }

      if (data["Extracted text"]) {
        setExtractedText(data["Extracted text"]);
      } else {
        setExtractedText("No text detected from video");
      }
    } catch (error) {
      console.error("Error processing video:", error);
      setEmotion("Error detecting emotion");
      setExtractedText("Error extracting text");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadVideo = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      videoRef.current.src = videoUrl;
      videoRef.current.controls = true;
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
    setEmotion("");
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
      videoRef.current.controls = false;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <MainContainer>
      {showMainButtons && (
        <Container>
          <TopContainer>
            <Image src={videobg} alt="Video Emotion Detection Illustration" />
          </TopContainer>
          <LeftContainer>
            <Heading>Video Emotion Detection</Heading>
            <Description>
              Use this feature to record or upload a video. It will analyze your emotions and help reduce stress through
              personalized recommendations.
            </Description>
            <ButtonGroup>
              <Button onClick={handleStartRecordingScreen}>Record Video</Button>
              <Button onClick={handleOpenFileSystem}>Upload Video</Button>
            </ButtonGroup>
            <HiddenInput type="file" accept="video/*" ref={fileInputRef} onChange={handleUploadVideo} />
          </LeftContainer>
          <RightContainer>
            <Image src={videobg} alt="Video Emotion Detection Illustration" />
          </RightContainer>
        </Container>
      )}

      <RecordingContainer>
        <VideoContainer show={!showMainButtons}>
          <VideoElement ref={videoRef} autoPlay playsInline muted={recording}></VideoElement>
          {recording && (
            <Timer>
              <RecordingDot />
              {formatTime(recordingTime)}
            </Timer>
          )}
        </VideoContainer>
        {showRecordingScreen && (
          <ButtonGroup>
            <Button onClick={recording ? handleStopRecording : handleStartRecording}>
              {recording ? "Stop Recording" : "Start Recording"}
            </Button>
            <Button onClick={handleBack}>Back</Button>
          </ButtonGroup>
        )}
        {showProcessButtons && (
          <ButtonGroup>
            <Button onClick={handleProcessVideo}>Process Video</Button>
            <Button onClick={handleBack}>Back</Button>
          </ButtonGroup>
        )}
        {isProcessing && <ProcessingSpinner />}
        {emotion && (
          <EmotionFrame>
            <h2>Detected Emotion:</h2>
            <EmotionText>{emotion}</EmotionText>
            <h2>Extracted Text:</h2>
            <EmotionText>{extractedText}</EmotionText>
          </EmotionFrame>
        )}
      </RecordingContainer>
    </MainContainer>
  );
};

export default VideoPage;
