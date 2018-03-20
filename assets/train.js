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
  var database= firebase.database()
;
$("#submit-button").on("click",function(){
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var firstTrain = parseInt($("#first-train").val().trim());
    var trainFrequency = parseInt($("#frequency").val().trim());
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);
    
    database.ref().push({
        trainName:trainName,
        trainDestination:trainDestination,
        firstTrain:firstTrain,
        trainFrequency:trainFrequency
    })
    
    return false;
})

//  Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var firstTrain = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().trainFrequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);
  
// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainFrequency + "</td><td>" + "</td><td>");
});




