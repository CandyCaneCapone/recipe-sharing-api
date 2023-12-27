const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide title"],
    maxLength: [100, "please provide a title under 100 character"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, "please provide a description under 500 character"],
  },
  ingredients: {
    type: [String],
    required: [true, "please provide ingredients"],
  },
  cookingTime: {
    type: Number,
    required: [true, "Please provide cooking time"],
  },
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy : {
    type : mongoose.Types.ObjectId , 
    ref : "users" , 
    required : true 
  },
  comments: [
    {
      comment: {
        type: String,
        required: [true , "please provide comment text"],
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("recipes", recipeSchema);
