import React from 'react';
import { useNavigate } from 'react-router-dom';

function InputsPage() {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate('/video');
  };

  const handleAudioClick = () => {
    navigate('/audio');
  };

  const handleTextClick = () => {
    navigate('/text');
  };


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Options Page</h2>
      <button onClick={handleVideoClick} style={buttonStyle}>
        Video
      </button>
      <button onClick={handleAudioClick} style={buttonStyle}>
        Audio
      </button>
      <button  onClick={handleTextClick} style={buttonStyle}>
        Text
      </button>
      {/* Add other buttons if needed */}
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '10px',
  cursor: 'pointer',
};

export default InputsPage;
