import mongoose from 'mongoose';

const categorieSchema = mongoose.Schema(
  {
    
    name: {
        type: String,
        required: [true, "Please add an name"],
      }, 
    
},
    {
      timestamps: true,
    },

  )
  export default mongoose.model("Categorie", categorieSchema)