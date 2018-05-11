

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



//Click event to save note to database

$(document).on("click", "#submitNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleInput").val(),
      // Value taken from note textarea
      body: $("#bodyInput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });

});

  })




//Click event to remove article from saved articles list










