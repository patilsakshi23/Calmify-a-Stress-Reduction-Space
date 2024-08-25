import React from 'react';
import styled from 'styled-components';

const Nav = () => {
  return (
    <> 
    <Solgan>
        <h3>Nothing is <b>Impossible </b>!!</h3>
    </Solgan>
    <NavBar>
      <Logo>
        <LogoImg src="../assets/slider1.png" alt="Calmify" ></LogoImg>
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
    </>
  );
};

export default Nav;


const Solgan = styled.div
` height: 40px;
  background-color: #a8cc9c;
  text-align: center;
  align-content: center;
  color: white;
`;

const NavBar = styled.div
` display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: rgb(255, 255, 255);
  position: static;
  font-family: 'Roboto', sans-serif;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.div
` display: flex;
  align-items: center;
`;

const LogoImg = styled.img
` height: 40px;
  margin-right: 10px;
`;

const NavLinks = styled.div
` list-style: none;
  display: flex;
  gap: 50px;
`;

const NavLi = styled.li
` text-decoration: none;
  color: #000;
`;

const Cart= styled.div
` font-size: 20px;
`;