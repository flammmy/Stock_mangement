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

const SuppliersPage = () => {
  const [suppliers, setSupplier] = useState([]);
  const [filteredSuppliers, setFilteredSupplier] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setselectedSupplier] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState('select'); // Default to 'select'
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(25); // Default row per page set to 25
  const [loading, setLoading] = useState(true); // Added loading state

  const downloadPDF = () => {
    if (!filteredSuppliers || filteredSuppliers.length === 0) {
      toast.error("No supplier data available to download.");
      return;
    }

    const doc = new jsPDF('landscape');
    const tableColumn = [
      "Sr No",
      "Name",
      "Code",
      "GST No",
      "CIN No",
      "PAN No",
      "MSME No",
      "Phone",
      "Email",
      "Owner Mobile",
      "Registered Address",
      "Work Address",
      "Area",
      "Status",
    ];

    const tableRows = [];

    filteredSuppliers.forEach((supplier, index) => {
      const supplierData = [
        index + 1,
        supplier.name,
        supplier.code,
        supplier.gst_no,
        supplier.cin_no,
        supplier.pan_no,
        supplier.msme_no,
        supplier.tel_no,
        supplier.email,
        supplier.owner_mobile,
        supplier.reg_address.replace('\n', ', '),
        supplier.work_address.replace('\n', ', '),
        supplier.area,
        supplier.status === 0 ? "Active" : "Inactive",
      ];
      tableRows.push(supplierData);
    });

    doc.text("Products Data", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 15,
      theme: "grid",
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: [46, 139, 87],
        textColor: 255,
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 30 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 },
        7: { cellWidth: 20 },
        8: { cellWidth: 40 },
        9: { cellWidth: 20 },
        10: { cellWidth: 50 },
        11: { cellWidth: 50 },
        12: { cellWidth: 15 },
        13: { cellWidth: 15 },
      },
      margin: { top: 10, left: 10, right: 10 },
      pageBreak: "auto",
    });

    doc.save("Product_data.pdf");
  };

  const handleToggleStatus = async (supplierId, currentStatus) => {
    console.log("Toggling status for supplier:", supplierId, "Current status:", currentStatus);

    const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle the status
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${supplierId}`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Response from API:", response.data);

      // Update the frontend state
      setSupplier((prevSuppliers) => prevSuppliers.map((supplier) =>
          supplier.id === supplierId ? { ...supplier, status: updatedStatus } : supplier
        )
      );

      setFilteredSupplier((prevFilteredSuppliers) =>
        prevFilteredSuppliers.map((supplier) =>
          supplier.id === supplierId ? { ...supplier, status: updatedStatus } : supplier
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status!");
    }
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        setSupplier(response.data.data);
        setFilteredSupplier(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false on error
      }
    };
    fetchSupplier();
  }, []);

  // Update filtered Suppliers when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = suppliers.filter((supplier) => {
      const statusText = supplier.status === 1 ? 'active' : 'inactive';
      return (
        supplier.name.toLowerCase().includes(lowercasedQuery) ||
        supplier.code.toLowerCase().includes(lowercasedQuery) ||
        supplier.gst_no.toLowerCase().includes(lowercasedQuery) ||
        supplier.email.toLowerCase().includes(lowercasedQuery) ||
        supplier.tel_no.toLowerCase().includes(lowercasedQuery) ||
        supplier.owner_mobile.toLowerCase().includes(lowercasedQuery) ||
        statusText.includes(lowercasedQuery)
      );
    });
    setFilteredSupplier(filtered);
  }, [searchQuery, suppliers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * rowPerPage;
  const endIndex = startIndex + rowPerPage;
  const paginatedUsers = filteredSuppliers.slice(startIndex, endIndex);

  const columns = [
    {
      name: 'Sr No',
      selector: (_, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Supplier Name',
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
      cell: (row) => (
          <div className="d-flex align-items-center">
            <label style={{ position: 'relative', display: 'inline-block', width: '34px', height: '20px' }}>
              <input
                type="checkbox"
                checked={row.status === 1} // Active if 1
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
                  backgroundColor: row.status === 1 ? '#4caf50' : '#ccc',
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
                  left: row.status === 1 ? '18px' : '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.4s',
                  borderRadius: '50%',
                }}
              ></span>
            </label>
            <span
              className={`badge ${row.status === 1 ? 'bg-success ms-2' : 'bg-danger ms-2'}`}
              style={{ padding: '5px 10px', borderRadius: '8px', marginTop: "-10px" }}
            >
              {row.status === 1 ? 'Active' : 'Inactive'}
            </span>
          </div>
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

  const handleDelete = async (supplierId) => {
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
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/${supplierId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setSupplier((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== supplierId));
        setFilteredSupplier((prevFilteredSuppliers) =>
          prevFilteredSuppliers.filter((supplier) => supplier.id !== supplierId)
        );

        toast.success('Supplier deleted successfully');
        Swal.fire('Deleted!', 'The supplier has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast.error('An unexpected error occurred while deleting the supplier.');
      Swal.fire('Error!', 'There was a problem deleting the supplier.', 'error');
    }
  };

  const handleEdit = (supplier) => {
    setselectedSupplier(supplier);
    setShowEditModal(true);
  };

  const handleUpdateUser  = async () => {
    try {
      if (!selectedSupplier || !selectedSupplier.id) {
        toast.error('Invalid supplier selected for update!');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${selectedSupplier.id}`,
        selectedSupplier,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Supplier updated successfully!');

        setSupplier((prev) =>
          prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup))
        );

        setFilteredSupplier((prev) =>
          prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup))
        );

        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating supplier!');
    }
  };


  const handleAddUser   = () => {
    navigate('/add-supplier');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedSupplier((prev) => ({
      ...prev,
      [name]: value,
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
  };
  
  return (
    <div className="container-fluid pt-4" style={{borderRadius: '8px' }}>
     <div className="container-fluid pt-4" style={{ borderRadius: '8px' }}>
  <div
    className="row mb-3"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap', // Allow wrapping for small screens
    }}
  >
    {/* Search Input */}
    <div className="col-12 col-md-4 mb-2 mb-md-0" style={{ paddingRight: '10px' }}>
      <input
        type="text"
        placeholder="Sort by supplier name"
        id="search"
        value={searchQuery}
        onChange={handleSearch}
        className="pe-5 ps-2 py-2 w-100" // Ensure the input takes up full width on smaller screens
        style={{ borderRadius: '5px' }}
      />
    </div>

    {/* Entries Dropdown */}

    {/* Action Buttons */}
    <div className="col-12 col-md-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
      <Button variant="primary" onClick={handleAddUser}>
        <MdPersonAdd className="me-2" /> Add Supplier
      </Button>
      <Button variant="success" onClick={downloadPDF}>
        Download PDF
      </Button>
    </div>
  </div>
</div>



      <div className="row">
        <DataTable
          columns={columns}
          data={loading ? Array(10).fill('') : paginatedUsers}
          progressPending={loading}
          pagination
          paginationPerPage={rowPerPage}
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          pagination TotalRows={filteredSuppliers.length}
          onChangePage={(page) => setCurrentPage(page)}
          customStyles={customStyles}
        />
      </div>

      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#3f4d67' }}>
            <Modal.Title className="text-white">Edit Supplier</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedSupplier?.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Supplier Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={selectedSupplier?.code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gst_no"
                  value={selectedSupplier?.gst_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CIN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cin_no"
                  value={selectedSupplier?.cin_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan_no"
                  value={selectedSupplier?.pan_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>MSME Number</Form.Label>
                <Form.Control
                  type="text"
                  name="msme_no"
                  value={selectedSupplier?.msme_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Registered Address</Form.Label>
                <Form.Control
                  type="text"
                  name="reg_address"
                  value={selectedSupplier?.reg_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Address</Form.Label>
                <Form.Control
                  type="text"
                  name="work_address"
                  value={selectedSupplier?.work_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_no"
                  value={selectedSupplier?.tel_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="owner_mobile"
                  value={selectedSupplier?.owner_mobile || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={selectedSupplier?.status || ''} onChange={handleChange} className="bg-white shadow-sm">
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

  )};

export default SuppliersPage;