// src/components/Feedback.tsx
import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Textarea, Button, Input } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import UserNavbar from './UserNavbar';
import './Feedback.css';

interface FeedbackItem {
  text: string;
  rating: number;
}

const Feedback: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 10;

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim() && rating > 0) {
      const newFeedback = { text: feedbackText, rating };
      setFeedbackList([newFeedback, ...feedbackList]);
      setFeedbackText('');
      setRating(0);
    }
  };

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbackList.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const totalPages = Math.ceil(feedbackList.length / feedbacksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box className="feedback-page">
      <UserNavbar />
      <Box className="feedback-form" p={5} mt={10}>
        <Heading size="lg" mb={4}>Feedback</Heading>
        <Textarea
          placeholder="Enter your feedback here"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          mb={3}
          rows={4}
        />
        <Flex mb={3} gap={1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              color={star <= rating ? '#FFD700' : '#e4e5e9'}
              onClick={() => handleRatingClick(star)}
              cursor="pointer"
            />
          ))}
        </Flex>
        <Button colorScheme="teal" onClick={handleFeedbackSubmit}>Submit</Button>
      </Box>

      <Box className="feedback-list" mt={10} p={5}>
        <Heading size="md" mb={4}>User Feedback</Heading>
        {currentFeedbacks.map((feedback, index) => (
          <Box key={index} className="feedback-item" mb={4} p={3} border="1px solid #ccc" borderRadius="md">
            <Text mb={1}>{feedback.text}</Text>
            <Flex>
              {Array.from({ length: feedback.rating }, (_, i) => (
                <FaStar key={i} color="#FFD700" />
              ))}
            </Flex>
          </Box>
        ))}
        <Flex mt={4} justify="center" gap={4}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Text>Page {currentPage} of {totalPages}</Text>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Feedback;
