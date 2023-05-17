import express from 'express'
const router = express.Router()
import {
  getCategorie,
  getCategorieById,
  addCategorie,
  deleteCategorie
} from '../Controllers/categorieController.js'
//const country = require("../Models/categorieModel")

// get my tasks
router.get("/", getCategorie)
router.get("/:id", getCategorieById);

router.post("/",addCategorie)
//delete Film
router.delete("/:id", deleteCategorie)

export default router;