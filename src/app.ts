import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route";
import actifRoutes from "./routes/actif.route";

dotenv.config();

const app: Application = express();

app.use(express.json());

// enable cors
app.use(cors());

// mongodb connection
const PORT = process.env.PORT || 3333;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("MONGO_URI is not defined in .env");
    process.exit(1); // Quitte le processus avec un code d'erreur
}

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Could not connect to MongoDB", err);
    });

// define a route handler for the health check route
app.route("/").get((req, res) =>
    res.send("Meal fit Express + TypeScript Server")
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/actifs", actifRoutes);

// lancement de l'application
app.listen(PORT, () => {
    console.log(`Server lancé sur le port ${PORT}`);
});
