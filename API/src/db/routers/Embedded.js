const express = require("express");
const File = require("../models/File");

const router = new express.Router();

router.get("/embedded/:id", async (req, res) => {
  const fileId = req.params.id;
  console.log("hit");

  const url = `http://localhost:3000/embed/` + fileId;
  res.type(".js");
  res.send(`document.write('<iframe src="${url}" width="100%" height="300px" frameborder="0" overflow-x: hidden;"></iframe>')`);
});

router.get("/embed/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).send();
    }
    const json_file = JSON.stringify(file);
    res.render("index", {
      file: json_file,
    });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
