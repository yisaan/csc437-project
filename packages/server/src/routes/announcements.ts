import express, { Request, Response } from "express";
import { authenticateUser } from "./auth";
import announcementSvc from "../services/announcement-svc";

const router = express.Router();

// GET /api/announcements
router.get("/", async (req: Request, res: Response) => {
  try {
    const all = await announcementSvc.list();
    res.status(200).json(all);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).send("Server error");
  }
});

// POST /api/announcements
router.post("/", authenticateUser, async (req: Request, res: Response) => {
  const { content, date } = req.body as {
    content: string;
    date: string; // frontend will post a date‐string (YYYY-MM-DD), so parse it
  };

  // Validate presence
  if (!content || typeof content !== "string" || !date || typeof date !== "string") {
    res.status(400).send("Bad request: missing content or date");
    return;
  }

  // Parse date string into a JavaScript Date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    res.status(400).send("Bad request: invalid date format");
    return;
  }

  // Get `createdBy` from token payload. We only care about the "username" field.
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.split(" ")[1] || "";
  let createdBy = "anonymous";
  try {
    // decode (without verifying) just to extract the username from JWT
    const jwt = require("jsonwebtoken");
    const decoded: any = jwt.decode(token);
    if (decoded && decoded.username) {
      createdBy = decoded.username;
    }
  } catch {
    /* ignore—default to "anonymous" */
  }

  try {
    const newAnn = await announcementSvc.create(content, parsedDate, createdBy);
    res.status(201).json(newAnn);
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).send("Server error");
  }
});

export default router;
