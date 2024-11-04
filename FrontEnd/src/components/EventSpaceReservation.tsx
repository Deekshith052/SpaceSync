import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import UserNavbar from './UserNavbar';
import './EventSpaceReservation.css';
import { useNavigate } from 'react-router-dom';

const EventSpaceReservation: React.FC = () => {
  const navigate = useNavigate();
  const handleBookEvent = () => {
    navigate('/finalevent');
  };

  const eventData = [
    { eventspace_id: 'E101', floor: '1', hall: 'Conference Hall A' },
    { eventspace_id: 'E102', floor: '2', hall: 'Banquet Hall' },
    { eventspace_id: 'E103', floor: '3', hall: 'Meeting Room 1' },
    { eventspace_id: 'E104', floor: '1', hall: 'Exhibition Hall' },
  ];

  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [attendees, setAttendees] = useState<number | string>('');
  const [showAvailability, setShowAvailability] = useState<boolean>(false);

  const handleShowAvailability = () => {
    setShowAvailability(true);
  };

  return (
    <>
      <Box className="event-space-reservation">
        <UserNavbar />
        <Flex p={4} justify="space-between" align="flex">
          <Box className="txt">
            <Heading size="3xl">Event Space Reservation</Heading>
          </Box>
          <Box className="reservation-form" flex="1" ml={50}>
            <Flex direction="column" gap={4}>
              <Input
                placeholder="Enter Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />

              <Box>
                <DatePicker
                  selected={eventDate}
                  onChange={(date) => setEventDate(date)}
                  minDate={new Date()} // Prevent selecting past dates
                  placeholderText="Select Event Date"
                  dateFormat="MMMM dd yyyy"
                  className="custom-datepicker"
                />
              </Box>

              <Input
                placeholder="Number of Attendees"
                type="number"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
              />

              <Button colorScheme="teal" onClick={handleShowAvailability}>
                Show Availability
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Conditionally render the event availability table */}
      {showAvailability && (
        <div className="event-reservation-page">
          <h1 className="page-title">Event Space Reservation</h1>
          <table className="event-table">
            <thead>
              <tr>
                <th>EventSpace ID</th>
                <th>Floor Number</th>
                <th>Hall Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eventData.map((event) => (
                <tr key={event.eventspace_id}>
                  <td>{event.eventspace_id}</td>
                  <td>{event.floor}</td>
                  <td>{event.hall}</td>
                  <td>
                    <button className="book-button" onClick={handleBookEvent}>
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EventSpaceReservation;
