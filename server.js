const express = require('express'); // Web framework for Node.js
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors'); // Enable cross-origin requests

const app = express(); // Initialize Express app
const port = 3000; // Define the server port

// Enable CORS to allow requests from other origins (e.g., Angular)
app.use(cors());

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost', // PostgreSQL server address
  database: 'ppc_compressed', // Replace with your database name
  password: 'First#1234', // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// API endpoint to fetch data from PostgreSQL
app.get('/api/data', async (req, res) => {
  try {
    // Query to retrieve data from your table
    const result = await pool.query(
      'SELECT record_timestamp, measurement_value FROM ppc_compressed.lntds_analog_data'
    );
    res.json(result.rows); // Return query result as JSON
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Server Error'); // Send error response
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
