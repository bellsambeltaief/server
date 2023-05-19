const express = require("express")
const router = express.Router()
const {
  getCategorie,
  getCategorieById,
  addCategorie,
  deleteCategorie
} = require("../Controllers/categorieController.js");
const country = require("../Models/categorieModel")

// get my tasks
router.get("/", getCategorie)
router.get("/:id", getCategorieById);

router.post("/",addCategorie)
//delete Film
router.delete("/:id", deleteCategorie)

module.exports = router