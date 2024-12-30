import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd, MdPlusOne, MdAdd, MdPrint } from 'react-icons/md';
import { FaEye, FaFileCsv } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PdfPreview from 'components/PdfPreview';
import { AiOutlineFilePdf } from 'react-icons/ai';

const Index = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]); // For search
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [invoiceAllDetails, setInvoiceAllDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stockin/invoice`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        const invoicesDetails = response.data.data;
        setInvoiceAllDetails(invoicesDetails);
        const filteredFields = (data) => {
          return invoicesDetails.map((invoice) => ({
            invoice_no: invoice.invoice_no,
            id: invoice.id,
            supplier_name: invoice.supplier.name,
            receiver_name: invoice.receiver.name,
            date: invoice.date,
            bank: invoice.bank.account_number,
            total_amount: invoice.total_amount
          }));
        };
        setInvoices(filteredFields);
        setFilteredInvoices(filteredFields); // Initialize filtered users
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchInvoices();
  }, []);

  //   Update filtered users when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = invoices.filter(
      (invoice) =>
        invoice.supplier_name.toLowerCase().includes(lowercasedQuery) || invoice.receiver_name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredInvoices(filtered);
  }, [searchQuery, invoices]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate();

  const columns = [
    {
      name: 'Invoice Number',
      selector: (row) => row.invoice_no,
      sortable: true
    },
    {
      name: 'Supplier Name',
      selector: (row) => row.supplier_name,
      sortable: true
    },
    {
      name: 'Receiver Name',
      selector: (row) => row.receiver_name,
      sortable: true
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: 'Bank',
      selector: (row) => row.bank,
      sortable: true
    },
    {
      name: 'Total Amount',
      selector: (row) => row.total_amount,
      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          <Button variant="outline-warning" size="sm" className="me-2" onClick={() => navigate(`/add-product/${row.id}/${row.invoice_no}`)}>
            <MdAdd />
          </Button>
          <Button variant="outline-success" size="sm" className="me-2">
            <FaEye onClick={() => navigate(`/show-product/${row.id}`)} />
          </Button>
          {/* <Button variant="outline-danger" size="sm">
            <MdDelete />
          </Button> */}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
              setSelectedInvoice(row.id);
              setShowPdfModal(true);
              console.log(row.id);
            }}
          >
            <MdPrint />
          </Button>
        </div>
      )
    }
  ];

  //   const handleUpdateUser = async () => {
  //     try {
  //       console.log(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${selectedUser.id}`);
  //       const response = await axios.put(
  //         `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${selectedUser.id}`,
  //         {
  //           username: selectedUser.username,
  //           name: selectedUser.name,
  //           email: selectedUser.email,
  //           phone: selectedUser.phone,
  //           role: selectedUser.role == 'operator' ? 2 : 3,
  //           password: selectedUser.password,
  //           status: selectedUser.status == 'active' ? 1 : 0
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       );
  //       toast.success('User updated successfully!');
  //       setUsers((prevUsers) => prevUsers.map((user) => (user.id === selectedUser.id ? selectedUser : user)));

  //       setShowEditModal(false);
  //     } catch (err) {
  //       toast.error('Error updating user!');
  //     }
  //   };

  const handleAddInvoice = () => {
    navigate('/add-invoice');
  };
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setSelectedInvoices((prevInvoice) => ({
  //       ...prevInvoice,
  //       [name]: value
  //     }));
  //   };

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
        fontSize: '12px',
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

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredSuppliers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'supplier_list.csv');
  };
  const exportToPDF = () => {
    const doc = new jsPDF('landscape');
    doc.text('Suppliers List', 20, 10);
    doc.autoTable({
      head: [
        [
          'Invoice Number',
          'Supplier Name',
          'Receiver Name',
          'Date',
          'Bank',
          'Total Amount',
        ]
      ],
      body: filteredSuppliers.map((row) => [
        row.invoice_no,
        row.supplier_name,
        row.receiver_name,
        row.date,
        row.bank,
        row.total_amount,
       
      ])
    });
    doc.save('user_list.pdf');
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
          <Button variant="primary" onClick={handleAddInvoice}>
            <MdPersonAdd className="me-2" /> Add Invoice
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-none" style={{ background: '#f5f0e6' }}>
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
                  data={filteredInvoices}
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
      {invoiceAllDetails && selectedInvoice && (
        <PdfPreview show={showPdfModal} onHide={() => setShowPdfModal(false)} invoiceData={invoiceAllDetails} id={selectedInvoice} />
      )}
    </div>
  );
};

export default Index;
