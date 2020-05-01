// console.log("connected")

document.addEventListener("DOMContentLoaded", function () {
  // console.log("DOUBLE CONNECTED");

  // function getResults() {
  //   $("#previously").empty();
  //   $.getJSON("/all", function (data) {
  //     for (var i = 0; i < data.length; i++) {
  //       console.log(data[i])
  //       console.log(data[i].title)
  //       $("#previously").prepend(
  //         "<p class='data-entry' data-id=" +
  //           data[i]._id +
  //           "><span class='dataTitle' data-id=" +
  //           data[i].title +
  //           ">" +
  //           data[i].body.duration +
  //           "</span><span class='delete'>X</span></p>"
  //       );
  //     }
  //   });
  // }

  // On page load, populate page with previous workouts
  $.ajax({
    url: "/all",
    dataType: "JSON",
    method: "GET",
  }).then((response) => {
    for (let i = response.length - 2; i > -1; i--) {
      const appendToMe = $("#previously");
      const newDiv = $("<div>");
      const workoutTitle = $("<h3>");
      const type = $("<p>");
      const distance = $("<p>");
      const weight = $("<p>");
      const reps = $("<p>");
      const duration = $("<p>");
      workoutTitle.text(`Title: ${response[i].name}`);
      workoutTitle.addClass("previous-title");
      type.text(`Type: ${response[i].type}`);
      type.addClass("previous-type");
      distance.text(`Distance: ${response[i].distance}`);
      distance.addClass("previous-distance");
      weight.text(`Weight: ${response[i].weight}`);
      weight.addClass("previous-weight");
      reps.text(`Reps: ${response[i].reps}`);
      reps.addClass("previous-reps");
      duration.text(`Duration: ${response[i].duration} minutes`);
      duration.addClass("previous-duration");
      newDiv.addClass("previous-workouts");
      newDiv.attr("data-id", response[i]._id);
      newDiv.append(workoutTitle);
      newDiv.append(type);
      newDiv.append(distance);
      newDiv.append(weight);
      newDiv.append(reps);
      newDiv.append(duration);
      appendToMe.append(newDiv);
    }
    const mostRecent = response[response.length - 1];
    const appendToMostRecent = $("#most-recent-container");
    const newDiv = $("<div>");
    const workoutTitle = $("<h3>");
    const type = $("<p>");
    const distance = $("<p>");
    const weight = $("<p>");
    const reps = $("<p>");
    const duration = $("<p>");
    workoutTitle.text(`Title: ${mostRecent.name}`);
    workoutTitle.addClass("previous-title");
    type.text(`Type: ${mostRecent.type}`);
    type.addClass("previous-type");
    distance.text(`Distance: ${mostRecent.distance}`);
    distance.addClass("previous-distance");
    weight.text(`Weight: ${mostRecent.weight}`);
    weight.addClass("previous-weight");
    reps.text(`Reps: ${mostRecent.reps}`);
    reps.addClass("previous-reps");
    duration.text(`Duration: ${mostRecent.duration} minutes`);
    duration.addClass("previous-duration");
    newDiv.addClass("previous-workouts");
    newDiv.attr("data-id", mostRecent._id);
    newDiv.append(workoutTitle);
    newDiv.append(type);
    newDiv.append(distance);
    newDiv.append(weight);
    newDiv.append(reps);
    newDiv.append(duration);
    appendToMostRecent.append(newDiv);
  });

  // logs workout into database
  $("#log-workout").on("submit", (event) => {
    event.preventDefault();
    const newWorkoutObj = {
      name: $("#name").val(),
      type: $("#type").val(),
      distance: $("#distance").val(),
      weight: $("#weight").val(),
      reps: $("#reps").val(),
      duration: $("#duration").val(),
    };

    console.log(newWorkoutObj)

    $.ajax({
      url: "/workouts",
      method: "POST",
      data: newWorkoutObj,
    }).then(function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  });

  $(".previous-title").on("click", (event) => {
    event.stopPropagation();
    console.log("clicked a title");
  });
  // getResults();
});
