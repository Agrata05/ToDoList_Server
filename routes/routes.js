const router = require("express").Router();
const listController = require("../controllers/controller");
const { body } = require("express-validator");

router.post(
  "/addUser",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a Valid Email") //Stored in error object which can be retrived.
      
      .normalizeEmail(), // check for  .. or + - in the email and remove it
      body('name')
      .trim()
      .not()
      .isEmpty().withMessage("Name field empty")
  ],
  listController.userData
);

router.post("/addTask", listController.addTask);

router.get("/getTask", listController.getList);

module.exports = router;