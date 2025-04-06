import express from "express";

import Assignment from "../models/assignment.js";
const router = express.Router();

// getting all the data
router.get("/", async (req, res) => {
  console.log("Get method has been called");
});

// posting data
router.post("/", async (req, res) => {
  console.log("Post method has been called");
});
// if you want to get one data
router.get("/:id", async (req, res) => {
  console.log("single item for get has been called");
});
// if you want to edit your data?
router.put("/:id", async (req, res) => {
  console.log("Edit has been called");
});
// delete
router.post("/:id", async (req, res) => {
  console.log("delete method has been called");
});
export default router;
