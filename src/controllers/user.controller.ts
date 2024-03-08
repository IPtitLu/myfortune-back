import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import * as jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req: any, res: any) => {
        try {
            const newUser = await this.userService.createUser(req.body);

            if (!newUser) {
                return res
                    .status(400)
                    .json({ message: "Utilisateur non créé" });
            }
            const token = await jwt.sign({ id: newUser._id }, "token", {
                expiresIn: "2h",
            });
            res.status(201).json({ newUser, token });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    getUser = async (req: any, res: any) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur non trouvé" });
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
    getMe = async (req: any, res: any) => {
        try {
            res.status(200).json(req.user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    login = async (req: any, res: any) => {
        try {
            const { email, password } = req.body;
            const user = await this.userService.getUserByEmailAndPassword(
                email,
                password
            );

            const token = await jwt.sign(
                {
                    id: user._id,
                    first_name: user.firstName,
                    last_name: user.lastName,
                },
                "token",
                {
                    expiresIn: "2h",
                }
            );

            res.status(200).json({ user, token });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    updateUser = async (req: any, res: any) => {
        try {
            const updatedUser = await this.userService.updateUser(
                req.params.id,
                req.body
            );
            if (!updatedUser) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur non trouvé" });
            }
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteUser = async (req: any, res: any) => {
        try {
            const deletedUser = await this.userService.deleteUser(
                req.params.id
            );
            if (!deletedUser) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur non trouvé" });
            }
            res.status(200).json({ message: "Utilisateur supprimé" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    renewToken = async (req: any, res: any) => {
        try {
            const renewedToken = jwt.sign(
                { id: req.user._id.toString() },
                "token",
                { expiresIn: "2h" }
            );

            res.status(200).json({ token: renewedToken });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}
