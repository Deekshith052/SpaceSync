// src/components/UserNavbar.tsx
import React from 'react';

import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import './UserNavbar.css'; 
const UserNavbar: React.FC = () => {
  return (
    <Flex className='user-navbar' p={4} justify="space-between" align="center">
      <Heading size="lg">SpaceSync</Heading>
      <Flex gap={4}>
        <Link href="/user" color="white">Book a Slot</Link>
        <Link href="/track-reservation" color="white">Track Reservation</Link>
        <Link href="/feedback" color="white">Feedback</Link>
        <Link href="/" color="white">Logout</Link>
      </Flex>
    </Flex>
  );
};

export default UserNavbar;
