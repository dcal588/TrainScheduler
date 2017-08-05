var config = {
  apiKey: "AIzaSyB0k0bLi8yKHWBZ9JrkglwxUPNBQD4rIvo",
  authDomain: "train-scheduler-da38d.firebaseapp.com",
  databaseURL: "https://train-scheduler-da38d.firebaseio.com",
  projectId: "train-scheduler-da38d",
  storageBucket: "train-scheduler-da38d.appspot.com",
  messagingSenderId: "590642192993"
};
  firebase.initializeApp(config);

$("#addDestinationButton").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainTime = moment($("#firstTrainInput").val().trim(), "DD/MM/YY").format("X");
  var frequency = $("#frequencyInput").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

