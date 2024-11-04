import React, { useState } from 'react';
import { Box, Flex, Heading, Button, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import UserNavbar from './UserNavbar';
import './WorkspaceReservation.css';
import { useNavigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

// interface DecodedToken {
//   user_id: string;
// }
// const token = sessionStorage.getItem('token'); 
  
// const decoded: DecodedToken = jwt_decode(token);
// const userId=decoded.user_id;
const userId='U002';

interface Slot {
  workspace_id: string;
  floor: number;
  availability: boolean;
}

const WorkspaceReservation: React.FC = () => {
  const [shift, setShift] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showSlots, setShowSlots] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [reservationDetails, setReservationDetails] = useState<any>(null); // Adjust type as needed

  const navigate=useNavigate();

  const handleBookSlot = async () => {
    if (shift && project && date) {
      try {
        // Check if there's an existing reservation
        const { data: existingReservation } = await axios.get(`http://localhost:4006/api/v1/workspacebookingUserDate`, {
          params: { user_id: userId, date },
        });

        if (existingReservation) {
          // Display existing reservation details in a modal
          setReservationDetails(existingReservation);
          setModalOpen(true);
        } else {
          // Fetch available slots by project
          const { data: availableSlots } = await axios.get(`http://localhost:4005/api/v1/workspaceByProject`, {
            params: { project_name: project },
          });

          const { data: bookedWorkspaceResponse } = await axios.get(`http://localhost:4006/api/v1/workspacebookingDone`, {
            params: { project, date, shift },
          });
  
          const bookedWorkspaceIds = bookedWorkspaceResponse.workspace_ids;
  
          // Map available slots and disable booked ones
          const updatedSlots = availableSlots.map((slot: Slot) => ({
            ...slot,
            availability: !bookedWorkspaceIds.includes(slot.workspace_id),
          }));
          setSlots(updatedSlots);
          setShowSlots(true);
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    }
  };

  const handleSlotClick = (slot: Slot) => {
    if (slot.availability) {
      setSelectedSlot(slot);
    }
  };

  const handleConfirm = async () => {
    if (selectedSlot) {
      const reservation_id = uuidv4(); // Generate a unique reservation ID

      try {
        // Make a POST request to save the booking
        await axios.post('http://localhost:4006/api/v1/workspacebooking', {
          workspace_reservation_id: reservation_id,
          user_id: userId,
          workspace_id: selectedSlot.workspace_id,
          shift: shift,
          project: project,
          date: date,
        });

        navigate('/finalwork', {
          state: {
            reservation_id,
            workspace_id: selectedSlot.workspace_id,
            floor: selectedSlot.floor,
            shift,
            project,
            date,
          },
        });
        // Redirect to final work page (you can adjust this)
        // navigate('/finalwork', { state: { reservation_id, ... } });
      } catch (error) {
        console.error('Error confirming booking:', error);
      }
    }
  };

  const handleCancelReservation = async () => {
    if (reservationDetails) {
      try {
        await axios.delete(`http://localhost:4006/api/v1/workspacebooking/${reservationDetails.workspace_reservation_id}`);
        setModalOpen(false);
        // Reset date and other necessary states
        setDate('');
      } catch (error) {
        console.error('Error cancelling reservation:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDate(''); // Reset date when closing modal
  };

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
              <option value="Medical">Medical</option>
              <option value="Insurance">Insurance</option>
              <option value="Automobile">Automobile</option>
            </select>

            <Input background={'white'}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select Date"
              min={today} // Restrict to today's date or later
            />
            <Button colorScheme="teal" onClick={handleBookSlot}>
              Book Slot
            </Button>
          </Flex>
        </Box>
      </Flex>

      {showSlots && (
        <Box mx="auto" maxW="800px">
          <Text fontSize="lg" mb={4} textAlign="center">
            Choose a Workspace Slot
          </Text>
          <Flex flexWrap="wrap" justify="center" gap={2}>
            {slots.map((slot) => (
              <Box
                key={slot.workspace_id}
                className={`slot-block ${slot.availability ? 'available' : 'unavailable'} ${selectedSlot?.workspace_id === slot.workspace_id ? 'selected-slot' : ''}`}
                width="70px"
                height="60px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                cursor={slot.availability ? 'pointer' : 'not-allowed'}
                onClick={() => handleSlotClick(slot)}
              >
                <Text fontSize="xs">{slot.workspace_id}</Text>
              </Box>
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
      )}

      {/* Modal for displaying reservation details */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Existing Reservation</h2>
            {reservationDetails ? (
              <div>
                <p><strong>Reservation ID:</strong> {reservationDetails.workspace_reservation_id}</p>
                <p><strong>Workspace ID:</strong> {reservationDetails.workspace_id}</p>
                <p><strong>Date:</strong> {reservationDetails.date.split('T')[0]}</p>
                <p><strong>Shift:</strong> {reservationDetails.shift}</p>
                <p><strong>Project:</strong> {reservationDetails.project}</p>
                <Button colorScheme="red" onClick={handleCancelReservation}>Cancel Reservation</Button>
              </div>
            ) : (
              <p>No reservation found.</p>
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default WorkspaceReservation;
