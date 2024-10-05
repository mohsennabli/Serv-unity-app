import React, { useState, useEffect } from 'react';


export default function OwnerList({loginName}) {
  const [rows, setRows] = useState([]);
 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:8081/demands`)
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(err => console.log(err));
  };

  const updateDemandState = (demandId, newState) => {
    fetch(`http://localhost:8081/demands/${demandId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_state: newState }),
    })
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color:'white',
      textAlign: 'center',
    },
    rowItem: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '15px',
      marginBottom: '20px',
      backgroundColor: '#f5f5f547',
    },
    button: {
      padding: '8px 12px',
      backgroundColor: '#255387',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    buttonGroup: {
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Demands</h2>

      <div>
        {rows.map((row, index) => {
          if (row.owner_name === loginName && row.state !== 'done' && row.state !== 'refused') {
            return (
              <div key={index} style={styles.rowItem}>
                <p><strong>Consumer Name:</strong> {row.consumer_name}</p>
                <p><strong>Service Name:</strong> {row.service_name}</p>
                <div style={styles.buttonGroup}>
                {row.state === 'In queue' && (
                    <>
                      <button onClick={() => updateDemandState(row.demand_id, 'accepted')} style={styles.button}>Accept</button>
                      <button onClick={() => updateDemandState(row.demand_id, 'refused')} style={styles.button}>Refuse</button>
                    </>
                  )}
                  <button onClick={() => updateDemandState(row.demand_id, 'done')} style={styles.button}>Mark as done</button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
