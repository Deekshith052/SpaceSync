// src/components/FinalWorkPage.tsx
import React from 'react';
import { Box, Text, Center, Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './FinalWorkPage.css';

interface ReservationDetails {
  reservation_id: string;
  workspace_id: string;
  floor: number;
  shift: string;
  project: string;
  date: string;
}

const FinalWorkPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state from location
  const reservationDetails = location.state as ReservationDetails | undefined;

  return (
    <Box className="final-work-container">
      <UserNavbar />
      <Center flexDirection="column" mt={10}>
        {reservationDetails ? (
          <>
            <Text className="success-message">
              Reserved Workspace Details
            </Text>
            <Text className="details">Reservation ID: {reservationDetails.reservation_id}</Text>
            <Text className="details">WorkSpace ID: {reservationDetails.workspace_id}</Text>
            <Text className="details">Date: {reservationDetails.date}</Text>
            <Text className="shift-details">Shift: {reservationDetails.shift}</Text>
            <Text className="floor-details">Floor: {reservationDetails.floor}</Text>
            <Text className="project-name">Project: {reservationDetails.project}</Text>
          </>
        ) : (
          <Text mt={10} className="no-booking-message">
            No recent workspace booking.
          </Text>
        )}
        <Button mt={4} onClick={() => navigate('/user')} colorScheme="teal">Go Back</Button>
      </Center>
    </Box>
  );
};

export default FinalWorkPage;
