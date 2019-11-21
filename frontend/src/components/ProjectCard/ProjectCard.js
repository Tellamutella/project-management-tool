import React from "react";
import "./ProjectCard.scss";
import { Draggable } from "react-beautiful-dnd";

export default function ProjectCard(props) {
  return (
    <Draggable draggableId={props._id} index={props.index}>
      {provided => (
        <div
          className="content"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{props.title}</p>
          <p>{props.detail}</p>
        </div>
      )}
    </Draggable>
  );
}

// import React from "react";
// import "./Task.scss";
// import { Draggable } from "react-beautiful-dnd";

// export default function Task(props) {
//   return (
//     <Draggable draggableId={props.task.id} index={props.index}>
//       {provided => (
//         <div
//           className="content"
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           {props.task.content}
//         </div>
//       )}
//     </Draggable>
//   );
// }
