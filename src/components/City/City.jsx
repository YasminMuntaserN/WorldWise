import { Link, useParams } from "react-router-dom";
import styles from "./City.module.css";
import PropTypes from 'prop-types';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

    // Define PropTypes for the city object and its properties
    City.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};


function City({city}) {
   const { id } = useParams();
  const{cityName , emoji , date  ,position}=city;
return (
        <li >
      <Link className ={styles.cityItem}
            to={`${id}?lat=${position.lat}`}>
        <span className ={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
        </Link>
    </li>

  );
}

export default City;
