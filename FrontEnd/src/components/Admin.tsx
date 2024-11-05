// src/components/Admin.tsx
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Pie } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Admin.css'; // Ensure to create a corresponding CSS file for styles

Chart.register(Title, Tooltip, Legend, ArcElement);

const Admin: React.FC = () => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const servicesOverview = [
    {
      title: 'Parking Slot Overview',
      reservedCount: 15,
      vacancyCount: 5,
      reservations: [
        { user_id: 'U1', date: '2024-10-01', slot_number: 'A1', floor_number: 1 },
        { user_id: 'U2', date: '2024-10-02', slot_number: 'A2', floor_number: 1 },
        { user_id: 'U3', date: today, slot_number: 'A3', floor_number: 1 },
        { user_id: 'U4', date: today, slot_number: 'A4', floor_number: 1 },
        { user_id: 'U5', date: '2024-10-05', slot_number: 'A5', floor_number: 1 },
      ],
    },
    {
      title: 'Workspace Overview',
      reservedCount: 10,
      vacancyCount: 10,
      reservations: [
        { user_id: 'U11', date: today, slot_number: 'W1', floor_number: 2 },
        { user_id: 'U12', date: today, slot_number: 'W2', floor_number: 2 },
      ],
    },
    {
      title: 'Event Space Overview',
      reservedCount: 8,
      vacancyCount: 12,
      reservations: [
        { user_id: 'U13', date: '2024-10-01', slot_number: 'E1', floor_number: 3 },
        { user_id: 'U14', date: today, slot_number: 'E2', floor_number: 3 },
      ],
    },
  ];

  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleViewDetails = (index: number) => {
    setSelectedServiceIndex(index);
    setCurrentPage(1); // Reset page to 1 when viewing details
  };

  const filteredReservations = selectedServiceIndex !== null
    ? servicesOverview[selectedServiceIndex].reservations.filter(reservation =>
        reservation.user_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        
        <div className="service-overview-container">
          {servicesOverview.map((service, index) => {
            // Calculate today's reservations for the pie chart
            const todaysReservations = service.reservations.filter(reservation => reservation.date === today).length;
            const todaysVacancy = service.vacancyCount - todaysReservations;

            return (
              <div key={index} className="service-overview">
                <div className="pie-chart">
                  <h2>{service.title}</h2>
                  <Pie
                    data={{
                      labels: ['Reserved', 'Vacant'],
                      datasets: [
                        {
                          data: [todaysReservations, todaysVacancy],
                          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Today\'s Reservations' },
                      },
                    }}
                  />
                </div>
                <div className="count-boxes">
                  <div className="count-box">
                    <strong>Reserved Slots</strong>
                    <p>{service.reservedCount}</p>
                  </div>
                  <div className="count-box">
                    <strong>Vacancies</strong>
                    <p>{service.vacancyCount}</p>
                  </div>
                  <button className="view-details-button" onClick={() => handleViewDetails(index)}>View Details</button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedServiceIndex !== null && (
          <div className="reservation-modal">
            <div className="modal-header">
              <h2>{servicesOverview[selectedServiceIndex].title} Reservations</h2>
              <button className="close-button" onClick={() => setSelectedServiceIndex(null)}>Close</button>
            </div>
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="reservation-list">
              {displayedReservations.map((reservation, index) => (
                <div key={index} className="reservation-item">
                  <p><strong>User ID:</strong> {reservation.user_id}</p>
                  <p><strong>Date:</strong> {reservation.date}</p>
                  <p><strong>Slot Number:</strong> {reservation.slot_number}</p>
                  <p><strong>Floor Number:</strong> {reservation.floor_number}</p>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
