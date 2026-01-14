const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

function verifyJWT(req, res, next) {
  console.log("JWT verification placeholder");
  next();
}

app.post("/invoke", verifyJWT, async (req, res) => {
  const { functionName, payload } = req.body;

  if (!functionName || !payload) {
    return res.status(400).json({
      error: "functionName and payload are required"
    });
  }

  try {
 
    const registryResponse = await axios.get(
      `http://localhost:3001/function/${functionName}`
    );

    const { image } = registryResponse.data;

    const containerResponse = await axios.post(
      "http://localhost:4000/execute",   
      {
        imageName: image,
        payload: payload
      }
    );
    
    res.status(200).json({
      functionName,
      result: containerResponse.data
    });

  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Function not registered" });
    }

    console.error(error.message);
    res.status(500).json({ error: "Gateway error" });
  }
});

app.get("/", (req, res) => {
  res.send("Gateway Service is running");
});

app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
});
