import { Routes, Route, Navigate } from 'react-router-dom';  // New API for react-router-dom v6+
import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const Homepage = lazy(()=>import ('./pages/HomePage/Homepage'));
const Product = lazy(()=>import ('./pages/Product/Product'));
const AppLayout = lazy(()=>import ('./pages/AppLayout/AppLayout'));
const Pricing = lazy(()=>import ('./pages/Pricing/Pricing'));
const Login = lazy(()=>import ('./pages/Login/Login'));
const PageNotFound = lazy(()=>import ('./pages/PageNotFound'));

import CityList from './components/cityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from "./components/City/City";
import Form from "./components/Form/Form";
// import { useEffect, useState } from 'react';
import {CitiesProvider} from "./contexts/citiesContext";
import {AuthProvider} from "./contexts/FakeAuthContext";
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';



function App() {
  return (
<AuthProvider>
  <CitiesProvider>
    <BrowserRouter> 
    <Suspense>
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="Login" element={<Login />} />

    <Route path="app" element={
      <ProtectedRoute> 
          <AppLayout/>
      </ProtectedRoute>} >
      
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
    </Suspense>
    </BrowserRouter> 
  </CitiesProvider>
</AuthProvider>

  );
}

export default App;

