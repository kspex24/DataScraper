
$(document).ready(function () {


  // Click event to mark an article as saved//NOT WORKING!
  $(document).on("click", "#saveButton", function () {
    var id = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/saved/" + id,
      data: {
      }
    })
      .then(function (data) {

        console.log(data);

        location.reload();
      });
  });


  //Click event to save note to database//NOT WORKING!!

  $(document).on("click", "#submitNote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to save the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/notes/" + thisId,
      data: {

        title: $("#titleInput").val(),
        body: $("#bodyInput").val()
      }
    })
      .then(function (data) {

        console.log(data);
      });

  });

})

//Click event to remove article from saved articles list

$(document).on("click", "#delButton", function () {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "DELETE",
    url: "/articles/" + id,
    data: {
    }
  })
    .then(function (data) {

      console.log(data);

      location.reload();
    });
});










