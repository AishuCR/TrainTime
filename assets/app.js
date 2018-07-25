// Initialize Firebase
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD5pS3AVFTw--ce_TeV0nLnZAHgWZU35sE",
    authDomain: "traintime15-ea4d3.firebaseapp.com",
    databaseURL: "https://traintime15-ea4d3.firebaseio.com",
    projectId: "traintime15-ea4d3",
    storageBucket: "",
    messagingSenderId: "608118657822"
  };
  firebase.initializeApp(config);

var database = firebase.database();
//initial values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var curremtTime = moment();
//adding values by submitting the form
$("#add-train").on("click", function () {
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();

    //start from 1 year before 
    var timeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

    var difference = moment().diff(moment(timeConverted), "minutes");
    var remainder = difference % frequency;
    var minutesAway = frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("hh:mm a");

    var nexrArrivalUpdate = function () {
        date = moment(new Date())
        datetime.html(date.format('hh:mm a'));
    }

    //push event
     database.ref().push({
         trainName: trainName,
         destination: destination,
         firstTrain: firstTrain,
         frequency: frequency,
         minutesAway: minutesAway,
         nextArrival: nextArrival
     });

    //empty the imput
    $("train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
    return false;
});
// database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (snapshot) {
database.ref().on("child_added", function(snapshot){
    console.log("Train Name: " + snapshot.val().trainName);
    console.log("Destination: " + snapshot.val().destination);
    console.log("First Train: " + snapshot.val().firstTrain);
    console.log("Next Train: " + snapshot.val().nextTrain);
    console.log("Minutes Away: " + snapshot.val().minutesAway);

    $("#new-train").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + 
    "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway + 
    "</td></tr>");
    

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


