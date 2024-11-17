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
import FinalParkingPage from './components/FinalParkingPage';
import TrackReservation from './components/TrackReservation';
import FinalWorkPage from './components/FinalWorkPage';
import EventReservation2 from './components/EventReservation2';
import FinalEvent from './components/FinalEvent';
import Feedback from './components/Feedback';
import Admin from './components/Admin';
import ViewFeedback from './components/ViewFeedback';
import ManageUsers from './components/MangeUsers';



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
      <Route path='/user' element={<><UserPage/></>}></Route>
      <Route path='/parkingpage' element={<><ParkingPage/></>}></Route>
      </Routes>
      <Routes>
      <Route path='/services' element={<><Navbar /><ServicePage/></>}></Route>
      </Routes>
      {/* <Routes>
      <Route path='/parkingpage' element={<><ParkingPage/></>}></Route>
      </Routes> */}
      <Routes>
      <Route path='/workspacereservation' element={<><WorkspaceReservation/></>}></Route>
      </Routes>
      

      <Routes>
      <Route path='/eventspacereservation' element={<><EventSpaceReservation/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/finalparking' element={<><FinalParkingPage/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/track-reservation' element={<><TrackReservation/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/finalwork' element={<><FinalWorkPage/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/eventreserve2' element={<><EventReservation2/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/finalevent' element={<><FinalEvent/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/feedback' element={<><Feedback/></>}></Route>
      </Routes>

      <Routes>
      <Route path='/admin' element={<><Admin/></>}></Route>
      </Routes>

       <Routes>
      <Route path='/view-feedback' element={<><ViewFeedback/></>}></Route>
      </Routes> 

      <Routes>
      <Route path='/manage-users' element={<><ManageUsers/></>}></Route>
      </Routes> 

    </Router>
    

    </Provider>


    
    
    </>
  );
}

export default App;
