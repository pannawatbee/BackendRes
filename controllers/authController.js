exports.authenticate = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(401).json({ message: "you are unauthorized" });
      }
  
      const token = authorization.split("")[1];
      if (!token) {
        return res.status(401).json({ message: "you are unauthorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      next(err);
    }
  };