const mongoose = require("mongoose");

const File = mongoose.model("File", {
  fileName: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  sourceCode: {
    type: String,
    required: true,
  },
  stdInput: {
    type: String,
  },
  languageId: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = File;
