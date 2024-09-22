import { Routes, Route } from 'react-router-dom';  // New API for react-router-dom v6+
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import Homepage from './pages/HomePage/Homepage';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login/Login";
import CityList from './components/cityList/CityList';
import { useEffect, useState } from 'react';



const BASE_URL ='http://localhost:9000';

function App() {
  const [cities, setCities]=useState([]);
  const [isLoading, setIsLoading]=useState(false);

  useEffect(function(){
    async function fetchCities(){
      try{ 
          setIsLoading(false);
          const res=await fetchCities(`${BASE_URL}/cities`);
          const data=await res.json();
          setCities(data);
    } catch{
      alert('There was an error loading data...')
    }finally{
      setIsLoading(false);
    }
  }
  fetchCities();
  },[])
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
          <Route path="countries" element={<p>List of countries</p>}/>
          <Route path="from" element={<p>Form</p>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes> 
    </BrowserRouter> 
  );
}

export default App;

