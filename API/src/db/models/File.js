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
    default: "",
  },
  languageId: {
    type: String,
    required: true,
  }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
