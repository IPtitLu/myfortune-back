const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    actifs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actif",
        },
    ],
});

export const Category = mongoose.model("Category", categorySchema);
