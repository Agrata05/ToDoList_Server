const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  toDoArray: [
    {
      taskName: {
        type: String,
        max: 50,
      },
      isDone: {
        type: Boolean,
        default: false,
      },
      subTaskArray: [
        {
          subTaskDiscription: {
            type: String,
            max: 50,
          },
          isDone: {
            type: Boolean,
            default: false,
          },
        },
      ],
      time: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("listData", listSchema);