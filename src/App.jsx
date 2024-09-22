import { Routes, Route } from 'react-router-dom';  // New API for react-router-dom v6+
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import Homepage from './pages/HomePage/Homepage';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login/Login";





function App() {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="Login" element={<Login />} />
      <Route path="app" element={<AppLayout/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter> 
  );
}

export default App;

