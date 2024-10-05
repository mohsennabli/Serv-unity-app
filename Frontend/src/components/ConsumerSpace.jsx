import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ConsumerSpace = ({ setActiveTab, activeTab, loginName, userRole }) => {
  const [bookingCount, setBookingCount] = useState(0);
  const [rows, setRows] = useState([]);

  const handleViewServices = () => {
    setActiveTab('services');
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
    const count = rows.filter(row => row.consumer_name === loginName).length;
    setBookingCount(count);
  };

  return (
    <Container>
      <h1>Consumer Dashboard</h1>
      <p>Explore services, book appointments, and manage your bookings here.</p>
      <div>
        <h2>Available Services</h2>
        <button onClick={handleViewServices}>View Services</button>
      </div>
      {userRole === 'consumer' && (
        <div>
          <h2>Your Bookings</h2>
          <p>You have {bookingCount} upcoming appointments.</p>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: #e0e0ff;
  border-radius: 8px;
  margin-top: 20px;
`;

export default ConsumerSpace;
