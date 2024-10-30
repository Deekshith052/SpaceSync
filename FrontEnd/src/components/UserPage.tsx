// src/components/UserPage.tsx
import React from 'react';
import './UserPage.css';
import { Box, Heading, Image, Text, SimpleGrid } from '@chakra-ui/react';
import bg_img from "../image/car.jpg";
import work from "../image/Q.jpg";
import eve from "../image/U.jpg";

const UserPage: React.FC = () => {
  return (
    <Box className="main-page" p={5}>
      <center><Heading className="page-title" mb={50}>Reserve a Slot</Heading></center>
      <SimpleGrid columns={[1, 2, 3]} className="image-container">
        <Box textAlign="center">
          <a href="/ParkingPage">
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
            <Text mt={2} mr={16} fontWeight="bold">Book a Event Space</Text>
          </a>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserPage;
