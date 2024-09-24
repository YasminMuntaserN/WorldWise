import { createContext ,useState ,useEffect ,useContext } from "react"
import PropTypes from 'prop-types';

const BASE_URL ='http://localhost:8000';

const CitiesContext =createContext();

CitiesProvider.propTypes = {
    children: PropTypes.object.isRequired
  };
function CitiesProvider({children}){
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity , setCurrentCity] =useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);  // Set loading state before fetching data
        const res = await fetch(`${BASE_URL}/cities`); // Use fetch instead of fetchCities
        if (!res.ok) throw new Error('Failed to fetch cities'); // Handle HTTP errors
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);  // Always set loading to false at the end
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
      try {
        setIsLoading(true);  // Set loading state before fetching data
        const res = await fetch(`${BASE_URL}/cities/${id}`); // Use fetch instead of fetchCities
        if (!res.ok) throw new Error('Failed to fetch cities'); // Handle HTTP errors
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);  // Always set loading to false at the end
      }
  }

  return <CitiesContext.Provider value={{
    cities ,
    isLoading,
    currentCity,
    getCity
  }}>
              {children}
        </CitiesContext.Provider>
}

function useCities(){
  const context = useContext(CitiesContext);
  if(context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export {CitiesProvider ,useCities} 
