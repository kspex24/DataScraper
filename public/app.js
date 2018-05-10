

$(document).ready(function () {
  // 
// $(document).on("click", "saveBtn", function() {

// //   // Save the id from the article tag
//   var thisId = $(this).attr("data-id");

// //   // Make an ajax call for the Article
//   $.ajax({
//     method: "PUT",
//     url: "/articles/" + thisId,
//     data: {
// //     // Set the value of saved to true (false by default)
//     saved: true
//     }
//   })
// Require all models


// Click event to mark an article as saved
$(document).on("click", "#saveButton", function() {
  var id = $(this).attr("data-id");
 ({$set: {"saved":true}})
  $.ajax({
    method: "POST",
    url: "/saved/" + id,
    data: {
    }
  })

    .done(function(data) {

      console.log(data);

      location.reload();
    });
});
})

// When you click the savenote button
// $(document).on("click", "#noteBtn", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });

