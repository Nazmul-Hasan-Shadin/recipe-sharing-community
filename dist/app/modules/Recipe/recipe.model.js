"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: String,
            quantity: String,
            checked: { type: Boolean, default: false }, // For ingredient checklist
        },
    ],
    instructions: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number, // in minutes
        required: true,
    },
    image: {
        type: String, // URL or local file path
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ratings: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, min: 1, max: 5 },
        },
    ],
    upvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    isPremium: {
        type: Boolean, // Whether the recipe is premium content
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// comment model
const commentSchema = new mongoose_1.Schema({
    recipeId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Recipe", // Reference to the Recipe model
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false, timestamps: true });
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
