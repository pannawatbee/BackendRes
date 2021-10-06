const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomerError = require("../utils/error");
exports.register = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new CustomerError("password and password not match", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name: firstName,
      surname: lastName,
      email: email,
      password: hashedPassword,
      userType: "user",
    });
    res.status(200).json({ message: "your account created" });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // SELECT * FROM users where username = username
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid password" });
    }
    const payload = {
      id: user.id,
      email: user.email,
      username: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 30 * 60 * 60 * 24,
    });
    console.log(token);
    res.json({ message: "success logged in", token });
  } catch (err) {
    next(err);
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    // const headers = req.headers;
    const { authorization } = req.headers; //เก็บ token
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "u are unauthorized" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "u are unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decoed {id:55,email:,username:}
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "u are unauthorized" });
    }
    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
