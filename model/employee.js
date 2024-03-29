const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/register")
  .then(() => {
    console.log("MongoDB Connected...!!");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
