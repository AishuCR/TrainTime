
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKGu-BOX1cFQ6oo-EUv5NSq-nAYgDwsUI",
    authDomain: "traintime-f9147.firebaseapp.com",
    databaseURL: "https://traintime-f9147.firebaseio.com",
    projectId: "traintime-f9147",
    storageBucket: "",
    messagingSenderId: "160595256804"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var currentTime = moment();

  database.ref().on("child_added", function(childSnap){

    var name = childSnap.val().name;
    var firstTrain = shildSnap.val().firstTrain;
    var destination = childSnap.val().destination;
    var frequency = childSnap.val().frequency;
    var nextTrain = childSnap.val().nextTrain;
    var min = childSnap.val().min;


  $("#train-details").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>")
});
database.ref().on("value", function(snapshot){
});
$("#adding-space").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#trainDestinationInput").val().trim();
    var frequency =$("#trainFrequencyInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();

if(trainName = ""){
alert("Enter the Train Name");
return false;
}
if(destination = ""){
    alert("Enter the Destination");
    return false;
}
if(frequency = ""){
    alert("Enter the frequency of the train in minutes");
    return false;
}
if(firstTrain = ""){
    alert("Enter the time of the first train.");
    return false;
};
//calculations
//make sures that the value is before the current time
var firstTrainValue =  moment(firstTrain, "hh:mm").subtrack("1, years");
//time diff between current and the first train
var difference = currentTime.diff(moment(firstTrainValue), "minutes");
var remainder =difference % frequency;
var waitingTime = frequency -remainder;
var nextTrain = moment.add(waitingTime, "minutes").format("hh:mm");

var newTrain={
    name : trainName,
    destination : destination,
    firstTrain : firstTrain,
    minutes : waitingTime,
    frequency : ferquency,
    next : nextTrain
}
console.log(newTrain);
database.ref().push(newTrain);

$("#trainNameInput").val("");
$("#trainDestinationInput").val("");
$("#trainFrequencyInput").val("");
$("#firstTrainInput").val("");

return false;
});