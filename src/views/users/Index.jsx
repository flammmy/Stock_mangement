import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState('select'); // Default to 'select'
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(25); // Default row per page set to 25
  const handleToggleStatus = async (userId, currentStatus) => {
        try {
          const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle status
          await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`,
            { status: updatedStatus },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
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

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch users!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('User deleted successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.filter((user) => user.id !== userId));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } catch (error) {
        toast.error('Failed to delete user');
        Swal.fire('Error!', 'There was a problem deleting the user.', 'error');
      }
    }
  };

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
      width: '80px',
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) =>
        row.role === 1 ? 'Admin' : row.role === 2 ? 'Operator' : row.role === 3 ? 'Supervisor' : 'Superadmin',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row.status === 1 ? 'inactive' : 'active'),
      sortable: true,
      cell: (row) => (
        <label style={{ position: 'relative', display: 'inline-block', width: '34px', height: '20px' }}>
          <div style={{ marginLeft: '45px', marginTop: '-4px' }}>
            <span
              className={`badge ${row.status === 0 ? 'bg-success' : 'bg-danger'}`}
              style={{ padding: '5px 10px', borderRadius: '8px' }}
            >
              {row.status === 0 ? 'Active' : 'Inactive'}
            </span>
          </div>
          <input
            type="checkbox"
            checked={row.status === 0}
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
              borderRadius: '20px',
            }}
          ></span>
          <span
            style={{
              position: 'absolute',
              content: '',
              height: '14px',
              width: '14px',
              left: row.status === 0 ? '18px' : '3px',
              bottom: '3px',
              backgroundColor: 'white',
              transition: '0.4s',
              borderRadius: '50%',
            }}
          ></span>
        </label>
      ),
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
      ),
    },
  ];

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${selectedUser.id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('User updated successfully!');
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === selectedUser.id ? response.data.data : user))
      );
      setShowEditModal(false);
    } catch (error) {
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
      [name]: value,
    }));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No", "Username", "Name", "Email", "Phone", "Role", "Status"];
    const tableRows = [];

    filteredUsers.forEach((user, index) => {
      const userData = [
        index + 1,
        user.username,
        user.name,
        user.email,
        user.phone,
        user.role === 1 ? 'Admin' : user.role === 2 ? 'Operator' : 'Supervisor',
        user.status === 1 ? 'Inactive' : 'Active',
      ];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows);
    doc.save("Users_Report.pdf");
  };

  // Pagination logic to slice the data based on entries per page
  const startIndex = (currentPage - 1) * rowPerPage;
  const endIndex = startIndex + rowPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return (
    <div className="container-fluid pt-4" style={{ borderRadius: '8px' }}>
      <div className="row mb-3" style={{display:"flex",justifyContent:"space-between"}}>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="search user "
            id="search here"
            value={searchQuery}
            onChange={handleSearch}
            className="pe-5 ps-2 py-2"
            style={{ borderRadius: '5px' }}
          />
        </div>
        <div className="col-md-4 text-end">
          <Button variant="primary" onClick={handleAddUser}>
            <MdPersonAdd className="me-2" /> Add User
          </Button>
          <Button variant="success" onClick={downloadPDF} className="ms-2">
            Download PDF
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <DataTable
            columns={columns}
            data={loading ? Array(10).fill('') : paginatedUsers}
            progressPending={loading}
            progressComponent={<Skeleton count={5} />}
            pagination
            paginationPerPage={rowPerPage}
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            paginationTotalRows={filteredUsers.length}
            onChangePage={(page) => setCurrentPage(page)}
            customStyles={{
              header: {
      style: {
        backgroundColor: '#2E8B57',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '15px',
        borderRadius: '8px 8px 8px 8px',
      },
    },
    rows: {
      style: {
        backgroundColor: '#f0fff4',
        borderBottom: '1px solid #e0e0e0',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#e6f4ea',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: '#FFFFFF',
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '15px',
        borderRight: '1px solid #ddd', // Add a right border to column headers
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        color: '#333',
        padding: '12px',
        borderRight: '1px solid #ddd', // Add a right border to cells
      },
    },
    pagination: {
      style: {
        color: 'black',
        borderRadius: '0 0 8px 8px',
      },
      pageButtonsStyle: {
        backgroundColor: 'transparent',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)',
        },
      },
    },
            }}
          />
        </div>
      </div>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={selectedUser?.username || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedUser?.name || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedUser?.email || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={selectedUser?.phone || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={selectedUser?.role || ''}
                onChange={handleChange}
              >
                <option value={1}>Admin</option>
                <option value={2}>Operator</option>
                <option value={3}>Supervisor</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersPage;
