var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");



// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeArticles";

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public")) //express makes public folder the static directory

//Configure middleware
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true })); //body-parser handles form submissions
// parse application/json
app.use(bodyParser.json());


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapeArticles");

// Routes
app.get("/", function(req, res) {
  db.Article
  .find({})
  .then(function(dbArticle) {
    res.render('index', { articles: dbArticle } );
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.get("/saved", function(req, res) {
  db.Article
  .find({saved: true})
  .then(function(dbArticle) {
    res.render('saved', { articles: dbArticle } );
  })
  .catch(function(err) {
    res.json(err);
  });
});


//GET route for scraping the news section of the Washingtonian website

app.get("/scrape", function (req, res) {

  //Grab the body of html with request

  request("https://www.washingtonian.com/sections/news/", function (error, response, html) {
    //load cheerio and save to $ variable
    var $ = cheerio.load(html);


    $("div.wash-sidebar__item").each(function (i, element) {

      // Save an empty result object
      var result = [];
      // add text, summary and href of every link

      var title = $(this).children("h4").text();
      var link = $("h4").children().attr("href");
      var summary = $(this).children("div.wash-sidebar__item-deck").text();

    // Save results in an object and push into the results array 
    result.push({
      title: title,
      link: link,
      summary: summary
    });


      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          ///console the result
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

  })

  // Tell the browser that we finished scraping the text
      res.redirect("/");

});


// // Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  //   // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

// // Route for getting a specific Article by id, populate it with it's note
// app.get("/articles/:id", function (req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in the db...
//   db.Article.findOne({ _id: req.params.id })
//     // ..and populate all the note associated with it
//     .populate("note")
//     .then(function (dbArticle) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function (err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// // Route for saving a specific Article by changing saved to true
// app.get("/articles/:id", function (req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in the db...
//   db.Article.findOne({ _id: req.params.id })
//     // ..change saved to true
//     .saved = true
//       .then(function (dbArticle) {
//         // If we were able to successfully find an Article with the given id, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function (err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function (req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function (dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function (dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function (err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });




// // Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});