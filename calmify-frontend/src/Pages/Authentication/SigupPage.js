import React, { useState } from "react";
import { Box, Center, Button, Container, FormControl, FormLabel, Input, Stack, Text, Heading, useToast } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function SignupPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      // Save the newly created user to Firebase Realtime Database
      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);

      set(userRef, {
        email: user.email,
        sessions: {} // You can initialize empty sessions for Text, Video, Audio, Quiz
      }).then(() => {
        console.log("User data saved to Firebase.");
      }).catch((error) => {
        console.error("Error saving user data:", error);
      });

      navigate("/input"); // Redirect to input page after signup
    } catch (error) {
      toast({
        title: "Signup failed.",
        description: "Please check your email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" centerContent>
      <Box w="100%" p={6} borderRadius="md" boxShadow="md" bg="white" mt={200}>
        <Heading mb={6}><Center>Sign Up </Center></Heading>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSignup}>
            Sign Up
          </Button>
        </Stack>
      </Box>
      <Text mt={4}>
        Already have an account? <Button variant="link" onClick={() => navigate("/login")}>Login</Button>
      </Text>
    </Container>
  );
}

export default SignupPage;
