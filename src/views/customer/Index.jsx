import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

const CustomersPage = () => {
  const [Customers, setCustomer] = useState([]);
  const [filteredCustomers, setFilteredCustomer] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setselectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/customers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        setCustomer(response.data.data);
        setFilteredCustomer(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomer();
  }, []);

  // Update filtered Customers when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = Customers.filter((Customer) => {
      const statusText = Customer.status === 1 ? 'active' : 'inactive';
      return (
        Customer.name.toLowerCase().includes(lowercasedQuery) ||
        Customer.code.toLowerCase().includes(lowercasedQuery) ||
        Customer.gst_no.toLowerCase().includes(lowercasedQuery) ||
        Customer.email.toLowerCase().includes(lowercasedQuery) ||
        Customer.tel_no.toLowerCase().includes(lowercasedQuery) ||
        Customer.owner_mobile.toLowerCase().includes(lowercasedQuery) ||
        statusText.includes(lowercasedQuery)
      );
    });
    setFilteredCustomer(filtered);
  }, [searchQuery, Customers]);

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
      name: 'Customer Name',
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
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/customers/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if the response indicates success
      if (response.status === 200) {
        toast.success('User deleted successfully');
        setCustomer(Customers.filter((user) => user.id !== userId));
        setFilteredCustomer(filteredCustomers.filter((user) => user.id !== userId));
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setselectedCustomer(user);
    setShowEditModal(true);
  };
  const handleUpdateUser = async () => {
    try {
      if (!selectedCustomer || !selectedCustomer.id) {
        toast.error('Invalid Customer selected for update!');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/customers/${selectedCustomer.id}`,
        selectedCustomer,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Check the response status
      if (response.status === 200) {
        toast.success('Customer updated successfully!');

        // Update the Customers list
        setCustomer((prev) =>
          prev.map((sup) => (sup.id === selectedCustomer.id ? selectedCustomer : sup))
        );

        // Update the filtered Customers list
        setFilteredCustomer((prev) =>
          prev.map((sup) => (sup.id === selectedCustomer.id ? selectedCustomer : sup))
        );

        // Close the modal
        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating Customer!');
    }
  };
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle status
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/customers/${userId}`,
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

  const handleAddUser = () => {
    navigate('/add-Customer');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedCustomer((prevUser) => ({
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
            <MdPersonAdd className="me-2" /> Add Customer
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
              <DataTable
                columns={columns}
                data={filteredCustomers}
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
      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#3f4d67' }}>
            <Modal.Title className="text-white">Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedCustomer.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Customer Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={selectedCustomer.code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gst_no"
                  value={selectedCustomer.gst_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CIN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cin_no"
                  value={selectedCustomer.cin_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan_no"
                  value={selectedCustomer.pan_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>MSME Number</Form.Label>
                <Form.Control
                  type="text"
                  name="msme_no"
                  value={selectedCustomer.msme_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Registered Address</Form.Label>
                <Form.Control
                  type="text"
                  name="reg_address"
                  value={selectedCustomer.reg_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Address</Form.Label>
                <Form.Control
                  type="text"
                  name="work_address"
                  value={selectedCustomer.work_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_no"
                  value={selectedCustomer.tel_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="owner_mobile"
                  value={selectedCustomer.owner_mobile || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
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


export default CustomersPage;
