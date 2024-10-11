import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AppError } from "../../errors/AppError";
import { RecipeServices } from "./recipe.services";

const createRecipe = catchAsync(async (req, res) => {
  const allCookingdata = JSON.parse(req.body.data);
  const files = req.files as Express.Multer.File[];

  // Use the correct type for the file parameter in the map function
  const image = files.map((file: Express.Multer.File) => file.path);
  const userInformation = {
    name: req.user.username,
    author: req.user.userId,
    profilePicture: req.user?.profilePicture,
  };

  console.log(req.user, "iam user");

  const recipeData = {
    ...allCookingdata,
    ...userInformation,

    image,
  };

  const result = await RecipeServices.createRecipeIntoDb(recipeData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe created succesfull",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const result = await RecipeServices.myRecipeFromDb(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe are retrived succesfull",
    data: result,
  });
});

const getAllRecipe = catchAsync(async (req, res) => {
  const result = await RecipeServices.getAllRecipeFromDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe are retrived succesfull",
    data: result,
  });
});

const getSingleRecipe = catchAsync(async (req, res) => {
  const result = await RecipeServices.getSingleRecipeFromDb(
    req.params.recipeId
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe retrived succesfull",
    data: result,
  });
});

const updateRecipe = catchAsync(async (req, res) => {
  console.log(req.files);
  console.log("iam hit");

  console.log(req.params.id);

  const recipeId = req.params.id;
  const recipeInfo = JSON.parse(req.body.data);
  // Explicitly cast req.files as an array of Express.Multer.File
  const files = req.files as Express.Multer.File[];

  // Extract the path from each file in the array
  const filePaths = files.map((file) => file.path);

  recipeInfo.path = filePaths;

  const result = await RecipeServices.updateRecipeInDb(recipeId, recipeInfo);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe updated succesfull",
    data: result,
  });
});

const deleteRecipe = catchAsync(async (req, res) => {
  const { isDeleted } = req.body;
  console.log(req.body, "delte logl", req.params.recipeId);

  const result = await RecipeServices.deleteRecipeFromDB(
    req.params.recipeId,
    isDeleted
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe deleted successfully",
    data: result,
  });
});

const toggleRecipePublish = catchAsync(async (req, res) => {
  const { action } = req.body;

  console.log(action, "bdoy aciton");
  console.log(req.params.id, "loio i");

  const result = await RecipeServices.updateRecipePublishStatusIntoDb(
    req.params.id,
    action
  );

  console.log(result, "fjdkfjdkf");

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message:
      action === "publish"
        ? "Recipe published successfully"
        : "Recipe unpublished successfully",
    data: result,
  });
});

const rateRecipe = catchAsync(async (req, res) => {
  const { recipeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.userId;
  console.log(recipeId, rating, userId);

  // Validate the rating value
  if (!rating || rating < 1 || rating > 5) {
    throw new AppError(400, "Rating must be between 1 and 5");
  }

  // Add or update the rating
  const result = await RecipeServices.addOrUpdateRating(
    recipeId,
    userId.toString(),
    rating
  );

  sendResponse(res, {
    success: true,

    statusCode: 200,
    message: "Rate successful",
    data: result,
  });
});

// =============comment api service ==============

const createComment = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const recipeId = req.params.recipeId;

  const payloadComment = {
    userId,
    recipeId,
    content: req.body.content,
  };

  console.log(payloadComment, "iam hit");

  const result = await RecipeServices.createCommentForRecipe(payloadComment);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Comment succesfull",
    data: result,
  });
});

const getAllCommentForSpecificRecipe = catchAsync(async (req, res) => {
  const id = req.params.recipeId;
  console.log(id, "recipe id for comment");

  const result = await RecipeServices.getAllCommentForSpecificRecipe(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "all comment retrived succestful",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const userId = req.user.userId as string;

  const result = await RecipeServices.deleteCommentFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Comment deleted succesfull",
    data: result,
  });
});

// const updateUser = catchAsync(async (req, res) => {
//   const paylod = req.body;

//   const result = await UserServices.updateProfileIntoDb(req.user, paylod);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "user updated succesfull",
//     data: result,
//   });
// });
export const RecipeController = {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
  deleteRecipe,
  createComment,
  getAllCommentForSpecificRecipe,
  deleteComment,
  getMyProfile,
  updateRecipe,
  toggleRecipePublish,
  rateRecipe,
};
