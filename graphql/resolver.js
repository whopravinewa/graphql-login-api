const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const result = await user.save();
    return { ...result._doc, _id: result._id.toString() };
  },
  user: async function (args, req) {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("No User found");
      throw error;
    }
    return { ...user._doc, _id: user._id.toString() };
  },
};
