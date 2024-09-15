import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBar from "../Nav.js";
import image1 from "../../assets/slider1.png";
import image2 from "../../assets/slider2.png";
import image3 from "../../assets/slider3.png";
import backgroundImage from "../../assets/Homebg.png";
import MindfulActivity from "./MindfulActivity.js";
import Yoga from "./Yoga.js";
import Exercise from "./Exercise.js";
import Contactus from "./Contactus.js";
import Footer from "../Footer.js";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [disappearing, setDisappearing] = useState(false);
  const slides = [image1, image2, image3];
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/input");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisappearing(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setDisappearing(false);
      }, 1000); // Duration of the disappearing animation
    }, 6000); // 5 seconds visible + 2 seconds for disappearing animation~
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
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
        <MindfulActivity />
        <br></br>
        <hr></hr>
      </Main>
      <Main id="yoga-practices">
        <Yoga />
        <br></br>
        <hr></hr>
      </Main>
      <Main id="exercises">
        <Exercise />
        <br></br>
        <hr></hr>
      </Main>
      <Main id="contact">
        <Contactus />
      </Main>
      <Footer />
    </>
  );
}

export default HomePage;

// Styled components
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
  margin-top: 110px; /* Adjusted for the navbar height */
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
  font-size: 35px;
`;