// src/components/FinalParkingPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import './FinalParkingPage.css';

interface ReservationData {
  parking_reservation_id: string;
  parking_id: string;
}

interface SlotData {
  floor: number;
  slot_number: string;
}

const FinalParkingPage: React.FC = () => {
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [slotData, setSlotData] = useState<SlotData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const token = sessionStorage.getItem('jwtToken');
    // if (token) {
    //   const decodedToken: any = jwt_decode(token);
    //   const userId = decodedToken.userId;
      const userId="123456";
      // Fetch reservation data by user ID
      axios.get(`http://localhost:4004/api/v1/parking/reservations/slotByUserId/${userId}`)
        .then(response => {
          const reservation = response.data;
          setReservationData(reservation);
          // Fetch slot data by parking_id
          return axios.get(`http://localhost:4003/api/v1/parking/slots/${reservation.parking_id}`);
        })
        .then(response => {
          setSlotData(response.data[0]);
        })
        .catch(error => {
          console.error("Error fetching reservation or slot data:", error);
        });
    // }
  }, []);

  const handleUnbook = () => {
    if (reservationData) {
      // First, update slot availability
      axios.put(`http://localhost:4003/api/v1/parking/slots/${reservationData.parking_id}`, {
        availability: true
      })
      .then(() => {
        // Then, unbook the reservation
        return axios.put(`http://localhost:4004/api/v1/parking/reservations/slot/${reservationData.parking_reservation_id}`);
      })
      .then(() => {
        navigate('/user');
      })
      .catch(error => {
        console.error("Error unbooking the reservation or updating slot availability:", error);
      });
    }
  };

  return (
    <Box className="final-parking-container">
      <UserNavbar />
      <Center flexDirection="column" mt={10}>
        <Text className="success-message">Reserved Slot Details</Text>
        {reservationData && slotData ? (
          <>
            <Text className="floor-slot">Parking ID: {reservationData.parking_id}</Text>
            <Text className="floor-slot">Floor: {slotData.floor}</Text>
            <Text className="floor-slot">Slot Number: {slotData.slot_number}</Text>
            <Button colorScheme="red" mt={5} onClick={handleUnbook}>
              Unbook
            </Button>
          </>
        ) : (
          <Text>Loading reservation data...</Text>
        )}
      </Center>
    </Box>
  );
};

export default FinalParkingPage;
