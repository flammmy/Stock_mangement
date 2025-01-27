// import React, { useState, useEffect } from 'react';
// import { Table, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaUserPlus, FaTrash, FaPlus } from 'react-icons/fa';
// import Skeleton from 'react-loading-skeleton';
// import DataTable from 'react-data-table-component';
// import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
// import Swal from 'sweetalert2';

// import 'react-loading-skeleton/dist/skeleton.css';
// import {
//   FaFileInvoice,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaUsers,
//   FaKey,
//   FaMoneyBillWave,
//   FaPercentage,
//   FaTruck,
//   FaCity,
//   FaSignature,
//   FaQrcode
// } from 'react-icons/fa';
// import FormField from '../../components/FormField';

// const Invoice_out = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [items, setItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [sub_supervisors, setSub_supervisor] = useState([]);
//   const [shadeNo, setShadeNo] = useState([]);
//   const [invoice_no, SetInvoiceNo] = useState('');
//   const [selectedRows, setSelectedRows] = useState([]);
//   const today = new Date().toISOString().split('T')[0];
//   const warehouse_supervisor_id = JSON.parse(localStorage.getItem('user')).id || 'N/A';
//   const [formData, setFormData] = useState({
//     invoice_no: '',
//     date: today,
//     warehouse_supervisor_id: warehouse_supervisor_id,
//     godown_supervisor_id: '',
//     out_products: []
//   });

//   useEffect(() => {
//     const fetchShadeNo = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/available`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         setShadeNo(response.data.data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };
//     fetchShadeNo();
//   }, []);

//   useEffect(() => {
//     const fetchInvoiceNo = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/godown/invoiceno`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         console.log('log', response.data.data);
//         SetInvoiceNo(response.data.data);
//         setFormData((prevData) => ({
//           ...prevData,
//           invoice_no: response.data.data
//         }));
//       } catch (error) {
//         console.error('Error fetching Invoice No data:', error);
//       }
//     };
//     fetchInvoiceNo();
//   }, []);

//   const handleShadeNoChange = async (event) => {
//     setLoading(true);
//     const selectedProductId = event.target.value;

//     if (selectedProductId) {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/checkstocks/${selectedProductId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         setLoading(false);

//         console.log(response.data.data);
//         setProducts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     } else {
//       setProducts(null);
//     }
//   };

//   useEffect(() => {
//     const fetchReceiverData = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sub_supervisor`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         console.log(response.data.data);
//         setSub_supervisor(response.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchReceiverData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);

//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleInputChange = (id, field, value) => {
//     setSelectedRows((prevSelectedRows) => {
//       const updatedRows = prevSelectedRows.map((row) => {
//         if (row.stock_available_id === id) {
//           const updatedRow = { ...row, [field]: value };

//           if (field === 'out_length' || field === 'out_width' || field === 'unit') {
//             const lengthInFeet =
//               updatedRow.unit === 'meter'
//                 ? Number(updatedRow.out_length) * 3.28084
//                 : updatedRow.unit === 'inches'
//                   ? Number(updatedRow.out_length) / 12 // Convert inches to feet
//                   : Number(updatedRow.out_length);

//             const widthInFeet =
//               updatedRow.unit === 'meter'
//                 ? Number(updatedRow.out_width) * 3.28084
//                 : updatedRow.unit === 'inches'
//                   ? Number(updatedRow.out_width) / 12
//                   : Number(updatedRow.out_width);
//             updatedRow.area = Number(lengthInFeet * widthInFeet).toFixed(2);
//             console.log(updatedRow.area);
//           }
//           return updatedRow;
//         }
//         return row;
//       });

//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         out_products: updatedRows
//       }));

//       return updatedRows;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Confirmation before submission
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to submit the form?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, submit it!'
//     });

//     if (!result.isConfirmed) {
//       return; // Exit if user cancels
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/godown`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       // Success alert after successful submission
//       await Swal.fire({
//         title: 'Success!',
//         text: 'Stocks out successfully!',
//         icon: 'success',
//         confirmButtonColor: '#3085d6'
//       });

//       toast.success('Stocks out successfully');
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Error adding user';

//       // Error alert on failure
//       await Swal.fire({
//         title: 'Error!',
//         text: errorMessage,
//         icon: 'error',
//         confirmButtonColor: '#d33'
//       });

//       toast.error(errorMessage);
//     }

//     console.log(formData);
//   };

//   const columns = [
//     { id: 'product_shadeNo', label: 'Shade No' },
//     { id: 'product_purchase_shade_no', label: 'Pur. Shade No' },
//     { id: 'lot_no', label: 'LOT No' },
//     { id: 'stock_code', label: 'Stock Code' },
//     { id: 'out_width', label: 'Width' },
//     { id: 'out_length', label: 'Length' },
//     { id: 'unit', label: ' Unit' },
//     { id: 'area_sq_ft', label: 'Area(sqft)' },
//     { id: 'product_type', label: 'Type' }
//   ];

//   const handleCheckboxChange = (id) => {
//     setSelectedRows((prevSelected) => {
//       const isAlreadySelected = prevSelected.some((row) => row.stock_available_id === id);

//       const updatedSelectedRows = isAlreadySelected
//         ? prevSelected.filter((row) => row.stock_available_id !== id)
//         : [...prevSelected, products.find((p) => p.stock_available_id === id)];

//       console.log(updatedSelectedRows);
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         out_products: updatedSelectedRows
//       }));

//       return updatedSelectedRows;
//     });
//   };
//   console.log('data', formData.invoice_no);
//   const mainColor = '#3f4d67';
//   return (
//     <Container
//       fluid
//       className="pt-1 px-2"
//       style={{
//         border: '3px dashed #14ab7f',
//         borderRadius: '8px',
//         background: '#ff9d0014'
//       }}
//     >
//       <Row className="justify-content-center">
//         <Col md={12} lg={12}>
//           <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
//             <div
//               className="p-4 text-white text-center"
//               style={{
//                 backgroundColor: '#20B2AA',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               <FaUserPlus size={40} className="me-3" />
//               <h2 className="m-0 text-white">Generate GatePass For GoDown</h2>
//             </div>
//             <Card.Body className="p-5">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={4}>
//                     <FormField icon={FaFileInvoice} label="GatePass No" name="invoice_no" value={invoice_no} readOnly />
//                   </Col>
//                   <Col md={4}>
//                     <FormField icon={FaCalendarAlt} label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
//                   </Col>
//                   <Col md={4}>
//                     <FormField
//                       icon={FaUser}
//                       label="Godown Suppervisor"
//                       name="godown_supervisor_id"
//                       value={formData.sub_supervisor}
//                       onChange={handleChange}
//                       options={sub_supervisors}
//                     />
//                   </Col>
//                 </Row>
//                 <hr />

//                 <div>
//                   <div className="d-flex align-items-center gap-3 mb-3">
//                     <label htmlFor="shadeNo" className="form-label mb-0 fw-medium">
//                       Select Shade No
//                     </label>
//                     <Form.Control
//                       as="select"
//                       id="shadeNo"
//                       className="form-select px-2"
//                       style={{ width: '8rem', minWidth: 'fit-content' }}
//                       onChange={handleShadeNoChange}
//                     >
//                       <option value="">Select</option>

//                       {shadeNo.map((shade) => {
//                         return (
//                           <option key={shade.id} value={shade.id}>
//                             {shade.shadeNo}
//                           </option>
//                         );
//                       })}
//                     </Form.Control>
//                   </div>
//                   <div className="row">
//                     <div className="col-12">
//                       <div className="card rounded-lg shadow-none" style={{ background: '#f5f0e6' }}>
//                         {loading ? (
//                           <div>
//                             {[...Array(8)].map((_, index) => (
//                               <div key={index} style={{ display: 'flex', gap: '10px', padding: '10px' }}>
//                                 <Skeleton width={50} height={20} />
//                                 <Skeleton width={200} height={20} />
//                                 <Skeleton width={200} height={20} />
//                                 <Skeleton width={200} height={20} />
//                                 <Skeleton width={200} height={20} />
//                                 <Skeleton width={200} height={20} />
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="card-body p-0" style={{ borderRadius: '8px' }}>
//                             <div className="table-responsive">
//                               <table className="table table-hover table-bordered align-middle">
//                                 <thead className="table-dark">
//                                   <tr>
//                                     <th scope="col" style={{ width: '50px' }}>
//                                       <input type="checkbox" />
//                                     </th>
//                                     {columns.map((column) => (
//                                       <th key={column.id} scope="col">
//                                         {column.label}
//                                       </th>
//                                     ))}
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {products.map((row) => (
//                                     <tr key={row.stock_available_id}>
//                                       <td>
//                                         <input type="checkbox" onChange={() => handleCheckboxChange(row.stock_available_id)} />
//                                       </td>
//                                       {columns.map((column) => (
//                                         <td key={column.id}>{row[column.id]}</td>
//                                       ))}
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         )}
//                         {/* <div className="mt-3">
//                           <h4 className="ms-4 mb-3">Selected Rows:</h4>
//                         </div>
//                         <div className="card-body p-0" style={{ borderRadius: '8px' }}>
//                           <div className="table-responsive">
//                             <table className="table table-hover table-bordered align-middle">
//                               <thead className="table-dark">
//                                 <tr>
//                                   {columns.map((column) => (
//                                     <th key={column.id} scope="col">
//                                       {column.label}
//                                     </th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {selectedRows.map((row) => (
//                                   <tr key={row.stock_available_id}>
//                                     <td key="shadeNo">{row.product_shadeNo}</td>
//                                     <td key="pur_shadeNo">{row.product_shadeNo}</td>
//                                     <td key="lot_no">
//                                       <input
//                                         type="text"
//                                         value={row.lot_no || ''}
//                                         className="py-1"
//                                         onChange={(e) => handleInputChange(row.stock_available_id, 'lot_no', e.target.value)}
//                                       />
//                                     </td>
//                                     <td key="Stock Code">
//                                       <td key="pur_shadeNo">{row.stock_code}</td>
//                                     </td>
//                                     <td key="width">
//                                       <input
//                                         type="text"
//                                         max={Number(row.out_width)}
//                                         value={row.out_width || ''}
//                                         className="py-1"
//                                         onChange={(e) => handleInputChange(row.stock_available_id, 'out_width', e.target.value)}
//                                       />
//                                     </td>
//                                     <td key="length">
//                                       <input
//                                         type="text"
//                                         max={Number(row.out_length)}
//                                         value={row.out_length || ''}
//                                         className="py-1"
//                                         onChange={(e) => handleInputChange(row.stock_available_id, 'out_length', e.target.value)}
//                                       />
//                                     </td>
//                                     <td key="unit">
//                                       <select
//                                         className="form-control"
//                                         style={{ width: '5rem', paddingInline: '10px' }}
//                                         value={row.unit || ''}
//                                         onChange={(e) => handleInputChange(row.stock_available_id, 'unit', e.target.value)}
//                                       >
//                                         <option value="" disabled>
//                                           Select
//                                         </option>
//                                         <option value="meter">meter</option>
//                                         <option value="inches">inches</option>
//                                       </select>
//                                     </td>
//                                     <td key="area">
//                                       <input
//                                         type="text"
//                                         value={row.area || ''}
//                                         className="py-1"
//                                         onChange={(e) => handleInputChange(row.stock_available_id, 'area', e.target.value)}
//                                       />
//                                     </td>
//                                     <td key="type">
//                                       <select
//                                         className="form-control"
//                                         style={{ width: '5rem', paddingInline: '10px' }}
//                                         value={row.product_type || ''}
//                                         onChange={(e) => handleInputChange(row.stock_available_id, 'product_type', e.target.value)}
//                                       >
//                                         <option value="" disabled>
//                                           Select
//                                         </option>
//                                         <option value="roll">Roll</option>
//                                         <option value="box">Box</option>
//                                       </select>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div> */}
//                         <div className="mt-3">
//                           <h4 className="ms-4 mb-3">Selected Rows:</h4>
//                         </div>
//                         <div className="card-body p-0" style={{ borderRadius: '8px' }}>
//                           <div className="table-responsive">
//                             <table className="table table-hover table-bordered align-middle">
//                               <thead className="table-dark">
//                                 <tr>
//                                   {columns.map((column) => (
//                                     <th key={column.id} scope="col">
//                                       {column.label}
//                                     </th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {selectedRows.map((row) => (
//                                   <tr key={row.stock_available_id}>
//                                     <td>{row.product_shadeNo}</td>
//                                     <td>{row.product_purchase_shade_no}</td>
//                                     <td>{row.lot_no}</td>
//                                     <td>{row.stock_code}</td>
//                                     <td>{row.out_width}</td>
//                                     <td>{row.out_length}</td>
//                                     <td>{row.unit}</td>
//                                     <td>{row.area}</td>
//                                     <td>{row.product_type}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="mt-5 d-block m-auto"
//                   style={{
//                     backgroundColor: mainColor,
//                     borderColor: mainColor,
//                     width: '10rem'
//                   }}
//                 >
//                   <FaUserPlus className="me-2" /> Stock out
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Invoice_out;

import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserPlus, FaTrash, FaPlus } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import Swal from 'sweetalert2';

import 'react-loading-skeleton/dist/skeleton.css';
import {
  FaFileInvoice,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaKey,
  FaMoneyBillWave,
  FaPercentage,
  FaTruck,
  FaCity,
  FaSignature,
  FaQrcode
} from 'react-icons/fa';
import FormField from '../../components/FormField';

const Invoice_out = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sub_supervisors, setSub_supervisor] = useState([]);
  const [shadeNo, setShadeNo] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [invoice_no, SetInvoiceNo] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const warehouse_supervisor_id = JSON.parse(localStorage.getItem('user')).id || 'N/A';
  const [formData, setFormData] = useState({
    invoice_no: '',
    date: today,
    warehouse_supervisor_id: warehouse_supervisor_id,
    godown_supervisor_id: '',
    out_products: []
  });


  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(
          'https://demo2.techsseract.com/stocks/api/products/category/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Fetched Accessories:', response.data);
        setAccessories(response.data.data || []);
      } catch (error) {
        console.error('Error fetching accessories data:', error.response || error.message);
        toast.error(`Failed to fetch accessories data: ${error.response?.data?.message || error.message}`);
      }
    };
  
    fetchAccessories();
  }, []);
  
  const fetchShadeNo = async (accessoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://demo2.techsseract.com/stocks/api/gatepass/shadeno/${accessoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Fetched Shade Numbers:', response.data);
      setShadeNo(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shade numbers:', error);
      setLoading(false);
    }
  };
  
  

  const handleAccessoryChange = (event) => {
    const accessoryId = event.target.value;
    console.log('Selected Accessory ID:', accessoryId);  // Log the selected accessory ID
  
    setSelectedAccessory(accessoryId);  // Assuming you are updating a state for the selected accessory
  
    if (accessoryId) {
      fetchShadeNo(accessoryId);  // Call function to fetch shade numbers
    } else {
      setShadeNo([]);  // Clear shade numbers if no accessory is selected
    }
  };
  

  const handleShadeNoChange = async (event) => {
    const selectedProductId = event.target.value;
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/checkstocks/${selectedProductId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };







  
  useEffect(() => {
    const fetchInvoiceNo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/godown/invoiceno`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('log', response.data.data);
        SetInvoiceNo(response.data.data);
        setFormData((prevData) => ({
          ...prevData,
          invoice_no: response.data.data
        }));
      } catch (error) {
        console.error('Error fetching Invoice No data:', error);
      }
    };
    fetchInvoiceNo();
  }, []);

  useEffect(() => {
    const fetchReceiverData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sub_supervisor`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data.data);
        setSub_supervisor(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReceiverData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (id, field, value) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedRows = prevSelectedRows.map((row) => {
        if (row.stock_available_id === id) {
          const updatedRow = { ...row, [field]: value };

          if (field === 'out_length' || field === 'out_width' || field === 'unit') {
            const lengthInFeet =
              updatedRow.unit === 'meter'
                ? Number(updatedRow.out_length) * 3.28084
                : updatedRow.unit === 'inches'
                  ? Number(updatedRow.out_length) / 12 // Convert inches to feet
                  : Number(updatedRow.out_length);

            const widthInFeet =
              updatedRow.unit === 'meter'
                ? Number(updatedRow.out_width) * 3.28084
                : updatedRow.unit === 'inches'
                  ? Number(updatedRow.out_width) / 12
                  : Number(updatedRow.out_width);
            updatedRow.area = Number(lengthInFeet * widthInFeet).toFixed(2);
            console.log(updatedRow.area);
          }
          return updatedRow;
        }
        return row;
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        out_products: updatedRows
      }));

      return updatedRows;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation before submission
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    });

    if (!result.isConfirmed) {
      return; // Exit if user cancels
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/godown`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Success alert after successful submission
      await Swal.fire({
        title: 'Success!',
        text: 'Stocks out successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });

      toast.success('Stocks out successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding user';

      // Error alert on failure
      await Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33'
      });

      toast.error(errorMessage);
    }

    console.log(formData);
  };

  const columns = [
    { id: 'product_shadeNo', label: 'Shade No' },
    { id: 'product_purchase_shade_no', label: 'Pur. Shade No' },
    { id: 'lot_no', label: 'LOT No' },
    { id: 'stock_code', label: 'Stock Code' },
    { id: 'out_width', label: 'Width' },
    { id: 'out_length', label: 'Length' },
    { id: 'unit', label: ' Unit' },
    { id: 'area_sq_ft', label: 'Area(sqft)' },
    { id: 'product_type', label: 'Type' }
  ];

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      const isAlreadySelected = prevSelected.some((row) => row.stock_available_id === id);

      const updatedSelectedRows = isAlreadySelected
        ? prevSelected.filter((row) => row.stock_available_id !== id)
        : [...prevSelected, products.find((p) => p.stock_available_id === id)];

      console.log(updatedSelectedRows);
      setFormData((prevFormData) => ({
        ...prevFormData,
        out_products: updatedSelectedRows
      }));

      return updatedSelectedRows;
    });
  };
  console.log('data', formData.invoice_no);
  const mainColor = '#3f4d67';
  return (
    <Container
      fluid
      className="pt-1 px-2"
      style={{
        border: '3px dashed #14ab7f',
        borderRadius: '8px',
        background: '#ff9d0014'
      }}
    >
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div
              className="p-4 text-white text-center"
              style={{
                backgroundColor: '#20B2AA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaUserPlus size={40} className="me-3" />
              <h2 className="m-0 text-white">Generate GatePass For GoDown</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <FormField icon={FaFileInvoice} label="GatePass No" name="invoice_no" value={invoice_no} readOnly />
                  </Col>
                  <Col md={4}>
                    <FormField icon={FaCalendarAlt} label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
                  </Col>
                  <Col md={4}>
                    <FormField
                      icon={FaUser}
                      label="Godown Suppervisor"
                      name="godown_supervisor_id"
                      value={formData.sub_supervisor}
                      onChange={handleChange}
                      options={sub_supervisors}
                    />
                  </Col>
                </Row>
                <hr />

                <div>
                  <div className="d-flex align-items-center gap-4 mb-3">
                    <div style={{ flex: 1 }}>
                      <Form.Label>Select Accessories</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={handleAccessoryChange}
                        className="form-select px-2"
                        style={{ width: '13rem', minWidth: 'fit-content' }}
                      >
                        <option value="">Select</option>
                        {accessories.map((accessory) => (
                          <option key={accessory.id} value={accessory.id}>
                            {accessory.name}
                          </option>
                        ))}
                      </Form.Control>
                    </div>

                    <div className="d-flex align-items-center gap-3" style={{ flex: 1 }}>
                      <label htmlFor="shadeNo" className="form-label mb-0 fw-medium">
                        Select Shade No
                      </label>
                      <Form.Control
                        as="select"
                        id="shadeNo"
                        className="form-select px-2"
                        style={{ width: '13rem', minWidth: 'fit-content' }}
                        onChange={handleShadeNoChange}
                      >
                        <option value="">Select</option>
                        {shadeNo.map((shade) => (
                          <option key={shade.id} value={shade.id}>
                            {shade.shadeNo}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="card rounded-lg shadow-none" style={{ background: '#f5f0e6' }}>
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
                            <div className="table-responsive">
                              <table className="table table-hover table-bordered align-middle">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col" style={{ width: '50px' }}>
                                      <input type="checkbox" />
                                    </th>
                                    {columns.map((column) => (
                                      <th key={column.id} scope="col">
                                        {column.label}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {products.map((row) => (
                                    <tr key={row.stock_available_id}>
                                      <td>
                                        <input type="checkbox" onChange={() => handleCheckboxChange(row.stock_available_id)} />
                                      </td>
                                      {columns.map((column) => (
                                        <td key={column.id}>{row[column.id]}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        <div className="mt-3">
                          <h4 className="ms-4 mb-3">Selected Rows:</h4>
                        </div>
                        <div className="card-body p-0" style={{ borderRadius: '8px' }}>
                          <div className="table-responsive">
                            <table className="table table-hover table-bordered align-middle">
                              <thead className="table-dark">
                                <tr>
                                  {columns.map((column) => (
                                    <th key={column.id} scope="col">
                                      {column.label}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {selectedRows.map((row) => (
                                  <tr key={row.stock_available_id}>
                                    <td>{row.product_shadeNo}</td>
                                    <td>{row.product_purchase_shade_no}</td>
                                    <td>{row.lot_no}</td>
                                    <td>{row.stock_code}</td>
                                    <td>{row.out_width}</td>
                                    <td>{row.out_length}</td>
                                    <td>{row.unit}</td>
                                    <td>{row.area}</td>
                                    <td>{row.product_type}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-5 d-block m-auto"
                  style={{
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                    width: '10rem'
                  }}
                >
                  <FaUserPlus className="me-2" /> Stock out
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Invoice_out;
