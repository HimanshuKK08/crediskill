const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  },
  correctOptionIndex: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  }
}, {
  timestamps: true
});

// VERY IMPORTANT: third argument = existing collection name
module.exports = mongoose.model("Questions", questionSchema, "Questions");
