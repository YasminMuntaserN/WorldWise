import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null); // Start with `null`

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error('Failed to fetch cities');
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert('There was an error loading cities data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error('Failed to fetch city'); // More specific error
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert('There was an error loading city data...');
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity){
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities` ,{
        method :'POST',
        body:JSON.stringify(newCity),
        headers :{
          "Content-Type": "application/json",
        }
      });
      if (!res.ok) throw new Error('Failed to fetch cities');
      const data = await res.json();
  
      console.log(data);
    } catch (error) {
      alert('There was an error loading cities data...');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity ,createCity}}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined){ 
    console.log("here the error ");
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}



export { CitiesProvider, useCities };
