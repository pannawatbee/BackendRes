module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    starRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewDetail: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    reviewTitle: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    reviewImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Review.belongsTo(models.Resteraunt, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Review.hasMany(models.Image, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Review;
};
