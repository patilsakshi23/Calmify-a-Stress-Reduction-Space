import React from "react";
import { Button, Heading, Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TextPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/input");
  };
  return (
    <div>
      <Heading>Enter the text</Heading>
      <Textarea placeholder="Here is a sample placeholder" />
      <Button>Submit</Button>
      <Button onClick={handleBackClick} style={buttonStyle}>
        Back
      </Button>
    </div>
  );
};

export default TextPage;

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};
