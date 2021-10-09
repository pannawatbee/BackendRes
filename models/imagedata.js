module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    imageBlob: DataTypes.STRING(255),
  });
  Image.associate = (models) => {
    Image.belongsTo(models.Review, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Image;
};
