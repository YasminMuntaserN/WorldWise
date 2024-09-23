import PropTypes from 'prop-types';
import styles from "./CountryItem.module.css";

  // Define PropTypes for the city object and its properties
  CountryItem.propTypes = {
    country: PropTypes.shape({
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
    }).isRequired,
  };

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
