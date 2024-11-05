import React, { useEffect, useState } from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
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
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert("User not authenticated");
      navigate('/login');
      return;
    }

    try {
      // Decode the token and extract userId
      const decodedToken: { id: string } = jwtDecode(token);
      const userId = decodedToken.id;

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
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error("Error fetching reservation or slot data:", error);
          setLoading(false); // Stop loading on error as well
        });
    } catch (error) {
      console.error("Token decoding failed:", error);
      alert("Invalid token");
      navigate('/login');
    }
  }, [navigate]);

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

  if (loading) {
    return (
      <Box className="final-parking-container">
        <UserNavbar />
        <Center mt={10}>
          <Text>Loading reservation data...</Text>
        </Center>
      </Box>
    );
  }

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
          <Text>No reservation found.</Text>
        )}
      </Center>
    </Box>
  );
};

export default FinalParkingPage;
