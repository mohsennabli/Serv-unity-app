import React from 'react';
import ServiceCard from './ServiceCard';
import styled from 'styled-components';

const services = [
  { 
    image: '/images/driver.png', 
    title: 'Driver', 
    description: 'Transports people or goods safely and in compliance with traffic rules.' 
  },
  { 
    image: '/images/tachnes.jpg', 
    title: 'Electrician', 
    description: 'Installs, repairs, and maintains electrical installations in buildings.' 
  },
  { 
    image: '/images/plomb.jpg', 
    title: 'Plumber', 
    description: 'Handles installation, repair, and maintenance of plumbing and heating systems.' 
  },
  { 
    image: '/images/devpora.jpg', 
    title: 'Developer',  
    description: 'Creates and develops software, web, or mobile applications according to client needs.' 
  },
  { 
    image: '/images/doctoura.jpg', 
    title: 'Doctor', 
    description: 'Diagnoses and treats illnesses, injuries, and medical conditions, and provides care to patients.' 
  },
  { 
    image: '/images/cheffa.jpg', 
    title: 'Chef', 
    description: 'Plans and prepares gourmet meals, supervises kitchen staff, and manages kitchen operations.' 
  },
  { 
    image: '/images/baney.jpg', 
    title: 'Mason',  
    description: 'Builds structures using materials such as brick, stone, concrete, and mortar.' 
  },
  { 
    image: '/images/mec.jpg', 
    title: 'Mechanic', 
    description: 'Repairs and maintains motor vehicles, diagnosing mechanical problems and performing necessary repairs.' 
  },
  { 
    image: '/images/najjar.png', 
    title: 'Carpenter', 
    description: 'Manufactures and repairs furniture, doors, windows, and other wooden objects, using specific tools and techniques.' 
  }
];

const ServicesGrid = ({ setActiveTab }) => {
  return (
    <Grid>
      {services.map((service, index) => (
        <ServiceCard key={index} image={service.image} title={service.title} description={service.description} setActiveTab={setActiveTab} />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; /* Reduced the gap between items */
  margin-top: 20px;
  justify-items: center; /* Align items horizontally to center */
`;

export default ServicesGrid;
