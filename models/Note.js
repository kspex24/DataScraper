var mongoose = require("mongoose");

// Reference to  Schema constructor
var Schema = mongoose.Schema;

// Schema constructor, create a new NoteSchema object
var noteSchema = new Schema({

  title: String,

  body: String
});

// Creates model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;