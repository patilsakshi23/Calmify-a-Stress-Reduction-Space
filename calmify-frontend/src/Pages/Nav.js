import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
          <NavLi><a href="#">HOME</a></NavLi>
          <NavLi><a href="#">MINDFUL ACTIVITIES</a></NavLi>
          <NavLi><a href="#">YOGA PRACTICES</a></NavLi>
          <NavLi><a href="#">EXERCISES</a></NavLi>
          <NavLi><a href="#">CONTACT US</a></NavLi>
        </NavLinks>
        <Cart>
          <i className="fas fa-shopping-cart"></i>
        </Cart>
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

const Cart = styled.div`
  font-size: 20px;
`;
