const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    default: '1'
  }
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
