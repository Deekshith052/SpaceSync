// src/components/ParkingPage.tsx
import React from 'react';
import UserNavbar from './UserNavbar';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Thead, Tbody, Tr, Td, Th, Table } from '@chakra-ui/table';
import './ParkingPage.css'; // Import CSS file

const ParkingPage: React.FC = () => {
  return (
    <Box>
      <UserNavbar />
      <Flex justify="space-between" p={4} align="flex-start">
        <Box>
          <Heading className="heading" size="lg">Parking Reservation</Heading>
          <Button mt={4} className='suma' colorScheme="teal">Book Slot</Button>
        </Box>
        <Box flex="1" ml={10}   className="table-container">
          <Flex justify="center" align="center" height="100%">
            <Table variant="simple" className="table">
              <Thead>
                <Tr>
                  <Th>Floor Number</Th>
                  <Th>Vehicle Type</Th>
                  <Th>Number of Vacancy</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Car</Td>
                  <Td>5</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Bike</Td>
                  <Td>10</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Truck</Td>
                  <Td>2</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ParkingPage;
