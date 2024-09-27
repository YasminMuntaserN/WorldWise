import { createContext, useEffect, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities :[] ,
  isLoading : false,
  currentCity :{},
  error:""
};

function reducer(state , action)
{
  switch (action.type) {
    case 'loading':
      return {
        ...state ,
        isLoading: true
      }
    case 'cities/loaded':
    return {
      ...state ,
      isLoading :false ,
      cities : action.payload
    }
    case 'city/crated':
      return {
        ...state ,
        isLoading :false ,
        cities : [...state.cities , action.payload],
        currentCity : action.payload
      }
    case 'city/deleted':
      return {
        ...state ,
        isLoading :false ,
        cities : state.cities.filter(c => c.id !== action.payload),
        currentCity : {}
      }
    case 'rejected':
      return {
        ...state ,
        isLoading: false ,
        error: action.payload
      }

    case 'city/loaded':
      return {
        ...state ,
        isLoading :false ,
        currentCity : action.payload
      } 

    default:
      throw new Error('Unknown action type: ');
  }
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function CitiesProvider({ children }) {
  const[{cities ,isLoading ,currentCity ,error} ,dispatch]
              = useReducer(reducer ,initialState);
              
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState(null); // Start with `null`

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({type:"loading"});

        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error('Failed to fetch cities');
        const data = await res.json();

        dispatch({type:"cities/loaded" ,payload:data});

      } catch (error) {
        dispatch({type:"rejected" ,payload:'There was an error loading cities data...'});
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({type:"loading"});
    // we must convert the id to Number because any number get from the url will be as string
    if(Number(id) === currentCity.id) return;

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error('Failed to fetch city'); // More specific error
      const data = await res.json();

      dispatch({type:"city/loaded" ,payload:data});

    } catch (error) {
      dispatch({type:"rejected" ,payload:'There was an error loading city data...'});
    }
  },[currentCity.id])

  async function createCity(newCity){
    try {
      dispatch({type:"loading"});

      const res = await fetch(`${BASE_URL}/cities` ,{
        method :'POST',
        body:JSON.stringify(newCity),
        headers :{
          "Content-Type": "application/json",
        }
      });
      if (!res.ok) throw new Error('Failed to Add cities');
      const data = await res.json();
  
      dispatch({type:"city/crated" ,payload:data});

    } catch (error) {
      dispatch({type:"rejected" ,payload:'There was an error creating cities data...'});
    }
  }

  async function deleteCity(id){
    try {
      dispatch({type:"loading"});
      const res = await fetch(`${BASE_URL}/cities/${id}` ,{
        method :'DELETE',
      });

      if (!res.ok) throw new Error('Failed to Delete city');
      await res.json();
      
      dispatch({type:"city/deleted" ,payload:id});

    } catch (error) {
      dispatch({type:"rejected" ,payload:'There was an error deleting cities data...'});
    } 
  }

  return (
    <CitiesContext.Provider value={{
        cities, 
        isLoading,
        currentCity,
        error,
        getCity ,
        createCity,
        deleteCity}}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
