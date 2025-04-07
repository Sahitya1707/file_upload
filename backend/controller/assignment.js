import express from "express";
import Assignment from "../models/assignment.js";
import multer from "multer";
const router = express.Router();
const upload = multer(); // https://stackoverflow.com/questions/30654747/parsing-post-form-data-node-js-express

// GET all assignments
router.get("/", async (req, res) => {
  try {
    console.log("✅ GET: All assignments");

    res.status(200).json({ message: "Fetched all assignments successfully!" });
  } catch (error) {
    console.error("❌ Error in GET /:", error.message);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// POST a new assignment
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("✅ POST: New assignment");
    console.log(req);
    console.log("Body data:", req.body);
    console.log("file", req.file);

    res.status(201).json({ message: "Assignment received!" });
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
