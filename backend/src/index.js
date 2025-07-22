import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import pool from './config/db.js'; //import to make it db.js not just db

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

//Routes


//Error Handling Middleware


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