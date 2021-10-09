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
    openingTime1: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    openingTime2: {
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
    restaurantImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
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
