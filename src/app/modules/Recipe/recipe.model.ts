import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
    },
  ],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isPremium: {
    type: Boolean, // Whether the recipe is premium content
    default: false,
  },
}, {
  timestamps: true,
});

export const Recipe = model("Recipe", recipeSchema);
