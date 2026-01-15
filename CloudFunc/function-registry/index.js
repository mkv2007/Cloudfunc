const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',   // ⚠️ change if your password is different
  database: 'functions_db',
  port: 5432
});

app.get('/', (req, res) => {
  res.send('Function Registry is running');
});

// Register a function
app.post('/registerFunction', async (req, res) => {
  const { name, owner, image } = req.body;

  if (!name || !owner || !image) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO functions (name, owner, image) VALUES ($1, $2, $3) RETURNING *',
      [name, owner, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/function/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const result = await pool.query(
      'SELECT name, owner, image FROM functions WHERE name = $1',
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Function not found' });
    }

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/functions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM functions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3001, () => {
  console.log('Function Registry running on port 3001');
});
