// src/components/FinalEvent.tsx
import React from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './FinalEvent.css';

interface EventSpaceState {
  eventSpace: {
    eventspace_id: number;
    name: string;
    floor: number;
    capacity: number;
  };
  eventRegistrationId: string;
  eventName: string;
}

const FinalEvent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as EventSpaceState | undefined; // Allow state to be undefined

  // If state or required data is missing, show an error message and redirect button
  if (!state || !state.eventSpace) {
    return (
      <Box className="final-event-container">
        <UserNavbar />
        <Center flexDirection="column" mt={10}>
          <Text className="error-message">No Recent Reservations Available</Text>
          <Button colorScheme="blue" mt={5} onClick={() => navigate('/user')}>
            Go Back to Home
          </Button>
        </Center>
      </Box>
    );
  }

  return (
    <Box className="final-event-container">
      <UserNavbar />
      <Center flexDirection="column" mt={10}>
        <Text className="success-message">Reserved Event Space Details</Text>
        <Text className="event-detail">Reservation ID: {state.eventRegistrationId}</Text>
        <Text className="event-detail">Event Name: {state.eventName}</Text>
        <Text className="event-detail">Hall Name: {state.eventSpace.name}</Text>
        <Text className="event-detail">Floor Number: {state.eventSpace.floor}</Text>
        <Text className="event-detail">Event Space ID: {state.eventSpace.eventspace_id}</Text>
      </Center>
    </Box>
  );
};

export default FinalEvent;
