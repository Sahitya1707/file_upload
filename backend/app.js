import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import DBConnection from "./controller/connection.js";
import assignmentRouting from "./controller/assignment.js";

// creating express app
const app = express();

DBConnection();
// it handles parsing for the incoming request mainly bodies
// thisis greate for handling the json
// app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));

// initializing cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE, HEAD, OPTIONS",
  })
);
app.use("/uploads", express.static("uploads"));

// initializing routes
app.use("/api/v1/assignments", assignmentRouting);

// initize ports
const port = process.env.PORT || 600;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
