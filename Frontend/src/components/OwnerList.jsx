import React, { useState, useEffect } from 'react';

export default function OwnerList({loginName}) {
  const [rows, setRows] = useState([]);
  const [service_name, setServiceName] = useState('');
  const [owner_name, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:8081/services`)
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(err => console.log(err));
  };

  const insertRow = () => {
    fetch('http://localhost:8081/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ service_name, owner_name,phone,address }),
    })
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  const deleteRow = (rowId) => {
    fetch(`http://localhost:8081/services/${rowId}`, {
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
      justifyContent: 'center', 
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
      <br />
      <h2 style={styles.heading}>Add new Service</h2>

      <div style={styles.inputContainer}>
      <select value={service_name} onChange={(e) => setServiceName(e.target.value)} style={styles.input} required>
        <option>Select Service</option>
        <option value="driver">driver</option>
        <option value="chef">chef</option>
        <option value="electrician">electrician</option>
        <option value="plumber">plumber</option>
        <option value="doctor">doctor</option>
        <option value="developer">developer</option>
        <option value="mechanic">mechanic</option>
        <option value="carpenter">carpenter</option>
        <option value="mason">mason</option>
      </select>        
        <input type="text" placeholder="Owner Name" value={owner_name} onChange={(e) => setOwnerName(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
        <button onClick={insertRow} style={styles.button}>Submit</button>
      </div>
      <div style={styles.rowsContainer}>
        {rows.map((row, index) => {
          if (row.owner_name === loginName) {
            return (
              <div key={index} style={styles.rowItem}>
                <p><strong>Service Name:</strong> {row.service_name}</p>
                <p><strong>Owner Name:</strong> {row.owner_name}</p>
                <p><strong>Phone:</strong> {row.phone}</p>
                <p><strong>Address:</strong> {row.address}</p>
                <button onClick={() => { deleteRow(row.service_id) }} style={styles.button}>Delete</button>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
