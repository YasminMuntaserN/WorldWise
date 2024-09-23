import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner"
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import PropTypes from 'prop-types';


// Define prop types for validation
CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


function CityList({cities ,isLoading}) {
  if(isLoading) return <Spinner/>

  if(!cities.length) 
    return <Message message='Add Your first city by clicking on a city on the map'/>;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) =>(
        <CityItem city={city} key={city.id}/>
      ))}
    </ul>
  );
}

export default CityList

