import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react';
import { Thead, Tbody, Tr, Td, Th, Table } from '@chakra-ui/table';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './ParkingPage.css';

interface ParkingSlotData {
  floor: number;
  vehicle_type: string;
  availableCount: number;
}

interface SlotBlockData {
  parking_id: number;
  slot_number: string;
  availability: boolean;
}

const ParkingPage: React.FC = () => {
  const [slots, setSlots] = useState<ParkingSlotData[]>([]);
  const [availableSlots, setAvailableSlots] = useState<SlotBlockData[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedFloor, setSelectedFloor] = useState<number | ''>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | ''>('');
  const [selectedSlot, setSelectedSlot] = useState<{ parking_id: number; slot_number: string } | null>(null);

  const user_id = '456789'; // Replace this with actual user ID from context/authentication

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:4003/api/v1/parking/slotsAvailable');
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching parking slots:', error);
        setError('An error has occurred while fetching parking slot data.');
      }
    };

    fetchSlots();
  }, []);

  const floorOptions = [1, 2, 3, 4, 5];
  const vehicleTypeOptions = ['two-wheeler', 'four-wheeler'];

  const handleSelectSlot = async () => {
    if (selectedFloor && selectedVehicleType) {
      try {
        const response = await axios.get('http://localhost:4003/api/v1/parking/slotsByFloorAndType', {
          params: {
            floor: selectedFloor,
            vehicle_type: selectedVehicleType,
          },
        });
        setAvailableSlots(response.data);
      } catch (error) {
        console.error('Error fetching available slots:', error);
        setError('An error has occurred while fetching available slot data.');
      }
    } else {
      setError('Please select both floor and vehicle type.');
    }
  };

  const handleSlotClick = (parking_id: number, slot_number: string, isAvailable: boolean) => {
    if (isAvailable) {
      if (selectedSlot?.parking_id === parking_id) {
        setSelectedSlot(null); // Deselect if clicking the selected slot again
      } else {
        setSelectedSlot({ parking_id, slot_number }); // Select the new slot
      }
    }
  };

  const handleConfirm = async () => {
    if (selectedSlot) {
      const { parking_id } = selectedSlot;
      const parking_reservation_id = uuidv4(); // Generate unique reservation ID


      try {
        // PUT request to update availability
        await axios.put(`http://localhost:4003/api/v1/parking/slots/${parking_id}`, {
          availability: false,
        });

        // POST request to create reservation
        await axios.post(`http://localhost:4004/api/v1/parking/reservations`, {
          parking_id,
          user_id,
          parking_reservation_id,
        });

        alert(`Reservation confirmed for slot ${selectedSlot.slot_number} with ID ${parking_reservation_id}`);
        setSelectedSlot(null); // Reset selected slot after confirmation
      } catch (error) {
        console.error('Error confirming reservation:', error);
        setError('An error occurred while confirming the reservation.');
      }
    }
  };

  return (
    <Box>
      <UserNavbar />
      <Flex justify="space-between" p={4} align="flex-start" className="flex-container">
        
        <Box flex="1" ml={10} className="table-container">
          <Flex justify="center" align="center" height="100%">
            <Table variant="simple" className="table">
              <Thead>
                <Tr>
                  <Th>Floor Number</Th>
                  <Th>Vehicle Type</Th>
                  <Th>Available Slots</Th>
                </Tr>
              </Thead>
              <Tbody>
                {slots.map((slot, index) => (
                  <Tr key={index}>
                    <Td>{slot.floor}</Td>
                    <Td>{slot.vehicle_type}</Td>
                    <Td>{slot.availableCount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
          {error && (
            <Text className="error-message">{error}</Text>
          )}
        </Box>
        
        <Box flex="1" textAlign="center">
          <Heading className="heading">Parking Reservation</Heading>

          <Flex direction="column" align="center" mt={4}>
            <select
              className="dropdown"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(Number(e.target.value))}
            >
              <option value="" disabled>Select Floor</option>
              {floorOptions.map((floor) => (
                <option key={floor} value={floor}>
                  Floor {floor}
                </option>
              ))}
            </select>

            <select
              className="dropdown"
              value={selectedVehicleType}
              onChange={(e) => setSelectedVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              {vehicleTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <Button className='button' onClick={handleSelectSlot}>Select Slot</Button>
          </Flex>
        </Box>
      </Flex>

      {availableSlots.length > 0 && (
        <Box mt={4}>
          <Heading size="md" mb={2}>Available Parking Slots</Heading>
          <Box mx={4}>
            <Flex flexWrap="wrap">
              {availableSlots.map((slot) => (
                <Box
                  key={slot.parking_id}
                  className={`slot-block ${slot.availability ? 'available' : 'unavailable'} ${selectedSlot?.parking_id === slot.parking_id ? 'selected-slot' : ''}`}
                  width="calc(100% / 22)"
                  height="50px"
                  margin="2px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid"
                  cursor={slot.availability ? 'pointer' : 'not-allowed'}
                  onClick={() => handleSlotClick(slot.parking_id, slot.slot_number, slot.availability)}
                >
                  {slot.slot_number}
                </Box>
              ))}
            </Flex>
          </Box>

          <Flex justify="center" mt={4}>
            <Button
              margin="0 0 50px 0"
              colorScheme="teal"
              disabled={!selectedSlot}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ParkingPage;
