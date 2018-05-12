var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");
var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeArticles";

// Require all models
var db = require("./models");

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

require('dotenv').config()
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database


// Route to display all articles
app.get("/", function (req, res) {
  db.Article
    .find({})
    .then(function (dbArticle) {
      res.render('index', { articles: dbArticle });
    })
    .catch(function (err) {
      res.json(err);
    });
});
// Route for displaying saved articles
app.get("/saved", function (req, res) {
  db.Article
    .find({ saved: true })
    .then(function (dbArticle) {
      res.render('saved', { articles: dbArticle });
    })
    .catch(function (err) {
      res.json(err);
    })
});

// Route for saving a specific article
app.put("/saved/:id", function (req, res) {
  db.Article
    .findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route for changing a saved article to unsaved - remove button
app.put("/articles/:id", function (req, res) {
  db.Article
    .findOneAndUpdate({ _id: req.params.id }, { $set: { saved: false } })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});


//GET route for scraping the news section of the Washingtonian website

app.get("/scrape", function (req, res) {

  //Grab the body of html with request

  request("https://www.washingtonpost.com/", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);
  
    // An empty array to save the data that we'll scrape
    var result = [];
    // Select each elements to scrape
    $("div.no-skin.flex-item.flex-stack").each(function(i, element) {
  
     
      var title = $(this).children("div.headline").text();   
      var link =$(this).children("div.headline").children("a").attr("href");       
      var summary = $(this).children("div.blurb").text();

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

  // Return to main page once finished scraping the text
  res.redirect("/");
  // $('#myModal2').modal('show');

});


// // Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  //   //   // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});





// // Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});