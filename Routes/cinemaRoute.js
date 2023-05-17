import express from 'express'
const router = express.Router()
import {
  getCinema,
  getCinemaById,
  addCinema,
  updateCinema,
  deleteCinema
} from '../Controllers/cinemaController.js'
//const country = require("../Models/cinemaModel")

// get my tasks
router.get("/", getCinema)
router.get("/:id", getCinemaById);

router.post("/",addCinema)
router.put("/:id", updateCinema)
//delete Film
router.delete("/:id", deleteCinema)

export default router;