const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: password,
      name: name,
    });
    const result = user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {}
};
