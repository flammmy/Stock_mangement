import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

const BanksPage = () => {
  const [Banks, setBank] = useState([]);
  const [filteredBanks, setFilteredBank] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBank, setselectedBank] = useState(null);

  useEffect(() => {
    const fetchBank = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/bank`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        setBank(response.data.data);
        setFilteredBank(response.data.data); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchBank();
  }, []);

  // Update filtered Banks when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = Banks.filter((Bank) => {
      const statusText = Bank.status === 1 ? 'active' : 'inactive';
      return (
        Bank.name.toLowerCase().includes(lowercasedQuery) ||
        Bank.code.toLowerCase().includes(lowercasedQuery) ||
        Bank.gst_no.toLowerCase().includes(lowercasedQuery) ||
        Bank.email.toLowerCase().includes(lowercasedQuery) ||
        Bank.tel_no.toLowerCase().includes(lowercasedQuery) ||
        Bank.owner_mobile.toLowerCase().includes(lowercasedQuery) ||
        statusText.includes(lowercasedQuery)
      );
    });
    setFilteredBank(filtered);
  }, [searchQuery, Banks]);

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
      name: 'Bank Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'GST No',
      selector: (row) => row.gst_no,
      sortable: true,
    },
    {
      name: 'CIN No',
      selector: (row) => row.cin_no,
      sortable: true,
    },
    {
      name: 'PAN No',
      selector: (row) => row.pan_no,
      sortable: true,
    },
    {
      name: 'MSME No',
      selector: (row) => row.msme_no,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.tel_no,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Owner Mobile',
      selector: (row) => row.owner_mobile,
      sortable: true,
    },
    {
      name: 'Registered Address',
      selector: (row) => row.reg_address,
      sortable: true,
      cell: (row) => <span>{row.reg_address.replace('\n', ', ')}</span>,
    },
    {
      name: 'Work Address',
      selector: (row) => row.work_address,
      sortable: true,
      cell: (row) => <span>{row.work_address.replace('\n', ', ')}</span>,
    },
    {
      name: 'Area',
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: 'Logo',
      cell: (row) => (
        <img
        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${row.logo}`}
          alt={`${row.name} logo`}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
      sortable: false,
    },
    {
      name: 'Status',
      selector: (row) => (row.status === 1 ? 'active' : 'inactive'),
      sortable: true,
      cell: (row) => {
        const statusText = row.status === 1 ? 'active' : 'inactive';
        return (
          <span
            className={`badge rounded-pill ${statusText === 'active' ? 'bg-success' : 'bg-danger'
              }`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          <Button
            variant="outline-success"
            size="sm"
            className="me-2"
            onClick={() => handleEdit(row)}
          >
            <MdEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            <MdDelete />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/Bank/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if the response indicates success
      if (response.status === 200) {
        toast.success('User deleted successfully');
        setBank(Banks.filter((user) => user.id !== userId));
        setFilteredBank(filteredBanks.filter((user) => user.id !== userId));
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setselectedBank(user);
    setShowEditModal(true);
  };
  const handleUpdateUser = async () => {
    try {
      // Ensure the selectedBank is valid
      if (!selectedBank || !selectedBank.id) {
        toast.error('Invalid Bank selected for update!');
        return;
      }

      // Perform the API call
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/Bank/${selectedBank.id}`,
        selectedBank,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Check the response status
      if (response.status === 200) {
        toast.success('Bank updated successfully!');

        // Update the Banks list
        setBank((prev) =>
          prev.map((sup) => (sup.id === selectedBank.id ? selectedBank : sup))
        );

        // Update the filtered Banks list
        setFilteredBank((prev) =>
          prev.map((sup) => (sup.id === selectedBank.id ? selectedBank : sup))
        );

        // Close the modal
        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating Bank!');
    }
  };


  const handleAddUser = () => {
    navigate('/add-Bank');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedBank((prevUser) => ({
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
        backgroundColor: '#20B2AA',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '15px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        color: '#333',
        padding: '12px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#3f4d67',
        color: '#fff',
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
  };

  return (
    <div className="container-fluid pt-4 " style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search..."
            id='search'
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
            {/* <div
              className="card-header d-flex justify-content-between align-items-center"
              style={{ backgroundColor: '#3f4d67', color: 'white' }}
            >
              <h2 className="m-0 text-white">Banks Management</h2>
            </div> */}
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
              <DataTable
                columns={columns}
                data={filteredBanks}
                pagination
                highlightOnHover
                striped
                responsive
                customStyles={customStyles}
                defaultSortFieldId={1}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Edit User Modal */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#3f4d67' }}>
            <Modal.Title className="text-white">Edit Bank</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedBank.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bank Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={selectedBank.code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gst_no"
                  value={selectedBank.gst_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CIN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cin_no"
                  value={selectedBank.cin_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan_no"
                  value={selectedBank.pan_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>MSME Number</Form.Label>
                <Form.Control
                  type="text"
                  name="msme_no"
                  value={selectedBank.msme_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Registered Address</Form.Label>
                <Form.Control
                  type="text"
                  name="reg_address"
                  value={selectedBank.reg_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Address</Form.Label>
                <Form.Control
                  type="text"
                  name="work_address"
                  value={selectedBank.work_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_no"
                  value={selectedBank.tel_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="owner_mobile"
                  value={selectedBank.owner_mobile || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={selectedBank.status || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                >
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


export default BanksPage;
