import React from 'react';
import styled from 'styled-components';

const ServiceCard = ({ image, title, description, setActiveTab }) => {
  const handleCardClick = () => {
    setActiveTab('services');
  };

  return (
    <Card onClick={handleCardClick}> 
      <CardImage src={image} alt={title} />
      <Overlay>
        <Description>{description}</Description>
      </Overlay>
      <Info>
        <Title>{title}</Title>
      </Info>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer; /* Add cursor pointer to indicate the card is clickable */
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 8px;
  padding: 10px;
  
  ${Card}:hover & {
    opacity: 1; 
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 0.9rem;
`;

const Info = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.85);
  padding: 8px 12px;
  border-radius: 4px;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export default ServiceCard;
