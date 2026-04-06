const mongoose = require("mongoose");

const FinRecord = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
  },
  updated_At: {
    type: String,
    default: "No update",
  },
});

const FinRecordModel = mongoose.model("FinRecordModel", FinRecord);

module.exports = FinRecordModel;
