import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { dayName } from "../utls/date";
import { useSpring, animated } from "react-spring";

const TaskEdit = ({
  task,
  deleteTask,
  toggleReminder,
  editedTask,
  setEditedTask,
  setMnueItem,
  editTask,
}) => {
  
  const props = useSpring({to:{opacity:1},from:{opacity:0}})

  return (
    <div style={{ display: "blcok" }}>
      <animated.div style={props}>
        <form>
          <textarea
            className="edit"
            autoFocus
            type="text-area"
            value={editedTask.text}
            rows={
              editedTask.text.length < 35
                ? 1
                : Math.ceil(editedTask.text.length / 34)
            }
            // cols={editedTask.text.length < 30 ? editedTask.text.length : 36}
            cols="35"
            onChange={(e) =>
              setEditedTask({ ...editedTask, text: e.target.value })
            }
            onBlur={(e) => {
              editTask(editedTask);
              setMnueItem(1);
            }}
          />
        </form>

        <p className="icon">
          <FaClock fontSize="10" />
          &nbsp;{dayName(task.day)}{" "}
          {/* <input type="date" className="date icon" value={`${ task.day }:${ task.hour }`}></input> */}
          {task.day} {task.time && "@"} {task.time}
        </p>
      </animated.div>
    </div>
  );
};
export default TaskEdit;
