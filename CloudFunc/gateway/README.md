# Gateway Service

## Description
This project implements a simple **Gateway Service**.

The gateway acts as an entry point for client requests. It receives JSON data from the client, logs the incoming data, and sends a response back.

A JWT verification function is included as a placeholder and does not perform real authentication yet.



Sample request :

{
  
  "token": "sample-token",
  
  "data": "test message"
  
}

Output :
{

  "message": "gateway request received"

}

