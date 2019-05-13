var firebaseConfig = {
    apiKey: "AIzaSyBMikFVV8VXHSBYQM5-DcpKKqHNwWs6_Ew",
    authDomain: "tots-project-578bc.firebaseapp.com",
    databaseURL: "https://tots-project-578bc.firebaseio.com",
    projectId: "tots-project-578bc",
    storageBucket: "tots-project-578bc.appspot.com",
    messagingSenderId: "581210930702",
    appId: "1:581210930702:web:d31c677b175c1d86"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

// intial values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

// Capture Button Click
$("#add-trainButton").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

})

// Firebase watcher + initial loader 
database.ref().on("child_added", function(childSnapshot) {

    // Log everything coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");

    var frequencyMinutes = childSnapshot.val().frequency;

    var minutesAway = Math.abs(timeDifference % frequencyMinutes);

    var minutesToNextTrain = frequencyMinutes - minutesAway

    var nextArrival = moment().add(minutesToNextTrain, "minutes").format("hh:mm A");

    $("#train-table").append("<tr><td>" +
            trainNameTable + "</td><td>" +
            destinationTable + "</td><td>" +
            frequencyTable + "</td><td>" +
            nextArrival + "</td><td>" +
            minutesToNextTrain + "</td></tr>");

}, function(errorObject){
  console.log("Errors: " + errorObject.code);
});
