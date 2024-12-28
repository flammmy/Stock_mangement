import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = Banks.filter((Bank) => {
      return (
        Bank.name.toLowerCase().includes(lowercasedQuery) ||
        Bank.ifsc_code.toLowerCase().includes(lowercasedQuery) ||
        Bank.branch.toLowerCase().includes(lowercasedQuery) ||
        Bank.account_number.toLowerCase().includes(lowercasedQuery)
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
    },
    {
      name: 'Bank Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'IFSC Code',
      selector: (row) => row.ifsc_code,
      sortable: true,
    },
    {
      name: 'Branch',
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: 'Account Number',
      selector: (row) => row.account_number,
      sortable: true,
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
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/bank/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Bank deleted successfully');
        setBank(Banks.filter((user) => user.id !== userId));
        setFilteredBank(filteredBanks.filter((user) => user.id !== userId));
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete bank');
    }
  };

  const handleEdit = (user) => {
    setselectedBank(user);
    setShowEditModal(true);
  };

  const handleUpdateBank = async () => {
    try {
      if (!selectedBank || !selectedBank.id) {
        toast.error('Invalid Bank selected for update!');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/bank/${selectedBank.id}`,
        selectedBank,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Bank updated successfully!');

        setBank((prev) =>
          prev.map((sup) => (sup.id === selectedBank.id ? selectedBank : sup))
        );

        setFilteredBank((prev) =>
          prev.map((sup) => (sup.id === selectedBank.id ? selectedBank : sup))
        );

        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating Bank!');
    }
  };

  const handleAddBank = () => {
    navigate('/add-Bank');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedBank((prevBank) => ({
      ...prevBank,
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
        fontSize: '12px',
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
   const exportToCSV = () => {
        const csv = Papa.unparse(filteredBanks);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'supplier_list.csv');
      };
      const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Banks List', 20, 10);
        doc.autoTable({
          head: [['Bank Name', 'IFSC Code','Branch','Account Number']],
          body: filteredBanks.map((row) => [row.name, row.ifsc_code, row.branch, row.account_number]),
        });
        doc.save('Banks_list.pdf');
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
          <Button variant="primary" onClick={handleAddBank}>
            <MdPersonAdd className="me-2" /> Add Bank
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card rounded-lg shadow-none" style={{ background: '#f5f0e6' }}>
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={exportToCSV}>
                  Export as CSV
                </button>
                <button type="button" className="btn btn-sm btn-primary" onClick={exportToPDF}>
                  Export as PDF
                </button>
              </div>
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
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control
                  type="text"
                  name="ifsc_code"
                  value={selectedBank.ifsc_code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  name="branch"
                  value={selectedBank.branch || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  name="account_number"
                  value={selectedBank.account_number || ''}
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
            <Button variant="success" onClick={handleUpdateBank}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BanksPage;
