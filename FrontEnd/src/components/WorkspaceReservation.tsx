// src/components/WorkspaceReservation.tsx
import React, { useState } from 'react';
import { Box, Flex, Heading, Button, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './WorkspaceReservation.css';

interface Slot {
  id: string;
  slotNumber: string;
  availability: boolean;
}

const WorkspaceReservation: React.FC = () => {
  const [shift, setShift] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [reserveForSevenDays, setReserveForSevenDays] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showSlots, setShowSlots] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleBookSlot = () => {
    if (shift && project && date) {
      setShowSlots(true);
    }
  };

  const handleSlotClick = (slot: Slot) => {
    if (slot.availability) {
      setSelectedSlot(slot);
    }
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      navigate('/finalwork');
    }
  };

  // Helper function to generate slots from A1 to C10
  const generateSlots = () => {
    const rows = ['A', 'B', 'C'];
    let slots: Slot[] = [];
    rows.forEach((row) => {
      for (let i = 1; i <= 10; i++) {
        slots.push({
          id: `${row}${i}`,
          slotNumber: `${row}${i}`,
          availability: true,
        });
      }
    });
    return slots;
  };

  const availableSlots = generateSlots();

  // Get today's date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box className="workspace-reservation">
      <UserNavbar />
      <Flex p={4} justify="space-between" align="flex-start">
        <Box>
          <Heading size="lg" className="let">Work Space Reservation</Heading>
        </Box>
        <Box className="her" flex="1" ml={50}>
          <Flex direction="column" gap={6}>
            <select
              className="custom-select"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Night">Night</option>
            </select>

            <select
              className="custom-select"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="">Select Project</option>
              <option value="medical">Medical</option>
              <option value="insurance">Insurance</option>
              <option value="automobile">Automobile</option>
              <option value="product-development">Product Development</option>
              <option value="other">Other</option>
            </select>

            <Input background={'white'}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select Date"
              min={today} // Restrict to today's date or later
            />

            <Flex alignItems="center" gap={2}>
              <input
                type="checkbox"
                checked={reserveForSevenDays}
                onChange={(e) => setReserveForSevenDays(e.target.checked)}
              />
              <Text>Reserve for Seven Days</Text>
            </Flex>

            <Button colorScheme="teal" onClick={handleBookSlot}>
              Book Slot
            </Button>
          </Flex>
        </Box>
      </Flex>

      {showSlots && (
        <Box mt={6}>
          <Text fontSize="lg" mb={4} textAlign="center">
            Choose a Workspace Slot
          </Text>
          <Box mx="auto" maxW="800px">
            <Flex flexDirection="column" alignItems="center" gap={2}>
              {['A', 'B', 'C'].map((row) => (
                <Flex key={row} gap={2}>
                  {availableSlots
                    .filter((slot) => slot.slotNumber.startsWith(row))
                    .map((slot) => (
                      <Box
                        key={slot.id}
                        className={`slot-block ${slot.availability ? 'available' : 'unavailable'} ${selectedSlot?.id === slot.id ? 'selected-slot' : ''}`}
                        width="60px"
                        height="60px"
                        margin="4px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        cursor={slot.availability ? 'pointer' : 'not-allowed'}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot.slotNumber}
                      </Box>
                    ))}
                </Flex>
              ))}
            </Flex>

            <Flex justify="center" mt={4}>
              <Button
                colorScheme="teal"
                disabled={!selectedSlot} // Disable button if no slot is selected
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WorkspaceReservation;
