import { asyncHandler } from "../../../utilis/asyncHandler";

const registerUser = asyncHandler((req, res) => {
  const { email, username, password, role } = req.body;
});
