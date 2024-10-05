// OwnerSpace.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OwnerSpace = ({ setActiveTab, activeTab , loginName}) => {
  const [bookingCount, setBookingCount] = useState(0); 
  const [rows, setRows] = useState([]);

  const handleViewServices = () => {
    setActiveTab('owner-dashboard');
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    countBookings();
  }, [rows, loginName]); 

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 100); // Update every 0.1 seconds

    return () => clearInterval(interval); 
  }, [bookingCount]); 

  const fetchData = () => {
    fetch(`http://localhost:8081/demands`)
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(err => console.log(err));
  };

  const countBookings = () => {
    const count = rows.filter(row => (row.owner_name === loginName) && (row.state === 'accepted' || row.state === 'In queue')).length;
    setBookingCount(count);
  };  
  return (
    <Container>
      <h1>Owner Dashboard</h1>
      <p>Welcome to your dashboard. Here you can manage your services, view bookings, and respond to consumer queries.</p>
      <div>
        <h2>Manage Services</h2>
        <button onClick={handleViewServices}>Manage Services</button>
      </div>
      <div>
        <h2>Bookings</h2>
        <p>You have {bookingCount} upcoming appointments.</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: #e0e0ff;
  border-radius: 8px;
  margin-top: 20px;
`;

export default OwnerSpace;
