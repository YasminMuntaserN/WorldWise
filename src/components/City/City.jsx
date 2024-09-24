import { useParams  } from "react-router-dom";
import styles from "./City.module.css";
import PropTypes from 'prop-types';
import { useCities } from "../../contexts/citiesContext";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import BackButton from "../Buttons/BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

    // Define PropTypes for the city object and its properties
    City.propTypes = {
      city : PropTypes.object.isRequired,
    cityName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};


function City() {
    const { id } = useParams();
    const {getCity , currentCity , isLoading }=useCities();
    const { cityName, emoji, date, notes } = currentCity;

    useEffect(function(){
      getCity(id);
    } , [id]);

    if(isLoading) return <Spinner />;

  return ( 
<div className={styles.city}>
    <div className={styles.row}>
      <h6>City name</h6>
      <h3>
        <span>{emoji}</span> {cityName}
      </h3>
    </div>

    <div className={styles.row}>
      <h6>You went to {cityName} on</h6>
      <p>{formatDate(date || null)}</p>
    </div>

    {notes && (
      <div className={styles.row}>
        <h6>Your notes</h6>
        <p>{notes}</p>
      </div>
    )}

    <div className={styles.row}>
      <h6>Learn more</h6>
      <a
        href={`https://en.wikipedia.org/wiki/${cityName}`}
        target="_blank"
        rel="noreferrer"
      >
        Check out {cityName} on Wikipedia &rarr;
      </a>
    </div>
    <div>
      <BackButton/>
    </div>
  </div>
  );
}

export default City;
