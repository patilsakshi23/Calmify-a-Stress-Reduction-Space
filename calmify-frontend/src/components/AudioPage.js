import React from 'react'

const AudioPage = () => {
  return (
    <div>
      <h2>Speech-to-Text Recorder</h2>
      <button style={buttonStyle}>
        Start Recording
      </button>
      <button style={buttonStyle}>
        Stop Recording
      </button>
      <p>Transcribed Text:</p>
    </div>
  )
}

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
  };

export default AudioPage
