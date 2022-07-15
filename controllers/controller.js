const ListSchema = require("../models/listSchema");
const { validationResult } = require("express-validator");

exports.userData = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, email } = req.body;

  const newUser = new ListSchema({
    name: name,
    email: email,
  });

  newUser
    .save()
    .then((result) => {
      res.json({ message: "New User Created", userData: result });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};