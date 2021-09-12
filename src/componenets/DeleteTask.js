import Button from "./Button";
import { useSpring, animated } from "@react-spring/web";

const DeleteTask = ({ deleteTask, task, setMnueItem }) => {
  // Animate
  const props = useSpring({to:{opacity:1,x:50},from:{opacity:0,x:0}})
  return (
    <animated.div style={props}>
      <div div className="delete-task">
        <p>
          Delete <u>{task.text}</u>?
        </p>
        <Button text="Yes" color="red" onClick={() => deleteTask(task.id)} />
        <Button text="No" color="Green" onClick={() => setMnueItem(1)} />
      </div>
    </animated.div>
  );
};
export default DeleteTask;
