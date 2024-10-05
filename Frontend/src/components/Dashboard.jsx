import React from 'react';
import styled from 'styled-components';
import ServicesGrid from './ServicesGrid'; 

const Dashboard = ({ services, onSelectService ,setActiveTab}) => {
  return (
    <Container>
      <Title>Welcome to ServUnity </Title>
      <ServicesGrid services={services} onSelectService={onSelectService} setActiveTab={setActiveTab} />
      
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
`;
const Title = styled.h1`
font-size: 3rem;
color: white;
font-family: 'Arial', sans-serif;
text-transform: uppercase;
letter-spacing: 1px;
margin-bottom: 20px;
text-shadow: 6px 3px 3px #e0e0ff29;
`;



export default Dashboard;