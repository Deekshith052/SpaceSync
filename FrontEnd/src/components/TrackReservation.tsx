import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';

// Define the structure of a reservation
interface Reservation {
  id: number;
  date: string;
  slotNumber: number;
  floorNumber: number;
}

// Sample data for demonstration
const sampleData = {
  parking: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    date: `2023-10-${(i % 30) + 1}`,
    slotNumber: i + 101,
    floorNumber: (i % 3) + 1,
  })),
  workspace: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    date: `2023-09-${(i % 30) + 1}`,
    slotNumber: i + 201,
    floorNumber: (i % 3) + 1,
  })),
  eventspace: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    date: `2023-08-${(i % 30) + 1}`,
    slotNumber: i + 301,
    floorNumber: (i % 3) + 1,
  })),
};

const TrackReservation: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('parking');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;

  useEffect(() => {
    loadReservations(selectedService);
  }, [selectedService]);

  const loadReservations = (service: string) => {
    const data = sampleData[service as keyof typeof sampleData];
    setReservations(data);
    setCurrentPage(1);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  const displayedReservations = reservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // background: rgb(148,185,244);
  // background: linear-gradient(180deg, rgba(148,185,244,1) 36%, #363636 100%); 


  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(148,185,244,1) 36%, #363636 100%)', minHeight: '100vh', paddingTop: '20px' }}>
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
            <option value="parking">Parking Reservation Service</option>
            <option value="workspace">Workspace Reservation Service</option>
            <option value="eventspace">Event Space Reservation Service</option>
          </select>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e0e0', textAlign: 'left' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Slot Number</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Floor Number</th>
              </tr>
            </thead>
            <tbody>
              {displayedReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reservation.date}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reservation.slotNumber}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reservation.floorNumber}</td>
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
