
$(document).ready(function () {

  // Grab the articles as a json
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
    }
  });
  // Click event to mark an article as saved//NOT WORKING!
  $(document).on("click", "#saveButton", function () {
    event.preventDefault();
    var id = $(this).attr("data-id");

    $.ajax({
      method: "PUT",
      url: "/saved/" + id,
      data: {
      }
    })
      .then(function (data) {

        console.log(data);
        $('#myModal').modal('show');

        location.reload();
      });
  });


  //Click event to save note to database//NOT WORKING!!

  $(document).on("click", "#submitNote", function () {

    var thisId = $(this).attr("data-id");

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



  //Click event to remove article from saved articles list//NOT WORKING

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


});










