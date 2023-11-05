import { ApiError } from "../../../utilis/ApiError";
import { asyncHandler } from "../../../utilis/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  const user = await User.Create({
    email,
    password,
    username,
  });
});
