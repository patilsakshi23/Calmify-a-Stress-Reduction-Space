import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom";
import NavBar from "../Pages/Nav.js";
import image1 from '../assets/slider1.png';
import image2 from '../assets/slider2.png';
import image3 from '../assets/slider3.png';
import backgroundImage from '../assets/Homebg.png';
import logo from '../assets/logo.png'; // Importing the demo image

// Keyframes for animations
const showup = keyframes`
  0% {opacity:0;}
  20% {opacity:1;}
  80% {opacity:1;}
  100% {opacity:0;}
`;

const slidein = keyframes`
  0% { margin-left:-800px; }
  20% { margin-left:-800px; }
  35% { margin-left:0px; }
  100% { margin-left:0px; }
`;

const reveal = keyframes`
  0% {opacity:0;width:0px;}
  20% {opacity:1;width:0px;}
  30% {width:355px;}
  80% {opacity:1;}
  100% {opacity:0;width:355px;}
`;

const revealLogo = keyframes`
  0% {opacity:0; width:0px;}
  20% {opacity:1; width:0px;}
  30% {width:300px;} /* Adjust width as needed */
  80% {opacity:1;}
  100% {opacity:0; width:300px;} /* Adjust width as needed */
`;

const slideinLogo = keyframes`
  0% { margin-left:-600px; } /* Adjust as needed */
  20% { margin-left:-600px; }
  35% { margin-left:0px; }
  100% { margin-left:0px; }
`;
=======
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBar from "../Pages/Nav.js";
import image1 from "../assets/slider1.png";
import image2 from "../assets/slider2.png";
import image3 from "../assets/slider3.png";
import backgroundImage from "../assets/Homebg.png";
>>>>>>> cec51f779b227f17fb4123ead6290359c4a588a5

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [disappearing, setDisappearing] = useState(false);
  const [loading, setLoading] = useState(true);
  const slides = [image1, image2, image3];
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/input");
  };

  useEffect(() => {
    const loadTimeout = setTimeout(() => setLoading(false), 6000); // 6 seconds for loading screen

    const interval = setInterval(() => {
      setDisappearing(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setDisappearing(false);
      }, 1000); // Duration of the disappearing animation
    }, 6000); // 5 seconds visible + 2 seconds for disappearing animation

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimeout);
    };
  }, [slides.length]);

  return (
    <>
<<<<<<< HEAD
    
      {loading ? (
        <LoaderContainer>
          <TextContainer>
            <MainImage src={logo} alt="Calmify Demo" />  {/* Replacing text with image */}
            <SubTextContainer>
              <SubText>Calmify</SubText>  {/* Updating the subtext */}
            </SubTextContainer>
          </TextContainer>
        </LoaderContainer>
      ) : (
        <>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet"/>

          <NavBar />
          <HomeContainer>
            <HomeText>
              <Heading>Welcome To Calmify!</Heading>
              <Text>Your space to find solutions to emotions.</Text>
              <StartButton onClick={handleStart}>
                <span>GET STARTED</span>
                <ArrowIcon
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 28 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h26M20 5l7 7-7 7" />
                </ArrowIcon>
              </StartButton>
            </HomeText>
            <Slider>
              <SliderImage className={disappearing ? 'disappearing' : 'active'}>
                <SliderImageImg src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
              </SliderImage>
            </Slider>
          </HomeContainer>
          <Main>
            {/* Additional content */}
          </Main>
        </>
      )}
=======
      <NavBar />
      <HomeContainer id="home">
        <HomeText>
          <Heading>Welcome To Calmify!</Heading>
          <Text>Your space to find solutions to emotions.</Text>
          <StartButton onClick={handleStart}>
            <span>GET STARTED</span>
            <ArrowIcon
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h26M20 5l7 7-7 7"
              />
            </ArrowIcon>
          </StartButton>
        </HomeText>
        <Slider>
          <SliderImage className={disappearing ? "disappearing" : "active"}>
            <SliderImageImg
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
            />
          </SliderImage>
        </Slider>
      </HomeContainer>
      <Main id="mindful-activities">
        <p>
          <b>Mindful activities to help you relax and unwind.</b>
          ksdjolajd : The term 'ksdjolajd' is not recognized as the name of a
          cmdlet, function, script file, or operable program. Check the spelling
          of the name, or if a path was included, verify that the path is
          correct <br></br>and try again.ksdjolajd : The term 'ksdjolajd' is not
          recognized as the name of a cmdlet, function, script file, or operable
          program. Check the spelling of the name, or if a path was included,
          verify<br></br> that the path is correct and try again.ksdjolajd : The
          term 'ksdjolajd' is not recognized as the name of a cmdlet, function,
          script file, or operable program. Check the spelling of the name, or
          if a path was included, verify that the path is correct and try again.
        </p>
        <br></br>
        <hr></hr>
      </Main>
      <Main id="yoga-practices">
        <p>
          <b>Yoga practices</b>
          ksdjolajd : The term 'ksdjolajd' is not recognized as the name of a
          cmdlet, function, script file, or operable program. Check the spelling
          of the name, or if a path was included, verify<br></br> that the path
          is correct and try again.ksdjolajd : The term 'ksdjolajd' is not
          recognized as the name of a cmdlet, function, script file, or operable
          program. Check the spelling of the name, or if a path was included,
          verify that the path is correct and try again.ksdjolajd : The term
          'ksdjolajd' is not recognized as the name of a cmdlet, function,
          script file, or operable program. Check the spelling of the name, or
          if a path was included, verify that the<br></br> path is correct and
          try again.
        </p>
        <br></br>
        <hr></hr>
      </Main>
      <Main id="exercises">
        <p>
          <b>Exercises</b>
          ksdjolajd : The term 'ksdjolajd' is not recognized as the name of a
          cmdlet, function, script file, or operable program. Check the spelling
          of the name, or if a path was included, veri<br></br>fy that the path
          is correct and try again.ksdjolajd : The term 'ksdj<br></br>olajd' is
          not recognized as the name of a cmdlet, function, script file, or
          operable program. Check the spelling of the name, or if a path was in
          <br></br>cluded, verify that the path is correct and try
          again.ksdjolajd : The term 'ksdjolajd' is not recognized as the name
          of a cmdlet, function, script file, or operable program. Check the
          spelling of the name, or if a path was included, verify that the path
          is correct and try again.
        </p>
        <p>
          ksdjolajd : The term 'ksdjolajd' is not recognized as the name of a
          cmdlet, function, script file, or operable program. Check the spelling
          of the name, or if a path was included, verify<br></br> that the path
          is correct and try again.ksdjolajd : The term 'ksdjolajd' is not
          recognized as the name of a cmdlet, function, script file, or operable
          program. Check the spelling of the name, or if a path was included,
          verify that the path is correct and try again.ksdjolajd : The term
          'ksdjolajd' is not recognized as the name of a cmdlet, function,
          script file, or operable program. Check the spelling of the name, or
          if a path was included, verify that the<br></br> path is correct and
          try again.
        </p>
        <br></br>
        <hr></hr>
      </Main>
      <Main id="contact">
        <p>
          <b> Contact ussssss!!!!!!!</b>
          ksdjolajd : The term 'ksdjolajd' is not recognized as the name of a
          cmdlet, function, script file, or operable program. Check the spelling
          of the name, or if a path was included, veri<br></br>fy that the path
          is correct and try again.ksdjolajd : The term 'ksdj<br></br>olajd' is
          not recognized as the name of a cmdlet, function, script file, or
          operable program. Check the spelling of the name, or if a path was in
          <br></br>cluded, verify that the path is correct and try
          again.ksdjolajd : The term 'ksdjolajd' is not recognized as the name
          of a cmdlet, function, script file, or operable program. Check the
          spelling of the name, or if a path was included, verify that the path
          is correct and try again.
        </p>
      </Main>
>>>>>>> cec51f779b227f17fb4123ead6290359c4a588a5
    </>
  );
}

export default HomePage;

// Styled components
const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(141deg, #ccc 25%, #eee 40%, #ddd 55%);
  color: #555;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 32px;
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
`;

const MainImage = styled.img`
  animation: ${showup} 7s infinite;
  width: 250px;  /* Adjust width as needed */
  height: auto;  /* Maintain aspect ratio */
`;

const SubTextContainer = styled.div`
  margin-top: 65px;
  margin-left: 40px; /* Adjust this margin-left as needed to space the text */
  animation: ${revealLogo} 7s infinite;
  display: flex;
  align-items: center;
  position: relative; 
`;

const SubText = styled.span`
  font-size: 40px;
  font-family: 'Dancing Script', cursive; 
  animation: ${slideinLogo} 7s infinite;
  position: absolute; /* Position it absolutely within the SubTextContainer */
  left: -60px; /* Start behind the logo (adjust based on your logo's size) */
  z-index: -1; /* Initially behind the logo */
  opacity: 0; /* Initially hidden */

  /* Animate to bring it in front */
  animation: 
    ${slideinLogo} 7s infinite,
    fadeIn 7s infinite;

  @keyframes fadeIn {
    0% { opacity: 0; z-index: -1; }
    50% { opacity: 1; z-index: 1; } /* Come to front halfway through */
    100% { opacity: 1; z-index: 1; }
  }
`;




// Existing styled components for HomePage
const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 750px;
  width: 100vw;
  padding: 0 220px;
  margin-top: 110px; 
`;

const HomeText = styled.div`
  max-width: calc(100% - 220px);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.div`
  color: #fff;
  font-size: 65px;
  font-weight: bold;
  font-family: Helvetica;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 0 5px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
`;

const Text = styled.div`
  color: black;
  font-size: 20px;
`;

const StartButton = styled.button`
  background-color: #a8cc9c;
  color: white;
  padding: 15px 25px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  margin-top: 20px;
  gap: 10px;
  width: 200px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(131, 172, 131);
  }
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;

  ${StartButton}:hover & {
    transform: translateX(5px);
  }
`;

const Slider = styled.div`
  position: absolute;
  right: 50px;
  width: 700px;
  height: 620px;
  overflow: hidden;
`;

const SliderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: opacity 1s ease-in-out;

  &.disappearing {
    opacity: 0;
  }

  &.active {
    opacity: 1;
  }
`;

const SliderImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Main = styled.div`
<<<<<<< HEAD
  font-size: 15px;
=======
  font-size: 35px;
>>>>>>> cec51f779b227f17fb4123ead6290359c4a588a5
`;
