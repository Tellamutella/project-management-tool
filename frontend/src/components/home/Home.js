import React from "react";
import "./Home.scss";
import Header from "../Header/Header";
import Project from '../Project/Project'

function Home() {
  return (
    <div className="main-container">
      <Header />
      <Project />
    </div>
  );
}

export default Home;
