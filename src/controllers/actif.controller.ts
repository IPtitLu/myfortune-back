const { Actif } = require("../models/Actif");
import { ActifMontantParDate } from "../models/ActifMontantParDate";
import { Category } from "../models/Category";
import { User } from "../models/User";

export const createActif = async (req: any, res: any) => {
    try {
        const { libelle, category, montant, date } = req.body;

        // Vérifier si la catégorie existe, sinon la créer
        let categoryObject = await Category.findOne({ libelle: category });
        if (!categoryObject) {
            categoryObject = new Category({
                libelle: category,
                user: req.user._id,
            });
            await categoryObject.save();
        }

        // Créer un nouvel actif
        const newActif = new Actif({
            libelle,
            category: categoryObject._id, // Utiliser l'ID de la catégorie
        });

        // Créer un nouvel ActifMontantParDate
        const actifMontant = new ActifMontantParDate({
            montant,
            date,
        });

        // Ajouter l'ActifMontantParDate à l'actif
        newActif.montantsParDate.push(actifMontant);

        // Enregistrer l'actif
        await newActif.save();
        await actifMontant.save();

        req.user.actifs.push(newActif._id);
        await req.user.save();

        res.status(201).json(newActif);
    } catch (error) {
        res.status(500).json({ message: "Impossible de créer l'actif" });
    }
};

export const deleteActif = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        await Actif.findByIdAndDelete(id);

        const userId = req.user._id;

        const user = await User.findById(userId);

        if (user && user.actifs) {
            user.actifs = user.actifs.filter((actifId) => actifId !== id);
            await user.save();
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Impossible de supprimer l'actif" });
    }
};

export const getAllCategories = async (req: any, res: any) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Impossible de récupérer la catégorie",
        });
    }
};

export const getAllActifsByCategory = async (req: any, res: any) => {
    try {
        const { category } = req.params;

        // Récupérer tous les actifs de la catégorie spécifiée
        const actifs = await Actif.find({
            category: category,
        }).populate("montantsParDate");

        let totalMontant = 0;
        actifs.forEach((actif: { montantsParDate: any[] }) => {
            actif.montantsParDate.forEach((montantParDate) => {
                totalMontant += montantParDate.montant;
            });
        });

        res.json({ actifs, totalMontant });
    } catch (error) {
        res.status(500).json({
            message: "Impossible de récupérer les actifs par cette catégorie",
        });
    }
};

export const getAllActifs = async (req: any, res: any) => {
    try {
        // Récupérer l'entité utilisateur
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Récupérer les IDs d'actifs de l'entité utilisateur
        const actifIds = user.actifs;

        // Récupérer les actifs correspondants aux IDs
        const userActifs = await Actif.find({
            _id: { $in: actifIds },
        }).populate("montantsParDate");

        let totalMontant = 0;
        userActifs.forEach((actif: { montantsParDate: any[] }) => {
            actif.montantsParDate.forEach((montantParDate) => {
                totalMontant += montantParDate.montant;
            });
        });

        res.json({ userActifs, totalMontant });
    } catch (error) {
        res.status(500).json({ message: "Impossible de récupérer les actifs" });
    }
};
