// src/LandingPage.tsx
import React from 'react';
import '../LandingPage.css'; // Import the CSS for styling
import welcomeImage from "../image/Y.jpg"
import carImage from "../image/car.jpg"
import offi from "../image/Q.jpg"
import eve from "../image/U.jpg"
const LandingPage: React.FC = () => {
  return (
    <>
    <div className="landing-page">
      <div>
      <h1 className="quote">Welcome to SpaceSync </h1><br></br>
      <h3>"Your All-in-One Reservation Solution"
      </h3>
      </div>
      
      

      <div className="image-container">
    <img src={welcomeImage} alt="SpaceSync" className="landing-image" /> 
    {/* Replace with your image path */}
  </div>
    </div>
  </>

  );
};

export default LandingPage;
