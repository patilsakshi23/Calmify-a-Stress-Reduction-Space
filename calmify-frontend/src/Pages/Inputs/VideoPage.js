import { Button } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VideoPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/input");
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Implement file upload logic here
    } else {
      alert("Please select a video file first.");
    }
  };

  const handleRecordClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop the video stream
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setSelectedFile(blob);
        setRecordedChunks([]); // Clear chunks for next recording

        // Set the recorded video URL and reset the video element
        if (videoRef.current) {
          videoRef.current.srcObject = null; // Clear the stream
          videoRef.current.src = url; // Set the recorded video URL
          videoRef.current.controls = true; // Ensure controls are visible
          videoRef.current.play(); // Auto-play the recorded video
        }
      };

      videoRef.current.srcObject = stream;
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  useEffect(() => {
    // Cleanup when the component unmounts to stop the stream
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Video Options</h2>
      <Button onClick={handleRecordClick} style={buttonStyle}>
        {isRecording ? "Stop Recording" : "Record Video"}
      </Button>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ marginTop: "20px" }}
      />
      <div>
        <h3>{isRecording ? "Recording in Progress..." : "Video Preview"}</h3>
        <video width="320" height="240" ref={videoRef} autoPlay>
          Your browser does not support the video tag.
        </video>
      </div>
      <Button onClick={handleUploadClick} style={buttonStyle}>
        Upload Video
      </Button>
      <Button onClick={handleBackClick} style={buttonStyle}>
        Back
      </Button>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};

export default VideoPage;
