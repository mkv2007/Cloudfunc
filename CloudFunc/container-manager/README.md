# Container Manager Service (CloudFunc)

The Container Manager Service is a Node.js application that demonstrates **dynamic container creation and execution**, which is the fundamental concept behind CloudFunc and other serverless platforms.

---

## Service Description

This service exposes a single HTTP endpoint that, when called, performs the following steps:

* Connects to the local Docker daemon using the **dockerode** SDK
* Dynamically creates a short-lived Docker container
* Executes a simple test command inside the container
* Captures the container’s standard output
* Stops and removes the container automatically after execution

This ensures no containers remain running or unused after the request is completed.

---

## Executed Command

The container runs the following command:

```
echo "Hello from CloudFunc"
```

This confirms that the container was created, executed successfully, and destroyed.

---

## Project Structure

```
container-manager/
├── index.js            # Express server and Docker logic
├── package.json        # Project metadata and dependencies
└── package-lock.json   # Dependency lock file
```

---

## Requirements

* Node.js installed on the system
* Docker installed and running
* Permission to access the Docker socket

---

## Installation

Install required dependencies using:

```bash
npm install
```

---

## Running the Service

Start the service with:

```bash
npm start
```

The server will run on:

```
http://localhost:3000
```

---

## API Endpoint

### GET /spawnTestContainer

This endpoint triggers the creation and execution of a temporary Docker container.

**Example request:**

```bash
curl http://localhost:3000/spawnTestContainer
```

**Example response:**

```json
{
  "success": true,
  "output": "Hello from CloudFunc"
}
```

---

## Purpose in CloudFunc

This service demonstrates key CloudFunc principles:

* On-demand execution through HTTP requests
* Strong isolation using containers
* Stateless and short-lived workloads
* Automatic resource cleanup after execution

---

## Status

This project is a working prototype intended to validate dynamic container execution for CloudFunc.
