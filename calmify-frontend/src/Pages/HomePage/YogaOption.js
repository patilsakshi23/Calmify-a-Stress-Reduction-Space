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
  Center,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Yoga from "../../assets/Yoga/yoga.jpg";
import styled from "styled-components";

const YogaOption = () => {
  const navigate = useNavigate();

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();

  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();

  const {
    isOpen: isOpen6,
    onOpen: onOpen6,
    onClose: onClose6,
  } = useDisclosure();

  const {
    isOpen: isOpen7,
    onOpen: onOpen7,
    onClose: onClose7,
  } = useDisclosure();

  const {
    isOpen: isOpen8,
    onOpen: onOpen8,
    onClose: onClose8,
  } = useDisclosure();

  //   const handleVideoClick = () => {
  //     navigate("/video");
  //   };

  //   const handleAudioClick = () => {
  //     navigate("/audio");
  //   };

  //   const handleTextClick = () => {
  //     navigate("/text");
  //   };
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
        <Heading justify="center" m={5}>
          Yoga
        </Heading>
        <Button onClick={handleBackClick} style={buttonStyle}>
          Back
        </Button>
      </nav>

      <div style={{ textAlign: "center" }}>
        <Stack
          direction="row"
          spacing={20}
          justify="center"
          align="center"
          m={20}
        >
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Videoimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Sun Salutation Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen1();
                  }}
                >
                  Video
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Audioimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Sitting Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen2();
                  }}
                >
                  Audio
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Textimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Child’s Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen3();
                  }}
                >
                  Text
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <Stack
          direction="row"
          spacing={20}
          justify="center"
          align="center"
          m={20}
        >
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Videoimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Sun Salutation Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen4();
                  }}
                >
                  Video
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Audioimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Sitting Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen5();
                  }}
                >
                  Audio
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Textimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Child’s Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen6();
                  }}
                >
                  Text
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Stack
          direction="row"
          spacing={20}
          justify="center"
          align="center"
          m={20}
        >
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Videoimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Sun Salutation Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen7();
                  }}
                >
                  Video
                </Button>
              </Stack>
            </CardBody>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image src={Yoga} alt="Audioimage" borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">Sitting Pose</Heading>
                <Text>
                  covey your message your thoughts to us by uploading or
                  recording a video of yours
                </Text>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    onOpen8();
                  }}
                >
                  Audio
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <Modal isOpen={isOpen1} onClose={onClose1} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen2} onClose={onClose2} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen3} onClose={onClose3} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen4} onClose={onClose4} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen5} onClose={onClose5} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen6} onClose={onClose6} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen7} onClose={onClose7} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen8} onClose={onClose8} motionPreset="slideInBottom">
          <OverlayOne />
          <ModalContent>
            <ModalHeader>Mail Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoCard>
                covey your message your thoughts to us by uploading or recording
                a video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yourscovey
                your message your thoughts to us by uploading or recording a
                video of yourscovey your message your thoughts to us by
                uploading or recording a video of yourscovey your message your
                thoughts to us by uploading or recording a video of yours
              </InfoCard>
            </ModalBody>
          </ModalContent>
        </Modal>
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
