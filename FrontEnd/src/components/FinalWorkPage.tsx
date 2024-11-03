// src/components/FinalWorkPage.tsx
import React from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './FinalWorkPage.css';

const FinalWorkPage: React.FC = () => {
  const navigate = useNavigate();

  const handleUnbook = () => {
    navigate('/');
  };

  return (
    <Box className="final-work-container">
      <UserNavbar />
      <Center flexDirection="column" mt={10}>
        <Text className="success-message">
          Reserved Workspace Details
        </Text>
        <Text className="shift-details">Shift: Morning</Text>
        <Text className="floor-details">Floor: 3</Text>
        <Text className="project-name">Project: Apollo</Text>
        <Button colorScheme="red" mt={5} onClick={handleUnbook}>
          Unbook
        </Button>
      </Center>
    </Box>
  );
};

export default FinalWorkPage;
