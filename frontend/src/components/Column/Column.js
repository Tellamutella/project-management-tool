// import React from "react";
// import Task from "../Task/Task";
// import { Droppable } from "react-beautiful-dnd";

// export default function Column(props) {
//   return (
//     <div>
//       <h1>{props.column.title}</h1>
//       <Droppable droppableId={props.column.id}>
//         {provided => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {props.tasks.map((task, index) => (
//               <Task key={task.id} task={task} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }
