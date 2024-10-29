// src/routes/eventspaceRoutes.ts
import express from "express";
import {
    getEventSpaces,
    getEventSpace,
    createEventSpace,
    updateEventSpace,
    deleteEventSpace
} from "../controller/EventSpaceController";

const router = express.Router();

// Route to get all event spaces
router.get("/", getEventSpaces);

// Route to get a single event space by ID
router.get("/:id", getEventSpace);

// Route to create a new event space
router.post("/", createEventSpace);

// Route to update an existing event space by ID
router.put("/:id", updateEventSpace);

// Route to delete an event space by ID
router.delete("/:id", deleteEventSpace);

export default router;
