import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import pool from './db.js';

import userRoutes from './routes/userRoutes.js';
{/*import userRoutes from './routes/userRoutes.js';
import builderRoutes from './routes/builderRoutes.js';
import buildsRoutes from './routes/buildsRoutes.js';
import forumsRoutes from './routes/forumsRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
*/}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

{/*}
//Routes
app.use("/api/user", userRoutes);
app.use("/api/builder", builderRoutes);
app.use("/api/builds", buildsRoutes);
app.use("/api/forums", forumsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/items", itemRoutes);
*/}
app.use("/api/user", userRoutes);

//Error Handling Middleware
//watch the Indian guy video or ask gpt (i might have a separate middleware file for error handling and then call it here?)

//Testing POSTGRES Connection
app.get("/", async (req, res) => {
    console.log("START");
    const result = await pool.query("SELECT current_database()");
    console.log("END");
    res.send(`The database name is : ${result.rows[0].current_database}`)
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});