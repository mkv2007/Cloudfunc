const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

function verifyJWT(req, res, next) {
  console.log("JWT verification placeholder");
  next();
}

app.post("/invoke", verifyJWT, (req, res) => {
  console.log("Incoming request data:", req.body);
  res.status(200).json({
    message: "gateway request received"
  });
});

app.get("/", (req, res) => {
  res.send("Gateway Service is running");
});

app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
});

