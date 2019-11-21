import React from "react";
import "./ProjectCard.scss";
import { Draggable } from "react-beautiful-dnd";
import cross from "../../image/cross.png";

export default function ProjectCard(props) {
  
  return (
    <Draggable draggableId={props._id} index={props.index}>
      {provided => (
        <div
          className="each-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card-top">
            <p>{props.title}</p>
            <img  onClick={()=>props.deleteHandler(props._id)} src={cross} alt="cross" />
          </div>
          <div className="card-bottom">
            <p>{props.detail}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
