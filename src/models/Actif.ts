const mongoose = require("mongoose");

const actifSchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    montantsParDate: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ActifMontantParDate",
        },
    ],
});

export const Actif = mongoose.model("Actif", actifSchema);
