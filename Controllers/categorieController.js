const asyncHandler = require("express-async-handler")
const Categorie= require("../Models/categorieModel")

const getCategorie =async (req, res) => {
 try {
  const categories = await Categorie.find()
 return res.status(200).json(categories)
 } catch (error) {
  return res.status(500).json(error)
 }
};
const getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Film not found" });
    }
    return res.status(200).json(categorie);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addCategorie = asyncHandler(async (req, res) => {
    const { name} = req.body;
  
    // Check if any required fields are missing
    if (!name) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
  
   
  
    // Create the film object
    const categorie = await Categorie.create({
         name,
         });
  
    res.status(201).json({
      success: true,
      data: categorie
    });
  });
  
  
    const deleteCategorie= asyncHandler(async (req, res) => {
      const categorie = await Categorie.findById(req.params.id)
      if (!categorie) {
        res.status(400)
        throw new Error("Tache not found")
      }
      await categorie.remove()
      res.status(200).json({ id: req.params.id })
    })
module.exports = {
    getCategorie,
    getCategorieById,
    addCategorie,
    deleteCategorie,
    
}