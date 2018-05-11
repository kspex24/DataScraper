

$(document).ready(function () {


// Click event to mark an article as saved
$(document).on("click", "#saveButton", function() {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/saved/" + id,
    data: {
    }
  })
    .then(function(data) {

      console.log(data);

      location.reload();
    });
});


//Click event to  launch modal to add a note
// $(document).on("click", "#noteButton", function() {
//   $('#myModal').modal('show');
// })
//Click event to save note to database

$(document).on("click", "#saveNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

  })




//Click event to remove article from saved articles list










