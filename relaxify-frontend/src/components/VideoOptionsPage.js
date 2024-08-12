import React, { useState } from 'react';

function VideoOptionsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Video Options</h2>
      <button style={buttonStyle}>
        Record Video
      </button>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ marginTop: '20px' }}
      />
      {videoUrl && (
        <div>
          <h3>Selected Video Preview</h3>
          <video width="320" height="240" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <button onClick={handleUploadClick} style={buttonStyle}>
        Upload Video
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '10px',
  cursor: 'pointer',
};

export default VideoOptionsPage;
