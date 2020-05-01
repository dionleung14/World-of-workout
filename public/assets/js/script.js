document.addEventListener("DOMContentLoaded", function () {
  // On page load, populate page with previous workouts
  $.ajax({
    url: "/all",
    dataType: "JSON",
    method: "GET",
  }).then((response) => {
    for (let i = response.length - 2; i > -1; i--) {
      const appendToMe = $("#previously");
      const newDiv = $("<div>");
      const containerDiv = $("<div>")
      const workoutTitle = $("<h3>");
      const type = $("<p>");
      const distance = $("<p>");
      const weight = $("<p>");
      const reps = $("<p>");
      const duration = $("<p>");
      workoutTitle.text(`Title: ${response[i].name}`);
      workoutTitle.addClass("previous-title");
      workoutTitle.attr("data-key", response[i]._id);
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
      containerDiv.attr("id", response[i]._id);
      containerDiv.addClass("workout-details");
      newDiv.append(workoutTitle);
      containerDiv.append(type);
      containerDiv.append(distance);
      containerDiv.append(weight);
      containerDiv.append(reps);
      containerDiv.append(duration);
      newDiv.append(containerDiv)
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
    workoutTitle.addClass("most-recent");
    workoutTitle.attr("data-key", mostRecent._id);
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
    // newDiv.attr("data-id", mostRecent._id);
    newDiv.attr("id", mostRecent._id);
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
    $.ajax({
      url: "/workouts",
      method: "POST",
      data: newWorkoutObj,
    }).then(function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  });

  $(document).on("click", ".previous-title", function() {
    const id = this.dataset.key;
    const hiddenDiv = $(`#${id}`);
    hiddenDiv.toggle();
  });
});
