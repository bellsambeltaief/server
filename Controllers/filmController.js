import asyncHandler from "express-async-handler"
import  Film  from "../Models/filmModel.js";

const getFilms =async (req, res) => {
 try {
  const films = await Film.find()
 return res.status(200).json(films)
 } catch (error) {
  return res.status(500).json(error)
 }
}
const getFilmCount = asyncHandler(async (req, res) => {
  try {
    // Count all films in the database
    const count = await Film.countDocuments({});
    console.log(`Number of films in database: ${count}`);
    res.json({ count: parseInt(count) }); // Use parseInt to convert count to a number
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).json(film);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const addFilm = asyncHandler(async (req, res) => {
  const { title, description,  categorie,partner, type, age, image, video,imagesStars,listProjection } = req.body;

  // Check if any required fields are missing
  if (!title || !description ||!partner  || !categorie || !type || !age || !image || !listProjection) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Convert the age field to a number
  const ageN = parseInt(age);

  // Convert the date field to a Date object
 /*const dateParts = date.split("/");
const dateObject = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);
const formattedDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;*/

 

  // Create the film object
  const film = await Film.create({
    title,
    description,
    categorie,
    partner,
    type,
    age: ageN,
    image,
    video,
    imagesStars,
    listProjection,

  });

  res.status(201).json({
    success: true,
    data: film
  });
});


const updateFilm = asyncHandler(async (req, res) => {
const film = await Film.findById(req.params.id)
if (!film) {
   res.status(400)
  throw new Error("Tache not found")
  }
 const updatedfilm = await Film.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
 })
 res.status(200).json(updatedfilm)
 })

const deleteFilm = asyncHandler(async (req, res) => {
  const film = await Film.findById(req.params.id)
  if (!film) {
    res.status(400)
    throw new Error("Tache not found")
  }
  await film.remove()
  res.status(200).json({ id: req.params.id })
})
export  {
  getFilms,
  addFilm,
  updateFilm,
  deleteFilm,
  getFilmById,
  getFilmCount
}