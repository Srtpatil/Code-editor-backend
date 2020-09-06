const express = require("express");
const File = require("../models/File");

const router = new express.Router();

//Add Authentication
router.post("/create_file", async (req, res) => {
  const file = new File(req.body);

  console.log(file);

  try {
    await file.save();
    res.status(201).send(file);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//TODO : add File get request according to file id
router.get("/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send();
    }

    res.send(file);
  } catch (e) {
    res.status(500).send();
  }
});

// TODO : Delete File

module.exports = router;
