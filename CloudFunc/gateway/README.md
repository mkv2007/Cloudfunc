# Gateway Service

## Description
This project implements a simple **Gateway Service**.

The gateway acts as an entry point for client requests. It receives JSON data from the client, logs the incoming data, and sends a response back.

A JWT verification function is included as a placeholder and does not perform real authentication yet.

---

## How to Run
```bash
node gateway.js
The server runs on port 3000.

Endpoints
Health Check
GET /

arduino
Copy code
Gateway Service is running
Invoke Gateway
POST /invoke

Sample Request (JSON)

json
Copy code
{
  "token": "sample-token",
  "data": "test message"
}
Response

json
Copy code
{
  "message": "gateway request received"
}
Console Output
When a request is received, the server logs:

css
Copy code
JWT verification placeholder
Incoming request data: { ... }
Note
JWT verification logic will be implemented in future assignments.
