import { Model } from "mongoose";
import { Types } from "mongoose";

// Recipe Interface
export interface TIngredient {
  name: string;
  quantity: string;
}

export interface TRating {
  user: Types.ObjectId; // User ID as string
  rating: number; // Rating between 1 and 5
}

export interface TComment {
  recipeId: Types.ObjectId; // Reference to the recipe
  userId: Types.ObjectId; // Reference to the user who made the comment
  content: string;
  createdAt: Date; // Timestamp for when the comment was created
}

export interface TRecipe {
  title: string;
  ingredients?: TIngredient[]; // Array of ingredient objects
  instructions: string;
  cookingTime?: number; // Time in minutes
  image?: string[]; // Optional image URL
  author?: Types.ObjectId; // User ID as string
  ratings?: TRating[]; // Array of rating objects
  upvotes?: Types.ObjectId;
  isPremium?: boolean;
  isPublished:boolean
  name?: string;
  downvotes?: Types.ObjectId;
  isDeleted?: boolean;
}

export interface TRecipeModel extends Model<TRecipe> {
  upvote(recipeId: string, userId: string): Promise<TRecipe>;
  downvote(recipeId: string, userId: string): Promise<TRecipe>;
}
