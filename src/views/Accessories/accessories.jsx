import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-loading-skeleton/dist/skeleton.css';

import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileCsv } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

const SuppliersPage = () => {
  const [suppliers, setSupplier] = useState([]);
  const [filteredSuppliers, setFilteredSupplier] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setselectedSupplier] = useState(null);

  const handleToggleStatus = async (supplierId, currentStatus) => {
    console.log('Toggling status for supplier:', supplierId, 'Current status:', currentStatus);
  
    const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle the status
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/accessory/${supplierId}`, // Fix the endpoint with correct supplierId
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Response from API:', response.data);
  
      // Update the frontend state
      setSupplier((prevSuppliers) =>
        prevSuppliers.map((supplier) => (supplier.id === supplierId ? { ...supplier, status: updatedStatus } : supplier))
      );
  
      setFilteredSupplier((prevFilteredSuppliers) =>
        prevFilteredSuppliers.map((supplier) => (supplier.id === supplierId ? { ...supplier, status: updatedStatus } : supplier))
      );
  
      toast.success('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status!');
    }
  };
  
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/accessory`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        setSupplier(response.data.data);
        setFilteredSupplier(response.data.data);
      } catch (error) {
        console.error(error);
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
        supplier.product_category.toLowerCase().includes(lowercasedQuery) ||
        supplier.accessory_name.code.toLowerCase().includes(lowercasedQuery) ||
        statusText.includes(lowercasedQuery)
      );
    });
    setFilteredSupplier(filtered);
  }, [searchQuery, suppliers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate();

  const columns = [
    {
      name: 'Sr No',
      selector: (_, index) => index + 1,
      sortable: true
    },
    {
      name: 'Product Category',
      selector: (row) => row.product_category,
      sortable: true
    },
    {
      name: 'Accessory Name',
      selector: (row) => row.accessory_name,
      sortable: true
    },
    {
      name: 'Status',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Toggle Switch */}
          <label style={{ position: 'relative', display: 'inline-block', width: '34px', height: '20px' , marginBottom:'0'}}>
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
      
          {/* Status Badge */}
          <span
            className={`badge ${row.status === 0 ? 'bg-success' : 'bg-danger'}`}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          >
            {row.status === 0 ? 'Active' : 'Inactive'}
          </span>
        </div>
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

  const handleDelete = async (supplierId) => {
    try {
      // Display confirmation modal
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        // Attempt to delete supplier
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/accessory/${supplierId}`, { // Fix the endpoint
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        // Update state on successful deletion
        setSupplier((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== supplierId));
        setFilteredSupplier((prevFilteredSuppliers) => prevFilteredSuppliers.filter((supplier) => supplier.id !== supplierId));
  
        toast.success('Supplier deleted successfully');
        Swal.fire('Deleted!', 'The supplier has been deleted.', 'success');
      }
    } catch (error) {
      // Log error for debugging and notify user
      console.error('Error deleting supplier:', error);
  
      // Provide user feedback
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Failed to delete supplier: ${error.response.data.message}`);
      } else {
        toast.error('An unexpected error occurred while deleting the supplier.');
      }
  
      // Display error notification in confirmation dialog
      Swal.fire('Error!', 'There was a problem deleting the supplier.', 'error');
    }
  };
  

  const handleEdit = (supplier) => {
    setselectedSupplier(supplier);
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      if (!selectedSupplier || !selectedSupplier.id) {
        toast.error('Invalid supplier selected for update!');
        return;
      }

      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/accessory/${selectedSupplier.id}`, selectedSupplier, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Supplier updated successfully!');

        setSupplier((prev) => prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup)));

        setFilteredSupplier((prev) => prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup)));

        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating supplier!');
    }
  };

  const handleAddUser = () => {
    navigate('/add-Accessories');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedSupplier((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const customStyles = {
    table: {
      style: {
        borderCollapse: 'separate', // Ensures border styles are separate
        borderSpacing: 0, // Removes spacing between cells
      },
    },
    header: {
      style: {
        backgroundColor: '#2E8B57',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '15px',
        borderRadius: '8px 8px 0 0', // Adjusted to only affect top corners
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
        justifyContent: 'center',
        backgroundColor: '#20B2AA',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '15px',
        borderRight: '1px solid #e0e0e0', // Vertical lines between header cells
      },
      lastCell: {
        style: {
          borderRight: 'none', // Removes border for the last cell
        },
      },
    },
    cells: {
      style: {
        justifyContent: 'center',
        fontSize: '14px',
        color: '#333',
        padding: '12px',
        borderRight: '1px solid grey', // Vertical lines between cells
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
        color: 'black', // Makes the arrows white
        border: 'none',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)',
        },
        '& svg':{
          fill: 'white',
        },
        '&:focus': {
          outline: 'none',
          boxShadow: '0 0 5px rgba(255,255,255,0.5)',
        },
      },
    },
  };
  
  const exportToCSV = () => {
    const csv = Papa.unparse(filteredSuppliers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'accessory_list.csv');
  };
  const exportToPDF = () => {
    const doc = new jsPDF('landscape'); // Landscape orientation provides more horizontal space.
  
    doc.text('Accessory List', 14, 10);
  
    doc.autoTable({
      head: [
        [
          'Product Category',
          'Accessory',
          'Status',
        ],
      ],
      body: filteredSuppliers.map((row) => [
        row.product_categoryt,
        row.accessory_name,
        row.status === 1 ? 'Active' : 'Inactive',
      ]),
      styles: {
        fontSize: 6, // Smaller font size to fit more data
        overflow: 'linebreak', // Wrap text within cells
        cellPadding: 1, // Reduce padding for tighter fit
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Auto-adjust column widths
        1: { cellWidth: 15 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 15 },
        7: { cellWidth: 25 },
        8: { cellWidth: 20 },
        9: { cellWidth: 30 },
        10: { cellWidth: 30 },
        11: { cellWidth: 15 },
        12: { cellWidth: 15 },
      },
      tableWidth: 'wrap', // Ensure table fits within the page width
      margin: { top: 20 }, // Top margin for the table
      didDrawPage: (data) => {
        doc.text('Accessory List (continued)', 14, 10);
      },
      pageBreak: 'auto', // Automatically breaks into new pages if needed
    });
  
    doc.save('accessory_list.pdf');
  };
  
  
  
  
  
  return (
    <div className="container-fluid pt-4" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <div className="row mb-3">
      <div className="col-md-4">
          <label htmlFor="search" className='me-2'>Search: </label>
          <input
            type="text"
            placeholder="Type here..."
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            className="pe-5 ps-2 py-2"
            style={{ borderRadius: '5px' }}
          />
        </div>
        <div className="col-md-8 text-end">
          <Button variant="primary" onClick={handleAddUser}>
            <MdPersonAdd className="me-2" /> Add Product Accessoryy
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card rounded-lg shadow-none" style={{ background: '#f5f0e6' }}>
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-info" onClick={exportToCSV}>
                  <FaFileCsv className="w-5 h-5 me-1" />
                  Export as CSV
                </button>
                <button type="button" className="btn btn-sm btn-info" onClick={exportToPDF}>
                  <AiOutlineFilePdf className="w-5 h-5 me-1" />
                  Export as PDF
                </button>
              </div>
              <DataTable
                columns={columns}
                data={filteredSuppliers}
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
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#3f4d67' }}>
            <Modal.Title className="text-white">Edit Supplier</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
            ```javascript
            
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

export default SuppliersPage;
