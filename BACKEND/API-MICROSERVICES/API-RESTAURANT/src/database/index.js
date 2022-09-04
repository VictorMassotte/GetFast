const mongoose = require('mongoose');

mongoose.connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@164.132.202.169:27017/${process.env.MONGODB_DATABASE}?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log(err);
    }
  );
  mongoose.connection
    .once("open", async function () {
      console.log("Connection successful");
    })
    .on("error", function (error) {
      console.log("Connection failed", error);
    })
    .on("disconnected", function () {
      console.log("Disconnected");
    });
  
module.exports = mongoose;