const { Resteraunt } = require("../models");
exports.getAllRestaurant = async (req, res, next) => {
  try {
    const resteraunt = await Resteraunt.findAll({});
    res.json({ resteraunt });
  } catch (err) {
    next(err);
  }
};
exports.getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resteraunt = await Resteraunt.findOne({
      where: { id },
    });
    res.json({ resteraunt });
  } catch (err) {
    next(err);
  }
};
exports.updateRestaurant = async (req, res, next) => {
  try {
    const { Restauraunt_Id } = req.params;
    const {
      Create_Type,
      User_Id,
      Restaurant_Name,
      Other_Detail,
      Opening_Time,
      Open_Day,
      Price_Range,
      Restaurant_Category,
      Restaurant_Location,
      Carpark,
      Wifi,
      Credit_Card,
      Restaurant_Image,
    } = req.body;
    const rows = await Restaurant.update(
      {
        Create_Type,
        User_Id,
        Restaurant_Name,
        Other_Detail,
        Opening_Time,
        Open_Day,
        Price_Range,
        Restaurant_Category,
        Restaurant_Location,
        Carpark,
        Wifi,
        Credit_Card,
        Restaurant_Image,
      },
      {
        where: { Restauraunt_Id },
      }
    );
    if (rows[0] === 0) return res.status(400).json({ message: "update fail" });
    res.json({ message: "update completed" });
  } catch (err) {
    next(err);
  }
};
