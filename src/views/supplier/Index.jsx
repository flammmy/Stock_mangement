// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
// import { toast } from 'react-toastify';

// const SuppliersPage = () => {
//   const [suppliers, setSupplier] = useState([]);
//   const [filteredSuppliers, setFilteredSupplier] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedSupplier, setselectedSupplier] = useState(null);

//   useEffect(() => {
//     const fetchSupplier = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         console.log(response);
//         setSupplier(response.data.data);
//         setFilteredSupplier(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchSupplier();
//   }, []);

//   // Update filtered Suppliers when the search query changes
//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = suppliers.filter((supplier) => {
//       const statusText = supplier.status === 1 ? 'active' : 'inactive';
//       return (
//         supplier.name.toLowerCase().includes(lowercasedQuery) ||
//         supplier.code.toLowerCase().includes(lowercasedQuery) ||
//         supplier.gst_no.toLowerCase().includes(lowercasedQuery) ||
//         supplier.email.toLowerCase().includes(lowercasedQuery) ||
//         supplier.tel_no.toLowerCase().includes(lowercasedQuery) ||
//         supplier.owner_mobile.toLowerCase().includes(lowercasedQuery) ||
//         statusText.includes(lowercasedQuery)
//       );
//     });
//     setFilteredSupplier(filtered);
//   }, [searchQuery, suppliers]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const navigate = useNavigate();

//   const columns = [
//     {
//       name: 'Sr No',
//       selector: (_, index) => index + 1,
//       sortable: true,
//       width: '80px',
//     },
//     {
//       name: 'Supplier Name',
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: 'Code',
//       selector: (row) => row.code,
//       sortable: true,
//     },
//     {
//       name: 'GST No',
//       selector: (row) => row.gst_no,
//       sortable: true,
//     },
//     {
//       name: 'CIN No',
//       selector: (row) => row.cin_no,
//       sortable: true,
//     },
//     {
//       name: 'PAN No',
//       selector: (row) => row.pan_no,
//       sortable: true,
//     },
//     {
//       name: 'MSME No',
//       selector: (row) => row.msme_no,
//       sortable: true,
//     },
//     {
//       name: 'Phone',
//       selector: (row) => row.tel_no,
//       sortable: true,
//     },
//     {
//       name: 'Email',
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: 'Owner Mobile',
//       selector: (row) => row.owner_mobile,
//       sortable: true,
//     },
//     {
//       name: 'Registered Address',
//       selector: (row) => row.reg_address,
//       sortable: true,
//       cell: (row) => <span>{row.reg_address.replace('\n', ', ')}</span>,
//     },
//     {
//       name: 'Work Address',
//       selector: (row) => row.work_address,
//       sortable: true,
//       cell: (row) => <span>{row.work_address.replace('\n', ', ')}</span>,
//     },
//     {
//       name: 'Area',
//       selector: (row) => row.area,
//       sortable: true,
//     },
//     {
//       name: 'Logo',
//       cell: (row) => (
//         <img
//         src={`${import.meta.env.VITE_API_BASE_URL}/storage/${row.logo}`}
//           alt={`${row.name} logo`}
//           style={{ width: '50px', height: '50px', borderRadius: '50%' }}
//         />
//       ),
//       sortable: false,
//     },
//     {
//       name: 'Status',
//       selector: (row) => (row.status === 1 ? 'active' : 'inactive'),
//       sortable: true,
//       cell: (row) => {
//         const statusText = row.status === 1 ? 'active' : 'inactive';
//         return (
//           <span
//             className={`badge rounded-pill ${statusText === 'active' ? 'bg-success' : 'bg-danger'
//               }`}
//           >
//             {statusText}
//           </span>
//         );
//       },
//     },
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div className="d-flex">
//           <Button
//             variant="outline-success"
//             size="sm"
//             className="me-2"
//             onClick={() => handleEdit(row)}
//           >
//             <MdEdit />
//           </Button>
//           <Button
//             variant="outline-danger"
//             size="sm"
//             onClick={() => handleDelete(row.id)}
//           >
//             <MdDelete />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const handleDelete = async (userId) => {
//     try {
//       const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       // Check if the response indicates success
//       if (response.status === 200) {
//         toast.success('User deleted successfully');
//         setSupplier(suppliers.filter((user) => user.id !== userId));
//         setFilteredSupplier(filteredSuppliers.filter((user) => user.id !== userId));
//       } else {
//         throw new Error('Unexpected response status');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to delete user');
//     }
//   };

//   const handleEdit = (user) => {
//     setselectedSupplier(user);
//     setShowEditModal(true);
//   };
//   const handleUpdateUser = async () => {
//     try {
//       // Ensure the selectedSupplier is valid
//       if (!selectedSupplier || !selectedSupplier.id) {
//         toast.error('Invalid supplier selected for update!');
//         return;
//       }

//       // Perform the API call
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${selectedSupplier.id}`,
//         selectedSupplier,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Check the response status
//       if (response.status === 200) {
//         toast.success('Supplier updated successfully!');

//         // Update the suppliers list
//         setSupplier((prev) =>
//           prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup))
//         );

//         // Update the filtered suppliers list
//         setFilteredSupplier((prev) =>
//           prev.map((sup) => (sup.id === selectedSupplier.id ? selectedSupplier : sup))
//         );

//         // Close the modal
//         setShowEditModal(false);
//       } else {
//         throw new Error('Unexpected response status');
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//       toast.error('Error updating supplier!');
//     }
//   };

//   const handleAddUser = () => {
//     navigate('/add-Supplier');
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setselectedSupplier((prevUser) => ({
//       ...prevUser,
//       [name]: value
//     }));
//   };

//   const customStyles = {
//     header: {
//       style: {
//         backgroundColor: '#2E8B57',
//         color: '#fff',
//         fontSize: '18px',
//         fontWeight: 'bold',
//         padding: '15px',
//         borderRadius: '8px 8px 8px 8px',
//       },
//     },
//     rows: {
//       style: {
//         backgroundColor: '#f0fff4',
//         borderBottom: '1px solid #e0e0e0',
//         transition: 'background-color 0.3s ease',
//         '&:hover': {
//           backgroundColor: '#e6f4ea',
//           boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//         },
//       },
//     },
//     headCells: {
//       style: {
//         backgroundColor: '#20B2AA',
//         color: '#fff',
//         fontSize: '16px',
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         padding: '15px',
//       },
//     },
//     cells: {
//       style: {
//         fontSize: '14px',
//         color: '#333',
//         padding: '12px',
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: '#3f4d67',
//         color: '#fff',
//         borderRadius: '0 0 8px 8px',
//       },
//       pageButtonsStyle: {
//         backgroundColor: 'transparent',
//         color: '#fff',
//         '&:hover': {
//           backgroundColor: 'rgba(255,255,255,0.2)',
//         },
//       },
//     },
//   };

//   return (
//     <div className="container-fluid pt-4 " style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
//       <div className="row mb-3">
//         <div className="col-md-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             id='search'
//             value={searchQuery}
//             onChange={handleSearch}
//             className="pe-5 ps-2 py-2"
//             style={{ borderRadius: '5px' }}
//           />
//         </div>
//         <div className="col-md-8 text-end">
//           <Button variant="primary" onClick={handleAddUser}>
//             <MdPersonAdd className="me-2" /> Add User
//           </Button>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-12">
//           <div className="card shadow-lg border-0 rounded-lg">
//             {/* <div
//               className="card-header d-flex justify-content-between align-items-center"
//               style={{ backgroundColor: '#3f4d67', color: 'white' }}
//             >
//               <h2 className="m-0 text-white">Suppliers Management</h2>
//             </div> */}
//             <div className="card-body p-0" style={{ borderRadius: '8px' }}>
//               <DataTable
//                 columns={columns}
//                 data={filteredSuppliers}
//                 pagination
//                 highlightOnHover
//                 striped
//                 responsive
//                 customStyles={customStyles}
//                 defaultSortFieldId={1}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Edit User Modal */}
//       {showEditModal && (
//         <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
//           <Modal.Header closeButton style={{ backgroundColor: '#3f4d67' }}>
//             <Modal.Title className="text-white">Edit Supplier</Modal.Title>
//           </Modal.Header>
//           <Modal.Body style={{ backgroundColor: '#f0fff4' }}>
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>Supplier Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={selectedSupplier.name || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Supplier Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="code"
//                   value={selectedSupplier.code || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>GST Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="gst_no"
//                   value={selectedSupplier.gst_no || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>CIN Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="cin_no"
//                   value={selectedSupplier.cin_no || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>PAN Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="pan_no"
//                   value={selectedSupplier.pan_no || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>MSME Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="msme_no"
//                   value={selectedSupplier.msme_no || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Registered Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="reg_address"
//                   value={selectedSupplier.reg_address || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Work Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="work_address"
//                   value={selectedSupplier.work_address || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Phone Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="tel_no"
//                   value={selectedSupplier.tel_no || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Owner Mobile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="owner_mobile"
//                   value={selectedSupplier.owner_mobile || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   name="status"
//                   value={selectedSupplier.status || ''}
//                   onChange={handleChange}
//                   className="bg-white shadow-sm"
//                 >
//                   <option value={1}>Active</option>
//                   <option value={0}>Inactive</option>
//                 </Form.Select>
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer style={{ backgroundColor: '#f0fff4' }}>
//             <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//               Close
//             </Button>
//             <Button variant="success" onClick={handleUpdateUser}>
//               Update
//             </Button>
//           </Modal.Footer>
//         </Modal>

//       )}
//     </div>
//   );
// };

// export default SuppliersPage;

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
        `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${supplierId}`,
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
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier`, {
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

  const columns = [
    {
      name: 'Sr No',
      selector: (_, index) => index + 1,
      sortable: true
    },
    {
      name: 'Supplier Name',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true
    },
    {
      name: 'GST No',
      selector: (row) => row.gst_no,
      sortable: true
    },
    {
      name: 'CIN No',
      selector: (row) => row.cin_no,
      sortable: true
    },
    {
      name: 'PAN No',
      selector: (row) => row.pan_no,
      sortable: true
    },
    {
      name: 'MSME No',
      selector: (row) => row.msme_no,
      sortable: true
    },
    {
      name: 'Phone',
      selector: (row) => row.tel_no,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Owner Mobile',
      selector: (row) => row.owner_mobile,
      sortable: true
    },
    {
      name: 'Registered Address',
      selector: (row) => row.reg_address,
      sortable: true,
      cell: (row) => (
        <details>
          <summary style={{ cursor: 'pointer' }}>
            {row.reg_address.split('\n')[0]} {/* Show only the first line in truncated view */}
          </summary>
          <span>{row.reg_address.replace('\n', ', ')}</span> {/* Show full address when expanded */}
        </details>
      ),
      width: '150px'
    },
    {
      name: 'Work Address',
      selector: (row) => row.work_address,
      sortable: true,
      cell: (row) => (
        <details>
          <summary style={{ cursor: 'pointer'}}>
            {row.work_address.split('\n')[0]} {/* Show only the first line in truncated view */}
          </summary>
          <span>{row.work_address.replace('\n', ', ')}</span> {/* Show full address when expanded */}
        </details>
      ),
      width: '150px'

    },
    {
      name: 'Area',
      selector: (row) => row.area,
      sortable: true
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
      sortable: false
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
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/${supplierId}`, {
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

      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/${selectedSupplier.id}`, selectedSupplier, {
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
    navigate('/add-supplier');
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
    saveAs(blob, 'supplier_list.csv');
  };
  const exportToPDF = () => {
    const doc = new jsPDF('landscape');
    doc.text('Suppliers List', 20, 10);
    doc.autoTable({
      head: [
        [
          'Supplier Name',
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
          'Logo',
          'Status'
        ]
      ],
      body: filteredSuppliers.map((row) => [
        row.name,
        row.code,
        row.gst_no,
        row.cin_no,
        row.pan_no,
        row.msme_no,
        row.tel_no,
        row.email,
        row.owner_mobile,
        row.reg_address,
        row.work_address,
        row.area,
        row.logo,
        row.status === 1 ? 'Active' : 'Inactive'
      ])
    });
    doc.save('user_list.pdf');
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
            <MdPersonAdd className="me-2" /> Add Supplier
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
