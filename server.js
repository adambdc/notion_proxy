import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic test route
app.get("/api/test-connection", (req, res) => {
  res.json({ message: "Connection successful!" });
});

// Insert record route (replace with actual logic)
app.post("/api/insert-record", (req, res) => {
  console.log("Request received:", req.body);
  res.status(200).json({ status: "Success", received: req.body });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
