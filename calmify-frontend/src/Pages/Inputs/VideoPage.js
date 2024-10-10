// src/components/VideoPage.js

import React, { useRef, useState } from 'react';

const VideoPage = () => {
  const videoRef = useRef(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [emotion, setEmotion] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      videoRef.current.play();
      setVideoBlob(file);
    }
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
      
      // Debug log for the response
      console.log("Data received from server:", data);
  
      if (data.frames) {
        setEmotion(data.frames);
      }
    } catch (error) {
      console.error('Error processing video:', error);
    
      }

  }
  ;
  
  return (
    <div>
      <h1>Video Emotion Detection</h1>
      <video ref={videoRef} autoPlay playsInline muted></video>
      <input type="file" accept="video/*" onChange={handleUpload} />
      <button onClick={handleProcessVideo}>Process and Display Emotion</button>
      {emotion.length > 0 && (
        <div>
          <h2>Detected Emotions:</h2>
          {emotion.map((emo, index) => (
            <div key={index}>
              {emo.frame ? (
                <img
                  src={`data:image/jpeg;base64,${emo.frame}`}
                  alt={`Frame ${index}`}
                  style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
                />
              ) : (
                <p>No frame available</p>
              )}
              <p>Emotion: {emo.emotion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
};

export default VideoPage;
