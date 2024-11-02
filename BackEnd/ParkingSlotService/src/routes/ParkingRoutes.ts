// src/routes/parkingRoutes.ts
import { Router } from 'express';
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  createMultipleSlots,
  getAvailability,
  getSlotsWithFloorAndType,
} from '../controller/ParkingController';

const router = Router();

// Read operations
router.get('/parking/slots', getAllSlots);
router.get('/parking/slots/:id', getSlotById as any);

// Create operation
router.post('/parking/slots', createSlot);
router.post('/parking/slots/multi',createMultipleSlots as any)

// Update operation
router.put('/parking/slots/:id', updateSlot as any);

// Delete operation
router.delete('/parking/slots/:id', deleteSlot as any);


router.get('/parking/slotsAvailable',getAvailability);

router.get('/parking/slotsByFloorAndType',getSlotsWithFloorAndType);

export default router;
