import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Stack,
  Card,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
  Flex,
  Box,
  Container,
  Divider,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";
import { auth } from "../../../firebaseConfig";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import CalmifyLogo from "../../../assets/logocalmify.png";

const doctorsData = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    info: "Dr. John Doe is a renowned cardiologist with over 20 years of experience specializing in heart health and cardiovascular diseases.",
    email: "snehalp1412@gmail.com",
    contact: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    color: "red.400",
    availability: "MON-FRI: 9AM-5PM",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialization: "Dermatologist",
    info: "Dr. Jane Smith is a skilled dermatologist with a focus on skin health and cosmetic procedures.",
    email: "jane.smith@example.com",
    contact: "987-654-3210",
    address: "456 Elm St, Anytown, USA",
    color: "green.400",
    availability: "TUE-SAT: 10AM-6PM",
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialization: "Psychiatrist",
    info: "Dr. Michael Chen specializes in mental health counseling with expertise in anxiety, depression, and stress management.",
    email: "michael.chen@example.com",
    contact: "555-123-4567",
    address: "789 Oak St, Anytown, USA",
    color: "purple.400",
    availability: "MON-THU: 8AM-7PM",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialization: "Psychiatrist",
    info: "Dr. Michael Chen specializes in mental health counseling with expertise in anxiety, depression, and stress management.",
    email: "michael.chen@example.com",
    contact: "555-123-4567",
    address: "789 Oak St, Anytown, USA",
    color: "purple.400",
    availability: "MON-THU: 8AM-7PM",
  },
  // {
  //   id: 5,
  //   name: "Dr. Michael Chen",
  //   specialization: "Psychiatrist",
  //   info: "Dr. Michael Chen specializes in mental health counseling with expertise in anxiety, depression, and stress management.",
  //   email: "michael.chen@example.com",
  //   contact: "555-123-4567",
  //   address: "789 Oak St, Anytown, USA",
  //   color: "purple.400",
  //   availability: "MON-THU: 8AM-7PM",
  // },
];

const getDoctorData = (doctorId) => {
  return doctorsData.find((doctor) => doctor.id === doctorId);
};

const AlertDr = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [stressCount, setStressCount] = useState(null);
  const [ setLoading] = useState(true);
  const [ setError] = useState(null);
  const [user, setUser] = useState(null);
  const [mailSent, setMailSent] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchStressCount(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  });

  const fetchStressCount = (userId) => {
    const db = getDatabase();
    const stressCountRef = ref(db, `users/${userId}/input/stress_count/count`);

    onValue(
      stressCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (typeof data === "number") {
          setStressCount(data);
        } else if (data) {
          setStressCount(data);
        } else {
          setStressCount(0);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firebase error:", err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      }
    );
  };

  const resetStressCount = async (userId) => {
    try {
      const db = getDatabase();
      const stressCountRef = ref(
        db,
        `users/${userId}/input/stress_count/count`
      );

      await set(stressCountRef, 0);
      setStressCount(0);
      setMailSent(true);

      toast({
        title: "Email sent successfully!",
        description:
          "Your stress level has been reset. Redirecting back to home...",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => {
        navigate("/input");
      }, 4000);
    } catch (err) {
      console.error("Error resetting stress count:", err);
      setError(`Error: ${err.message}`);

      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleViewInfo = (doctorId) => {
    const doctor = getDoctorData(doctorId);
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleMailDr = (doctorId) => {
    const doctor = getDoctorData(doctorId);
    setDoctorEmail(doctor.email);
    setSubject(
      `Stress Management Consultation Request - Stress Level: ${stressCount}`
    );
    setMessage(
      `Dear ${
        doctor.name
      },\n\nI would like to request a consultation regarding my mental health and stress management. My recent stress levels have been concerning, and I believe I could benefit from your professional guidance.\n\nPlease let me know your available dates and times for an appointment.\n\nThank you,\n${
        user?.displayName || "A Calmify User"
      }`
    );
    document
      .getElementById("email-form")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMail = () => {
    if (!doctorEmail || !subject || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const to = encodeURIComponent(doctorEmail);
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(message);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subjectEncoded}&body=${bodyEncoded}`;
    const newWindow = window.open(gmailUrl, "_blank");

    if (newWindow) {
      const checkWindowClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindowClosed);
          resetForm();
          if (user) {
            resetStressCount(user.uid);
          }
        }
      }, 500);
    } else {
      toast({
        title: "Popup blocked",
        description: "Please allow popups for this site to send email",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleBack = () => {
    navigate("/input");
  };

  const resetForm = () => {
    setDoctorEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <Container maxW="100%" p={0}>
      <StyledNav>
        <Logo>
          <LogoImg onClick={handleBack} src={CalmifyLogo} alt="Calmify" />
        </Logo>
        {/* <Heading as="h2" size="lg" mb={4}>
            Request Appointment
          </Heading> */}
      </StyledNav>
      <MainContainer>
        <Mailtemp id="email-form">
          <Heading as="h2" size="lg" mb={4}>
           Request Appointment
            {/* You have been detected very stressed lately we would suggest you to book and appointment with the doctor. */}
          </Heading>
          <EmailForm>
            <FormField>
              <Label htmlFor="doctor-email">Doctor's Email</Label>
              <DrMailid
                id="doctor-email"
                placeholder="Select a doctor first"
                value={doctorEmail}
                readOnly
              />
            </FormField>

            <FormField>
              <Label htmlFor="subject">Subject</Label>
              <Subject
                id="subject"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormField>

            <FormField>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                placeholder="Explain your concerns and request appointment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormField>

            <SubmitButton
              onClick={handleSendMail}
              disabled={mailSent || !doctorEmail}
            >
              {mailSent ? "Email Sent ✓" : "Send Email"}
            </SubmitButton>
          </EmailForm>
        </Mailtemp>
        <DoctorListContainer>
          {/* <Heading as="h2" size="lg" mb={4}>
            Available Healthcare Professionals
          </Heading> */}
          <Stack spacing={4}>
            {doctorsData.map((doctor) => (
              <DoctorCard key={doctor.id}>
                <Flex p={4}>
                  <Box flex="1">
                    <Flex justify="space-between" align="center">
                      <Heading size="md">{doctor.name}</Heading>
                      <Badge colorScheme="blue">
                        <strong>Available - </strong> {doctor.availability}
                      </Badge>
                    </Flex>
                    <Text noOfLines={2} mt={1} mb={2} fontSize="sm">
                      {doctor.info}
                    </Text>
                    <Flex mt={3} justify="space-between" align="center">
                      <Box>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="outline"
                          mr={2}
                          onClick={() => handleViewInfo(doctor.id)}
                        >
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleMailDr(doctor.id)}
                          disabled={mailSent}
                        >
                          Request Appointment
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </DoctorCard>
            ))}
          </Stack>
        </DoctorListContainer>
      </MainContainer>

      {/* Doctor Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center">
              <Box>
                {selectedDoctor?.name}
                <Badge ml={12} colorScheme="blue">
                  <strong>Available - </strong> {selectedDoctor?.availability}
                </Badge>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={3}>
              <Text>{selectedDoctor?.info}</Text>
              <Divider />
              <Text>
                <strong>Education:</strong> {selectedDoctor?.education}
              </Text>
              <Text>
                <strong>Email:</strong> {selectedDoctor?.email}
              </Text>
              <Text>
                <strong>Contact:</strong> {selectedDoctor?.contact}
              </Text>
              <Text>
                <strong>Address:</strong> {selectedDoctor?.address}
              </Text>
              <Box mt={4}>
                <Button
                  colorScheme="green"
                  w="full"
                  onClick={() => {
                    handleMailDr(selectedDoctor.id);
                    handleCloseModal();
                  }}
                >
                  Request Appointment
                </Button>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  cursor: pointer;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const DoctorListContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  /* margin-top: 100px */

  @media (min-width: 1024px) {
    max-height: none;
    margin-left: 120px; /* Add space between Mailtemp and DoctorListContainer */
  }
`;

const DoctorCard = styled(Card)`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const Mailtemp = styled.div`
  position: sticky;
  top: 20px;
  width: 100%;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;

  @media (min-width: 1024px) {
    position: static;
    flex: 1;
    padding: 0;
    box-shadow: none;
  }
`;

const EmailForm = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;
`;

const DrMailid = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 16px;
  color: #2d3748;
  outline: none;
  background-color: #f8f9fa;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 1px #63b3ed;
  }
`;

const Subject = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 16px;
  color: #2d3748;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 1px #63b3ed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 16px;
  color: #2d3748;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 1px #63b3ed;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #c5e7f5; /* Light Blue */
  color: white;
  font-weight: 600;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover:not(:disabled) {
    background-color: #9cd9eb;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

export default AlertDr;
