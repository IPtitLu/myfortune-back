const mongoose = require("mongoose");

const actifMontantParDateSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const ActifMontantParDate = mongoose.model(
    "ActifMontantParDate",
    actifMontantParDateSchema
);

export const Actif = mongoose.model("Actif", actifMontantParDateSchema);
