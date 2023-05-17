import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import filmRouter from './Routes/filmsRoute.js'
import userRouter from './Routes/UserRouter.js'
import partenerRouter from './Routes/PartnersRoute.js'
import cinemaRoute from './Routes/cinemaRoute.js'
import categorieRoure from './Routes/categorieRoure.js'
import projectionRouter from './Routes/ProjectionRouter.js'

import { errorHandler } from './Midllewares/errorMiddlewares.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connectDB()
// main router
app.get('/',(req, res)=> {
    res.send('API is running...');
});
// other router 
app.use('/api/users',userRouter)
app.use('/api/film', filmRouter)
//app.use('/api/country', require('./Routes/countryRoute'))
app.use('/api/partner', partenerRouter)
app.use('/api/cinema', cinemaRoute)
app.use('/api/categorie', categorieRoure)
app.use('/api/projections',projectionRouter)
const PORT = process.env.PORT || 5000;
// error handling middleware
app.use(errorHandler)
app.listen(PORT, ()=> {
    console.log(`Server running in http://localhost:${PORT}`);
});
