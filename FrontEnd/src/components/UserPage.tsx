import React from 'react';
import './UserPage.css';
import { Box, Heading, Image, Text, SimpleGrid } from '@chakra-ui/react';
import bg_img from "../image/car.jpg";
import work from "../image/Q.jpg";
import eve from "../image/U.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserPage: React.FC = () => {
  const userId: string = "123456";
  const role: string = "manager";

  const navigate = useNavigate();

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

  return (
    <Box className="main-page" p={5} mt={50}>
      {role === "manager" && (
        <>
          <Heading className="page-title" mb={30}>Reserve a Slot</Heading>
          <Box display="flex" justifyContent="center" mt={5}>
            <Box className="image-container">
              <SimpleGrid columns={3} gap={10}> {/* Changed spacing to gap */}
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
      )}
      {role !== "manager" && (
        <>
          <Heading className="page-title" mb={5}>Reserve a Slot</Heading>
          <Box display="flex" justifyContent="center" mt={5}>
            <Box className="image-container">
              <SimpleGrid columns={2} gap={10}> {/* Changed spacing to gap */}
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
