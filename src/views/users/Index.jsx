import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For search
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleToggleStatus = async (userId, currentStatus) => {
        try {
          const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle status
          await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`,
            { status: updatedStatus },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            }
          );
          toast.success('Status updated successfully!');
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, status: updatedStatus } : user
            )
          );
        } catch (error) {
          toast.error('Failed to update status!');
        }
      };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        setUsers(response.data.data);
        setFilteredUsers(response.data.data); // Initialize filtered users
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchUsers();
  }, []);

  // Update filtered users when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowercasedQuery) ||
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery) ||
        user.phone.toString().toLowerCase().includes(lowercasedQuery) ||
        (user.status === 1 ? 'inactive' : 'active').includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate();

  const columns = [
    {
      name: 'Sr No',
      selector: (_, index) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true
    },
    {
      name: 'Role',
      selector: (row) => (row.role === 1 ? 'Admin' : row.role === 2 ? 'Operator' : row.role === 3 ? 'Supervisor' : 'Superadmin'),
      sortable: true
    },
    {
      name: 'Status',
      selector: (row) => (row.status === 1 ? 'inactive' : 'active'),
      sortable: true,
      cell: (row) => (
        
        <label style={{ position: 'relative', display: 'inline-block', width: '34px', height: '20px' }}>
          <div style={{marginLeft:"45px",marginTop:"-4px"}}>
          <span
            className={`badge ${row.status === 0 ? 'bg-success' : 'bg-danger'}`}
            style={{ padding: '5px 10px', borderRadius: '8px' }}
          >
            {row.status === 0 ? 'Active' : 'Inactive'}
          </span>
          </div>
           
          <input
            type="checkbox"
            checked={row.status === 0} // Active if 0
            onChange={() => handleToggleStatus(row.id, row.status)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: row.status === 0 ? '#4caf50' : '#ccc',
              transition: '0.4s',
              borderRadius: '20px'
            }}
          ></span>
          <span
            style={{
              position: 'absolute',
              content: "",
              height: '14px',
              width: '14px',
              left: row.status === 0 ? '18px' : '3px',
              bottom: '3px',
              backgroundColor: 'white',
              transition: '0.4s',
              borderRadius: '50%'
            }}
          ></span>
        </label>
      )
    
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEdit(row)}>
            <MdEdit />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.id)}>
            <MdDelete />
          </Button>
        </div>
      )
    }
  ];
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('User deleted successfully');
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleUpdateUser = async () => {
    try {
      console.log(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${selectedUser.id}`);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${selectedUser.id}`,
        {
          username: selectedUser.username,
          name: selectedUser.name,
          email: selectedUser.email,
          phone: selectedUser.phone,
          role: selectedUser.role == 'operator' ? 2 : 3,
          password: selectedUser.password,
          status: selectedUser.status == 'active' ? 1 : 0
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('User updated successfully!');
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === selectedUser.id ? selectedUser : user)));

      setShowEditModal(false);
    } catch (err) {
      toast.error('Error updating user!');
    }
  };

  const handleAddUser = () => {
    navigate('/add-user');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const customStyles = {
    header: {
      style: {
        backgroundColor: '#2E8B57',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '15px',
        borderRadius: '8px 8px 8px 8px'
      }
    },
    rows: {
      style: {
        backgroundColor: '#f0fff4',
        borderBottom: '1px solid #e0e0e0',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#e6f4ea',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }
      }
    },
    headCells: {
      style: {
        backgroundColor: '#20B2AA',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '15px'
      }
    },
    cells: {
      style: {
        fontSize: '14px',
        color: '#333',
        padding: '12px'
      }
    },
    pagination: {
      style: {
        backgroundColor: '#3f4d67',
        color: '#fff',
        borderRadius: '0 0 8px 8px'
      },
      pageButtonsStyle: {
        backgroundColor: 'transparent',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)'
        }
      }
    }
  };

  return (
    <div className="container-fluid pt-4 " style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            className="pe-5 ps-2 py-2"
            style={{ borderRadius: '5px' }}
          />
        </div>
        <div className="col-md-8 text-end">
          <Button variant="primary" onClick={handleAddUser}>
            <MdPersonAdd className="me-2" /> Add User
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0 rounded-lg">
            {loading ? (
              <div>
                {[...Array(8)].map((_, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                    <Skeleton width={50} height={20} />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-body p-0" style={{ borderRadius: '8px' }}>
                <DataTable
                  columns={columns}
                  data={filteredUsers}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                  customStyles={customStyles}
                  defaultSortFieldId={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Edit User Modal */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#3f4d67' }}>
            <Modal.Title className="text-white">Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={selectedUser.username || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedUser.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedUser.email || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={selectedUser.phone || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={selectedUser.role || ''} onChange={handleChange} className="bg-white shadow-sm">
                  <option value="Superadmin">Superadmin</option>
                  <option value="Admin">Admin</option>
                  <option value="Operator">Operator</option>
                  <option value="Supplier">Supplier</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={selectedUser.status || ''} onChange={handleChange} className="bg-white shadow-sm">
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#f0fff4' }}>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpdateUser}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;



// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { Button } from 'react-bootstrap';
// import { MdEdit, MdDelete } from 'react-icons/md';

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Simulated API call to fetch users
//     const fetchUsers = async () => {
//       const mockData = [
//         { id: 1, username: 'john_doe', name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 1, status: 0 },
//         { id: 2, username: 'jane_doe', name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321', role: 2, status: 1 },
//       ];
//       setUsers(mockData);
//     };
//     fetchUsers();
//   }, []);

//   const handleToggleStatus = (id, currentStatus) => {
//     const updatedUsers = users.map((user) =>
//       user.id === id ? { ...user, status: currentStatus === 0 ? 1 : 0 } : user
//     );
//     setUsers(updatedUsers);
//   };

//   const handleEdit = (user) => {
//     console.log('Edit user:', user);
//     // Implement edit functionality
//   };

//   const handleDelete = (id) => {
//     const updatedUsers = users.filter((user) => user.id !== id);
//     setUsers(updatedUsers);
//   };

//   const columns = [
//     {
//       name: 'Sr No',
//       selector: (_, index) => index + 1,
//       sortable: true,
//       width: '80px',
//     },
//     {
//       name: 'Username',
//       selector: (row) => row.username,
//       sortable: true,
//     },
//     {
//       name: 'Name',
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: 'Email',
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: 'Phone',
//       selector: (row) => row.phone,
//       sortable: true,
//     },
//     {
//       name: 'Role',
//       selector: (row) =>
//         row.role === 1
//           ? 'Admin'
//           : row.role === 2
//           ? 'Operator'
//           : row.role === 3
//           ? 'Supervisor'
//           : 'Superadmin',
//       sortable: true,
//     },
//     {
//       name: 'Status',
//       selector: (row) => (row.status === 1 ? 'Inactive' : 'Active'),
//       sortable: true,
//       cell: (row) => (
//         <div>
//           <span
//             className={`badge ${row.status === 0 ? 'bg-success' : 'bg-danger'}`}
//             style={{ padding: '5px 10px', borderRadius: '8px' }}
//           >
//             {row.status === 0 ? 'Active' : 'Inactive'}
//           </span>
//           <label
//             style={{
//               position: 'relative',
//               display: 'inline-block',
//               width: '34px',
//               height: '20px',
//               marginLeft: '10px',
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={row.status === 0} // Active if 0
//               onChange={() => handleToggleStatus(row.id, row.status)}
//               style={{ opacity: 0, width: 0, height: 0 }}
//             />
//             <span
//               style={{
//                 position: 'absolute',
//                 cursor: 'pointer',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: row.status === 0 ? '#4caf50' : '#ccc',
//                 transition: '0.4s',
//                 borderRadius: '20px',
//               }}
//             ></span>
//             <span
//               style={{
//                 position: 'absolute',
//                 height: '14px',
//                 width: '14px',
//                 left: row.status === 0 ? '18px' : '3px',
//                 bottom: '3px',
//                 backgroundColor: 'white',
//                 transition: '0.4s',
//                 borderRadius: '50%',
//               }}
//             ></span>
//           </label>
//         </div>
//       ),
//     },
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div className="d-flex">
//           <Button
//             variant="outline-success"
//             size="sm"
//             className="me-2"
//             onClick={() => handleEdit(row)}
//           >
//             <MdEdit />
//           </Button>
//           <Button
//             variant="outline-danger"
//             size="sm"
//             onClick={() => handleDelete(row.id)}
//           >
//             <MdDelete />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="container mt-5">
//       <h2>User Management</h2>
//       <DataTable columns={columns} data={users} pagination highlightOnHover />
//     </div>
//   );
// };

// export default UsersPage;
