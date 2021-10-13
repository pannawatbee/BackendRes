require("dotenv").config();
const express = require("express");
const restaurantRoute = require("./routes/restaurantRoute");
const reviewRoute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const app = express();
const cors = require("cors");
// const { sequelize } = require("./models");
const { Review } = require("./models");
const { Resteraunt } = require("./models");
// const { User } = require("./models");
// แปลงรูปภาพ
const multer = require("multer"); // เป็นการจัดการส่งรูปภาพมาแบบ multipat form data
const cloudinary = require("cloudinary").v2; //
const util = require("util"); //แปลง function callback ใหเเป็น promise
const fs = require("fs"); //
const uploadPromise = util.promisify(cloudinary.uploader.upload); // อัพโหลดภาพผ่านคลาว

app.use(express.json());
app.use(cors()); // ให้โดเมนรีเควสไม่ต้องตรงกับเซฟเวอร
app.use("/restaurant", restaurantRoute);
app.use("/review", reviewRoute);
app.use("/user", userRoute);

//ใช้แค่ครั้งแรกเพราะมันจะดรอปอันเก่า
// sequelize.sync({ force: true });

// sequelize.sync() //ใช้ตอนแก้ table

const upload = multer({
  storage: multer.diskStorage({
    //เก็บไฟล์ upload ที่ disk
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      //เป็นตัวกำหนดชื่อไฟล์ที่เก้บ
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]); // เวลาเอาเป็นชื่อไฟล์จะได้ไม่ซ้ำ
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.post(
  "/create-store",
  upload.single("cloudinput"), //เก็บไว้ใน public image
  async (req, res, next) => {
    // console.log(req.file); // ไฟล์รูปภาพที่ส่งมา
    const { reviewTitle, reviewDetail, starRating, UserId, ResterauntId } =
      req.body;

    try {
      const result = await uploadPromise(req.file.path);
      console.log(result);
      const review = await Review.create({
        reviewTitle,
        reviewDetail,
        starRating,
        UserId,
        ResterauntId,
        reviewImage: result.secure_url,
      });
      // const userId = await Review.findOne({
      //   where: { UserId },
      //   include: { model: User, attributes: ["name"] },
      // });
      fs.unlinkSync(req.file.path);
      res.json({ review });
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/create-store-res",
  upload.single("cloudinput"), //เก็บไว้ใน public image
  async (req, res, next) => {
    // console.log(req.file); // ไฟล์รูปภาพที่ส่งมา
    const {
      restaurantName,
      carpark,
      wifi,
      creditCard,
      openingTime1,
      openingTime2,
      openDay,
      priceRange,
      restaurantCategory,
      restaurantLocation,
      otherDetail,
      createType,
      UserId,
    } = req.body;

    try {
      let result;
      if (req.file) {
        result = await uploadPromise(req.file.path);
      }
      console.log(result);
      const resteraunt = await Resteraunt.create({
        restaurantName,
        carpark,
        wifi,
        creditCard,
        openingTime1,
        openingTime2,
        openDay,
        priceRange,
        restaurantCategory,
        restaurantLocation,
        otherDetail,
        createType,
        UserId,
        restaurantImage: result ? result.secure_url : undefined, //เซ็ต undefined เพราะจะเอาคอลัมresimageออกไปเลย
      });
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.json({ resteraunt });
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  "/create-store/:id",
  upload.single("cloudinput"), //เก็บไว้ใน public image
  async (req, res, next) => {
    // console.log(req.file); // ไฟล์รูปภาพที่ส่งมา
    const { id } = req.params;
    console.log(id);
    const {
      restaurantName,
      carpark,
      wifi,
      creditCard,
      openingTime1,
      openingTime2,
      openDay,
      priceRange,
      restaurantCategory,
      restaurantLocation,
      otherDetail,
      createType,
      UserId,
    } = req.body;
    console.log(req.body);

    try {
      let result;
      if (req.file) {
        result = await uploadPromise(req.file.path);
      }
      // console.log(result);

      // const restaurant = await Restaurant.findOne({where:{id}})
      const rows = await Resteraunt.update(
        {
          restaurantName,
          carpark,
          wifi,
          creditCard,
          openingTime1,
          openingTime2,
          openDay,
          priceRange,
          restaurantCategory,
          restaurantLocation,
          otherDetail,
          createType,
          UserId,
          restaurantImage: result ? result.secure_url : undefined,
        },
        {
          where: { id },
        }
      );
      // fs.unlinkSync(req.file.path);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.json({ rows });
      if (rows[0] === 0)
        return res.status(400).json({ message: "update fail" });
      res.json({ message: "update completed" });
    } catch (err) {
      next(err);
    }
  }
);

app.use((req, res, next) => {
  res.status(404).json({ message: "this resource is not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});
app.listen(8000, () => console.log("server run 8000"));
