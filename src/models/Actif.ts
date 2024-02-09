const mongoose = require("mongoose");

const actifSchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    montant: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
});

export const Actif = mongoose.model("Actif", actifSchema);
