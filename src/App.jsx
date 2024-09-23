import { Routes, Route } from 'react-router-dom';  // New API for react-router-dom v6+
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import Homepage from './pages/HomePage/Homepage';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login/Login";
import CityList from './components/cityList/CityList';
import CountryList from './components/CountryList/CountryList';

import { useEffect, useState } from 'react';



const BASE_URL ='http://localhost:8000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  
  return (
    <BrowserRouter> 
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="Login" element={<Login />} />
      <Route path="app" element={<AppLayout/>} >
        <Route index element={
            <CityList cities={cities}
            isLoading={isLoading}/>}></Route>
          <Route path="cities" element={<p>List of cities</p>}/>
          <Route path="countries" element={<CountryList
            cities={cities}
            isLoading={isLoading}/>}/>
          <Route path="from" element={<p>Form</p>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes> 
    </BrowserRouter> 
  );
}

export default App;

