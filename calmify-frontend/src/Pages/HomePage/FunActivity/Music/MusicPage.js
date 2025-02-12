import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";
import { Tooltip } from '@chakra-ui/react'
import CalmifyLogo from "../../../../assets/logocalmify.png";
import { useNavigate } from "react-router-dom";
// Import music files
import music1 from "../../../../assets/Music/A Moment for Peace meditation.mp3";
import music2 from "../../../../assets/Music/Angels of Venice.mp3";
import music3 from "../../../../assets/Music/autumn.mp3";
import music4 from "../../../../assets/Music/Classical Indian Music for Healing and Relaxing.mp3";
import music5 from "../../../../assets/Music/Echoes of Time.mp3";
import music6 from "../../../../assets/Music/Sleep Deeply.mp3";
import music7 from "../../../../assets/Music/The Winding Path.mp3";
import music8 from "../../../../assets/Music/Weightless.mp3";
import playlistImage from "../../../../assets/Music/song_cover.jpg"; // Add a suitable image


// Styled Components

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:rgb(239, 241, 244);
  padding: 15px 20px;
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 20px;
  cursor: pointer;
`;

const MusicContainer = styled.div`
  display: flex;
  //  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 90vh;
  // background: linear-gradient(135deg,rgba(140, 213, 235, 0.32),rgba(211, 123, 233, 0.16));
  padding: 20px;
  color: white;
  // margin-top: 20px;
  //  background: rgba(167, 193, 203, 0.11)
`;

const Player = styled.div`
  background: rgba(167, 193, 203, 0.21);
  // background: white;
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: 700px;
`;

const Playlist = styled.div`
  width: 100%;
  margin-top: 20px;
  background: rgba(130, 203, 219, 0.19);
  padding: 25px;
  color: rgba(42, 56, 59, 0.82);
  border-radius: 10px;
  max-height: 450px;
  
  overflow-y: auto;

/* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px; /* Scrollbar width */
  
  }

  &::-webkit-scrollbar-track {
    background: rgba(6, 92, 158, 0.29); /* Track background */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(6, 53, 89, 0.19);  /* Thumb color */
    border-radius: 10px;
  }

  `;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  background: ${(props) => (props.isPlaying ? "rgba(255, 255, 255, 0.2)" : "transparent")};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.71);
  }
`;

const PlaylistImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const PlayAllButton = styled.button`
  background:rgba(6, 92, 158, 0.55);
  color: white;
  // padding: 10px ;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  padding-left: 13px;
  width: 40px;
  height: 40px;
  &:hover {
    background: rgba(66, 155, 223, 0.55);
  }
`;

const MusicPage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playAll, setPlayAll] = useState(false);

  const songs = [
    { title: "A Moment for Peace meditation", src: music1 },
    { title: "Angels of Venice", src: music2 },
    { title: "Autumn", src: music3 },
    { title: "Classical Indian Music for Healing and Relaxing", src: music4 },
    { title: "Echoes of Time", src: music5 },
    { title: "Sleep Deeply", src: music6 },
    { title: "The Winding Path", src: music7 },
    { title: "Weightless", src: music8 },
  ];

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/"); 
  };

  const togglePlayPause = (index) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setTimeout(() => audioRef.current.play(), 100);
      setIsPlaying(true);
    }
  };

  const playAllSongs = () => {
    setPlayAll(true);
    setCurrentSongIndex(0);
    setTimeout(() => audioRef.current.play(), 100);
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    if (playAll) {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
      setTimeout(() => audioRef.current.play(), 100);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div>
    <StyledNav>
      <Logo onClick={handleLogoClick} >
        <LogoImg src={CalmifyLogo} alt="Calmify" />
      </Logo>
    </StyledNav>
  
    <MusicContainer>
      <Player>
        <PlaylistImage src={playlistImage} alt="Playlist Cover" />
        <Tooltip label="Play All">
        <PlayAllButton onClick={playAllSongs}> <FaPlay /></PlayAllButton>
        </Tooltip>
        <audio ref={audioRef} src={songs[currentSongIndex].src} onEnded={handleSongEnd} />

        {/* Playlist Section */}
        <Playlist>
          {songs.map((song, index) => (
            <SongItem
              key={index}
              isPlaying={index === currentSongIndex}
              onClick={() => togglePlayPause(index)}
            >
              <FaMusic />
              <span>{song.title}</span>
              {index === currentSongIndex && isPlaying ? <FaPause /> : <FaPlay />}
            </SongItem>
          ))}
        </Playlist>
      </Player>
    </MusicContainer>

    </div>
  );
};

export default MusicPage;
