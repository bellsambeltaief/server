import asyncHandler from "express-async-handler"
import Cinema from '../Models/cinemaModel.js'

const getCinema =async (req, res) => {
 try {
  const cinemas = await Cinema.find()
 return res.status(200).json(cinemas)
 } catch (error) {
  return res.status(500).json(error)
 }
}
const getCinemaById = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).json(cinema);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addCinema = asyncHandler(async (req, res) => {
    const { name,description, dateCreation, capacite, address, email,tel, site, urlLogo} = req.body;
  
    // Check if any required fields are missing
    if (!name || !description ||!capacite || !address ) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
  
    // Convert the age field to a number
    const capaciteN = parseInt(capacite);
  
  
  
    // Create the film object
    const cinema = await Cinema.create({
         name,
         description,
         dateCreation,
         capacite: capaciteN,
         address,
         email,
         tel,
         site,
         urlLogo,
         });
  
    res.status(201).json({
      success: true,
      data: cinema
    });
  });
  
  const updateCinema = asyncHandler(async (req, res) => {
    const cinema = await Cinema.findById(req.params.id)
    if (!cinema) {
       res.status(400)
      throw new Error("Tache not found")
      }
     const updatedcinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
     })
     res.status(200).json(updatedcinema)
     })
    
    const deleteCinema = asyncHandler(async (req, res) => {
      const cinema = await Cinema.findById(req.params.id)
      if (!cinema) {
        res.status(400)
        throw new Error("Tache not found")
      }
      await cinema.remove()
      res.status(200).json({ id: req.params.id })
    })
export {
    getCinema,
    getCinemaById,
    addCinema,
    updateCinema,
    deleteCinema,
    
}