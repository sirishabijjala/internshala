const dbConfig = {
    user: 'system',
    password: 'manager',
    connectString: 'localhost:/orcl', // Replace 'localhost/orcl' with your actual connection string
  };// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const oracledb = require('oracledb');


// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Oracle DB Connection Pool setup
const initializeOracleDB = async () => {
  try {
    await oracledb.createPool({
      user: 'system',
      password: 'manager',
      connectString: 'localhost:/orcl',
      poolAlias: 'mypool',
      poolMin: 2,
      poolMax: 10,
      queueTimeout: 1200000,
    });
    console.log('Oracle DB Pool Created');
  } catch (error) {
    console.error('Error creating Oracle DB Pool: ', error);
  }
};

// Initialize Oracle DB connection pool
initializeOracleDB();
app.get('/api/signup/:email?', async (req, res) => {
    const { email } = req.params;
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      let query = 'SELECT * FROM signup';
      let bindParams = [];
  
      if (email) {
        query += ' WHERE email = :email';
        bindParams.push(email);
      }
  
      const result = await connection.execute(query, bindParams);
  
      if (result.rows.length === 0) {
        res.status(404).send('Data not found');
      } else {
        res.json(result.rows);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
  
  
  app.post('/api/signup', async (req, res) => {
    const { name,phone,email, p,cp } = req.body;
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      await connection.execute(
        `INSERT INTO signup (name, phone,email,p, cp) VALUES (:name, :phone, :email, :p, :cp)`,
        { name,phone, email, p, cp },
        { autoCommit: true }
      );
  
      res.status(201).send('Data added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
  
  app.put('/api/signup/:email', async (req, res) => {
    
    const {  name ,phone,  email , p, cp } = req.body;
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      await connection.execute(
        `UPDATE signup SET name = :name, phone = :phone, email= :email, p = :p, cp = :cp WHERE email = :email`,
        {  name, phone, email, p ,cp },
        { autoCommit: true }
      );
  
      res.status(200).send('Data updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
  
  app.delete('/api/signup/:email', async (req, res) => {
    const email = req.params.email;
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      await connection.execute(`DELETE FROM signup WHERE email = :email`, [email], { autoCommit: true });
  
      res.status(200).send('Data deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
  
  
  app.post('/api/login', async (req, res) => {
    const { email, p } = req.body;
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      const result = await connection.execute(
        `SELECT * FROM signup WHERE email = :email AND p = :p`,
        { email, p }
      );
  
      if (result.rows.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        res.status(200).send('Login successful');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
  // Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});