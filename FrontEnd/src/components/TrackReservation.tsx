import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

// Define the structure of a reservation
interface Reservation {
  id: string; 
  date: string;
}

interface JwtPayload {
  user_id: string;
  role: string;
}

const TrackReservation: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('parking');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userId = '123456'; // Replace with actual user ID as needed
  type UserRole = 'employee' | 'manager' ; // Add other roles as needed
  const role: UserRole = 'employee';

  const itemsPerPage = 10;

  // const token = sessionStorage.getItem('token'); 
  // const decodedToken = token ? jwt_decode<JwtPayload>(token) : null;
  // const userId = decodedToken ? decodedToken.user_id : null;
  // const role = decodedToken ? decodedToken.role : null;

  useEffect(() => {
    loadReservations(selectedService);
  }, [selectedService]);

  const loadReservations = async (service: string) => {
    try {
      let url = '';
      if (service === 'parking') {
        url = `http://localhost:4004/api/v1/parking/reservations/slotsInfoByUserId/${userId}`;
      } else if (service === 'eventspace') {
        url = `http://localhost:4008/api/v1/eventspacebookingsByUserId/${userId}`;
      } else if (service === 'workspace') {
        url = `http://localhost:4006/api/v1/workspacebookingByUserId/${userId}`;
      }

      const response = await axios.get(url);
      const data = response.data.map((item: any) => {
        // Map response data to standardized structure
        if (service === 'parking') {
          return { id: item.parking_id, date: item.created_at };
        } else if (service === 'eventspace') {
          return { id: item.eventspace_id, date: item.eventDate };
        } else if (service === 'workspace') {
          return { id: item.workspace_id, date: item.date };
        }
        return item; // Fallback, should not reach here
      });

      setReservations(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]); // Clear data in case of error
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  const displayedReservations = reservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ background: 'linear-gradient(180deg, rgb(139, 170, 219) 36%, rgba(148,185,244,1) 100%)', minHeight: '100vh', paddingTop: '20px' }}>
      <UserNavbar />
      <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto',marginTop:'100px',marginBottom:'100px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h1>Track Your Past Reservations</h1>
        </div>
        <div style={{ marginTop: '20px' }}>
          <select
            value={selectedService}
            onChange={handleServiceChange}
            style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          >
            <option value="parking">Parking Reservation</option>
            <option value="workspace">Workspace Reservation</option>
            {/* Conditionally render the Event Space Reservation option */}
            {role !== 'employee' && <option value="eventspace">Event Space Reservation</option>}
          </select>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e0e0', textAlign: 'left' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              </tr>
            </thead>
            <tbody>
              {displayedReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reservation.date}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reservation.id}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
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
              }}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(reservations.length / itemsPerPage))
                )
              }
              disabled={currentPage >= Math.ceil(reservations.length / itemsPerPage)}
              style={{
                padding: '8px 12px',
                backgroundColor:
                  currentPage >= Math.ceil(reservations.length / itemsPerPage) ? '#ddd' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor:
                  currentPage >= Math.ceil(reservations.length / itemsPerPage) ? 'not-allowed' : 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackReservation;
