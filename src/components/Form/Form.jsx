// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Buttons/Button" 
import BackButton from "../Buttons/BackButton";
import {useUrlPosition} from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from"../Spinner/Spinner";
import { useCities } from "../../contexts/citiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL ="https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const {createCity , isLoading} =useCities();
  const navigate =useNavigate();
  const[isLoadingGeocoding , setIsLoadingGeocoding ] =useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[geocodingError , setGeocodingError ] =useState("");
  
  useEffect(function() {
    console.log("Latitude:", lat, "Longitude:", lng); // Log lat and lng
    if (!lat && !lng) return;
  
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
  
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log("API Response:", data); // Log API response
  
        if (!data) throw new Error("That doesn't seem to be a city. Click somewhere else.");
  
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lng, lat]);

  async function handleSubmit(e){
    e.preventDefault();

    if(!cityName || !date) return;

    const newCity ={
      cityName ,
      country,
      emoji,
      date ,
      notes ,
      position:{lat , lng},
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if(isLoadingGeocoding) return <Spinner />;

  if(!lat && !lng) return <Message message="start by clicking on the map"/> ;

  if(geocodingError) return <Message message={geocodingError}/>

  return (
    <form className={`${styles.form} ${isLoading ?styles.loading:"" }`} onSubmit ={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />*/}
        <DatePicker onChange={(date) => setDate(date)} selected ={date} dateFormat="dd/MM/yyyy"/>
      </div> 

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton/>

      </div>
    </form>
  );
}

export default Form;
