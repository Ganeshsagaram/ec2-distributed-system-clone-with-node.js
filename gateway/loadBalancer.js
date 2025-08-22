import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Load Balancer is running!");
});

const workers = ["http://worker1:3000/work", "http://worker2:3000/work"];
let current = 0;

app.use("/work", async (req, res, next) => {
  // Round robin selection
  
  const target = workers[current];
  console.log(current)
  current = (current + 1) % workers.length;
  
  console.log(`Routing request to ${target}`);
  return createProxyMiddleware({ target, changeOrigin: true})(req, res, next);
});

app.listen(PORT, () => console.log(`Load balancer running on ${PORT}`));