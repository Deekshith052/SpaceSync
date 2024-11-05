// src/components/ManageUsers.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department: string;
  role: string;
  // project: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users on component mount
    axios.get('http://localhost:4001/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

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

  const handleDelete = (userId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios.delete(`http://localhost:4001/api/v1/users/${userId}`)
        .then(() => {
          setUsers(users.filter((user) => user.user_id !== userId));
          toast.success("User deleted successfully!");
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          toast.error("Error deleting user.");
        });
    }
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
      axios.put(`http://localhost:4001/api/v1/users/${currentUser.user_id}`, currentUser)
        .then(() => {
          setUsers(users.map(user => user.user_id === currentUser.user_id ? currentUser : user));
          toast.success("User updated successfully!");
          setIsEditing(false);
          setCurrentUser(null);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          toast.error("Error updating user.");
        });
    }
  };

  const handleBack = () => {
    setIsEditing(false);
    setCurrentUser(null);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', paddingTop: '60px' }}>
      <AdminNavbar />
      <ToastContainer />
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
                key={user.user_id}
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
                  {/* <p><strong>Project:</strong> {user.project}</p> */}
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
                    onClick={() => handleDelete(user.user_id)}
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
                    </select>
                  </label>
                </div>
                {/* <div>
                  <label>
                    Project:
                    <input type="text" name="project" value={currentUser.project} onChange={handleInputChange} />
                  </label>
                </div> */}
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
                <button onClick={handleBack} style={{
                  padding: '8px 12px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  marginLeft: '10px',
                }}>
                  Back
                </button>
              </>
            ) : null}
          </div>
        )}

        {/* Pagination controls */}
        {!isEditing && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 12px',
                marginRight: '10px',
                backgroundColor: currentPage === 1 ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 12px',
                marginLeft: '10px',
                backgroundColor: currentPage === totalPages ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
