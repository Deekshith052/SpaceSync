import { Router } from 'express';
import { createFeedback, deleteFeedback, getAllFeedback, getFeedbackById, getFeedbacksByUserId, updateFeedback} from '../controllers/controller';

const router = Router();

router.post('/feedback', createFeedback);
router.get('/feedback', getAllFeedback);
router.get('/feedback/:id', getFeedbackById as any);
router.get('/feedbackByUserId/:userId', getFeedbacksByUserId as any);
router.put('/feedback/:id', updateFeedback as any);
router.delete('/feedback/:id', deleteFeedback as any);

export default router;
