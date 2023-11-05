import { asyncHandler } from "../../../utilis/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
  }
});
