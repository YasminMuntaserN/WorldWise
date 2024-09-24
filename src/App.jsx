import { Routes, Route, Navigate } from 'react-router-dom';  // New API for react-router-dom v6+
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import Homepage from './pages/HomePage/Homepage';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login/Login";
import CityList from './components/cityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from "./components/City/City";
import Form from "./components/Form/Form";
// import { useEffect, useState } from 'react';
import CitiesProvider from "./contexts/citiesContext";





function App() {
  return (
  <CitiesProvider>
    <BrowserRouter> 
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="Login" element={<Login />} />
      <Route path="app" element={<AppLayout/>} >
        {/* <Route index element={
            <CityList
                cities={cities}
                isLoading={isLoading}/>}
            /> */}
          <Route index element={
            <Navigate replace to="cities"/>}
            />
        <Route path="cities" element={<CityList/>}/>
        <Route path="cities/:id" element={<City />}/>
        <Route path="countries" element={<CountryList/>}/>
    <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes> 
    </BrowserRouter> 
  </CitiesProvider>
  );
}

export default App;

