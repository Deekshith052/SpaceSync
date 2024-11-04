// src/components/UserPage.tsx
import React from 'react';
import './UserPage.css';
import { Box, Heading, Image, Text, SimpleGrid } from '@chakra-ui/react';
import bg_img from "../image/car.jpg";
import work from "../image/Q.jpg";
import eve from "../image/U.jpg";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

interface JwtPayload {
  userId: string; // Adjust the property name based on your JWT structure
}

const UserPage: React.FC = () => {
  const navigate = useNavigate();

  const handleParkingClick = async () => {
    // const token = sessionStorage.getItem('jwtToken'); /

    // if (!token) {
    //   console.error('No token found');
    //   return; 
    // }

    // const decoded: JwtPayload = jwt_decode(token);
    // const userId = decoded.userId; 
    const userId = "123456";

    try {
      const response = await axios.get(`http://localhost:4004/api/v1/parking/reservations/slotByUserId/${userId}`);
      const data = response.data;

      // Check if exit_at attribute is not present
      if (data.exit_at || data.message==="No reservations found for this user.") { // Updated condition to check for absence
        navigate('/ParkingPage');
      } else {
        navigate('/finalparking'); 
      }
    } catch (error) {
      console.error('Failed to fetch reservation data:', error);
    }
  };

  return (
    <Box className="main-page" p={5}>
      <center><Heading className="page-title" mb={50}>Reserve a Slot</Heading></center>
      <SimpleGrid columns={[1, 2, 3]} className="image-container">
        <Box textAlign="center">
          <a onClick={handleParkingClick} href="#" style={{ textDecoration: 'none' }}>
            <Image src={bg_img} alt="Slot 1" className="slot-image" borderRadius="md" />
            <Text mt={2} mr={16} fontWeight="bold">Book a Parking Space</Text>
          </a>
        </Box>
        <Box textAlign="center">
          <a href="/WorkspaceReservation">
            <Image src={work} alt="Slot 2" className="slot-image" borderRadius="md" />
            <Text mt={2} mr={16} fontWeight="bold">Book a Work Space</Text>
          </a>
        </Box>
        <Box textAlign="center">
          <a href="/EventSpaceReservation">
            <Image src={eve} alt="Slot 3" className="slot-image" borderRadius="md" />
            <Text mt={2} mr={16} fontWeight="bold">Book an Event Space</Text>
          </a>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserPage;
