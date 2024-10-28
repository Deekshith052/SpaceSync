import express from 'express';
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '../controller/WorkspaceController';

const router = express.Router();

router.get('/', getWorkspaces);
router.get('/:id', getWorkspace);
router.post('/', createWorkspace);
router.put('/:id', updateWorkspace);
router.delete('/:id', deleteWorkspace);

export default router;
