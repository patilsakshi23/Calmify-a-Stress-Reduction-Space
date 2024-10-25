import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Text, Heading, useToast, Center } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      // Fetch user data from Firebase Database
      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);
      
      get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          // If no data exists, you can initialize some default data for the user
          console.log("No user data found, initializing data...");
        } else {
          console.log("User data:", snapshot.val());
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });

      navigate("/input"); // Redirect to the input page after login
    } catch (error) {
      toast({
        title: "Login failed.",
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
        <Heading mb={6}><Center> Login </Center></Heading>
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
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </Box>
      <Text mt={4}>
        Don't have an account? <Button variant="link" onClick={() => navigate("/signup")}>Sign Up</Button>
      </Text>
    </Container>
  );
}

export default LoginPage;
