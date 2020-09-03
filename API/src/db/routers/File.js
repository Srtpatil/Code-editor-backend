const express = require("express");
const File = require("../models/File");

const router = new express.Router();

//Add Authentication
router.post("/create_file", async (req, res) => {
  const file = new File({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await file.save();
    res.status(201).send(file);
  } catch (e) {
    res.status(400).send(e);
  }
});

//TODO : add File get request according to file id

//TODO : update File

// TODO : Delete File

module.exports = router;
