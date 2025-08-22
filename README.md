# What it is
Distributed Load Balancer System (Express.js + Node.js + Docker)

This project demonstrates a simple load balancing system (similar to how EC2 distributes traffic).
It uses Express.js, Node.js, and Docker to spin up a gateway (load balancer) and multiple worker services.

The gateway distributes requests round-robin style across the workers.

# ⚙️ Setup Instructions
1. Clone the Repository
``` bash
git clone <your-repo-url>
cd <repo-folder>
```
2. Install Dependencies
```bash
npm install
```
3. Check Docker Engine
```bash
docker --version
```
4. Start the Services
```bash
docker compose up --build
```
5. This will start:

Gateway (Load Balancer) → localhost:8080

Worker 1 → internal service

Worker 2 → internal service

# Testing the System
1. Send a request to the gateway:
   ```bash
   curl http://localhost:8080/work
    ```
The first request will be routed to Worker 1.

Check the container logs in your terminal.

2. Send the request again:
```bash
curl http://localhost:8080/work
```
Now, the request will be routed to Worker 2.

3.Keep repeating to observe round-robin load distribution.

4.Check the status of each port by sending request to "/health" route. Like for Individual workers 3001/health 3002/health.

5.Which Sends the JSON response whether the given port worker is busy or not

# 🎛️ Customization:
Endpoints: You can modify the routes in the Gateway (LB) server.

Port Mapping: Adjust the exposed ports in the Dockerfile or docker-compose.yml.

Without Docker: You can also run services locally (manually start two workers on different ports). 

Example:
```bash
node worker/app.js --port=3001
node worker/app.js --port=3002
node gateway/loadbalancer.js
```

# Notes:
Ensure no other services are already running on port 8080.

Logs are shown directly in the terminal where Docker services are running.

You can extend the system by adding more workers in the docker-compose.yml.

# High Level Overview:

```bash
                ┌─────────────────────────┐
                │        Clients          │
                │ (curl / browser / API)  │
                └───────────┬─────────────┘
                            │
                            ▼
                 ┌───────────────────────┐
                 │   Load Balancer (LB)  │
                 │  - Node.js Gateway    │
                 │  - Round robin / Free │
                 └───────┬───────────────┘
      ┌──────────────────┴───────────────────┐
      ▼                                      ▼
┌───────────────┐                   ┌───────────────┐
│   Worker 1    │                   │   Worker 2    │
│ (Node.js App) │                   │ (Node.js App) │
│  - /work      │                   │  - /work      │
│  - /health    │                   │  - /health    │
└───────────────┘                   └───────────────┘

(All connected inside Docker network)
```

# Conclusion:

Now you have a simple distributed load balancer system running locally with Docker
