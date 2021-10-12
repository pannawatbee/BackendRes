module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define( //ตัวหน้ามันคือชื่อตัวแปร
    "User", // ชื่อตรงตารางดาต้าเบส
    {
      name: {
        //foreignkey primary key ไม่ต้องสร้าง
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(45),
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: {
        allowNull: false,   // พวก primary key กับ foreign key มันจะผูกอัตโนมัติ
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT", // เพื่อให้เวลาลบ review userid ในตารางรีวิวหายไป แต่ตาราง user ยังอยู่
    });
    User.hasMany(models.Resteraunt, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return User;
};
