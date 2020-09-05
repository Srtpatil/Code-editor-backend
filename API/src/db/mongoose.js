const mongoose = require("mongoose");
const database = "code-editor-api";
mongoose.connect("mongodb://127.0.0.1:27017/" + database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
