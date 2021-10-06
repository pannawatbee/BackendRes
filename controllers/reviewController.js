const { Review } = require("../models");
exports.getAllReview = async (req, res, next) => {
  try {
    const review = await Review.findAll({});
    res.json({ review });
  } catch (err) {
    next(err);
  }
};
exports.getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findOne({
      where: { id },
    });
    res.json({ review });
  } catch (err) {
    next(err);
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const {
      ReviewId,
      ResterauntId,
      UserId,
      StarRating,
      ReviewDetail,
      ReviewTitle,
    } = req.body;
    const review = await Review.create({
      ReviewId,
      ResterauntId,
      UserId,
      StarRating,
      ReviewDetail,
      ReviewTitle,
    });
    res.status(201).json({ review: review});
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Review.destroy({
      where: { id },
    });
    if (rows === 0) return res.status(400).json({ message: "delete failed" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
