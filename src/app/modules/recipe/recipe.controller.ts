import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { RecipeServices } from "./recipe.services";

const createRecipe = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const userName = req.user.username;
  const result = await RecipeServices.createRecipeIntoDb(userInfo, userName);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe created succesfull",
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

const deleteRecipe = catchAsync(async (req, res) => {
  const result = await RecipeServices.deleteRecipeFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recipe deleted succesfull",
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

  const result = await RecipeServices.getAllCommentForSpecificRecipe(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "",
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
};
