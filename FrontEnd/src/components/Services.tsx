import React from 'react';
import carImage from "../image/car.jpg";
import offi from "../image/Q.jpg";
import eve from "../image/U.jpg";

const ServicePage: React.FC = () => {
  return (
    <>
      <div className="services-section" id='services'>
        <h2 className="services-title">Our Services</h2>
        <div className="services-container">
          <div className="service-item">
            <img src={carImage} alt="Service 1" className="service-image" />
            <p style={{ color: 'black' }} className="service-description">
              "Reliable and secure parking facilities for all your needs."
            </p>
          </div>
          <div className="service-item">
            <img src={offi} alt="Service 2" className="service-image" />
            <p style={{ color: 'black' }} className="service-description">
              "Innovative office spaces crafted to enhance productivity and collaboration."
            </p>
          </div>
          <div className="service-item">
            <img src={eve} alt="Service 3" className="service-image" />
            <p style={{ color: 'black' }} className="service-description">
              "Organize events seamlessly with our expert space management services."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
