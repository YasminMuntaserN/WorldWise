import { Routes, Route } from 'react-router-dom';  // New API for react-router-dom v6+
import Homepage from './pages/HomePage/Homepage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;

