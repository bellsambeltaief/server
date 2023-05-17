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
      console.log('this is the film', film)
    ]);

    if (projection.length === 0) {
      return res.status(404).json({ error: 'Projection not found' });
    }

    res.json(projection[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error'+ filmId + ' ' + cinemaId });
  }
});

const createProjection = async (req, res) => {
  const { filmId, cinemaId } = req.body;

  try {
    // Check if film and cinema exist
    const film = await Film.findById(filmId);
    const cinema = await Cinema.findById(cinemaId);

    if (!film || !cinema) {
      return res.status(400).json({ error: 'Film or cinema not found' });
    }

    // Create a new projection entity
    const projection = new Projection({
      film: filmId,
      cinema: cinemaId,
      // Other projection properties...
    });

    // Save the projection to the database
    await projection.save();

    res.status(201).json(projection);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
export { getProjection, getProjectionById,getProjectionByIdFilmAndIdSalle,createProjection };