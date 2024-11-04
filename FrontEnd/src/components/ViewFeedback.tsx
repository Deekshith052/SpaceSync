// src/components/ViewFeedback.tsx
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

interface Feedback {
  id: number;
  userId: string;
  comment: string;
  reply?: string;
}

// Sample data for demonstration
const sampleFeedback: Feedback[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  userId: `User${i + 1}`,
  comment: `This is feedback comment number ${i + 1}.`,
}));

const ViewFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(sampleFeedback);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [replyText, setReplyText] = useState<string>('');
  const [replyingToId, setReplyingToId] = useState<number | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);

  const handleReplyClick = (id: number) => {
    setReplyingToId(id);
    setReplyText('');
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (id: number) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, reply: replyText } : feedback
      )
    );
    setReplyingToId(null);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingTop: '60px' }}>
      <AdminNavbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>View Feedback</h1>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {displayedFeedbacks.map((feedback) => (
            <li
              key={feedback.id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <p><strong>User ID:</strong> {feedback.userId}</p>
              <p><strong>Comment:</strong> {feedback.comment}</p>

              {feedback.reply && (
                <p style={{ color: 'green' }}><strong>Reply:</strong> {feedback.reply}</p>
              )}

              {replyingToId === feedback.id ? (
                <div>
                  <textarea
                    value={replyText}
                    onChange={handleReplyChange}
                    placeholder="Type your reply here"
                    rows={3}
                    style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                  />
                  <button
                    onClick={() => handleReplySubmit(feedback.id)}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Submit Reply
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleReplyClick(feedback.id)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Reply
                </button>
              )}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage === 1 ? '#ddd' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              marginRight: '10px',
            }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage === totalPages ? '#ddd' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              marginLeft: '10px',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
