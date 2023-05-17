import asyncHandler from "express-async-handler"
import Projection from "../Models/ProjectionModel.js"
import mongoose from "mongoose";
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

const getProjectionByIdFilmAndIdSalle = asyncHandler(async (req, res) => {
  const { filmId, cinemaId } = req.params;

  try {
    const projection = await Projection.aggregate([
      {
        $lookup: {
          from: 'films',
          localField: 'film',
          foreignField: '_id',
          as: 'film',
        },
      },
      {
        $lookup: {
          from: 'cinemas',
          localField: 'cinema',
          foreignField: '_id',
          as: 'cinema',
        },
      },
      {
        $match: {
          'film._id': mongoose.Types.ObjectId(filmId),
          'cinema._id': mongoose.Types.ObjectId(cinemaId),
        },
      },
      {
        $project: {
          film: { $arrayElemAt: ['$film', 0] },
          cinema: { $arrayElemAt: ['$cinema', 0] },
        },
        
      },
    ]);

    if (projection.length === 0) {
      return res.status(404).json({ error: 'Projection not found' });
    }

    res.json(projection[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error'+ filmId + ' ' + cinemaId });
    console.error(error);
  }
});

async function createProjection(req, res) {
  console.log("creating projection")
  try {
    const { dateProjection, prix, cinemaId, filmId } = req.body;

    // Fetch the film and cinema documents
    const film = await Film.findById(filmId);
    const cinema = await Cinema.findById(cinemaId);
console.log(film);
    // Check if film and cinema exist
    if (!film || !cinema) {
      return res.status(404).json({ error: 'Film or cinema not found' });
    }

    const projection = new Projection({
      dateProjection,
      prix,
      cinema: cinema._id,
      film: film._id
    });

    const savedProjection = await projection.save();
    res.status(201).json(savedProjection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create projection'   });
  }
}

export { getProjection, getProjectionById,getProjectionByIdFilmAndIdSalle,createProjection };