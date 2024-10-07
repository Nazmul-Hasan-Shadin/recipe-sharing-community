import { Schema, model } from "mongoose";
import { TRecipeModel, TComment, TRecipe } from "./recipe.interface";

const recipeSchema = new Schema<TRecipe, TRecipeModel>(
  {
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
      // required: true,
    },
    image: [{ type: String }],
    name: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],

    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isPremium: {
      type: Boolean, // Whether the recipe is premium content
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// comment model
const commentSchema = new Schema<TComment>(
  {
    recipeId: {
      type: Schema.ObjectId,
      ref: "Recipe",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  },
  { versionKey: false, timestamps: true }
);

export const Comment = model<TComment>("Comment", commentSchema);

export const Recipe = model<TRecipe>("Recipe", recipeSchema);
