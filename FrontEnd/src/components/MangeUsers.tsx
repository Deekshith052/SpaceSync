// src/components/ManageUsers.tsx
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department: string;
  role: string;
  project: string; // New field for project
}

// Sample data for demonstration
const sampleUsers: User[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  user_id: `U${i + 1}`,
  first_name: `First ${i + 1}`,
  last_name: `Last ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone_number: `123-456-789${i}`,
  department: `Department ${((i % 3) + 1)}`,
  role: i % 2 === 0 ? 'employee' : 'manager',
  project: `Project ${((i % 5) + 1)}`, // Assigning a project to each user
}));

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const itemsPerPage = 10;
  const navigate = useNavigate();

//   const filteredUsers = users.filter((user) =>
//     user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentUser) {
      const { name, value } = e.target;
      setCurrentUser({
        ...currentUser,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (currentUser) {
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
      setIsEditing(false);
      setCurrentUser(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingTop: '60px' }}>
      <AdminNavbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h1>

        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
          />
        </div>

        {!isEditing ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {displayedUsers.map((user) => (
              <li
                key={user.id}
                style={{
                  backgroundColor: '#fff',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p><strong>User ID:</strong> {user.user_id}</p>
                  <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone_number}</p>
                  <p><strong>Department:</strong> {user.department}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Project:</strong> {user.project}</p> {/* Display project */}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      padding: '8px 12px',
                      marginRight: '10px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
            <h2>Edit User</h2>
            {currentUser ? (
              <>
                <div>
                  <label>
                    User ID:
                    <input type="text" value={currentUser.user_id} readOnly />
                  </label>
                </div>
                <div>
                  <label>
                    First Name:
                    <input type="text" name="first_name" value={currentUser.first_name} onChange={handleInputChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Last Name:
                    <input type="text" name="last_name" value={currentUser.last_name} onChange={handleInputChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Email:
                    <input type="text" name="email" value={currentUser.email} onChange={handleInputChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Phone Number:
                    <input type="text" name="phone_number" value={currentUser.phone_number} onChange={handleInputChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Department:
                    <input type="text" name="department" value={currentUser.department} onChange={handleInputChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Role:
                    <select name="role" value={currentUser.role} onChange={handleInputChange}>
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="security">Security</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Project:
                    <input type="text" name="project" value={currentUser.project} onChange={handleInputChange} />
                  </label>
                </div>
                <button onClick={handleSubmit} style={{
                    padding: '8px 12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}>
                  Submit
                </button>
              </>
            ) : (
              <p>No user selected for editing.</p>
            )}
          </div>
        )}

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

export default ManageUsers;
