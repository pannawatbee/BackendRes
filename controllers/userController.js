const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomerError = require("../utils/error");
// const JWT_SECRET_KEY =abcdef
exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
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
    const test = req.body;
    // console.log(test.formData.email);
    const user = await User.findOne({ where: { email: test.formData.email } });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      test.formData.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const payload = {
      // ข้อมูลจากหล้งบ้านที่ต้องการส่งไปที่หน้าบ้าน
      id: user.id,
      email: user.email,
      username: user.name,
      userType: user.userType,
    };

    console.log(process.env.JWT_SECRET_KEY);
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 30 * 60 * 60 * 24,
    }); // คำสั่ง gen token
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
  } catch (err) {
    next(err);
  }
};
