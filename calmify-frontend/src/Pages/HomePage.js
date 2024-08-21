import React from "react";
import Background from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { Button, Text, Heading } from "@chakra-ui/react";

function HomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/input");
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Heading textShadow="2px 2px #000000" size="3xl" color="White">
        Welcome To the Calmify!
      </Heading>

      <Text color={"white"} mt={20} mb={35} fontSize="2xl">
        Space to find the solution to your emotion blah blah blah
      </Text>

      <Button onClick={handleStart} colorScheme="whiteAlpha" size="lg">
        <Text color={"#195a74"}>Get Started</Text>
      </Button>
    </div>
  );
}

export default HomePage;
