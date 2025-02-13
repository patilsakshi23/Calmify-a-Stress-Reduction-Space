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

const TubeWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Tube = styled.div`
  width: 50px;
  height: 300px;
  border: 2px solid #000;
  border-radius: 10px;
  display: flex;
  flex-direction: column-reverse;
`;

const Water = styled.div`
  width: 100%;
  height: ${(props) => props.height}%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F6"];

const WaterSortPuzzle = ({ isOpen, onClose }) => {
  const [tubes, setTubes] = useState([]);
  const [selectedTube, setSelectedTube] = useState(null);
  const toast = useToast();

  const generateTubes = () => {
    const newTubes = Array.from({ length: 5 }, () => []);
    const waterColors = [...colors, ...colors, ...colors].sort(() => Math.random() - 0.5);

    waterColors.forEach((color, index) => {
      newTubes[index % 5].push(color);
    });

    setTubes(newTubes);
  };

  useEffect(() => {
    if (isOpen) {
      generateTubes();
    }
  }, [isOpen]);

  const handleTubeClick = (index) => {
    if (selectedTube === null) {
      setSelectedTube(index);
    } else if (selectedTube !== index) {
      const newTubes = [...tubes];
      const selectedColor = newTubes[selectedTube][newTubes[selectedTube].length - 1];
      const targetColor = newTubes[index][newTubes[index].length - 1];

      if (selectedColor && (!targetColor || selectedColor === targetColor)) {
        newTubes[index].push(selectedColor);
        newTubes[selectedTube].pop();
        setTubes(newTubes);
      }

      setSelectedTube(null);
    }
  };

  const checkWinCondition = () => {
    return tubes.every((tube) => {
      const color = tube[0];
      return tube.every((waterColor) => waterColor === color);
    });
  };

  useEffect(() => {
    if (checkWinCondition()) {
      toast({
        title: "Congratulations!",
        description: "You sorted all the colors!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [tubes, toast, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={() => { generateTubes(); onClose(); }}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent maxWidth="60%" height="700px">
        <ModalHeader>Water Sort Puzzle</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TubeWrapper>
            {tubes.map((tube, index) => (
              <Tube key={index} onClick={() => handleTubeClick(index)}>
                {tube.map((color, i) => (
                  <Water key={i} color={color} height={(100 / tube.length) * (i + 1)} />
                ))}
              </Tube>
            ))}
          </TubeWrapper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WaterSortPuzzle;
