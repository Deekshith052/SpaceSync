import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Pie } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Admin.css'; // Ensure to create a corresponding CSS file for styles

Chart.register(Title, Tooltip, Legend, ArcElement);

// Define interfaces for different reservation types
interface ParkingReservation {
  user_id: string;
  parking_id: string;
  created_at: string;
}

interface WorkspaceReservation {
  user_id: string;
  workspace_id: string;
  shift: string;
  project: string;
  date: string;
}

interface EventSpaceReservation {
  user_id: string;
  eventspace_id: string;
  eventDate: string;
  name: string;
}

// Union type for all reservation types
type Reservation = ParkingReservation | WorkspaceReservation | EventSpaceReservation;

interface ServiceOverview {
  title: string;
  apiUrl: string;
  reservationApiUrl: string;
  reservedCount: number;
  vacancyCount: number;
  reservations: Reservation[];
}

const Admin: React.FC = () => {
  // Initialize services overview data
  const servicesOverviewInitial: ServiceOverview[] = [
    {
      title: 'Parking Slot Overview',
      apiUrl: 'http://localhost:4003/api/v1/parking/slotsNumber',
      reservationApiUrl: 'http://localhost:4004/api/v1/parking/reservations/slot',
      reservedCount: 0,
      vacancyCount: 0,
      reservations: [],
    },
    {
      title: 'Workspace Overview',
      apiUrl: 'http://localhost:4006/api/v1/workspacebookingNumber',
      reservationApiUrl: 'http://localhost:4006/api/v1/workspacebooking',
      reservedCount: 0,
      vacancyCount: 0,
      reservations: [],
    },
    {
      title: 'Event Space Overview',
      apiUrl: 'http://localhost:4008/api/v1/eventspacebookingsNumber',
      reservationApiUrl: 'http://localhost:4008/api/v1/eventspacebookings',
      reservedCount: 0,
      vacancyCount: 0,
      reservations: [],
    },
  ];

  const [servicesOverview, setServicesOverview] = useState<ServiceOverview[]>(servicesOverviewInitial);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Fetch services overview and reservation data
  useEffect(() => {
    const fetchData = async () => {
      const updatedServices = await Promise.all(
        servicesOverviewInitial.map(async (service) => {
          const overviewResponse = await fetch(service.apiUrl);
          const overviewData = await overviewResponse.json();

          // Set reserved and vacancy counts from the API response
          const reservedCount = overviewData.reservedSlots || 0;
          const vacancyCount = (overviewData.totalSlots || 0) - reservedCount;

          const reservationResponse = await fetch(service.reservationApiUrl);
          const reservationData: Reservation[] = await reservationResponse.json();

          return {
            ...service,
            reservedCount, // Set reservedCount from API
            vacancyCount,  // Calculate vacancyCount as totalSlots - reservedSlots
            reservations: reservationData, // Set reservations data
          };
        })
      );

      setServicesOverview(updatedServices);
    };

    fetchData();
  }, []);

  // Handle view details for a specific service
  const handleViewDetails = (index: number) => {
    setSelectedServiceIndex(index);
    setCurrentPage(1); // Reset page to 1 when viewing details
  };

  // Filter and paginate reservations
  const filteredReservations = selectedServiceIndex !== null
    ? servicesOverview[selectedServiceIndex].reservations.filter((reservation) =>
        reservation.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
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
          {servicesOverview.map((service, index) => (
            <div key={index} className="service-overview">
              <div className="pie-chart">
                <h2>{service.title}</h2>
                <Pie
                  data={{
                    labels: ['Reserved', 'Vacant'],
                    datasets: [
                      {
                        data: [service.reservedCount, service.vacancyCount], // Use reservedSlots and calculated vacancies
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { position: 'bottom' },
                      title: { display: true, text: 'Reservation Overview' },
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
          ))}
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
                  
                  {'parking_id' in reservation && (
                    <>
                      <p><strong>Parking ID:</strong> {reservation.parking_id}</p>
                      <p><strong>Date:</strong> {reservation.created_at.split('T')[0]}</p>
                    </>
                  )}
                  
                  {'workspace_id' in reservation && (
                    <>
                      <p><strong>Workspace ID:</strong> {reservation.workspace_id}</p>
                      <p><strong>Shift:</strong> {reservation.shift}</p>
                      <p><strong>Project:</strong> {reservation.project}</p>
                      <p><strong>Date:</strong> {reservation.date.split('T')[0]}</p>
                    </>
                  )}
                  
                  {'eventspace_id' in reservation && (
                    <>
                      <p><strong>Event Space ID:</strong> {reservation.eventspace_id}</p>
                      <p><strong>Event Date:</strong> {reservation.eventDate.split('T')[0]}</p>
                      <p><strong>Name:</strong> {reservation.name}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
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
