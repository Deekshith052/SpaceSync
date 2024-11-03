// src/components/EventSpaceReservation.tsx
import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import UserNavbar from './UserNavbar';
import './EventSpaceReservation.css';

const EventSpaceReservation: React.FC = () => {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  
  const [attendees, setAttendees] = useState<number | string>('');
  const [availability, setAvailability] = useState<string[]>([]);

//   const handleShowAvailability = () => {
//     const halls = ['Founders Hall', 'Nehru Hall', 'Innovation Hub', 'Collaboration Space'];
//     setAvailability(halls);
//     console.log(`Checking availability for ${eventName}`);
//   };

  return (
    <Box className="event-space-reservation">
      <UserNavbar />
      <Flex p={4} justify="space-between" align="flex">
        <Box className='txt'>
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
                dateFormat="MMMM d, yyyy"
                className="custom-datepicker"
              />
            </Box>

            

            <Input
              placeholder="Number of Attendees"
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />

            <Button colorScheme="teal" >
              Show Availability
            </Button>

            {availability.length > 0 && (
              <Box mt={4}>
                <Heading size="md">Available Halls:</Heading>
                {availability.map((hall, index) => (
                  <Text key={index} mt={2}>
                    {hall}
                  </Text>
                ))}
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default EventSpaceReservation;
