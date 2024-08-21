import { Button } from '@chakra-ui/react';
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
     
      <Button onClick={handleVideoClick} style={buttonStyle}>
        Video
      </Button>
      <Button onClick={handleAudioClick} style={buttonStyle}>
        Audio
      </Button>
      <Button  onClick={handleTextClick} style={buttonStyle}>
        Text
      </Button>
     
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
