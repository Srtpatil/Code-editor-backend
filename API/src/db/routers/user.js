const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send({
        user,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
      });
    });
});

module.exports = router;
