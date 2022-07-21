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


exports.addTask = (req, res) => {
  const { email, taskname, subTask } = req.body;
//   console.log(subTask.length())
  console.log(email,taskname,subTask)
  let subTaskArray = [];
   
  
    subTask.forEach((element) => {
        console.log("here")
      let obj = {
        subTaskDiscription: element,
        isDone: false,
      };
      subTaskArray.push(obj);
    });
  

  ListSchema.findOne({ email: email }).then((userData) => {
    let obj = {
      taskName: taskname,
      subTaskArray: subTaskArray,
    };

    userData.toDoArray.push(obj);
    return userData.save();
  }).then(newData => {
      res.json({message:"New Task Added",newData:newData})
  }).catch(err => {
      res.json({message:"error occur",error:err})
  })

 
};

exports.getList = (req, res) => {
  const { email } = req.body;

  ListSchema.findOne({ email: email })
    .then((tasks) => {
      res.json({ message: "Tasks", allTask: tasks });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};