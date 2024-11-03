// src/components/FinalParkingPage.tsx
import React from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './FinalParkingPage.css';

const FinalParkingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleUnbook = () => {
    navigate('/');
  };

  return (
    <Box className="final-parking-container">
      <UserNavbar />
      <Center flexDirection="column" mt={10}>
        <Text className="success-message">
          Reserved Slot Details
        </Text>
        <Text className="floor-slot">Floor: 2</Text>
        <Text className="floor-slot">Slot Number: 45</Text>
        <Button colorScheme="red" mt={5} onClick={handleUnbook}>
          Unbook
        </Button>
      </Center>
    </Box>
  );
};

export default FinalParkingPage;
