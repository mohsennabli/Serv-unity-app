import React, { useState, useEffect } from 'react';

export default function Services({ loginName, userRole }) {
  const [groupedServices, setGroupedServices] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8081/services')
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, service) => {
          acc[service.service_name] = acc[service.service_name] || { offers: [], offerCount: 0 };
          acc[service.service_name].offers.push(service);
          acc[service.service_name].offerCount++;
          return acc;
        }, {});
        setGroupedServices(grouped);
      })
      .catch(err => console.log(err));
  };

  const toggleService = (serviceName) => {
    if (expandedService === serviceName) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceName);
    }
  };

  const bookService = (serviceName, ownerName) => {
    if (userRole !== 'consumer') {
      setErrorMessage('Please log in as a consumer to book a service.');
      return;
    }
    setSuccessMessage('Demand Posted Successfully');
    fetch('http://localhost:8081/demands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ consumer_name: loginName, service_name: serviceName, owner_name: ownerName }),
    })
      .then(() => console.log('Service booked successfully'))
      .catch(err => console.log(err));
  };

  const getServiceOfferCount = (serviceName) => {
    return groupedServices[serviceName] ? groupedServices[serviceName].offerCount : 0;
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center', // Center-aligns everything in the container
    },
    welcomeMessage: {
      fontSize: '2rem', // Larger font size
      color: 'rgb(53, 70, 88)', // Blue color
      fontWeight: 'bold', // Bold text
      textShadow: '#7878c430 -3px 3px 3px', // Subtle text shadow for depth
      margin: '0 0 20px 0', // Margin to separate from content below
    },
    serviceName: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
      marginBottom: '10px',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'block',
    },
    serviceContainer: {
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      margin:'20px',
      width:'70%',
      marginLeft:'15%',
    },
    cardsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: '10px',
    },
    card: {
      padding: '10px',
      margin: '10px 0',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: '#f5f5f547',
      borderRadius: '5px',
      width: 'calc(100% / 6 - 20px)',
    },
    button: {
      padding: '5px 10px',
      backgroundColor: '#255387',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    errorMessage: {
      color: 'red',
    },
    successMessage: {
      color: 'green',
    },
};




return (
  <div style={styles.container}>
    <h1 style={styles.welcomeMessage}>Welcome, {loginName}</h1>
    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
    {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
    {Object.keys(groupedServices).map(serviceName => (
      <div key={serviceName} style={styles.serviceContainer}>
        <p style={styles.serviceName} onClick={() => toggleService(serviceName)}>
          {serviceName} ({getServiceOfferCount(serviceName)})
        </p>
        
        {expandedService === serviceName && (
          <div style={styles.cardsContainer}>
            {groupedServices[serviceName].offers.map((service, index) => (
              <div key={index} style={styles.card}>
                <p><strong>Owner:</strong> {service.owner_name}</p>
                <p><strong>Phone:</strong> {service.phone}</p>
                <p><strong>Address:</strong> {service.address}</p>
                
                <button onClick={() => bookService(serviceName, service.owner_name)} style={styles.button}>
                  Book Service
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);


}
