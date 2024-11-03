// src/components/EventReservation2.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './EventReservation2.css';

const EventReservation2: React.FC = () => {
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

  return (
    <div className="event-reservation-page">
      <UserNavbar />
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
  );
};

export default EventReservation2;
