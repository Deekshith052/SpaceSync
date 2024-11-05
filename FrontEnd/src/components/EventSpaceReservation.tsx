import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UserNavbar from './UserNavbar';
import './EventSpaceReservation.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import {jwtDecode} from 'jwt-decode';

interface EventSpaceData {
  eventspace_id: number;
  name: string;
  floor: number;
  capacity: number;
}

const EventSpaceReservation: React.FC = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [attendees, setAttendees] = useState<number | string>('');
  const [showAvailability, setShowAvailability] = useState<boolean>(false);
  const [availableEventSpaces, setAvailableEventSpaces] = useState<any[]>([]);

  const handleBookEvent = async (eventSpace : EventSpaceData) => {
    if (!eventDate) {
      alert("Event date is required.");
      return;
    }
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        alert('User is not authenticated.');
        return;
      }

    // Decode the JWT token to get the user_id
    const decodedToken: { id: string } = jwtDecode(token);
    const userId = decodedToken.id;
      // const userId="123456"

      const eventRegistrationId = uuidv4(); // Generate a unique event_registration_id

      const year = eventDate?.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const day = String(eventDate?.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      // Prepare the data for the POST request
      const bookingData = {
        user_id: userId, 
        eventspace_id: eventSpace.eventspace_id,
        name: eventName,
        eventDate: formattedDate,
        eventspace_reservation_id: eventRegistrationId,
      };

      // Send the POST request
      await axios.post('http://localhost:4008/api/v1/eventspacebookings', bookingData);

      // Navigate to the final event page after successful booking
      navigate('/finalevent', { state: { eventSpace, eventRegistrationId ,eventName} });
    } catch (error) {
      console.error('Error booking event space:', error);
      alert('Failed to book the event space. Please try again.');
    }
  };

  const handleShowAvailability = async () => {
    if (!eventName || !eventDate || !attendees) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const day = String(eventDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // Fetch available event spaces by capacity
      const capacityResponse = await axios.get(`http://localhost:4007/api/v1/eventspaceByCapacity/${attendees}`);
      const availableSpaces = capacityResponse.data;

      // Fetch reserved event spaces by date
      const dateResponse = await axios.get(`http://localhost:4008/api/v1/eventspacebookingsByDate?date=${formattedDate}`);
      const reservedSpaces = dateResponse.data;

      // Filter out reserved spaces from available spaces
      const filteredAvailableSpaces = availableSpaces.filter((space: EventSpaceData) =>
        !reservedSpaces.includes(space.eventspace_id)
      );

      setAvailableEventSpaces(filteredAvailableSpaces);
      setShowAvailability(true);

    } catch (error) {
      console.error('Error fetching event spaces:', error);
      alert('Failed to fetch event spaces. Please try again.');
    }
  };

  return (
    <Box minHeight="100vh" className="container-box" paddingBottom="40px">
      <UserNavbar />
      <Flex direction="column" align="center" pt={16} px={4}>
        <Box width="100%" maxWidth="800px" textAlign="center" mb={8}>
          <Heading size="3xl" mb={4}>Event Space Reservation</Heading>
        </Box>

        <Box className="reservation-form" width="100%" maxWidth="500px" p={6} bg="white" boxShadow="lg" borderRadius="md" mb={8}>
          <Flex direction="column" gap={4}>
            <Input
              placeholder="Enter Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />

            <Box>
              <DatePicker
                selected={eventDate}
                onChange={(date) => {setEventDate(date)
                }}
                minDate={new Date()}
                placeholderText="Select Event Date"
                dateFormat="MMMM dd yyyy"
                className="custom-datepicker"
                required
              />
            </Box>

            <Input
              placeholder="Number of Attendees"
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              min={1}
              required
            />

            <Button colorScheme="teal" onClick={handleShowAvailability}>
              Show Availability
            </Button>
          </Flex>
        </Box>

        {showAvailability && availableEventSpaces.length > 0 && (
          <Box className="event-reservation-page" width="100%" maxWidth="800px" bg="white" boxShadow="lg" borderRadius="md" p={4} mt={4}>
            <Heading size="lg" textAlign="center" mb={4}>Available Event Spaces</Heading>
            <table className="event-table" style={{ width: '100%', textAlign: 'center', tableLayout: 'auto', margin: '0 auto' }}>
              <thead>
                <tr>
                  <th>EventSpace ID</th>
                  <th>Floor Number</th>
                  <th>EventSpace Name</th>
                  <th>Capacity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableEventSpaces.map((event) => (
                  <tr key={event.eventspace_id}>
                    <td>{event.eventspace_id}</td>
                    <td>{event.floor}</td>
                    <td>{event.name}</td>
                    <td>{event.capacity}</td>
                    <td>
                      <button className="book-button" onClick={() => handleBookEvent(event)}>
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}

        {showAvailability && availableEventSpaces.length === 0 && (
          <Box className="event-reservation-page" width="100%" maxWidth="800px" bg="white" boxShadow="lg" borderRadius="md" p={4} mt={4} textAlign="center">
            <Heading size="lg" mb={4}>No Available Event Spaces</Heading>
            <p>Please try a different date or number of attendees.</p>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default EventSpaceReservation;
