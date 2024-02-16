import express, { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
    createActif,
    deleteActif,
    getAllActifs,
    getAllActifsByCategory,
    getAllCategories,
} from "../controllers/actif.controller";

const router: Router = express.Router();

router.post("/create-actif", verifyToken, createActif);
router.delete("/delete-actif/:id", verifyToken, deleteActif);
router.get("/get-all-categories", verifyToken, getAllCategories);
router.get("/get-all-actifs/:category", verifyToken, getAllActifsByCategory);
router.get("/get-all-actifs", verifyToken, getAllActifs);

export default router;
