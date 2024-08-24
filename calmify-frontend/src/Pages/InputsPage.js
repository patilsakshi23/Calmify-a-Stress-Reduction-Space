import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Stack,
  Heading,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextImage from "../assets/text.jpg";
import AudioImage from "../assets/audio.png";
import VideoImage from "../assets/video.jpg";

function InputsPage() {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate("/video");
  };

  const handleAudioClick = () => {
    navigate("/audio");
  };

  const handleTextClick = () => {
    navigate("/text");
  };
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          padding: "10px 20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Calmify</div>
      </nav>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Stack direction="row" spacing={4} justify="center" align="center">
          <Card maxW="sm">
            <CardBody>
              <Image src={VideoImage} alt="Videoimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Video</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button onClick={handleVideoClick} style={buttonStyle}>
                  Video
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={AudioImage} alt="Audioimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Audio</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button onClick={handleAudioClick} style={buttonStyle}>
                  Audio
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={TextImage} alt="Textimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Text</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button onClick={handleTextClick} style={buttonStyle}>
                  Text
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <Button onClick={handleBackClick} style={buttonStyle}>
          Back
        </Button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};

export default InputsPage;
