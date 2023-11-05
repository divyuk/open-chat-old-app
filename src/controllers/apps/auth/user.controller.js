import { ApiError } from "../../../utilis/ApiError.js";
import { asyncHandler } from "../../../utilis/asyncHandler.js";
import { User } from "../../../models/apps/auth/user.models.js";
import { ApiResponse } from "../../../utilis/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  const user = await User.create({
    email,
    password,
    username,
  });

  const { hashedToken, tokenExpiry } = user.generateToken();
  /**
   * assign hashedToken and tokenExpiry in DB
   */
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "Users registered successfully."
      )
    );
});

export { registerUser };
