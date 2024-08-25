import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StickyContainer isScrolled={isScrolled}>
      <Solgan>
        <h3>Nothing is <b>Impossible</b>!!</h3>
      </Solgan>
      <NavBar>
        <Logo>
          <LogoImg src="../assets/slider1.png" alt="Calmify" />
        </Logo>
        <NavLinks>
          <NavLi>
            <Link to="home" smooth={true} duration={500}>HOME</Link>
          </NavLi>
          <NavLi>
            <Link to="mindful-activities" smooth={true} duration={500}>MINDFUL ACTIVITIES</Link>
          </NavLi>
          <NavLi>
            <Link to="yoga-practices" smooth={true} duration={500}>YOGA PRACTICES</Link>
          </NavLi>
          <NavLi>
            <Link to="exercises" smooth={true} duration={500}>EXERCISES</Link>
          </NavLi>
          <NavLi>
            <Link to="contact" smooth={true} duration={500}>CONTACT US</Link>
          </NavLi>
        </NavLinks>
      </NavBar>
    </StickyContainer>
  );
};

export default Nav;

const StickyContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ isScrolled }) => (isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgb(255, 255, 255)')};
  transition: background-color 0.3s ease;
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none')};
`;

const Solgan = styled.div`
  height: 40px;
  background-color: #a8cc9c;
  text-align: center;
  padding-top: 8px;
  color: white;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: transparent; /* Ensure this remains transparent */
  font-family: 'Roboto', sans-serif;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavLinks = styled.div`
  list-style: none;
  display: flex;
  gap: 50px;
`;

const NavLi = styled.li`
  text-decoration: none;
  color: #000;
`;

