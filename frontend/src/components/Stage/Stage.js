import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ProjectCard from "../ProjectCard/ProjectCard";
import "../Project/Project.scss";

export default function Stage(props) {
  return (
    <div>
      <Droppable droppableId={props.droppableId}>
        {provided => (
          <div
            className="stage-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.stage.map((project, index) => (
              <ProjectCard key={project._id} {...project} index={index} deleteHandler={props.deleteHandler}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
