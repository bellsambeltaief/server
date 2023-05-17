import express from 'express'
const router = express.Router()
import 
 {
  getFilms,
  addFilm,
  updateFilm,
  deleteFilm,
  getFilmById,
  getFilmCount
} from '../Controllers/filmController.js';

// get my Film
router.get("/", getFilms)
router.get("/:id", getFilmById);
// add Film
router.post("/", addFilm)
//update Film
router.put("/:id", updateFilm)
//delete Film
router.delete("/:id", deleteFilm)
router.get("/count", getFilmCount);


export default router;