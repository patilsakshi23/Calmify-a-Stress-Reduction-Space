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
import yoga1 from "../../assets/Yoga/child_pose.png";
import yoga2 from "../../assets/Yoga/downward_facing_dog.png";
import yoga3 from "../../assets/Yoga/savasana.png";
import yoga4 from "../../assets/Yoga/viparita_karani.png";
import yoga5 from "../../assets/Yoga/utthita_trikonasana.png";


const YogaOption = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const images = [yoga1, yoga2, yoga3, yoga4, yoga5];
  
  // Array of YouTube video links
  const videos = [
    "https://youtu.be/2MJGg-dUKh0?si=egSyDDcwh-spJlZ8&t=15",
    "https://youtu.be/EC7RGJ975iM?feature=shared",
    "https://www.youtube.com/watch?v=1VYlOKUdylM&t=4s",
    "https://youtu.be/a4thkiW2uPA?si=iIXbllkLo8jtYSzl&t=31",
    "https://youtu.be/zJDUKJjq_8c?si=k_4z_kpO5qCr5CQZ&t=11",
  ];

  // Extract video ID and start time from YouTube URL
  const getVideoIdAndStartTime = (url) => {
    if (!url) return { videoId: null, startTime: 0 };
    let videoId, startTime = 0;

    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    const urlObj = new URL(url);
    startTime = urlObj.searchParams.get('t') ? parseInt(urlObj.searchParams.get('t')) : 0;

    return { videoId, startTime };
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
  const handleCardClick = (card, videoId, startTime) => {
    setSelectedCard({ ...card, videoId, startTime });
    onOpen();
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // YouTube video options, dynamically set start time
  const videoOptions = {
    height: '315',
    width: '530',
    playerVars: {
      autoplay: 0,
      start: selectedCard?.startTime || 0, // Set start time if available
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
          padding: "15px 20px",
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
            const { videoId, startTime } = getVideoIdAndStartTime(videos[index]); // Get videoId and startTime
            return (
              <Card maxW="sm" key={index} onClick={() => handleCardClick(card, videoId, startTime)}>
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
