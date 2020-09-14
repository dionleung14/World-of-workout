const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

// const User = require("./userModel.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public/assets"));

// mongodb+srv://<username>:<password>@cluster-ltn2pcsk.qd0pq.mongodb.net/heroku_ltn2pcsk?retryWrites=true&w=majority

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
  // mongoose.connect(
  // `mongodb+srv://<username>:<password>@cluster-ltn2pcsk.qd0pq.mongodb.net/heroku_ltn2pcsk?retryWrites=true&w=majority` ||
  // "mongodb://localhost/workouts",
  // {
  useNewUrlParser: true,
});

// const databaseUrl = "zoo";
// const collections = ["animals"];

const db = require("./models");

// const db = mongojs(databaseUrl, collections);

// db.on("error", error => {
//   console.log("Database Error:", error);
// });

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/assets/html/index.html"));
});

app.get("/all", (req, res) => {
  db.Workout.find({}, (err, found) => {
    if (err) {
      console.log(`Error retrieving workouts: ${err}`);
      res.status(400).send(err);
    } else {
      res.json(found);
    }
  });
});

// logs workout to mongo database
app.post("/submit", ({ body }, res) => {
  // console.log(req.body)
  const newWorkout = new db.Workout(body);
  newWorkout.timeStamp();

  db.Workout.create(newWorkout)
    .then((workout) => {
      res.status(200).send({ workout });
    })
    .catch((err) => {
      console.log(`Error creating workout: ${err}`);
      res.status(400).send(err);
    });
});

// app.get("/name", (req, res) => {
//   db.animals.find().sort({ name: 1 }, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(found);
//     }
//   });
// });

// app.get("/weight", (req, res) => {
//   db.animals.find().sort({ weight: -1 }, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(found);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
