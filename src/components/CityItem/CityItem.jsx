import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes from 'prop-types';
import { useCities } from "../../contexts/citiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

    // Define PropTypes for the city object and its properties
    CityItem.propTypes = {
      city: PropTypes.shape({
        cityName: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        position: PropTypes.shape({
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
    };


function CityItem({city}) {
  const {currentCity ,deleteCity} =useCities();
  const{cityName , emoji , date ,id ,position}=city;

  function handleClick(e){
    // the link is no longer clicked , but only the button 
    e.preventDefault();
    deleteCity(id);
  }

return (
        <li >
      <Link   className={`${styles.cityItem} ${currentCity && id === currentCity.id ? styles['cityItem--active'] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className ={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}
                onClick={handleClick}  >&times;</button>
        </Link>
    </li>

  );
}

export default CityItem;
