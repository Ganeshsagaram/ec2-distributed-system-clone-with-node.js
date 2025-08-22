import express from "express";

const app = express();

const PORT=3000;

let busy = false;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.json({ busy, port: PORT });
});




app.get("/work", async (req, res) => {
  if (busy) {
    return res.status(503).send("Instance busy, try again later");
  }

  busy = true;
  console.log(`Worker on port ${PORT} is serving request...`);
  await new Promise(resolve => setTimeout(resolve, 15000));

  busy = false;
  res.send(`Response from worker on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});