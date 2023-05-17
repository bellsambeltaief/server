import express from 'express'
import { getProjection, getProjectionById } from '../Controllers/ProjectionController.js';

const router = express.Router();
router.get("/getProjection", getProjection);
router.get("/getProjectionById", getProjectionById);

export default router;