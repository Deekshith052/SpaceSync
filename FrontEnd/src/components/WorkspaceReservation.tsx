import React, { useState } from 'react';
import { Box, Flex, Heading, Button, Select } from '@chakra-ui/react';
import UserNavbar from './UserNavbar';
import './WorkspaceReservation.css';

const WorkspaceReservation: React.FC = () => {
  const [shift, setShift] = useState<string>('');
  const [project, setProject] = useState<string>('');

  const handleBookSpace = () => {
    console.log(`Shift: ${shift}, Project: ${project}`);
    // Handle booking logic here
  };

  return (
    <Box className="workspace-reservation">
      <UserNavbar />
      <Flex p={4} justify="space-between" align="flex-start">
        <Box>
          <Heading size="lg" className='let'>Work Space Reservation</Heading>
        </Box>
        <Box className="her "flex="1" ml={50}>
          <Flex direction="column" gap={10}>
            <select className="custom-select"
              
              value={shift} 
              onChange={(e) => setShift(e.target.value)}
            >
                <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Night">Night</option>
            </select>

            <select className="custom-select"onChange={(e) => setProject(e.target.value)}>
  <option value="">Select Project</option>
  <option value="medical">Medical</option>
  <option value="insurance">Insurance</option>
  <option value="automobile">Automobile</option>
  <option value="product-development">Product Development</option>
  <option value="other">Other</option>
</select>

            <Button colorScheme="teal" onClick={handleBookSpace}>
              Book WorkSpace
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default WorkspaceReservation;
