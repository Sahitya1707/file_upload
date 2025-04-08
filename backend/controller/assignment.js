import express from "express";
import Assignment from "../models/assignment.js";
import multer from "multer";
import path from "path";
const router = express.Router();

// Setup disk storage to save file in uploads/ folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + // current date
      "-" +
      Math.round(Math.random() * 1e9) + // random number
      path.extname(file.originalname); // taking original name
    cb(null, uniqueName); // call the callback function, second argument is unique name
  },
});

const upload = multer({ storage: storage });

// https://stackoverflow.com/questions/30654747/parsing-post-form-data-node-js-express

// GET all assignments
router.get("/", async (req, res) => {
  try {
    console.log("✅ GET: All assignments");

    // Fetch all assignments from MongoDB
    const assignments = await Assignment.find();

    res.status(200).json({
      message: "Fetched all assignments successfully!",
      count: assignments.length,
      data: assignments,
    });
  } catch (error) {
    console.error("❌ Error in GET /:", error.message);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// POST a new assignment
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("✅ POST: New assignment");

    const { studentName, title, description } = req.body;
    const file = req.file;

    // Log useful info only
    console.log("📩 Body Data:", { studentName, title, description });
    console.log("📎 Uploaded File:", {
      originalname: file.originalname,
      savedAs: file.filename,
    });

    // Save to MongoDB using your model
    const newAssignment = new Assignment({
      studentName,
      title,
      description,
      filename: file.filename, // This matches your model's "filename" field
    });

    await newAssignment.save();

    res.status(201).json({
      message: "Assignment received and saved!",
      data: newAssignment,
    });
  } catch (error) {
    console.error("❌ Error in POST /:", error.message);
    res.status(500).json({ error: "Failed to create assignment" });
  }
});

// GET a single assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`✅ GET: Assignment with ID ${id}`);

    res.status(200).json({ message: `Fetched assignment with ID ${id}` });
  } catch (error) {
    console.error("❌ Error in GET /:id:", error.message);
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
});

// PUT (update) an assignment by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`✅ PUT: Update assignment with ID ${id}`);

    res.status(200).json({ message: `Updated assignment with ID ${id}` });
  } catch (error) {
    console.error("❌ Error in PUT /:id:", error.message);
    res.status(500).json({ error: "Failed to update assignment" });
  }
});

// DELETE an assignment by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`✅ DELETE: Delete assignment with ID ${id}`);

    res.status(200).json({ message: `Deleted assignment with ID ${id}` });
  } catch (error) {
    console.error("❌ Error in DELETE /:id:", error.message);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
});

export default router;
