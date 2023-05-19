const express = require("express");
const router = express.Router();
const {
  getFilms,
  addFilm,
  updateFilm,
  deleteFilm,
  getFilmById,
  getFilmsByIdCategorie,
} = require("../Controllers/filmController");

// get all Films
router.get("/", getFilms);
// get Film by ID
router.get("/:id", getFilmById);
// get Films by Category ID
router.get("/categorie/:idCategorie", getFilmsByIdCategorie);
// add Film
router.post("/", addFilm);
// update Film
router.put("/:id", updateFilm);
// delete Film
router.delete("/:id", deleteFilm);

module.exports = router;
