const express = require('express');
const { Pool } = require('pg');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));



const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'functions_db',
    port: 5433
});

app.get('/functions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM functions');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/registerFunction', async (req, res) => {
  const { name, owner, image } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO functions (name, owner, image) VALUES ($1, $2, $3) RETURNING *',
      [name, owner, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});
