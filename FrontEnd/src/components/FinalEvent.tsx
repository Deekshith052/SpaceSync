// src/components/FinalEvent.tsx
import React from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './FinalEvent.css';

const FinalEvent: React.FC = () => {
  const navigate = useNavigate();

  const handleUnbook = () => {
    navigate('/');
  };

  return (
    <Box className="final-event-container">
      <UserNavbar />
      <Center flexDirection="column" mt={10}>
        <Text className="success-message">
          Reserved Event Space Details
        </Text>
        <Text className="event-detail">Event Name: Annual Meeting</Text>
        <Text className="event-detail">Hall Name: Conference Hall A</Text>
        <Text className="event-detail">Floor Number: 2</Text>
        <Text className="event-detail">Event Space ID: E102</Text>
        <Button colorScheme="red" mt={5} onClick={handleUnbook}>
          Unbook
        </Button>
      </Center>
    </Box>
  );
};

export default FinalEvent;
