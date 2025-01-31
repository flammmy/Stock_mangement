// import React, { useState, useMemo } from 'react';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import FormField from '../../components/FormField';

// import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaUserPlus, FaImage } from 'react-icons/fa';

// const AddSupplier = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     gst_no: '',
//     cin_no: '',
//     pan_no: '',
//     msme_no: '',
//     reg_address: '',
//     work_address: ''
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a FormData object for file upload
//     const submitData = new FormData();
//     submitData.append('name', formData.name);
//     submitData.append('gst_no', formData.gst_no);
//     submitData.append('cin_no', formData.cin_no);
//     submitData.append('pan_no', formData.pan_no);
//     submitData.append('msme_no', formData.msme_no);
//     submitData.append('reg_address', formData.reg_address);
//     submitData.append('work_address', formData.work_address);
//     submitData.append('area', formData.area);
//     submitData.append('tel_no', formData.tel_no);
//     submitData.append('email', formData.email);
//     submitData.append('owner_mobile', formData.owner_mobile);
//     // Append logo if it exists
//     if (formData.logo) {
//       submitData.append('logo', formData.logo);
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/supplier`, submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       navigate('/supplier');
//       toast.success('Supplier added successfully');
//     } catch (error) {
//       console.error('Error adding supplier:', error);
//       toast.error('Error adding supplier');
//     }
//   };

//   const mainColor = '#3f4d67';

//   return (
//     <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
//       <Row className="justify-content-center">
//         <Col md={12} lg={12}>
//           <Card
//             className="shadow-lg border-0"
//             style={{
//               borderRadius: '15px',
//               overflow: 'hidden'
//             }}
//           >
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
//               <h2 className="m-0 text-white">Add New Accessories</h2>
//             </div>
//             <Card.Body
//               className="p-5"
//               style={{
//                 margin: '20px'
//               }}
//             >
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   {/* First Column */}
//                   <Col md={6}>
//                     <FormField icon={FaIdCard} label="Item" name="name" value={formData.name} onChange={handleChange} />
//                     <FormField icon={FaIdCard} label="Date" name="date" value={formData.date} onChange={handleChange} />

//                     <FormField icon={FaIdCard} label="Length" name="length" value={formData.length} onChange={handleChange} />
//                     <FormField icon={FaPhone} label="PCS" name="pcs" value={formData.pcs} onChange={handleChange} />
//                   </Col>

//                   {/* Second Column */}
//                   <Col md={6}>
//                     <FormField icon={FaIdCard} label="Item Type" name="item_type" value={formData.item_type} onChange={handleChange} />

//                     <FormField icon={FaMapMarkerAlt} label="Code" name="code" value={formData.code} onChange={handleChange} />

//                     <FormField icon={FaMapMarkerAlt} label="Bundels" name="bundels" value={formData.bundels} onChange={handleChange} />

//                     <FormField icon={FaMapMarkerAlt} label="Output" name="output" value={formData.output} onChange={handleChange} />
//                   </Col>
//                 </Row>

//                 {/* Submit Button */}
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="mt-4 d-block m-auto"
//                   style={{
//                     backgroundColor: mainColor,
//                     borderColor: mainColor,
//                     width: '11rem'
//                   }}
//                 >
//                   <FaUserPlus className="me-2" /> Add Accessories
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddSupplier;

import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import { FaUser, FaIdCard } from 'react-icons/fa';

const AddAccessory = () => {
  const [formData, setFormData] = useState({
    product_category_id: '',
    accessory_name: ''
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        setCategories(response.data.data);
      } else {
        toast.error('Categories data is not in the expected format');
      }
    } catch (error) {
      toast.error('Error fetching categories');
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting data:', formData); // Debugging log

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/accessory`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success('Accessory added successfully');
      navigate('/accessory');
    } catch (error) {
      console.error('Error adding accessory:', error);
      toast.error(error.response?.data?.message || 'Error adding accessory');
    }
    console.log(response.data.data)
  };

  return (
    <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <div className="p-4 text-white text-center" style={{ backgroundColor: '#20B2AA' }}>
              <h2 className="m-0 text-white">Add New Accessory</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="product_category_id">
                      <Form.Label>
                        <FaIdCard className="me-2" /> Product Category
                      </Form.Label>
                      <Form.Select name="product_category_id" value={formData.product_category_id} onChange={handleChange} >
                        <option value="">Select a Category</option>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.product_category}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading categories...</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                  <FormField
                      icon={FaUser}
                      label="Accessory Name"
                      name="accessory_name"
                      value={formData.accessory_name}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="mt-4 d-block m-auto" style={{ width: '10rem' }}>
                  Add Accessory
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAccessory;
