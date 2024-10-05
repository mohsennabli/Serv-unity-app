import React, { useState, useEffect } from 'react';


export default function ConsumerDashboard({loginName}) {
  const [rows, setRows] = useState([]);
  const [bookingCount, setBookingCount] = useState(0); 


  useEffect(() => {
    fetchData();
  }, []);
  

  useEffect(() => {
    countBookings(); 
  }, [rows]);

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

  const deleteRow = (rowName) => {
    fetch(`http://localhost:8081/demands/${rowName}`, {
      method: 'DELETE',
    })
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center', 
    },
    welcomeHeading: {
      fontSize: '2.5rem', 
      fontWeight: 'bold',
      color: 'rgb(53, 70, 88)', 
      textShadow: '#7878c430 -3px 3px 3px', 
      marginBottom: '20px', 
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color:'white',
    },
    inputContainer: {
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginRight: '10px',
      padding: '8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      flexGrow: '1',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#255387',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    rowsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gridGap: '20px',
    },
    rowItem: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '5px',
      backgroundColor: '#f5f5f547',
    },
};


return (
  <div style={styles.container}>
    <h1 style={styles.welcomeHeading}>Welcome, {loginName}</h1>
    <h2 style={styles.heading}>Your Bookings: {bookingCount}</h2>

    <div style={styles.rowsContainer}>
      {rows.map((row, index) => {
        if (row.consumer_name === loginName) {
          return (
            <div key={index} style={styles.rowItem}>
              <p><strong>Service Name:</strong> {row.service_name}</p>
              <p><strong>Owner Name:</strong> {row.owner_name}</p>
              <p><strong>State:</strong> {row.state}</p>
              <button onClick={() => deleteRow(row.demand_id)} style={styles.button}>Delete</button>
            </div>
          );
        }
        return null;
      })}
    </div>
  </div>
);

}
