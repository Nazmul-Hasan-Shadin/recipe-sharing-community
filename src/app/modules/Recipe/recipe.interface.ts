

// Recipe Interface
export interface TIngredient {
  name: string;
  quantity: string;
}

export interface TRating {
  user: string; // User ID as string
  rating: number; // Rating between 1 and 5
}

export interface TComment {
  user: string; // User ID as string
  comment: string;
  date: Date;
}

export interface TRecipe {
  title: string;
  ingredients: TIngredient[]; // Array of ingredient objects
  instructions: string;
  cookingTime: number; // Time in minutes
  image?: string; // Optional image URL
  author: string; // User ID as string
  ratings: TRating[]; // Array of rating objects
  comments: TComment[]; // Array of comment objects
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}
