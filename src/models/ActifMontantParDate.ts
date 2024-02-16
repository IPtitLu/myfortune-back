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

export const ActifMontantParDate = mongoose.model(
    "ActifMontantParDate",
    actifMontantParDateSchema
);
