const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    // console.log("am conntected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
