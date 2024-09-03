import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
//import Footer from './components/Footer'
import Properties from './pages/Properties';
import ManageAccount from './pages/ManageAccount'
import ServicesCatalog from './pages/ServicesCatalog'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login' 
import Register from './pages/Register';

import './App.css'
import FinancialSummary from './pages/FinancialSummary';
//import Calendar from './pages/Calendar'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/properties" element={<Properties />}  />
          {/*<Route path="/calendar" element={<Calendar />} />*/}
          {/*<Route path="/services-catalog/:bookingId" element={<ServicesCatalog />} />*/}
          <Route path="/services-catalog" element={<ServicesCatalog />} />
          <Route path="/financial-summary" element={<FinancialSummary />} />
          <Route path="/manageAccount" element={<ManageAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </main>  
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App
