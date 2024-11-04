// src/components/AdminNavbar.tsx
import React from 'react';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';

const AdminNavbar: React.FC = () => {
  return (
    <Box bg="gray.700" color="white" width="100%" position="fixed" top={0} zIndex="1000">
      <Flex p={4} justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading size="lg">Admin Dashboard</Heading>
        <Flex gap={6}>
          <Link href="/admin" color="white">
            Home
          </Link>
          <Link href="/view-feedback" color="white">
            View Feedback
          </Link>
          <Link href="/manage-users" color="white">
            Manage Users
          </Link>
          <Link href="/" color="white">
            Logout
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;
