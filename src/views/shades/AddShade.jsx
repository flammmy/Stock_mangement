import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaUser, FaTrash, FaIdCard, FaUserPlus, FaFileExcel, FaUpload, FaWarehouse } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        shadeNo: '',
        code: '',
        purchase_shade_no: '',
        status: 'Active',
    });
    
    const [file, setFile] = useState(null);

    const navigate = useNavigate();
    const mainColor = '#3f4d67';

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }
        const formData = new FormData();
        formData.append('csv_file', file);
        console.log(formData.file)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/product/import-csv`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 201) {
                toast.success("Stock added successfully");
                setFile(null);
                navigate('/shades');
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Error adding stock';
            toast.error(errorMessage);
        }
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
                <Col md={12} lg={12} className="position-relative">
                    <h2 className="text-center mb-4">Add Product From File</h2>
                    <div className="card shadow border-0 rounded-lg mb-4" style={{ borderRadius: '10px', marginInline: '10rem' }}>
                        <div className="card-body p-4" style={{ borderRadius: '8px' }}>
                            <div className="d-flex flex-column align-items-center">
                                <h4 className="text-center mb-4 d-flex align-items-center gap-2">
                                    <FaFileExcel />
                                    Import Excel File
                                </h4>
                                <form onSubmit={handleFileUpload} encType="multipart/form-data">
                                    <div className="mb-3 w-75">
                                        <label htmlFor="excel" className="form-label d-flex justify-content-between align-items-center text-secondary">
                                            <span>Choose file</span>
                                            <FaFileExcel className="text-success" />
                                        </label>
                                        <div className="input-group">
                                            <input type="file" className="form-control" name="excel" id="excel" onChange={handleFileChange} aria-describedby="fileHelpId" />
                                            <button type="submit" className="btn btn-success d-flex align-items-center gap-2">
                                                <FaUpload />
                                                Upload
                                            </button>
                                        </div>
                                        <small className="form-text text-muted">Supported formats: .xls, .xlsx</small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Col>
                <h4 className="text-center font-weight-bold">or</h4>
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
