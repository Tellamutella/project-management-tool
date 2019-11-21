const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/projects", (req, res) => {
  Project.find({})
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.json(error);
    });
});

router.post("/project/create", (req, res) => {
  Project.create({
    title: req.body.title,
    detail: req.body.detail
  })
    .then(project => {
      res.json(project);
      console.log("Project Created");
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/project/:id/:stage", (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    { stage: req.params.stage },
    { new: true }
  )
    .then(project => {
      console.log("project updated");
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
