import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();

app.use(express.json());

// enable cors
app.use(cors());

// mongodb connection
const PORT = process.env.PORT || 3333;
const mongoURI = process.env.MONGO_URI || "";

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Could not connect to MongoDB", err);
    });

// lancement de l'application
app.listen(PORT, () => {
    console.log(`Server lancé sur le port ${PORT}`);
});
