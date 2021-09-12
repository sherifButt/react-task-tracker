import { useState } from "react";
import { FaTimes, FaClock, FaEdit, FaEquals } from "react-icons/fa";
import { dayName } from "../utls/date";
import { useSpring, animated } from "react-spring";

const Task = ({ task, setMnueItem }) => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <animated.div style={props}>
      <h3
        onClick={() => {
          setMnueItem(2);
        }}
      >
        {task.text}
      </h3>

      <p className="time">
        <FaClock className="icon" fontSize="10" />
        &nbsp;{dayName(task.day)} {task.day} {task.time && "@"} {task.time}
      </p>
    </animated.div>
  );
};
export default Task;
