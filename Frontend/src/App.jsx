// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Services from './components/Services';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import OwnerDashboard from './components/OwnerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import ConsumerSpace from './components/ConsumerSpace';
import OwnerSpace from './components/OwnerSpace'; 
import styled from 'styled-components';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const [isConsumerSpaceOpen, setIsConsumerSpaceOpen] = useState(false);

  const [loginName, setLoginName] = useState('');



  
  const handleLogin = (userRole,loginName) => {

    setIsLoggedIn(true);
    setRole(userRole);
    setLoginName(loginName);
    alert(loginName);
    if (userRole === 'owner') {
      setActiveTab('owner-dashboard');
    } else if (userRole === 'consumer') {
      setActiveTab('dashboard');
    }


  };



  const toggleConsumerSpace = () => {
    setIsConsumerSpaceOpen(!isConsumerSpaceOpen);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'services':
        return (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <Services loginName={loginName} userRole={role} />
          </DashboardContainer>
        );
      case 'contact':
        return (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <Contact />
          </DashboardContainer>
        );
      case 'about':
        return (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <About setActiveTab={setActiveTab}/>
          </DashboardContainer>
        );
      case 'dashboard':
        return (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <Dashboard setActiveTab={setActiveTab}/>
          </DashboardContainer>
        );
      case 'owner-dashboard':
        return role === 'owner' ? (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <OwnerDashboard loginName={loginName} />
          </DashboardContainer>
        ) : (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <Dashboard setActiveTab={setActiveTab} />
          </DashboardContainer>
        );
      case 'consumer-dashboard':
        return role === 'consumer' ? (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <ConsumerDashboard loginName={loginName} />
          </DashboardContainer>
        ) : (
          <DashboardContainer isConsumerSpaceOpen={isConsumerSpaceOpen}>
            <Dashboard setActiveTab={setActiveTab}/>
          </DashboardContainer>
        );
      default:
        return <Dashboard setActiveTab={setActiveTab}/>;
    }
  };

  return (
    <AppContainer>
      <Navbar setActiveTab={setActiveTab} isLoggedIn={isLoggedIn} userRole={role} setIsLoggedIn={setIsLoggedIn} setRole={setRole}  />
      {renderTab()}
      <ConsumerSpaceWindow open={isConsumerSpaceOpen}>
        
        <WelcomeText setLoginName={loginName}>Welcome {loginName}</WelcomeText>
        {role !=='owner' && <ConsumerSpace setActiveTab={setActiveTab} loginName={loginName} userRole={role} />}
        {role === 'owner' && <OwnerSpace setActiveTab={setActiveTab} loginName={loginName} />} {/* Conditionally render OwnerSpace */}
      </ConsumerSpaceWindow>
      <ToggleConsumerSpaceButton onClick={toggleConsumerSpace} open={isConsumerSpaceOpen}>
        {isConsumerSpaceOpen ? 'Close' : 'Open'} Quick Tasks
      </ToggleConsumerSpaceButton>
      <Footer>
        © {new Date().getFullYear()} ServUnity. All rights reserved.
      </Footer>
    </AppContainer>
  );
  
}

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
`;
const WelcomeText = styled.h1`
  color: white;
  text-align: center;
`;

const ConsumerSpaceWindow = styled.div`
  position: fixed;
  left: ${({ open }) => (open ? '0' : '-300px')};
  top: 50px;
  width: 300px;
  
  
  
  transition: left 0.3s ease-in-out;
  z-index: 999;
  overflow-y: auto; 
`;

const ToggleConsumerSpaceButton = styled.button`
  position: fixed;
  left: ${({ open }) => (open ? '300px' : '0')};
  top: ${({ open }) => (open ? '60px' : '110px')}; 
  transform: translateY(-50%);
  background-color: ${({ open }) => (open ? '#60121ac7' : '#343d47c2')};
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: left 0.3s ease-in-out, background-color 0.3s;
  z-index: 1000;
  border-radius: 20px;

  &:hover {
    background-color: ${({ open }) => (open ? '#60121a' : '#343d47')};
  }

  &:focus {
    outline: none;
  }
`;



const DashboardContainer = styled.div`
  margin-left: ${({ isConsumerSpaceOpen }) => (isConsumerSpaceOpen ? '300px' : '0')};
  padding-top: 50px; 
  transition: margin-left 0.3s ease-in-out;
  
`;
const Footer = styled.footer`
  text-align: center;
  padding: 10px 0;
  background-color: #333;
  color: #fff;
  bottom: 0;
`;

export default App;
