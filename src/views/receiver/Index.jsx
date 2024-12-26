import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

const ReceiversPage = () => {
  const [Receivers, setReceiver] = useState([]);
  const [filteredReceivers, setFilteredReceiver] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReceiver, setselectedReceiver] = useState(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/receiver`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        setReceiver(response.data.data);
        setFilteredReceiver(response.data.data); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchReceiver();
  }, []);

  // Update filtered Receivers when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = Receivers.filter((Receiver) => {
      const statusText = Receiver.status === 1 ? 'active' : 'inactive';
      return (
        Receiver.name.toLowerCase().includes(lowercasedQuery) ||
        Receiver.code.toLowerCase().includes(lowercasedQuery) ||
        Receiver.gst_no.toLowerCase().includes(lowercasedQuery) ||
        Receiver.email.toLowerCase().includes(lowercasedQuery) ||
        Receiver.tel_no.toLowerCase().includes(lowercasedQuery) ||
        Receiver.owner_mobile.toLowerCase().includes(lowercasedQuery) ||
        statusText.includes(lowercasedQuery)
      );
    });
    setFilteredReceiver(filtered);
  }, [searchQuery, Receivers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate();

  const columns = [
    {
      name: 'Sr No',
      selector: (_, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Receiver Name',
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
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/receiver/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if the response indicates success
      if (response.status === 200) {
        toast.success('User deleted successfully');
        setReceiver(Receivers.filter((user) => user.id !== userId));
        setFilteredReceiver(filteredReceivers.filter((user) => user.id !== userId));
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setselectedReceiver(user);
    setShowEditModal(true);
  };
  const handleUpdateUser = async () => {
    try {
      // Ensure the selectedReceiver is valid
      if (!selectedReceiver || !selectedReceiver.id) {
        toast.error('Invalid Receiver selected for update!');
        return;
      }

      // Perform the API call
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/receiver/${selectedReceiver.id}`,
        selectedReceiver,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Check the response status
      if (response.status === 200) {
        toast.success('Receiver updated successfully!');

        // Update the Receivers list
        setReceiver((prev) =>
          prev.map((sup) => (sup.id === selectedReceiver.id ? selectedReceiver : sup))
        );

        // Update the filtered Receivers list
        setFilteredReceiver((prev) =>
          prev.map((sup) => (sup.id === selectedReceiver.id ? selectedReceiver : sup))
        );

        // Close the modal
        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating Receiver!');
    }
  };


  const handleAddUser = () => {
    navigate('/add-Receiver');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedReceiver((prevUser) => ({
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
            <MdPersonAdd className="me-2" /> Add Receiver
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
              <h2 className="m-0 text-white">Receivers Management</h2>
            </div> */}
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
              <DataTable
                columns={columns}
                data={filteredReceivers}
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
            <Modal.Title className="text-white">Edit Receiver</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Receiver Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedReceiver.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Receiver Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={selectedReceiver.code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gst_no"
                  value={selectedReceiver.gst_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CIN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cin_no"
                  value={selectedReceiver.cin_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan_no"
                  value={selectedReceiver.pan_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>MSME Number</Form.Label>
                <Form.Control
                  type="text"
                  name="msme_no"
                  value={selectedReceiver.msme_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Registered Address</Form.Label>
                <Form.Control
                  type="text"
                  name="reg_address"
                  value={selectedReceiver.reg_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Address</Form.Label>
                <Form.Control
                  type="text"
                  name="work_address"
                  value={selectedReceiver.work_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_no"
                  value={selectedReceiver.tel_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="owner_mobile"
                  value={selectedReceiver.owner_mobile || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={selectedReceiver.status || ''}
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


export default ReceiversPage;
