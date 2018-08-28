// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyB4Ooeb3AO3GUZ0PlheNtyy2jhedAaIuIQ",
  authDomain: "firstproject-vqv.firebaseapp.com",
  databaseURL: "https://firstproject-vqv.firebaseio.com",
  projectId: "firstproject-vqv",
  storageBucket: "firstproject-vqv.appspot.com",
  messagingSenderId: "578400054546"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();



// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;



// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function (snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    highPrice = snapshot.val().highPrice
    highBidder = snapshot.val().highBidder


    // Change the HTML to reflect the stored values
    $('#highest-bidder').text(highBidder);
    $('#highest-price').text(highPrice);

    // Print the data to the console.
    console.log(highBidder);
    console.log(highPrice);
  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $('#highest-bidder').text(initialBidder);
    $('#highest-price').text(initialBid);

    // Print the data to the console.
    console.log(initialBidder);
    console.log(initialBid);
  }


  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderName = $('#bidder-name').val().trim();
  var bidderPrice = $('#bidder-price').val().trim();

  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    })

    // Log the new High Price
    console.log(bidderName);
    console.log(bidderPrice);

    // Store the new high price and bidder name as a local variable
    var highestBidder = snapshot.val().highBidder;
    var highestPrice = snapshot.val().highPrice;

    // Change the HTML to reflect the new high price and bidder
    $('#highest-bidder').text(highestBidder);
    $('#highest-price').text(highestPrice);
  } else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});