const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

  fileName: {
    type: String,
    required: true,
  },
  sourceCode: {
    type: String,
    required: true,
  },
  stdInput: {
    type: String,
    default: " ",
  },
  languageId: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
