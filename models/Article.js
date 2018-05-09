var mongoose = require("mongoose");

// Reference to the Schema constructor
var Schema = mongoose.Schema;

// Schema constructor, create a new articleSchema object

var articleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
  
    link: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false,
        required: true
    },
    // `note` is an object that stores a Note id, ref property links the ObjectId to the Note model
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Creates model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = Article;