import React from 'react';
import styled from 'styled-components';

const Navbar = ({ setActiveTab, isLoggedIn, userRole, setIsLoggedIn, setRole }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
    setActiveTab('dashboard');
  };

  return (
    <Nav>
      <img src="./images/1.png" alt="logo" height={35} />
      <NavItem onClick={() => setActiveTab('dashboard')}>Home</NavItem>
      <NavItem onClick={() => setActiveTab('services')}>Services</NavItem>
      <NavItem onClick={() => setActiveTab('contact')}>Contact</NavItem>
      <NavItem onClick={() => setActiveTab('about')}>About</NavItem>
      {isLoggedIn ? (
        <>
          {userRole === 'owner' && <NavItem onClick={() => setActiveTab('owner-dashboard')}>Owner Dashboard</NavItem>}
          {userRole === 'consumer' && <NavItem onClick={() => setActiveTab('consumer-dashboard')}>Consumer Dashboard</NavItem>}
          <NavItem onClick={handleLogout}>Logout</NavItem>
        </>
      ) : (
        <NavItem onClick={() => setActiveTab('login')}>Login</NavItem>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  font-family: serif; /* Changer la police de texte */
  font-size: 20px; /* Taille de la police */
  font-weight: 600; /* Épaisseur de la police */
  
`;

const NavItem = styled.div`
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #555;
  }
`;

export default Navbar;
