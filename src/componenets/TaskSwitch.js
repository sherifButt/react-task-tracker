import { useState } from "react";
import {
  FaTimes,
  FaEdit,
  FaCheck,
} from "react-icons/fa";


// componenets
import Task from "./Task";
import TaskEdit from "./TaskEdit";
import DeleteTask from "./DeleteTask";

const TaskSwitch = ({ task, deleteTask, toggleReminder, editTask }) => {
  // STATE
  const [mnueItem, setMnueItem] = useState(1);
  const [editedTask, setEditedTask] = useState(task);

  

  let component = null;
  switch (mnueItem) {
    case 1:
      component = (
        <>
          <Task
            _key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleReminder={toggleReminder}
            setMnueItem={setMnueItem}
          />
          <div width="150px">
            <div>
              <FaEdit
                className="icon"
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  marginRight: "10px",
                  paddingBottom: "2px",
                }}
                onClick={() => setMnueItem(2)}
              />
              <FaTimes
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => setMnueItem(3)}
              />
            </div>
          </div>
        </>
      );
      break;
    case 2:
      component = (
        <>
          <TaskEdit
            _key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleReminder={toggleReminder}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
            setMnueItem={setMnueItem}
            editTask={editTask}
          />
          <span margin="10">
            <FaCheck
              className="icon"
              style={{ fontSize: "10" }}
              onClick={() => {
                setMnueItem(1);
                editTask(editedTask);
              }}
            />
          </span>
        </>
      );
      break;
    case 3:
      component = (
        <DeleteTask
          deleteTask={deleteTask}
          task={task}
          setMnueItem={setMnueItem}
        />
      );
      break;
    default:
      component = <Task />;
  }

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      {component}
    </div>
  );
};
export default TaskSwitch;
