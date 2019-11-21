import React, { useEffect, useState } from "react";
import "./Project.scss";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function Project() {
  const [stageOne, setStageOne] = useState([]);
  const [stageTwo, setStageTwo] = useState([]);
  const [stageThree, setStageThree] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    loader();
  }, []);

  const loader = () =>
    setTimeout(() => {
      setLoading(false);
    }, 1000);

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
  //filter data retrieved from backend based on their stage
  const filterProjects = data => {
    const one = data.filter(element => element.stage === "1");
    const two = data.filter(element => element.stage === "2");
    const three = data.filter(element => element.stage === "3");
    setStageOne(one);
    setStageTwo(two);
    setStageThree(three);
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
        // moving tiles up and down, Needs to be worked on.
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
        <h1>LOADING</h1>
      ) : (
        <DragDropContext onDragEnd={onDragEndHandle}>
          <div className="stage-container">
            <div>
              <Droppable droppableId="stageOne">
                {provided => (
                  <div
                    className="stageOne-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {stageOne.map((project, index) => (
                      <ProjectCard
                        key={project._id}
                        {...project}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div>
              <Droppable droppableId="stageTwo">
                {provided => (
                  <div
                    className="stageTwo-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {stageTwo.map((project, index) => (
                      <ProjectCard
                        key={project._id}
                        {...project}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div>
              <Droppable droppableId="stageThree">
                {provided => (
                  <div
                    className="stageThree-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {stageThree.map((project, index) => (
                      <ProjectCard
                        key={project._id}
                        {...project}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      )}
    </>
  );
}
