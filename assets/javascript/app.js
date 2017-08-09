var config = {
  apiKey: "AIzaSyB0k0bLi8yKHWBZ9JrkglwxUPNBQD4rIvo",
  authDomain: "train-scheduler-da38d.firebaseapp.com",
  databaseURL: "https://train-scheduler-da38d.firebaseio.com",
  projectId: "train-scheduler-da38d",
  storageBucket: "train-scheduler-da38d.appspot.com",
  messagingSenderId: "590642192993"
};
  firebase.initializeApp(config);

  var database = firebase.database();

$("#addDestinationButton").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainTime = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequencyInput").val().trim();

  var newDestinationComplete = {
    trainNameBase: trainName,
    destinationBase: destination,
    firstTrainTimeBase: firstTrainTime,
    frequencyBase: frequency
  };

  database.ref().push(newDestinationComplete);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().trainNameBase;
  var destination = childSnapshot.val().destinationBase;
  var firstTrainTime = childSnapshot.val().firstTrainTimeBase;
  var frequency = childSnapshot.val().frequencyBase;
  var minusYearFirstTrainTime = moment.unix(firstTrainTime, "hh:mm").subtract(1, "years");
  var timeNow = moment();
  var timeDifference = moment().diff(moment(minusYearFirstTrainTime), "minutes");
  var timeRemainder = timeDifference % frequency;
  var minutesTillTrain = frequency - timeRemainder;
  var nextTrainTime = moment().add(minutesTillTrain, "minutes");
  var formatNextTrainTime = moment(nextTrainTime).format("hh:mm");
  
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + formatNextTrainTime + "</td><td>" + minutesTillTrain + "</td></tr>")
});

