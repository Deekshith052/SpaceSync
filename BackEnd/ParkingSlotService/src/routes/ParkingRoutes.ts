// src/routes/parkingRoutes.ts
import { Router } from 'express';
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  createMultipleSlots,
} from '../controller/ParkingController';

const router = Router();

// Read operations
router.get('/slots', getAllSlots);
router.get('/slots/:id', getSlotById as any);

// Create operation
router.post('/slots', createSlot);
router.post('/slots/multi',createMultipleSlots as any)

// Update operation
router.put('/slots/:id', updateSlot as any);

// Delete operation
router.delete('/slots/:id', deleteSlot as any);

export default router;
