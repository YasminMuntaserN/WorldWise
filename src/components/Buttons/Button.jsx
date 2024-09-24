import styles from "./Button.module.css";
import PropTypes from 'prop-types';


// Define prop types for validation
Button.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
