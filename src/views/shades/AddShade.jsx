import React, { useState} from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import {
    FaUser,
    FaIdCard,
    FaCheckCircle,
    FaUserPlus,
} from 'react-icons/fa';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        shadeNo: '',
        code: '',
        purchase_shade_no: '',
        status: 'Active',
    });

    const navigate = useNavigate();
    const mainColor = '#3f4d67';

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
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
        <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card
                        className="shadow-lg border-0"
                        style={{
                            borderRadius: '15px',
                            overflow: 'hidden',
                        }}
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
                                    {/* First Column */}
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
                                    {/* Second Column */}
                                    <Col md={6}>
                                        <FormField
                                            icon={FaIdCard}
                                            label="Product Code"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                        />
                                        <FormField
                                            icon={FaIdCard}
                                            label="Purchase Shade Number"
                                            name="purchase_shade_no"
                                            value={formData.purchase_shade_no}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>

                                {/* Submit Button */}
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
