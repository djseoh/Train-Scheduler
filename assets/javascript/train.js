// Initialize Firebase
var config = {
    apiKey: "AIzaSyCOaineEwn6sJiokb8jPw8eIPbZvDZA1os",
    authDomain: "train-scheduler-b974c.firebaseapp.com",
    databaseURL: "https://train-scheduler-b974c.firebaseio.com",
    projectId: "train-scheduler-b974c",
    storageBucket: "",
    messagingSenderId: "740016073706"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = '';
var destination = '';
var firstTrainTime = 0;
var frequency = 0;


$("#add-train").on("click", function(event) {

    event.preventDefault();
    console.log("click")
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = moment($("#first-train-input").val().trim()).format('LT');
    frequency = $("#frequency-input").val().trim();

    // Console log each of the user inputs to confirm we are receiving them
    console.log(name);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Replaces the content in the "recent-member" div with the new info
    // $("#name-display").text(name);
    // $("#role-display").text(role);
    // $("#start-display").text(start);
    // $("#monthly-display").text(monthly);

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});

database.ref().on("child_added", function(snapshot) {
        
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firstTrainTime);
        console.log(snapshot.val().frequency);
  
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#destination-display").text(snapshot.val().destination);
        $("#frequency-display").text(snapshot.val().frequency);
        // $("#next-display").text(snapshot.val().);
        // $("#minutes-display").text(snapshot.val().);
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});
