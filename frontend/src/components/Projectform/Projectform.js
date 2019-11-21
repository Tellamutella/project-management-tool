import React, { Component } from "react";
import Axios from "axios";
import "./Projectform.scss";

export default class Projectform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      detail: ""
    };
  }
  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sumbitHandler = e => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: this.state,
      url: "http://localhost:3000/api/project/create"
    })
      .then(res => {
        this.props.fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <form onSubmit={this.sumbitHandler} className="project-form">
          <div className="top-form">
            <h3> New Project</h3>
            <h1 onClick={this.props.openForm}>wa</h1>
          </div>
          <input
            type="text"
            placeholder="Project Title"
            name="title"
            value={this.state.title}
            onChange={this.inputHandler}
          />
          <textarea
            placeholder="Project Description"
            type="text"
            name="detail"
            value={this.state.detail}
            onChange={this.inputHandler}
          />
          <button type="submit"> Add Project +</button>
        </form>
      </>
    );
  }
}
