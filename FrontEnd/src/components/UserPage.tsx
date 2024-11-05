// import React from 'react';
// import './UserPage.css';
// import { Box, Heading, Image, Text, SimpleGrid } from '@chakra-ui/react';
// import bg_img from "../image/car.jpg";
// import work from "../image/Q.jpg";
// import eve from "../image/U.jpg";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const UserPage: React.FC = () => {
//   // const userId: string = "123456";
//   // const role: string = "manager";
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem('token');
//   let userId = '';
//   let role='';

//   if (token) {
//     const decodedToken: { id: string, role:string } = jwtDecode(token);
//     userId = decodedToken.id;
//     role = decodedToken.role;
//   }
//   else{
//     alert("user is not authenticated");
//   }
import React, { useEffect, useState } from 'react';
import './UserPage.css';
import { Box, Heading, Image, Text, SimpleGrid } from '@chakra-ui/react';
import bg_img from "../image/car.jpg";
import work from "../image/Q.jpg";
import eve from "../image/U.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        // Decode the token and extract userId and role
        const decodedToken: { id: string; role: string } = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        setUserId(decodedToken.id);
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Token decoding failed:', error);
        alert('Invalid token.');
        navigate('/login'); // Redirect to login if token is invalid
      }
    } else {
      alert("User is not authenticated");
      navigate('/login'); // Redirect to login if token is missing
    }

    setLoading(false); // Loading complete after user ID and role are set
  }, [navigate]);

  const handleParkingClick = async () => {
    try {
      const response = await axios.get(`http://localhost:4004/api/v1/parking/reservations/slotByUserId/${userId}`);
      const data = response.data;
      
      if (data.exit_at || data.message === "No reservations found for this user.") {
        navigate('/ParkingPage');
      } else {
        navigate('/finalparking'); 
      }
    } catch (error) {
      console.error('Failed to fetch reservation data:', error);
    }
  };

  // Display a loading message or spinner while initializing
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="main-page" p={5} mt={50}>
      {role === "manager" ? (
        <>
          <Heading className="page-title" mb={30}>Reserve a Slot</Heading>
          <Box display="flex" justifyContent="center" mt={5}>
            <Box className="image-container">
              <SimpleGrid columns={3} gap={10}>
                <Box textAlign="center">
                  <a onClick={handleParkingClick} style={{ textDecoration: 'none' }}>
                    <Image src={bg_img} alt="Slot 1" className="slot-image" borderRadius="md" />
                    <Text mt={2} fontWeight="bold">Book a Parking Space</Text>
                  </a>
                </Box>
                <Box textAlign="center">
                  <a href="/WorkspaceReservation" style={{ textDecoration: 'none' }}>
                    <Image src={work} alt="Slot 2" className="slot-image" borderRadius="md" />
                    <Text mt={2} fontWeight="bold">Book a Work Space</Text>
                  </a>
                </Box>
                <Box textAlign="center">
                  <a href="/EventSpaceReservation" style={{ textDecoration: 'none' }}>
                    <Image src={eve} alt="Slot 3" className="slot-image" borderRadius="md" />
                    <Text mt={2} fontWeight="bold">Book an Event Space</Text>
                  </a>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Heading className="page-title" mb={5}>Reserve a Slot</Heading>
          <Box display="flex" justifyContent="center" mt={5}>
            <Box className="image-container">
              <SimpleGrid columns={2} gap={10}>
                <Box textAlign="center">
                  <a onClick={handleParkingClick} style={{ textDecoration: 'none' }}>
                    <Image src={bg_img} alt="Slot 1" className="slot-image" borderRadius="md" />
                    <Text mt={2} fontWeight="bold">Book a Parking Space</Text>
                  </a>
                </Box>
                <Box textAlign="center">
                  <a href="/WorkspaceReservation" style={{ textDecoration: 'none' }}>
                    <Image src={work} alt="Slot 2" className="slot-image" borderRadius="md" />
                    <Text mt={2} fontWeight="bold">Book a Work Space</Text>
                  </a>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserPage;
