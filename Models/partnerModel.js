import mongoose from 'mongoose';

const partnerSchema = mongoose.Schema(
  {
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },

    firstName: {
      type: String,
      required: [true, "Please add an firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please add an LastName"],
    },
    email: {
      type: String,
      required: [true, "Please add an Email"],
    },
    
    
    
  },
  {
    timestamps: true,
  },
)
export default mongoose.model("Partner", partnerSchema)