import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { Provider } from "./components/ui/provider"
import UserNavbar from './components/UserNavbar';
import UserPage from './components/UserPage';
import ServicePage from './components/Services';

import { ChakraProvider } from '@chakra-ui/react';
import ParkingPage from './components/parkingpage';

import WorkspaceReservation from './components/WorkspaceReservation';
import EventSpaceReservation from './components/EventSpaceReservation';



function App() {
  return (
    <>
    <Provider>
    <Router>
      {/* <Navbar />
      <LandingPage /> */}
      <Routes>
        <Route path='/' element={<><Navbar /><LandingPage/></>}></Route>
         <Route path='/login' element={<><Navbar /><Login/></>}></Route> 
        

      </Routes>
      <Routes>
      <Route path='/signup' element={<><Navbar /><Signup/></>}></Route>
      </Routes>
      

      <Routes>
      <Route path='/user' element={<><UserNavbar /><UserPage/></>}></Route>
      </Routes>
      <Routes>
      <Route path='/services' element={<><Navbar /><ServicePage/></>}></Route>
      </Routes>
      <Routes>
      <Route path='/parkingpage' element={<><ParkingPage/></>}></Route>
      </Routes>
      <Routes>
      <Route path='/workspacereservation' element={<><WorkspaceReservation/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/eventspacereservation' element={<><EventSpaceReservation/></>}></Route>
      </Routes>

    </Router>
    

    </Provider>


    
    
    </>
  );
}

export default App;
