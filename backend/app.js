import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import DBConnection from "./controller/connection.js";

// creating express app
const app = express();

DBConnection();
// it handles parsing for the incoming request mainly bodies
app.use(bodyParser.json());

// initializing cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE, HEAD, OPTIONS",
  })
);

// initize ports
const port = process.env.PORT || 600;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
