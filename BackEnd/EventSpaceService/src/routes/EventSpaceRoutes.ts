// src/routes/eventspaceRoutes.ts
import express from "express";
import {
    getEventSpaces,
    getEventSpace,
    createEventSpace,
    updateEventSpace,
    deleteEventSpace,
    getEventSpacesByCapacity,
    createMultipleEvents
} from "../controller/EventSpaceController";

const router = express.Router();

// Route to get all event spaces
router.get("/eventspace", getEventSpaces);

// Route to get a single event space by ID
router.get("/eventspace:id", getEventSpace);
router.get("/eventspaceByCapacity/:capacity",getEventSpacesByCapacity as any)
// Route to create a new event space
router.post("/eventspace", createEventSpace);
router.post("/eventspaceMulti", createMultipleEvents as any);
// Route to update an existing event space by ID
router.put("/eventspace/:id", updateEventSpace);

// Route to delete an event space by ID
router.delete("/eventspace/:id", deleteEventSpace);

export default router;
