import React from 'react';
import TaskSwitch from './TaskSwitch';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const Tasks = ({
   tasks,
   setTasks,
   deleteTask,
   toggleReminder,
   editTask,
   saveTasks,
   saveReorderdTasks,
}) => {
   return (
      <DragDropContext
         onDragEnd={param => {
            if (param.destination) {
               const srcI = param.source.index;
               const disI = param.destination.index;
               // tasks.splice(srcI,1,disT)
               tasks.splice(disI, 0, tasks.splice(srcI, 1)[0]);
               saveReorderdTasks(srcI, disI);
               setTasks(tasks);
               console.log(tasks);
            }
         }}>
         <Droppable droppableId="droppable-1" type="TASK">
            {(provided, _) => (
               <div
                  ref={provided.innerRef}
                  // style={{
                  //   backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
                  // }}
                  {...provided.droppableProps}>
                  {tasks.map((task, i) => (
                     <Draggable key={uuidv4()} draggableId={'draggable-' + task.id} index={i}>
                        {(provided, snapshot) => (
                           <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                 ...provided.draggableProps.style,
                                 boxShadow: snapshot.isDragging
                                    ? '0px 15px 25px #00000025'
                                    : 'none',
                                 borderRadius: snapshot.isDragging ? '10px' : 'none',
                                 background: snapshot.isDragging ? '#fff' : 'none',
                              }}>
                              <TaskSwitch
                                 key={task.id}
                                 task={task}
                                 deleteTask={deleteTask}
                                 toggleReminder={toggleReminder}
                                 editTask={editTask}
                              />
                           </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
   );
};

export default Tasks;
