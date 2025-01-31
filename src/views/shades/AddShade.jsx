import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import { FaUser, FaIdCard, FaUserPlus } from 'react-icons/fa';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    shadeNo: '',
    code: '',
    product_category_id: '', // Holds the selected category ID
    purchase_shade_no: '',
    status: 'Active',
  });

  const [categories, setCategories] = useState([]); // Holds the list of categories
  const navigate = useNavigate();
  const mainColor = '#3f4d67';

  // Fetch product categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/category`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

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

  useEffect(() => {
    console.log('Categories:', categories); // Debugging: Ensure categories are populated
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        navigate('/shades');
        toast.success('Product added successfully');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    }
  };

  return (
    <Container
      fluid
      className="pt-4 px-5"
      style={{
        border: '3px dashed #14ab7f',
        borderRadius: '8px',
        background: '#ff9d0014',
      }}
    >
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card
            className="shadow-lg border-0"
            style={{ borderRadius: '15px', overflow: 'hidden' }}
          >
            <div
              className="p-4 text-white text-center"
              style={{
                backgroundColor: '#20B2AA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaUserPlus size={40} className="me-3" />
              <h2 className="m-0 text-white">Add New Product</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormField
                      icon={FaUser}
                      label="Product Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaIdCard}
                      label="Shade Number"
                      name="shadeNo"
                      value={formData.shadeNo}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    {/* Dropdown for Product Category */}
                    <Form.Group controlId="productCategory" style={{ marginBottom: '16px' }}>
                      <Form.Label>
                        <FaIdCard className="me-2" />
                        Product Category
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="product_category_id"
                        value={formData.product_category_id} // Bind to formData state
                        onChange={handleChange} // Update formData state
                        style={{
                          border: '1px solid rgb(63, 77, 103)',
                          zIndex: '10', // Ensure dropdown options are above other elements
                        }}
                      >
                        <option value="">Select Category</option>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.product_category}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            Loading Categories...
                          </option>
                        )}
                      </Form.Control>
                    </Form.Group>
                    <FormField
                      icon={FaIdCard}
                      label="Purchase Shade Number"
                      name="purchase_shade_no"
                      value={formData.purchase_shade_no}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 d-block m-auto"
                  style={{
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                    width: '10rem',
                  }}
                >
                  <FaUserPlus className="me-2" /> Add Product
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;

