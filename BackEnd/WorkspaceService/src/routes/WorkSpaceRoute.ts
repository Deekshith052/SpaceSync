import express from 'express';
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspacesByProjectName,
  createMultipleWorkspaces,
} from '../controller/WorkspaceController';

const router = express.Router();

router.get('/workspace', getWorkspaces);
router.get('/workspace/:id', getWorkspace);
router.get('/workspaceByProject',getWorkspacesByProjectName as any);
router.post('/workspace', createWorkspace);
router.post('/workspaceMulti', createMultipleWorkspaces as any);
router.put('/workspace/:id', updateWorkspace);
router.delete('/workspace/:id', deleteWorkspace);

export default router;