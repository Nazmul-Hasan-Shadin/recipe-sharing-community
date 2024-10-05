import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ActivityServices } from "./activity.services";

const followUser = catchAsync(async (req, res) => {
  const userInfo = {
    id: req.user.userId,
    targetId: req.params.id,
  };

  const result = await ActivityServices.followUserIntoDb(userInfo);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Followed",
    data: result,
  });
});

export const upvoteRecipeController = catchAsync(async (req, res) => {
  console.log("iam hit");

  const { recipeId: optionalid, type } = req.body;

  const { recipeId } = req.params;
  const userId = req.user.userId;

  const upvoteCount = await ActivityServices.toggleVoteRecipe(
    recipeId,
    userId,
    type
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "upvote succesful",
    data: upvoteCount,
  });
});
export const ActivityController = {
  followUser,
  upvoteRecipeController,
};
