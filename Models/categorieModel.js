const mongoose = require("mongoose")

const categorieSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please add an name"],
    }, 
    idFilm: {
      type: String,
      //required: [true, "Please add an name"],
    }, 
  
},
    {
      timestamps: true,
    },

  )
  module.exports = mongoose.model("categorie", categorieSchema)