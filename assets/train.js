//set up form for users to enter their own train info
//Add data from form to firebase
//Use info from form to display provided info into the train table
//create formula to determin train's next arrival time
//post train arrival time in proper place in chart
//create formula to find minute away for train
//post "minutes away" in train chart
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDgyh7FFid38ayUVY8zQn9XFC1ye5yIYJE",
  authDomain: "traintable-babb6.firebaseapp.com",
  databaseURL: "https://traintable-babb6.firebaseio.com",
  storageBucket: "traintable-babb6.appspot.com",
};
firebase.initializeApp(config);
//variable to reference database
var database = firebase.database();
$("#submit-button").on("click", function () {
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var trainFrequency = $("#frequency").val().trim();
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    firstTrain: firstTrain,
    trainFrequency: trainFrequency
  })
  return false;
})
// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  var tName = childSnapshot.val().trainName;
  var tDestination = childSnapshot.val().trainDestination;
  var tfirstTrain = childSnapshot.val().firstTrain;
  var tFrequency = childSnapshot.val().trainFrequency;
  var timeArray = tfirstTrain.split(":");
  var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  }

  else {
    var diffMins = moment().diff(trainTime, "minutes");
    console.log(diffMins);
    tRemander = diffMins % tFrequency;
    console.log(tRemander);
    tMinutes = tFrequency - tRemander;
    console.log(tMinutes);
    tArrival = moment().add(tMinutes, "minutes").format("hh:mm A");
    console.log(tArrival);
  }

  // Train Info
  console.log(tName);
  console.log(tDestination);
  console.log(tfirstTrain);
  console.log(tFrequency);
  console.log(timeArray);
  console.log(moment());
  console.log(trainTime);
  console.log(maxMoment);
  
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td><td>");
});