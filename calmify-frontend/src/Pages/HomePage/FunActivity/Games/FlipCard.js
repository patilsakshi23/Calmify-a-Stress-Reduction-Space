import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast, 
} from "@chakra-ui/react";

import img1 from "../../../../assets/Flipcard/1.jpg";
import img2 from "../../../../assets/Flipcard/2.jpg";
import img3 from "../../../../assets/Flipcard/3.jpg";
import img4 from "../../../../assets/Flipcard/4.jpg";
import img5 from "../../../../assets/Flipcard/5.jpg";
import img6 from "../../../../assets/Flipcard/6.jpg";
import img7 from "../../../../assets/Flipcard/7.jpg";
import img8 from "../../../../assets/Flipcard/8.jpg";

// Array of 8 images
const imageUrls = [img1, img2, img3, img4, img5, img6, img7, img8];

const StyledCardGame = styled.div`
  width: 160px;
  height: 160px;
  margin: 30px 0 0px 17px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${(props) => (props.flipped ? "rotateY(180deg)" : "none")};
`;

const CardFace = styled.div`
  width: 160px;
  height: 160px;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const GameWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 cards per row */
  justify-content: center;
  padding: 10px;
`;

const FlipCard = ({ isOpen, onClose }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const toast = useToast(); // Initialize useToast

  // Reset game function
  const resetGame = () => {
    const shuffledCards = [
      ...imageUrls.slice(0, 7), // 7 pairs
      ...imageUrls.slice(0, 7), // Duplicate to make pairs
    ].map((value, index) => ({ value, id: index }));

    // Randomly select one image for the extra card
    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    shuffledCards.push({ value: randomImage, id: shuffledCards.length });

    // Shuffle cards
    const shuffled = shuffledCards.sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedIndexes([]);
    setMatchedIndexes([]);
  };

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  useEffect(() => {
    if (matchedIndexes.length === 14) {
      // Show toast notification
      toast({
        title: "Congratulations!",
        description: "You successfully completed the game!",
        status: "success",
        duration: 2000, // Duration in milliseconds
        isClosable: true,
        position: "top", // Position of the toast
      });

      // Close modal after the toast
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [matchedIndexes, cards, toast, onClose]);

  const handleCardClick = (index) => {
    if (
      flippedIndexes.length === 2 || // Block interaction when two cards are already flipped
      flippedIndexes.includes(index) || // Block flipping the same card again
      matchedIndexes.includes(index) // Block flipping matched cards
    ) {
      return;
    }

    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndexes;

      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedIndexes((prevMatched) => [...prevMatched, firstIndex, secondIndex]);
        setFlippedIndexes([]); // Reset flippedIndexes
      } else {
        setTimeout(() => {
          setFlippedIndexes([]); // Reset flippedIndexes after a delay
        }, 1000);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { resetGame(); onClose(); }}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent maxWidth="60%" height="700px">
        <ModalHeader>Flip Card Memory Game</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GameWrapper>
            {cards.map((card, index) => (
              <StyledCardGame key={card.id} onClick={() => handleCardClick(index)}>
                <CardInner flipped={flippedIndexes.includes(index) || matchedIndexes.includes(index)}>
                  {/* Front Face */}
                  <CardFace className="front">
                    <div style={{ backgroundColor: "gray", width: "100%", height: "100%", borderRadius: "10px" }}></div>
                  </CardFace>
                  {/* Back Face (Image) */}
                  <CardFace className="back" style={{ transform: "rotateY(180deg)" }}>
                    <img
                      src={card.value}
                      alt=""
                      style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                    />
                  </CardFace>
                </CardInner>
              </StyledCardGame>
            ))}
          </GameWrapper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FlipCard;
