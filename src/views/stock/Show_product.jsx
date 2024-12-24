import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Show_product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // For search
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
  
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stocks/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
                });
                console.log(response.data);
                setProducts(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchProductData();
    }, []);
  
    // Update filtered users when the search query changes
    useEffect(() => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.productname.toLowerCase().includes(lowercasedQuery) ||
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.email.toLowerCase().includes(lowercasedQuery) ||
          product.phone.toString().toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }, [searchQuery, products]);
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const navigate = useNavigate();
  
    const columns = [
      {
        name: 'Sr No',
        selector: (_, index) => index + 1,
        sortable: true,
        width: '80px'
      },
      {
        name: 'Username',
        selector: (row) => row.username,
        sortable: true
      },
      {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true
      },
      {
        name: 'Phone',
        selector: (row) => row.phone,
        sortable: true
      },
      {
        name: 'Role',
        selector: (row) => (row.role === 1 ? 'Admin' : row.role === 2 ? 'Operator' : row.role === 3 ? 'Supervisor' : 'Superadmin'),
        sortable: true
      },
      {
        name: 'Status',
        selector: (row) => (row.status === 1 ? 'inactive' : 'active'),
        sortable: true,
        cell: (row) => {
          const statusText = row.status === 1 ? 'inactive' : 'active';
          return <span className={`badge rounded-pill ${statusText === 'active' ? 'bg-success' : 'bg-danger'}`}>{statusText}</span>;
        }
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
    const handleDelete = async (productId) => {
    //   try {
    //     const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //       }
    //     });
    //     toast.success('User deleted successfully');
    //     setProducts(products.filter((product) => product.id !== productId));
    //     setFilteredProducts(filteredProducts.filter((product) => product.id !== productId));
    //   } catch (error) {
    //     toast.error('Failed to delete user');
    //   }
    };
    
  
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
          fontSize: '16px',
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
            <Button variant="primary" >
              <MdPersonAdd className="me-2" /> Add User
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card shadow-lg border-0 rounded-lg">
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
                  <DataTable
                    columns={columns}
                    data={filteredProducts}
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
        
      </div>
    );
}

export default Show_product
