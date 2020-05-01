const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String,
  type: String,
  distance: Number,
  weight: Number,
  reps: Number,
  duration: Number,
  timeLogged: {
    type: Date,
  },
});

WorkoutSchema.methods.timeStamp = function () {
  this.timeLogged = Date.now();
  return this.timeLogged;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
