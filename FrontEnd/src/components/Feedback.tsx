// src/components/Feedback.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, Text, Textarea, Button } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import UserNavbar from './UserNavbar';
import './Feedback.css';

interface FeedbackItem {
  feedback_id: string;
  text: string;
  rating: number;
}

const Feedback: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 10;

  const userId = 'someUserId'; // Replace with actual user ID if available

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/api/v1/feedbackByUserId/${userId}`);
      // Map the API data to match the FeedbackItem interface
      const formattedFeedbacks = response.data.map((item: any) => ({
        feedback_id: item.feedback_id,
        text: item.content, // Map 'content' from the API to 'text' used in FeedbackItem
        rating: item.rating,
      }));

      setFeedbackList(formattedFeedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    // Fetch feedbacks when component mounts
    fetchFeedbacks();
  }, []);

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleFeedbackSubmit = async () => {
    if (feedbackText.trim() && rating > 0) {
      const feedback_id = `FB-${Date.now()}`;
      const newFeedback = {
        feedback_id,
        userId,
        content: feedbackText,
        rating,
        reply: '',
      };

      try {
        await axios.post('http://localhost:4002/api/v1/feedback', newFeedback);
        alert('Feedback saved!');
        
        // Clear form and refetch feedbacks
        setFeedbackText('');
        setRating(0);
        fetchFeedbacks(); // Refresh feedback list after posting new feedback
      } catch (error) {
        console.error('Error posting feedback:', error);
      }
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
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
          <Text>Page {currentPage} of {totalPages}</Text>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Feedback;
