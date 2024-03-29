const express = require("express");
const collection = require("./model/employee");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Login route handler
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });

    if (!user) {
      return res.json("notexist");
    }

    // Check if the provided password matches the stored password
    if (password === user.password) {
      res.json("success");
    } else {
      res.json("invalidpassword");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

// Signup route handler
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const data = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      await collection.insertMany([data]);
      res.json("success");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
