import PropTypes from "prop-types";
import {useLocation} from 'react-router-dom'
import Button from "./Button";
const Header = ({
  title,
  x,
  toggleAddTaskForm,
  showAddTaskForm,
  setShowTasks,
}) => {
  const location = useLocation().pathname;

  return (
    <header className="header">
      <h1>{title}</h1>

      {location === "/" && (
        <Button
          color={showAddTaskForm ? "red" : "black"}
          text={showAddTaskForm ? "close" : "+ Add Task"}
          count={1}
          onClick={toggleAddTaskForm}
          
        />
      )}
    </header>
  );
};
// css in js
// const style = {
//   color: "red",
//   fontSize: "10px",
// };

Header.defaultProps = {
  title: "Task Traker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
