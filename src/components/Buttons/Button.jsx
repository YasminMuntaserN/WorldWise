import styles from "./Button.module.css";
import PropTypes from 'prop-types';

// Define prop types for validation
Button.propTypes = {
  children: PropTypes.node.isRequired, // Changed to 'node'
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string, // Made not required
};

// Optionally define default props
Button.defaultProps = {
  type: 'default', // Use a sensible default
};

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;

