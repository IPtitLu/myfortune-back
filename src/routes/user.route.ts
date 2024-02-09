import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router: Router = express.Router();

//load controller
const userController = new UserController();

//user routes
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.post("/renewtoken", verifyToken, userController.renewToken);
router.get("/me", verifyToken, userController.getMe);
router.get("/:id", verifyToken, userController.getUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
