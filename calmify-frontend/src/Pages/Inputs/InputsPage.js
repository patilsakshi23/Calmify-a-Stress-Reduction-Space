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
import TextImage from "../../assets/text.jpg";
import AudioImage from "../../assets/audio.jpg";
import VideoImage from "../../assets/video.jpg";
import styled from "styled-components";
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
      <div style={{ textAlign: "center", marginTop: "100px", marginLeft: "50px" }}>
        
            <Stack
              direction="row"
              spacing={4}
              justify="center"
              align="center"
            >
              <Card maxW="sm" onClick={handleVideoClick}>
                <CardBody>
                  <Image src={VideoImage} alt="Videoimage" borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Video</Heading>
                    <Text>
                      covey your message your thoughts to us by uploading or
                      recording a video of yours
                    </Text>
                    
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

const Section = styled.div`
  display: flex;
  height: 100vh; /* Full view height */
  padding: 20px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: calc(100% - 220px);
  text-align: left;
  flex-direction: column;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
  padding-left: 20px;
`;
