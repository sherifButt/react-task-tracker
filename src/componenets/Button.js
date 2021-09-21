import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: "steelblue",
};

export default Button;
