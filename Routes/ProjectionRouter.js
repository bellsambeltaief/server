import express from 'express'
import { createProjection, getProjection, getProjectionById, getProjectionByIdFilmAndIdSalle } from '../Controllers/ProjectionController.js';

const router = express.Router();
router.get("/getProjection", getProjection);
router.get("/getProjectionById", getProjectionById);
router.get("/getProjectionByIdFilmAndIdSalle/:filmId/:cinemaId",getProjectionByIdFilmAndIdSalle)
router.post("/",createProjection)
export default router;