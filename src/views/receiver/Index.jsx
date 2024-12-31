import React, { useEffect, useState } from 'react'; 
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-loading-skeleton/dist/skeleton.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReceiversPage = () => {
  const [Receivers, setReceiver] = useState([]);
  const [filteredReceivers, setFilteredReceiver] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReceiver, setselectedReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowPerPage, setRowPerPage] = useState(25); // Default row per page set to 25
  const [currentPage, setCurrentPage] = useState(1); // Added currentPage state
  const [entriesPerPage, setEntriesPerPage] = useState('select'); // Added entriesPerPage state

  const downloadPDF = () => {
    const doc = new jsPDF('landscape');
    const tableColumn = [
      'Sr No',
      'Name',
      'Code',
      'GST No',
      'CIN No',
      'PAN No',
      'MSME No',
      'Phone',
      'Email',
      'Owner Mobile',
      'Registered Address',
      'Work Address',
      'Area',
      'Status',
    ];
    const tableRows = filteredReceivers.map((receiver, index) => [
      index + 1,
      receiver.name,
      receiver.code,
      receiver.gst_no,
      receiver.cin_no,
      receiver.pan_no,
      receiver.msme_no,
      receiver.tel_no,
      receiver.email,
      receiver.owner_mobile,
      receiver.reg_address.replace('\n', ', '),
      receiver.work_address.replace('\n', ', '),
      receiver.area,
      receiver.status === 0 ? 'Active' : 'Inactive',
    ]);

    doc.text('Receivers Data', 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 15,
      theme: 'grid',
    });
    doc.save('receivers_data.pdf');
  };

  const handleToggleStatus = async (receiverId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle status

      // Make the API call to update status
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/receiver/${receiverId}`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Status updated successfully!');

      // Update state for both Receivers and filteredReceivers
      setReceiver((prevReceivers) =>
        prevReceivers.map((receiver) =>
          receiver.id === receiverId ? { ...receiver, status: updatedStatus } : receiver
        )
      );

      setFilteredReceiver((prevFilteredReceivers) =>
        prevFilteredReceivers.map((receiver) =>
          receiver.id === receiverId ? { ...receiver, status: updatedStatus } : receiver
        )
      );
    } catch (error) {
      toast.error('Failed to update status!');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/receiver`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data.data);
        setReceiver(response.data.data);
        setFilteredReceiver(response.data.data); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchReceiver();
  }, []);

  // Update filtered Receivers when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = Receivers .filter((Receiver) => {
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
      width: '80px',
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
      selector: (row) => (row.status === 1 ? 'inactive' : 'active'),
      sortable: true,
      cell: (row) => (
        <label style={{ position: 'relative', display: 'inline-block', width: '34px', height: '20px' }}>
          <div style={{ marginLeft: "45px", marginTop: "-4px" }}>
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
              left: row.status === 0 ? '18 px' : '3px',
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
      ),
    },
  ];

  const handleDelete = async (receiverId) => {
    try {
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
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/receiver/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setReceiver((prevReceivers) => prevReceivers.filter((Receivers) => Receivers.id !== receiverId));
        setFilteredReceiver((prevFilteredReceivers) =>
          prevFilteredReceivers.filter((Receivers) => Receivers.id !== receiverId)
        );

        toast.success('Receiver deleted successfully');
        Swal.fire('Deleted!', 'The Receiver has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting Receiver:', error);
      toast.error('An unexpected error occurred while deleting the Receiver.');
      Swal.fire('Error!', 'There was a problem deleting the Receiver.', 'error');
    }
  };

  const handleEdit = (user) => {
    setselectedReceiver(user);
    setShowEditModal(true);
  };

  const handleUpdateUser  = async () => {
    try {
      if (!selectedReceiver || !selectedReceiver.id) {
        toast.error('Invalid Receiver selected for update!');
        return;
      }

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

      if (response.status === 200) {
        toast.success('Receiver updated successfully!');

        setReceiver((prev) =>
          prev.map((sup) => (sup.id === selectedReceiver.id ? selectedReceiver : sup))
        );

        setFilteredReceiver((prev) =>
          prev.map((sup) => (sup.id === selectedReceiver.id ? selectedReceiver : sup))
        );

        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating Receiver!');
    }
  };

  const handleAddUser  = () => {
    navigate('/add-Receiver');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedReceiver((prevUser ) => ({
      ...prevUser ,
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
      style 
: {
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
  };

  return (
    <div className="container-fluid pt-4" style={{ borderRadius: '8px' }}>
      <div className="row mb-3"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', // Changed to wrap for better responsiveness
        }}
      >
        {/* Search Input */}
        <div className="col-12 col-md-4 mb-2 mb-md-0" style={{ paddingRight: '10px' }}>
          <input
            type="text"
            placeholder="Search here"
            id='search'
            value={searchQuery}
            onChange={handleSearch}
            className="pe-5 ps-2 py-2 w-100" // Full width on small screens
            style={{ borderRadius: '5px' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="col-12 col-md-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="primary" onClick={handleAddUser }>
            <MdPersonAdd className="me-2" /> Add User
          </Button>
          <Button variant="success" onClick={downloadPDF} className="ms-2">
            Download PDF
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
              <DataTable
                columns={columns}
                data={filteredReceivers}
                pagination
                paginationPerPage={rowPerPage}  // Use the updated rowPerPage state
                paginationResetDefaultPage={currentPage === 1} // Reset pagination to the first page on change
                onChangePage={page => setCurrentPage(page)}  // Update the current page on page change
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
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered 
        >
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
                  value={selectedReceiver?.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Receiver Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={selectedReceiver?.code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gst_no"
                  value={selectedReceiver?.gst_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CIN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cin_no"
                  value={selectedReceiver?.cin_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan_no"
                  value={selectedReceiver?.pan_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>MSME Number</Form.Label>
                <Form.Control
                  type="text"
                  name="msme_no"
                  value={selectedReceiver?.msme_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Registered Address</Form.Label>
                <Form.Control
                  type="text"
                  name="reg_address"
                  value={selectedReceiver?.reg_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Address</Form.Label>
                <Form.Control
                  type="text"
                  name="work_address"
                  value={selectedReceiver?.work_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_no"
                  value={selectedReceiver?.tel_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="owner_mobile"
                  value={selectedReceiver?.owner_mobile || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={selectedReceiver?.status || ''}
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
            <Button variant="success" onClick={handleUpdateUser }>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
    </div>
  );
};

export default ReceiversPage;