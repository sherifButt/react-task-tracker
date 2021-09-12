import { useState } from "react";
import {  useSpring } from "react-spring";

const AddTask = ({ addTask, showAddTaskForm }) => {
  // Vars
  const date = new Date();
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  // STATE
  const [text, setText] = useState("");
  const [day, setDay] = useState(date.toJSON().slice(0, 10));
  const [time, setTime] = useState(`${hour}:${minute}`);
  
  const [reminder, setReminder] = useState(true);

  // ANIMATION
  const props = useSpring({
    to: { opacity: 1, y: 50 },
    from: { opacity: 0, y: 0 },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please enter a Task");
      return;
    }
    if (!day) {
      alert("Please enter a Date");
      return;
    }
    if (!time) {
      alert("Please enter a Time");
      return;
    }
    addTask({ text, day, time, reminder });
    setText("");
    setDay(date.toJSON().slice(0, 10));
    setTime(`${date.getHours()}:${date.getMinutes()}`);
    setReminder(false);
  };

  return (
    <div>
      <form
        className="add-form"
        // style={{ display: showAddTaskForm ? "" : "none" }}
        onSubmit={onSubmit}
        method="post"
      >
        <div className="form-control">
          {/* <label>Task</label> */}
          <input
            type="text"
            placeholder="Add task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-control half-width input">
            {/* <label>Dat</label> */}
            <input
              type="date"
              placeholder="Add Day & Time"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="form-control half-width">
            {/* <label>Time</label> */}
            <input
              type="time"
              placeholder="Add Day & Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input
            type="checkbox"
            value={reminder}
            checked={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
        <input type="submit" value="Save Task" className="btn btn-block" />
      </form>
    </div>
  );
};
export default AddTask;