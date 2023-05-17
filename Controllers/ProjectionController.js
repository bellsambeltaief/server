import asyncHandler from "express-async-handler"
import Projection from "../Models/ProjectionModel.js"

const getProjection = asyncHandler(async (req,res) => {
    try{
      const projs = await Projection.find();
      res.status(200).json(projs);
    }catch(error){
      res.status(400).json({
        message: error.message
      });
     }
  
});

const getProjectionById = asyncHandler(async (req,res) => {
  try{
    const proj = await Projection.find({ film: req.query.id });
    res.status(200).json(proj);
  }catch(error){
    res.status(400).json({
      message: error.message
    });
   }

});

export { getProjection, getProjectionById };