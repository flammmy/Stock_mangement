// import React, { useState } from 'react';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const AddQuatation = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         gst_no: '',
//         cin_no: '',
//         pan_no: '',
//         msme_no: '',
//         reg_address: '',
//         work_address: '',
//         area: '',
//         tel_no: '',
//         email: '',
//         owner_mobile: '',
//         logo: null,
//         date: '',
//         serial_no: '',
//         shade_no: '',
//         vendor_code: '',
//         operator: '',
//         roll_no: '',
//         lot_no: '',
//         sft: '',
//         rate: '',
//         length: '',
//         width: '',
//         units: '',
//         payment_acc: '',
//         price_rate: '',
//         gst_optional: '',
//         total: '',
//         remarks: '',
//     });

//     const [previewImage, setPreviewImage] = useState(null);
//     const navigate = useNavigate();

//     // Handle text inputs
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle file input (logo)
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData({ ...formData, logo: file });
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const submitData = new FormData();
//         Object.keys(formData).forEach((key) => {
//             submitData.append(key, formData[key]);
//         });

//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/supplier`,
//                 submitData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );
//             navigate('/supplier');
//             toast.success('Supplier added successfully');
//         } catch (error) {
//             console.error('Error adding supplier:', error);
//             toast.error('Error adding supplier');
//         }
//     };

//     return (
//         <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
//             <Row className="justify-content-center">
//                 <Col md={12} lg={12}>
//                     <Card
//                         className="shadow-lg border-0"
//                         style={{
//                             borderRadius: '15px',
//                             overflow: 'hidden',
//                         }}
//                     >
//                         <div
//                             className="p-4 text-white text-center"
//                             style={{
//                                 backgroundColor: '#20B2AA',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <h2 className="m-0 text-white">Add Quatation</h2>
//                         </div>
//                         <Card.Body className="p-5">
//                             <Form onSubmit={handleSubmit}>
//                                 <Row>
//                                     {/* Column 1 */}
//                                     <Col md={6}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Supplier Name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="name"
//                                                 value={formData.name}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>GST Number</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="gst_no"
//                                                 value={formData.gst_no}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>CIN Number</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="cin_no"
//                                                 value={formData.cin_no}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>PAN Number</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="pan_no"
//                                                 value={formData.pan_no}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Telephone Number</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="tel_no"
//                                                 value={formData.tel_no}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Logo</Form.Label>
//                                             <Form.Control
//                                                 type="file"
//                                                 name="logo"
//                                                 onChange={handleFileChange}
//                                             />
//                                         </Form.Group>
//                                         {previewImage && (
//                                             <div className="mb-3">
//                                                 {/* <img
//                                                     src={previewImage}
//                                                     alt="Logo Preview"
//                                                     style={{ maxWidth: '100%', height: 'auto' }}
//                                                 /> */}
//                                             </div>
//                                         )}
//                                     </Col>

//                                     {/* Column 2 */}
//                                     <Col md={6}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Date</Form.Label>
//                                             <Form.Control
//                                                 type="date"
//                                                 name="date"
//                                                 value={formData.date}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Client Name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="name"
//                                                 value={formData.name}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Shade Number</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="shade_no"
//                                                 value={formData.shade_no}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Vendor Code / GST</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="vendor_code"
//                                                 value={formData.vendor_code}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Remarks</Form.Label>
//                                             <Form.Control
//                                                 as="textarea"
//                                                 rows={3}
//                                                 name="remarks"
//                                                 value={formData.remarks}
//                                                 onChange={handleChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Button variant="primary" type="submit">Add Quotation</Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default AddQuatation;


import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AddQuotation = () => {
  const [formData, setFormData] = useState({
    name: '',
    gst_no: '',
    cin_no: '',
    pan_no: '',
    msme_no: '',
    reg_address: '',
    work_address: '',
    area: '',
    tel_no: '',
    email: '',
    owner_mobile: '',
    logo: null,
    date: '',
    serial_no: '',
    shade_no: '',
    vendor_code: '',
    operator: '',
    roll_no: '',
    lot_no: '',
    sft: '',
    rate: '',
    length: '',
    lengthUnit: 'meter', // Default value for length unit
    width: '',
    widthUnit: 'meter', // Default value for width unit
    units: '',
    payment_acc: '',
    price_rate: '',
    gst: '',
    total: '',
    remarks: ''
  });

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input (logo)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate required fields
  const validateForm = () => {
    const requiredFields = ['date', 'client_name', 'operator', 'length', 'width', 'sft'];
    let validationErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validationErrors[field] = `${field.replace('_', ' ')} is required.`;
        isValid = false;
      }
    });

    setErrors(validationErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/stockout`, // API URL
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      navigate('/quotations'); // Redirect after successful addition
      toast.success('Quotation added successfully');
    } catch (error) {
      console.error('Error adding quotation:', error);
      toast.error('Error adding quotation');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = [
      {
        'Supplier Name': formData.name,
        'GST Number': formData.gst_no,
        'CIN Number': formData.cin_no,
        'PAN Number': formData.pan_no,
        'Telephone Number': formData.tel_no,
        Date: formData.date,
        'Client Name': formData.client_name,
        'Operator Name': formData.operator,
        Length: formData.length,
        'Length Unit': formData.lengthUnit,
        Width: formData.width,
        'Width Unit': formData.widthUnit,
        SFT: formData.sft,
        Remarks: formData.remarks
      }
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'quotation_data.csv');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Quotation Details', 20, 10);

    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Supplier Name', formData.name],
        ['GST Number', formData.gst_no],
        ['CIN Number', formData.cin_no],
        ['PAN Number', formData.pan_no],
        ['Telephone Number', formData.tel_no],
        ['Date', formData.date],
        ['Client Name', formData.client_name],
        ['Operator Name', formData.operator],
        ['Length', formData.length],
        ['Length Unit', formData.lengthUnit],
        ['Width', formData.width],
        ['Width Unit', formData.widthUnit],
        ['SFT', formData.sft],
        ['Remarks', formData.remarks]
      ]
    });

    doc.save('quotation_data.pdf');
  };

  return (
    <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-sm btn-info" onClick={exportToCSV}>
          Export as CSV
        </button>
        <button type="button" className="btn btn-sm btn-info" onClick={exportToPDF}>
          Export as PDF
        </button>
      </div>
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <div
              className="p-4 text-white text-center"
              style={{ backgroundColor: '#20B2AA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <h2 className="m-0 text-white">Add Quotation</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Column 1 */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Operator Name</Form.Label>
                      <Form.Control type="text" name="operator" value={formData.operator} onChange={handleChange} />
                      {errors.operator && <small className="text-danger">{errors.operator}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>GST Number</Form.Label>
                      <Form.Control type="text" name="gst_no" value={formData.gst_no} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>PAN Number</Form.Label>
                      <Form.Control type="text" name="pan_no" value={formData.pan_no} onChange={handleChange} />
                    </Form.Group>
                    {previewImage && <div className="mb-3"></div>}
                    <Form.Group className="mb-3">
                      <Form.Label>Length</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="text"
                          name="length"
                          value={formData.length}
                          onChange={handleChange}
                          placeholder="Enter length"
                        />
                        <Form.Select
                          name="lengthUnit"
                          value={formData.lengthUnit}
                          onChange={handleChange}
                          style={{ width: '150px', marginLeft: '10px' }}
                        >
                          <option value="meter">Meter</option>
                          <option value="cm">Centimeter</option>
                          <option value="sqft">Square Feet</option>
                          <option value="inches">Inches</option>
                        </Form.Select>
                      </div>
                      {errors.length && <small className="text-danger">{errors.length}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Width</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="text"
                          name="width"
                          value={formData.width}
                          onChange={handleChange}
                          placeholder="Enter width"
                        />
                        <Form.Select
                          name="widthUnit"
                          value={formData.widthUnit}
                          onChange={handleChange}
                          style={{ width: '150px', marginLeft: '10px' }}
                        >
                          <option value="meter">Meter</option>
                          <option value="cm">Centimeter</option>
                          <option value="sqft">Square Feet</option>
                          <option value="inches">Inches</option>
                        </Form.Select>
                      </div>
                      {errors.width && <small className="text-danger">{errors.width}</small>}
                    </Form.Group>
                  </Col>

                  {/* Column 2 */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                      {errors.date && <small className="text-danger">{errors.date}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>CIN Number</Form.Label>
                      <Form.Control type="text" name="cin_no" value={formData.cin_no} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control type="text" name="client_name" value={formData.client_name} onChange={handleChange} />
                      {errors.client_name && <small className="text-danger">{errors.client_name}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Supplier Name</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Telephone Number</Form.Label>
                      <Form.Control type="text" name="tel_no" value={formData.tel_no} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>SFT</Form.Label>
                      <Form.Control type="text" name="sft" value={formData.sft} onChange={handleChange} />
                      {errors.sft && <small className="text-danger">{errors.sft}</small>}
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Add Quotation
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuotation;
