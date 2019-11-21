import React, { useEffect, useState } from "react";
import "./Project.scss";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Stage from "../Stage/Stage";
import ProjectForm from "../Projectform//Projectform";
import spinner from "../../image/spinner.svg";
export default function Project() {
  const [stageOne, setStageOne] = useState([]);
  const [stageTwo, setStageTwo] = useState([]);
  const [stageThree, setStageThree] = useState([]);
  const [stageFour, setStageFour] = useState([]);
  const [stageFive, setStageFive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
    loader();
  }, []);

  /// loader is optional
  const loader = () =>
    setTimeout(() => {
      setLoading(false);
    }, 300);

  //fetch Data from backend
  const fetchData = () => {
    axios({
      url: "http://localhost:3000/api/projects"
    })
      .then(res => {
        filterProjects(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //delete a single item
  const deleteHandler = e => {
    axios({
      method: "POST",
      url: `http://localhost:3000/api/delete/${e}`
    })
      .then(res => {
        console.log(res);
        fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };
  //filter data retrieved from backend based on their stage
  const filterProjects = data => {
    const one = data.filter(element => element.stage === "1");
    const two = data.filter(element => element.stage === "2");
    const three = data.filter(element => element.stage === "3");
    const four = data.filter(element => element.stage === "4");
    const five = data.filter(element => element.stage === "5");
    setStageOne(one);
    setStageTwo(two);
    setStageThree(three);
    setStageFour(four);
    setStageFive(five);
  };

  const openForm = e => {
    setShow(!show);
  };

  const onDragEndHandle = result => {
    const { destination, source, draggableId } = result;
    //Do nothing when no destination
    if (!destination) {
      return;
    }

    if (
      // Check if destination is the same place and do nothing
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else if (
      // check same destination differnt order
      destination.droppableId === source.droppableId &&
      source.index !== destination.index
    ) {
      switch (source.droppableId) {
        // moving tiles up and down, does not presist after render . Needs to be worked on and find a better solution.
        case "stageOne":
          let newStageOne = [...stageOne];
          let stealOne = newStageOne.splice(source.index, 1)[0];
          newStageOne.splice(destination.index, 0, stealOne);
          setStageOne(newStageOne);
          break;
        case "stageTwo":
          let newStageTwo = [...stageTwo];
          let stealTwo = newStageTwo.splice(source.index, 1)[0];
          newStageTwo.splice(destination.index, 0, stealTwo);
          setStageTwo(newStageTwo);
          break;
        case "stageThree":
          let newStageThree = [...stageThree];
          let stealThree = newStageThree.splice(source.index, 1)[0];
          newStageThree.splice(destination.index, 0, stealThree);
          setStageThree(newStageThree);
          break;
        case "stageFour":
          let newStageFour = [...stageFour];
          let stealFour = newStageFour.splice(source.index, 1)[0];
          newStageFour.splice(destination.index, 0, stealFour);
          setStageFour(newStageFour);
          break;
        case "stageFive":
          let newStageFive = [...stageFive];
          let stealFive = newStageFive.splice(source.index, 1)[0];
          newStageFive.splice(destination.index, 0, stealFive);
          setStageFive(newStageFive);
          break;
      }
    } else if (destination.droppableId !== source.droppableId) {
      //added loader to prevent ugly render glitch
      setLoading(true);
      // update MongoDb after tile moved to another stage
      let endPoint = "";
      switch (destination.droppableId) {
        case "stageOne":
          endPoint = "1";
          break;
        case "stageTwo":
          endPoint = "2";
          break;
        case "stageThree":
          endPoint = "3";
          break;
        case "stageFour":
          endPoint = "4";
          break;
        case "stageFive":
          endPoint = "5";
          break;
      }
      axios({
        method: "POST",
        url: `http://localhost:3000/api/project/${draggableId}/${endPoint}`
      });

      // re-fetch data after stage change
      fetchData();
    }
    loader();
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <img src={spinner} alt="spinnner" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEndHandle}>
          <div className="stage-main-container">
            <div className="stage-wrap">
              <Stage
                stage={stageOne}
                deleteHandler={deleteHandler}
                droppableId={"stageOne"}
              />
              <Stage
                stage={stageTwo}
                deleteHandler={deleteHandler}
                droppableId={"stageTwo"}
              />
              <Stage
                stage={stageThree}
                deleteHandler={deleteHandler}
                droppableId={"stageThree"}
              />
              <Stage
                stage={stageFour}
                deleteHandler={deleteHandler}
                droppableId={"stageFour"}
              />
              <Stage
                stage={stageFive}
                deleteHandler={deleteHandler}
                droppableId={"stageFive"}
              />
            </div>

            {show ? (
              <ProjectForm fetchData={fetchData} openForm={openForm} />
            ) : (
              <div className="addButton" onClick={openForm}>
                Add a New Project +
              </div>
            )}
          </div>
        </DragDropContext>
      )}
    </>
  );
}
