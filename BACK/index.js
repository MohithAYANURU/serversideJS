import "dotenv/config"; 
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./config/db.js";
import studentRouter from "./routes/studentsRoute.js";

const app = express();
const port = process.env.PORT || 3000; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));


app.use("/api/students", studentRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running ...");
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectToMongoDB();
    
    app.listen(port, () => {
      console.log(` Connected to MongoDB`);
      console.log(` Server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();