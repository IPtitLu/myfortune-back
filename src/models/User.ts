import mongoose, { Model, Schema } from "mongoose";
const bcrypt = require("bcrypt");

export interface IUser {
    firstName?: string;
    lastName?: string;
    email: string;
    passwordHash: string;
    actifs?: string[];
    categories?: string[];
}

const userSchema = new Schema<IUser, Model<IUser>>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    actifs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actif" }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

// Méthode pour comparer le mot de passe haché
userSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compare(password, this.passwordHash);
};

// Pré-hook pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) return next();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.passwordHash, salt);
    this.passwordHash = passwordHash;
    next();
});

export const User = mongoose.model("User", userSchema);
