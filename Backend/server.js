const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'test'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

const app = express();
const PORT = 8081;

// Middleware
app.use(express.json());
app.use(cors());
// Login Route
app.get('/user', (req, res) => {
  const selectAll = 'SELECT * FROM user';
  db.query(selectAll, (err, rows) => {
      if (err) {
          console.error('Error retrieving users:', err);
          res.status(500).send('Error retrieving users');
          return;
      }
      res.send(rows);
  });
});

app.post('/user', (req, res) => {
  const { name, email, password, role } = req.body;
  const insertRow = "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(insertRow, [name, email, password, role], (err, result) => {
      if (err) {
          console.error('Error inserting user:', err);
          res.status(500).send('Error inserting user');
          return;
      }
      console.log('Inserted user:', name);
      res.send('User inserted successfully');
  });
});
app.post('/login', (req, res) => {
  const { name, password,role } = req.body;
  const selectUser = 'SELECT * FROM user WHERE name = ? AND password = ? AND role = ?';

  db.query(selectUser, [name, password, role], (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          res.status(500).send('Error fetching user');
          return;
      }
      if (results.length > 0) {
          console.log('User logged in successfully:', name);
          res.send({ success: true, message: 'Login successful' });
      } else {
          console.log('Login failed for:', name);
          res.status(401).send({ success: false, message: 'Invalid credentials' });
      }
  });
});

// Routes
app.get('/services', (req, res) => {
  const selectAll = 'SELECT * FROM services';
  db.query(selectAll, (err, rows) => {
    if (err) {
      console.error('Error retrieving services:', err);
      res.status(500).send('Error retrieving services');
      return;
    }
    res.send(rows);
  });
});

app.post('/services', (req, res) => {
  const { service_name, owner_name,phone,address } = req.body;
  const insertRow = "INSERT INTO services (service_name, owner_name,phone ,address) VALUES (?, ?,?,?)";

  db.query(insertRow, [service_name, owner_name,phone,address], (err, result) => {
    if (err) {
      console.error('Error inserting service:', err);
      res.status(500).send('Error inserting service');
      return;
    }
    console.log('Inserted service:', service_name);
    res.send('Service inserted successfully');
  });
});

app.delete('/services/:service_id', (req, res) => {
  const service_id = req.params.service_id;
  const deleteRow = "DELETE FROM services WHERE service_id = ?";

  db.query(deleteRow, [service_id], (err, result) => {
    if (err) {
      console.error('Error deleting service:', err);
      res.status(500).send('Error deleting service');
      return;
    }
    console.log('Deleted service:', service_id);
    res.send('Service deleted successfully');
  });
});



//Demandes
app.get('/demands', (req, res) => {
  const selectAll = 'SELECT * FROM demands';
  db.query(selectAll, (err, rows) => {
    if (err) {
      console.error('Error retrieving demands:', err);
      res.status(500).send('Error retrieving demands');
      return;
    }
    res.send(rows);
  });
});

app.post('/demands', (req, res) => {
  const { demand_id,consumer_name,service_name, owner_name } = req.body;
  const insertRow = "INSERT INTO demands (consumer_name,service_name, owner_name) VALUES (?,?, ?)";

  db.query(insertRow, [consumer_name,service_name, owner_name], (err, result) => {
    if (err) {
      console.error('Error inserting demands:', err);
      res.status(500).send('Error inserting demands');
      return;
    }
    console.log('Inserted demands:', service_name);
    res.send('demands inserted successfully');
  });
});
app.put('/demands/:demand_id', (req, res) => {
  const demand_id = req.params.demand_id;
  const { new_state } = req.body;
  
  const updateRow = "UPDATE demands SET state = ? WHERE demand_id = ?";

  db.query(updateRow, [new_state, demand_id], (err, result) => {
    if (err) {
      console.error('Error updating demand:', err);
      res.status(500).send('Error updating demand');
      return;
    }
    console.log('Updated demand:', demand_id);
    res.send('Demand updated successfully');
  });
});


app.delete('/demands/:demand_id', (req, res) => {
  const demand_id = req.params.demand_id;

  const deleteRow = "DELETE FROM demands WHERE demand_id=?";

  db.query(deleteRow, [demand_id], (err, result) => {
    if (err) {
      console.error('Error deleting demands:', err);
      res.status(500).send('Error deleting demands');
      return;
    }
    console.log('Deleted demands:', demand_id);
    res.send('demands deleted successfully');
  });
});
//conatct
app.get('/contact', (req, res) => {
  const selectAll = 'SELECT * FROM contact';
  db.query(selectAll, (err, rows) => {
    if (err) {
      console.error('Error retrieving contact:', err);
      res.status(500).send('Error retrieving contact');
      return;
    }
    res.send(rows);
  });
});

app.post('/contact', (req, res) => {
  const { name,phone,address,email,description} = req.body;
  const insertRow = "INSERT INTO contact (name,phone,address,email,description) VALUES (?,?,?,?, ?)";

  db.query(insertRow, [name,phone,address,email,description], (err, result) => {
    if (err) {
      console.error('Error inserting contact:', err);
      res.status(500).send('Error inserting contact');
      return;
    }
    console.log('Inserted contact:', name);
    res.send('Contact inserted successfully');
  });
});


// Start server
app.listen(8081, () => {
  console.log('Server started on port ' + PORT);
});

// Close database connection on server shutdown
process.on('SIGINT', () => {
  db.end(err => {
    if (err) {
      console.error('Error closing database connection:', err);
      process.exit(1);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});
