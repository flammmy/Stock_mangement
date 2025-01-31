// import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { FaFileInvoice, FaCalendarAlt, FaUserPlus, FaMoneyBillWave, FaPercentage } from 'react-icons/fa';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import FormField from '../../components/FormField';

// const Invoice_out = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [shadeNo, setShadeNo] = useState([]);
//   const [invoice_no, SetInvoiceNo] = useState('');
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [formData, setFormData] = useState({
//     date: '',
//     s_no: '',
//     items: '',
//     code: '',
//     honey_comb: '',
//     length: '',
//     pcs: '',
//     boxes: '',
//     BUNDEL: '',
//     output: '',
//     out_products: []
//   });
//   const [isPcsAndBoxes, setIsPcsAndBoxes] = useState(true);

//   useEffect(() => {
//     const fetchShadeNo = async () => {
//       try {

//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/warehouse/accessory`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         setShadeNo(response.data.data);
//       } catch (error) {
//         console.error('Error fetching shade numbers:', error);
//         toast.error('Failed to load warehouse accessories.');
//       }
//     };

//     fetchShadeNo();
//   }, []);

//   useEffect(() => {
//     const fetchInvoiceNo = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stockout/invoiceno`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
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
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/godowncheckout/${selectedProductId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         setLoading(false);
//         setProducts(response.data.data);
//       } catch (error) {
//         setLoading(false);
//         console.error('Error fetching product data:', error);
//       }
//     } else {
//       setProducts([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedRows((prevSelected) => {
//       const isAlreadySelected = prevSelected.some((row) => row.stock_available_id === id);
//       const selectedProduct = products.find((p) => p.stock_available_id === id);
//       if (!selectedProduct) return prevSelected;

//       const updatedSelectedRows = isAlreadySelected
//         ? prevSelected.filter((row) => row.stock_available_id !== id)
//         : [...prevSelected, selectedProduct];

//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         out_products: updatedSelectedRows
//       }));

//       return updatedSelectedRows;
//     });
//   };

//   const handleToggleChange = () => {
//     setIsPcsAndBoxes(!isPcsAndBoxes);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/warehouse/accessory`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       toast.success('Warehouse accessory added successfully.');
//       navigate('/all-invoices-out');
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Error adding accessory';
//       toast.error(errorMessage);
//     }
//   };

//   const columns = [
//     { id: 'product_category_id', label: 'Category ID' },
//     { id: 'accessory_name', label: 'Accessory Name' }
//   ];

//   return (
//     <Container fluid className="pt-1 px-2" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
//       <Row className="justify-content-center">
//         <Col md={12} lg={12}>
//           <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
//             <div
//               className="p-4 text-white text-center"
//               style={{ backgroundColor: '#20B2AA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//             >
//               <FaUserPlus size={40} className="me-3" />
//               <h2 className="m-0 text-white">Add Warehouse Accessories</h2>
//             </div>
//             <Card.Body className="p-5">
//               <Form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <Form.Check
//                     type="switch"
//                     id="togglePcsAndBoxes"
//                     label="Switch between Pcs/Boxes and Length/BUNDEL"
//                     checked={isPcsAndBoxes}
//                     onChange={handleToggleChange}
//                   />
//                 </div>
//                 <Row>
//                   <Col md={4}>
//                     <FormField
//                       icon={FaCalendarAlt}
//                       label="Date"
//                       type="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleChange}
//                       required
//                     />
//                     <FormField icon={FaFileInvoice} label="S.No" name="s_no" value={formData.s_no} onChange={handleChange} required />
//                     <FormField icon={FaFileInvoice} label="Items" name="items" value={formData.items} onChange={handleChange} required />
//                   </Col>
//                   <Col md={4}>
//                     <FormField
//                       icon={FaFileInvoice}
//                       label="Honey Comb"
//                       name="honey_comb"
//                       value={formData.honey_comb}
//                       onChange={handleChange}
//                       required
//                     />
//                     {/* Conditionally rendering based on toggle */}
//                     {isPcsAndBoxes ? (
//                       <>
//                         <FormField icon={FaFileInvoice} label="Pcs" name="pcs" value={formData.pcs} onChange={handleChange} required />
//                         <FormField
//                           icon={FaFileInvoice}
//                           label="Boxes"
//                           name="boxes"
//                           value={formData.boxes}
//                           onChange={handleChange}
//                           required
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <FormField
//                           icon={FaFileInvoice}
//                           label="Length"
//                           name="length"
//                           value={formData.length}
//                           onChange={handleChange}
//                           required
//                         />
//                         <FormField
//                           icon={FaFileInvoice}
//                           label="BUNDEL"
//                           name="BUNDEL"
//                           value={formData.BUNDEL}
//                           onChange={handleChange}
//                           required
//                         />
//                       </>
//                     )}
//                   </Col>
//                   <Col md={4}>
//                     <FormField icon={FaFileInvoice} label="Output" name="output" value={formData.output} onChange={handleChange} required />
//                     <FormField icon={FaFileInvoice} label="Code" name="code" value={formData.code} onChange={handleChange} required />
//                   </Col>
//                 </Row>
//                 <hr />
//                 <div>
//                   <div className="d-flex align-items-center gap-3 mb-3">
//                     <label htmlFor="shadeNo" className="form-label mb-0 fw-medium">
//                       Select Product Accessory
//                     </label>
//                     <Form.Control
//                       as="select"
//                       id="shadeNo"
//                       className="form-select px-2"
//                       style={{ width: '8rem', minWidth: 'fit-content' }}
//                       onChange={handleShadeNoChange}
//                     >
//                       <option value="">Select</option>
//                       {shadeNo.map((shade) => (
//                         <option key={shade.id} value={shade.id} style={{ color: 'black' }}>
//                           {shade.product_shade}
//                         </option>
//                       ))}
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
//                         <div className="d-flex gap-3 justify-content-end mt-4">
//                           <Button variant="danger" type="reset">
//                             Clear
//                           </Button>
//                           <Button variant="success" type="submit">
//                             Save
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Invoice_out;

// import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { FaFileInvoice, FaCalendarAlt, FaUserPlus, FaMoneyBillWave, FaPercentage } from 'react-icons/fa';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import FormField from '../../components/FormField';

// const Invoice_out = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [shadeNo, setShadeNo] = useState([]);
//   const [accessory, setAccessory] = useState([]);
//   const [invoice_no, SetInvoiceNo] = useState('');
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [formData, setFormData] = useState({
//     date: '',
//     s_no: '',
//     items: '',
//     code: '',
//     honey_comb: '',
//     length: '',
//     pcs: '',
//     boxes: '',
//     BUNDEL: '',
//     output: '',
//     out_products: []
//   });
//   const [isPcsAndBoxes, setIsPcsAndBoxes] = useState(true);

//   useEffect(() => {
//     const fetchShadeNo = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/warehouse/accessory`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         console.log('Response Data: ', response.data); // Log the response
//         setShadeNo(response.data.data); // Assuming the data is in response.data.data
//       } catch (error) {
//         console.error('Error fetching shade numbers:', error);
//         toast.error('Failed to load warehouse accessories.');
//       }
//     };

//     fetchShadeNo();
//   }, []);

//   useEffect(() => {
//     const fetchInvoiceNo = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stockout/invoiceno`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
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
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/godowncheckout/${selectedProductId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         setLoading(false);
//         setProducts(response.data.data);
//       } catch (error) {
//         setLoading(false);
//         console.error('Error fetching product data:', error);
//       }
//     } else {
//       setProducts([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedRows((prevSelected) => {
//       const isAlreadySelected = prevSelected.some((row) => row.stock_available_id === id);
//       const selectedProduct = products.find((p) => p.stock_available_id === id);
//       if (!selectedProduct) return prevSelected;

//       const updatedSelectedRows = isAlreadySelected
//         ? prevSelected.filter((row) => row.stock_available_id !== id)
//         : [...prevSelected, selectedProduct];

//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         out_products: updatedSelectedRows
//       }));

//       return updatedSelectedRows;
//     });
//   };

//   const handleToggleChange = () => {
//     setIsPcsAndBoxes(!isPcsAndBoxes);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/warehouse/accessory`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setAccessory(response.data.data);
//       toast.success('Warehouse accessory added successfully.');
//       navigate('/all-invoices-out');
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Error adding accessory';
//       toast.error(errorMessage);
//     }
//   };

//   const columns = [
//     { id: 'product_category_id', label: 'Category ID' },
//     { id: 'accessory_name', label: 'Accessory Name' }
//   ];

//   return (
//     <Container fluid className="pt-1 px-2" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
//       <Row className="justify-content-center">
//         <Col md={12} lg={12}>
//           <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
//             <div
//               className="p-4 text-white text-center"
//               style={{ backgroundColor: '#20B2AA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//             >
//               <FaUserPlus size={40} className="me-3" />
//               <h2 className="m-0 text-white">Add Warehouse Accessories</h2>
//             </div>
//             <Card.Body className="p-5">
//               <Form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <Form.Check
//                     type="switch"
//                     id="togglePcsAndBoxes"
//                     label="Switch between Pcs/Boxes and Length/BUNDEL"
//                     checked={isPcsAndBoxes}
//                     onChange={handleToggleChange}
//                   />
//                 </div>
//                 <Row>
//                   <Col md={4}>
//                     <FormField
//                       icon={FaCalendarAlt}
//                       label="Date"
//                       type="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleChange}
//                       required
//                     />
//                     <FormField icon={FaFileInvoice} label="S.No" name="s_no" value={formData.s_no} onChange={handleChange} required />
//                     <FormField icon={FaFileInvoice} label="Items" name="items" value={formData.items} onChange={handleChange} required />
//                   </Col>
//                   <Col md={4}>
//                     <FormField
//                       icon={FaFileInvoice}
//                       label="Honey Comb"
//                       name="honey_comb"
//                       value={formData.honey_comb}
//                       onChange={handleChange}
//                       required
//                     />
//                     {/* Conditionally rendering based on toggle */}
//                     {isPcsAndBoxes ? (
//                       <>
//                         <FormField icon={FaFileInvoice} label="Pcs" name="pcs" value={formData.pcs} onChange={handleChange} required />
//                         <FormField
//                           icon={FaFileInvoice}
//                           label="Boxes"
//                           name="boxes"
//                           value={formData.boxes}
//                           onChange={handleChange}
//                           required
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <FormField
//                           icon={FaFileInvoice}
//                           label="Length"
//                           name="length"
//                           value={formData.length}
//                           onChange={handleChange}
//                           required
//                         />
//                         <FormField
//                           icon={FaFileInvoice}
//                           label="BUNDEL"
//                           name="BUNDEL"
//                           value={formData.BUNDEL}
//                           onChange={handleChange}
//                           required
//                         />
//                       </>
//                     )}
//                   </Col>
//                   <Col md={4}>
//                     <FormField icon={FaFileInvoice} label="Output" name="output" value={formData.output} onChange={handleChange} required />
//                     <FormField icon={FaFileInvoice} label="Code" name="code" value={formData.code} onChange={handleChange} required />
//                   </Col>
//                 </Row>
//                 <hr />
//                 <div>
//                   <div className="d-flex align-items-center gap-3 mb-3">
//                     <label htmlFor="shadeNo" className="form-label mb-0 fw-medium">
//                       Select Product Accessory
//                     </label>
//                     <Form.Control
//                       as="select"
//                       id="shadeNo"
//                       className="form-select px-2"
//                       style={{ width: '8rem', minWidth: 'fit-content' }}
//                       onChange={handleShadeNoChange}
//                     >
//                       <option value="">Select</option>
//                       {accessory && accessory.length > 0 ? (
//                         accessory.map((accessoryItem) => (
//                           <option key={accessoryItem.accessory.id} value={accessoryItem.accessory.id} style={{ color: 'black' }}>
//                             {accessoryItem.accessory.accessory_name}
//                           </option>
//                         ))
//                       ) : (
//                         <option>No accessory available</option>
//                       )}
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
//                         <div className="d-flex gap-3 justify-content-end mt-4">
//                           <Button variant="danger" type="reset">
//                             Clear
//                           </Button>
//                           <Button variant="success" type="submit">
//                             Save
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Invoice_out;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus, FaTrash, FaUserPlus, FaFileExcel, FaUpload, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const { id, no } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([
    {
      invoice_no: no,
      lot_no: '',
      product_id: '',
      width: '',
      length: '',
      rack: '',
      warehouse: '',
      unit: '',
      type: '',
      qty: 1,
    }
  ]);
  const [allProducts, setAllProducts] = useState([]);
  const mainColor = '#3f4d67';

  // Fetch all products for dropdown
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/warehouse/accessory`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAllProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);

  // Add a new row
  const handleAddRow = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        invoice_no: no,
        lot_no: '',
        product_id: '',
        purchase_shadeNo: '',
        width: '',
        length: '',
        rack: '',
        warehouse: '',
        unit: '',
        type: '',
        qty: 1
      }
    ]);
  };

  // Delete a row
  const handleDeleteRow = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Handle changes to row fields
  const handleRowChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (field === 'product_id') {
        const selectedProduct = allProducts.find((product) => product.id === parseInt(value));
        if (selectedProduct) {
          updatedItems[index].product_id = value;
          updatedItems[index].purchase_shadeNo = selectedProduct.purchase_shade_no;
        }
      } else {
        updatedItems[index][field] = value;
      }
      return updatedItems;
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (!['xls', 'xlsx'].includes(fileExtension)) {
        toast.error('Unsupported file format. Please upload an .xls or .xlsx file.');
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('csv_file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/stocks/import-csv`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        toast.success('Stock added successfully');
        setFile(null);
        navigate('/stocks');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || 'Error adding stock';
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = items.map((item) => ({
      ...item,
      invoice_id: id,
      invoice_no: no
    }));

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/warehouse/accessory`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Stock added successfully');
      navigate('/stocks');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding stock';
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stocks/download-excel`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'stocks.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
      toast.error('Error downloading the file');
    }
  };

  return (
    <Container fluid className="pt-4 px-2" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <Row className="justify-content-center">
        <Col md={12} lg={12} className="position-relative">
          <h2 className="text-center mb-4">Invoice Items</h2>
          <div className="card shadow border-0 rounded-lg mb-4" style={{ borderRadius: '10px', marginInline: '10rem' }}>
            <div className="card-body p-4" style={{ borderRadius: '8px' }}>
              <div className="d-flex flex-column align-items-center">
                <form onSubmit={handleFileUpload} encType="multipart/form-data">
                  <div className="mb-3 w-100">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <label htmlFor="excel" className="form-label text-secondary" style={{ fontSize: '0.9rem' }}>
                          Choose file
                        </label>
                      </div>
                      <div>
                        <h4 className="text-center mb-4 d-flex align-items-center gap-2">
                          <FaFileExcel />
                          <a href="/StockIN.csv" download>
                            <FaDownload className="text-success" style={{ cursor: 'pointer' }} />
                          </a>
                        </h4>
                      </div>
                    </div>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        name="excel"
                        id="excel"
                        onChange={handleFileChange}
                        style={{ fontSize: '0.9rem' }}
                      />
                      <button
                        type="submit"
                        className="btn btn-success d-flex align-items-center gap-2"
                        style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem' }}
                      >
                        <FaUpload />
                        Upload
                      </button>
                    </div>
                    <small className="form-text text-muted" style={{ fontSize: '0.8rem' }}>
                      Supported formats: .xls, .xlsx
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Col>
        <h4 className="text-center font-weight-bold">or</h4>
        <Col md={12} lg={12} className="absolute mt-3">
          <div className="card shadow-lg border-0 rounded-lg" style={{ borderRadius: '10px' }}>
            <div className="card-body p-5" style={{ borderRadius: '8px' }}>
              <h3 className="text-center mb-4 gap-2">Add Manually</h3>
              <Button variant="success" onClick={handleAddRow} className="px-1 py-1 ms-auto d-block">
                <FaPlus /> Add Item
              </Button>
              <form onSubmit={handleSubmit}>
                <div style={{ overflowX: 'auto' }}>
                  <Table bordered hover responsive style={{ minWidth: '1500px' }}>
                    <thead>
                      <tr className="text-white text-center">
                        <th style={{ width: '150px' }}>Invoice No</th>
                        <th style={{ width: '150px' }}>Shade No</th>
                        <th style={{ width: '120px' }}>Pur. Shade No</th>
                        <th style={{ width: '100px' }}>LOT No</th>
                        <th style={{ width: '100px' }}>Width</th>
                        <th style={{ width: '100px' }}>Length</th>
                        <th style={{ width: '150px' }}>Unit</th>
                        <th style={{ width: '170px' }}>Type</th>
                        <th style={{ width: '90px' }}>Rack</th>
                        <th style={{ width: '190px' }}>Warehouse</th>
                        <th style={{ width: '80px' }}>Quantity</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td>
                            <Form.Control type="text" value={no} disabled style={{ fontSize: '0.9rem', height: '3rem' }} />
                          </td>
                          <td>
                            <Form.Control
                              as="select"
                              value={item.product_id}
                              onChange={(e) => handleRowChange(index, 'product_id', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            >
                              <option value="">Select Shade No.</option>
                              {allProducts.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.shadeNo}
                                </option>
                              ))}
                            </Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={item.purchase_shadeNo}
                              disabled
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={item.lot_no}
                              onChange={(e) => handleRowChange(index, 'lot_no', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={item.width}
                              onChange={(e) => handleRowChange(index, 'width', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={item.length}
                              onChange={(e) => handleRowChange(index, 'length', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              as="select"
                              value={item.unit}
                              onChange={(e) => handleRowChange(index, 'unit', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            >
                              <option value="">Select Unit</option>
                              <option value="meter">Meter</option>
                              <option value="millimeter">Millimeter</option>
                            </Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              as="select"
                              value={item.type}
                              onChange={(e) => handleRowChange(index, 'type', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            >
                              <option value="">Select Type</option>
                              <option value="roll">Roll</option>
                              <option value="box">Box</option>
                            </Form.Control>
                          </td>
                          
                          <td>
                            <Form.Control
                              type="text"
                              value={item.rack}
                              onChange={(e) => handleRowChange(index, 'rack', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              as="select"
                              value={item.warehouse}
                              onChange={(e) => handleRowChange(index, 'warehouse', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            >
                              <option value="">Select Warehouse</option>
                              <option value="Dwarka">Dwarka</option>
                              <option value="Gujarat">Gujarat</option>
                            </Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={item.qty}
                              onChange={(e) => handleRowChange(index, 'qty', e.target.value)}
                              style={{ fontSize: '0.9rem', height: '3rem' }}
                            />
                          </td>
                          <td>
                            <Button variant="danger" onClick={() => handleDeleteRow(index)} style={{ fontSize: '0.8rem', height: '2rem' }}>
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
                  <FaUserPlus className="me-2" /> Add Stock
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
