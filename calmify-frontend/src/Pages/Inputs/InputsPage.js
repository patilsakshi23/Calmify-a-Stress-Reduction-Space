import React from "react";
import { Button, Card, CardBody, CardFooter, Image, Stack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TextImage from "../../assets/text.jpg";
import AudioImage from "../../assets/audio.jpg";
import VideoImage from "../../assets/video.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function InputsPage({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

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
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8f9fa", padding: "10px 20px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Calmify</div>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
      <div style={{ textAlign: "center", marginTop: "100px", marginLeft: "50px" }}>
        {/* <h2>Welcome, {user.displayName || user.email}</h2> */}
        <Stack direction="row" spacing={4} justify="center" align="center">
          <Card maxW="sm" onClick={handleVideoClick}>
            <CardBody>
              <Image src={VideoImage} alt="Video" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Video</Heading>
                <Text>Convey your message or thoughts by uploading or recording a video.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm" onClick={handleAudioClick}>
            <CardBody>
              <Image src={AudioImage} alt="Audio" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Audio</Heading>
                <Text>Convey your message or thoughts by uploading or recording audio.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm" onClick={handleTextClick}>
            <CardBody>
              <Image src={TextImage} alt="Text" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Text</Heading>
                <Text>Convey your message or thoughts by uploading or recording text.</Text>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </div>
    </div>
  );
}

export default InputsPage;
