import mongoose from 'mongoose'
const { Schema } = mongoose;

const ProjectionSchema = new Schema({
    dateProjection: { type: Date, required: true },
    prix: { type: Number, required: true },
    cinemaId: { type: Schema.Types.ObjectId, ref: 'Cinema', required: true },
    filmId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    //tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    //seance: { type: Schema.Types.ObjectId, ref: 'Seance', required: true }
});

const Projection = mongoose.model('Projection', ProjectionSchema);
export default Projection;