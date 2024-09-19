import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TextPage = () => {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/text/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.stress);
      setFeedbackGiven(false);
    } catch (error) {
      console.error("Error while submitting text:", error);
    }
  };

  const handleFeedback = async (feedback) => {
    try {
      await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          prediction,
          feedback,
        }),
      });

      setFeedbackGiven(true);
    } catch (error) {
      console.error("Error while sending feedback:", error);
    }
  };

  return (
    <Container>
      <TextArea
        placeholder="how was your day....."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

      {prediction !== "" && (
        <div>
          <p>Prediction: {prediction === 1 ? "Stressed" : "Not Stressed"}</p>
          {!feedbackGiven && (
            <div>
              <FeedbackButton onClick={() => handleFeedback("like")}>
                👍
              </FeedbackButton>
              <FeedbackButton onClick={() => handleFeedback("dislike")}>
                👎
              </FeedbackButton>
            </div>
          )}
        </div>
      )}

      
    </Container>
  );
};

export default TextPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #eaf4f9;
`;

const TextArea = styled.textarea`
  width: 1000px;
  height: 500px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #c8d6db;
  font-size: 16px;
  outline: none;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #8ab4d9;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  &:hover {
    background-color: #7ca9c8;
  }
`;

const FeedbackButton = styled.button`
  background-color: #d9e2e8;
  color: #000;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 5px;
  transition: background-color 0.3s;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #c8d6db;
  }
`;

