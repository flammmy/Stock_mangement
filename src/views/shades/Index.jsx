import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShadesPage = () => {
  const [shades, setSupplier] = useState([]);
  const [filteredShades, setFilteredSupplier] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setselectedSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
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

  // Update filtered Shades when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = shades.filter((supplier) => {
      const statusText = supplier.status === 1 ? 'active' : 'inactive';
      return (
        supplier.name.toLowerCase().includes(lowercasedQuery) ||
        supplier.shadeNo.toLowerCase().includes(lowercasedQuery) ||
        supplier.code.toLowerCase().includes(lowercasedQuery) ||
        supplier.purchase_shade_no.toLowerCase().includes(lowercasedQuery) ||
        statusText.includes(lowercasedQuery)
      );
    });
    setFilteredSupplier(filtered);
  }, [searchQuery, shades]);

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
      name: 'Shade No',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'Purchase Shade No',
      selector: (row) => row.gst_no,
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

  const handleDelete = async (ProductId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/${ProductId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if the response indicates success
      if (response.status === 200) {
        toast.success('Product deleted successfully');
        setSupplier(shades.filter((Product) => Product.id !== ProductId));
        setFilteredSupplier(filteredshades.filter((Product) => Product.id !== ProductId));
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete Product');
    }
  };

  const handleEdit = (Product) => {
    setselectedSupplier(Product);
    setShowEditModal(true);
  };
  const handleUpdateProduct = async () => {
    try {
      // Ensure the selectedSupplier is valid
      if (!selectedSupplier || !selectedSupplier.id) {
        toast.error('Invalid supplier selected for update!');
        return;
      }

      // Perform the API call
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

      // Check the response status
      if (response.status === 200) {
        toast.success('Supplier updated successfully!');

        // Update the shades list
        setSupplier((prev) =>
          prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup))
        );

        // Update the filtered shades list
        setFilteredSupplier((prev) =>
          prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup))
        );

        // Close the modal
        setShowEditModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error updating supplier!');
    }
  };


  const handleAddProduct = () => {
    navigate('/add-shade');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedSupplier((prevProduct) => ({
      ...prevProduct,
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
          <Button variant="primary" onClick={handleAddProduct}>
            <MdPersonAdd className="me-2" /> Add Product
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
              <h2 className="m-0 text-white">shades Management</h2>
            </div> */}
            <div className="card-body p-0" style={{ borderRadius: '8px' }}>
              <DataTable
                columns={columns}
                data={filteredshades}
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
      {/* Edit Product Modal */}
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
                  value={selectedSupplier.name || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Supplier Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={selectedSupplier.code || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gst_no"
                  value={selectedSupplier.gst_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CIN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cin_no"
                  value={selectedSupplier.cin_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan_no"
                  value={selectedSupplier.pan_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>MSME Number</Form.Label>
                <Form.Control
                  type="text"
                  name="msme_no"
                  value={selectedSupplier.msme_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Registered Address</Form.Label>
                <Form.Control
                  type="text"
                  name="reg_address"
                  value={selectedSupplier.reg_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Address</Form.Label>
                <Form.Control
                  type="text"
                  name="work_address"
                  value={selectedSupplier.work_address || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="tel_no"
                  value={selectedSupplier.tel_no || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="owner_mobile"
                  value={selectedSupplier.owner_mobile || ''}
                  onChange={handleChange}
                  className="bg-white shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={selectedSupplier.status || ''}
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
            <Button variant="success" onClick={handleUpdateProduct}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

      )}
    </div>
  );
};


export default shadesPage;
