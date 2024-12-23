import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import {
    FaUser,
    FaIdCard,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaUserPlus,
    FaImage
} from 'react-icons/fa';
const Add_product = () => {
  const { id } = useParams();
   const [formData, setFormData] = useState({
          name: '',
          code: '',
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
          status: 'Active',
      });


  const handleSubmit = async (e) => {
    e.preventDefault();

    
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
  return (
    <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card
            className="shadow-lg border-0"
            style={{
              borderRadius: '15px',
              overflow: 'hidden'
            }}
          >
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
              <h2 className="m-0 text-white">Add Product</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormField icon={FaUser} label="LOT No" name="lot_no" value={formData.name} onChange={handleChange} />
                    <FormField icon={FaIdCard} label="Stock Invoice Detail ID" name="stock_detail_id" value={formData.code} onChange={handleChange} />
                    <FormField icon={FaIdCard} label="Invoice ID" name="invoice_id" value={formData.gst_no} onChange={handleChange} />
                  
                  </Col>
                  <Col md={6}>
                  <FormField icon={FaIdCard} label="Width" name="width" value={formData.cin_no} onChange={handleChange} />
                    <FormField icon={FaIdCard} label="Length" name="length" value={formData.pan_no} onChange={handleChange} />
                    <FormField icon={FaPhone} label="Unit" name="Qty" value={formData.tel_no} onChange={handleChange} />
                  </Col>

                </Row>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 d-block m-auto"
                  style={{
                    backgroundColor: '#3f4d67',
                    borderColor: '#3f4d67',
                    width: '10rem'
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

export default Add_product;
