const express = require("express");
const restaurantRoute = require("./routes/restaurantRoute");
const reviewRoute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
app.use(express.json());
app.use(cors()); // ให้โดเมนรีเควสไม่ต้องตรงกับเซฟเวอร
app.use("/restaurant", restaurantRoute);
app.use("/review", reviewRoute);
app.use("/user", userRoute);

//ใช้แค่ครั้งแรกเพราะมันจะดรอปอันเก่า
// sequelize.sync({ force: true }); 

// sequelize.sync() //ใช้ตอนแก้ table

app.use((req, res, next) => {
  res.status(404).json({ message: "this resource is not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});
app.listen(8002, () => console.log("server run 8002"));
