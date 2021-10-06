module.exports = (sequelize, DataTypes) => {
  const Resteraunt = sequelize.define("Resteraunt", {
    createType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    restaurantName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    otherDetail: {
      type: DataTypes.STRING(255),
    },
    openingTime: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    openDay: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    priceRange: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    restaurantCategory: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    restaurantLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    carpark: DataTypes.BOOLEAN,
    wifi: DataTypes.BOOLEAN,
    creditCard: DataTypes.BOOLEAN,
    restaurantImage: DataTypes.BLOB,
  });
  Resteraunt.associate = (models) => {
    Resteraunt.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Resteraunt.hasMany(models.Review, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Resteraunt;
};
