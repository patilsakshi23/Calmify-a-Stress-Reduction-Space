import {
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import YouTube from 'react-youtube'; // Import YouTube component
import yoga from "../../assets/Yoga/yoga.jpg";
import yoga1 from "../../assets/slider3.png";
import yoga2 from "../../assets/slider2.png";
import yoga3 from "../../assets/slider1.png";

const YogaOption = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const images = [yoga, yoga1, yoga2, yoga3];
  
  // Array of YouTube video links
  const videos = [
    "https://youtu.be/2MJGg-dUKh0?feature=shared",
    "https://youtu.be/EC7RGJ975iM?feature=shared",
    "https://youtu.be/1VYlOKUdylM?feature=shared",
    "https://youtu.be/a4thkiW2uPA?feature=shared"
  ];

  // Extract video ID from YouTube URL
  // Extract video ID from YouTube URL
const getVideoId = (url) => {
  if (!url) return null; // Check if the URL exists
  const urlParts = url.split("v=");
  if (urlParts.length > 1) {
    return urlParts[1].split("&")[0]; // Return the video ID if it's a standard YouTube link
  } else if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0]; // Handle shortened youtu.be links
  }
  return null; // Return null if no valid video ID is found
};


  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const db = getDatabase();
    const cardsRef = ref(db, "yogaCards");
    const unsubscribe = onValue(
      cardsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Fetched data:", data); // Log data
        if (data) {
          setCards(Object.values(data));
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Handle card click and open modal with video and details
  const handleCardClick = (card, videoId) => {
    setSelectedCard({ ...card, videoId });
    onOpen();
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // YouTube video options
  const videoOptions = {
    height: '315',
    width: '530',
    playerVars: {
      autoplay: 0,
    },
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
        <Heading justify="center" m={5}>
          Yoga
        </Heading>
        <Button onClick={handleBackClick} style={buttonStyle}>
          Back
        </Button>
      </nav>

      <div style={{ textAlign: "center" }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} m={20}>
          {cards.map((card, index) => {
            const videoId = getVideoId(videos[index]); // Get videoId from array
            return (
              <Card maxW="sm" key={index} onClick={() => handleCardClick(card, videoId)}>
                <CardBody>
                <Image src={images[index]} alt={card.title} borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{card.title}</Heading>
                    <Text>{card.shortInfo}</Text>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Modal to display long info and YouTube video */}
        {selectedCard && (
          <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
              <ModalHeader>{selectedCard.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* YouTube Video Player */}
                <YouTube 
                  videoId={selectedCard.videoId} // Use extracted videoId
                  opts={videoOptions}
                />
                <InfoCard>{selectedCard.longInfo}</InfoCard>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default YogaOption;

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};

const InfoCard = styled.div`
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;
