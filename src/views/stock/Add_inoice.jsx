import React, { useState, memo, useMemo, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaLock, FaCheckCircle, FaUserPlus } from 'react-icons/fa';
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
} from 'react-icons/fa'; // Import suitable icons
import FormField from '../../components/FormField';
import { error } from 'jquery';

const Add_inoice = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    role: 'operator',
    password: '',
    status: 'Active'
  });

  const navigate = useNavigate();

  // const [receivers, setReceivers] = useState([]);
  // const [suppliers, setSuppliers] = useState([]);
  const [banks, setBanks] = useState([{ id: '', name: 'Select a bank' }]);

  useEffect(() => {
    const fetchBanksData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/bank`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setBanks([...banks, ...response.data.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBanksData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
        {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role === 'operator' ? 2 : 3,
          password: formData.password,
          status: formData.status === 'Active✅' ? 1 : 0
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      toast.success('User added successfully');
      navigate('/users');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding user';
      toast.error(errorMessage);
    }
  };

  const mainColor = '#3f4d67';
  return (
    <Container
      fluid
      className="pt-4 px-5"
      style={{
        border: '3px dashed #14ab7f',
        borderRadius: '8px',
        background: '#ff9d0014'
      }}
    >
      <Row className="justify-content-center">
        <Col md={10} lg={10}>
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
              <h2 className="m-0 text-white">Add Invoice</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormField
                      icon={FaFileInvoice}
                      label="Invoice_no"
                      name="invoice_no"
                      value={formData.invoice_no}
                      onChange={handleChange}
                    />
                    <FormField icon={FaUser} label="Supplier" name="supplier_id" value={formData.supplier_id} onChange={handleChange} />
                    <FormField icon={FaCalendarAlt} label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
                    <FormField
                      icon={FaMapMarkerAlt}
                      label="Place of Supply"
                      name="place_of_supply"
                      value={formData.place_of_supply}
                      onChange={handleChange}
                    />
                    <FormField icon={FaUsers} label="Receiver" name="receiver_id" value={formData.receiver_id} onChange={handleChange} />
                    <FormField icon={FaKey} label="IRN" name="irn" value={formData.irn} onChange={handleChange} />
                    <FormField icon={FaKey} label="Ack No" name="ack_no" value={formData.ack_no} onChange={handleChange} />
                    <FormField
                      icon={FaCalendarAlt}
                      label="Ack Date"
                      type="date"
                      name="ack_date"
                      value={formData.ack_date}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaMoneyBillWave}
                      label="Total Amount"
                      name="total_amount"
                      value={formData.total_amount}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaPercentage}
                      label="CGST(%)"
                      name="cgst_percentage"
                      value={formData.cgst_percentage}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaPercentage}
                      label="SGST(%)"
                      name="sgst_percentage"
                      value={formData.sgst_percentage}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField icon={FaTruck} label="Vehicle No" name="vehicle_no" value={formData.vehicle_no} onChange={handleChange} />
                    <FormField icon={FaCity} label="Station" name="station" value={formData.station} onChange={handleChange} />
                    <FormField icon={FaKey} label="eWaybill" name="ewaybill" value={formData.ewaybill} onChange={handleChange} />
                    <FormField icon={FaFileInvoice} label="GR/RR" name="gr_rr" value={formData.gr_rr} onChange={handleChange} />
                    <FormField icon={FaTruck} label="Transport" name="transport" value={formData.transport} onChange={handleChange} />
                    <FormField
                      icon={FaKey}
                      label="Reverse Charge"
                      name="reverse_charge"
                      value={formData.reverse_charge}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaMoneyBillWave}
                      label="Bank"
                      name="bank"
                      value={formData.bank}
                      onChange={handleChange}
                      options={banks}
                    />
                    <FormField
                      icon={FaSignature}
                      label="Receiver Signature"
                      name="receiver_signature"
                      value={formData.receiver_signature}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaSignature}
                      label="Authorised Signatory"
                      name="authorised_signatory"
                      value={formData.authorised_signatory}
                      onChange={handleChange}
                    />
                    <FormField icon={FaQrcode} label="QR Code" name="qr_code" value={formData.qr_code} onChange={handleChange} />
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 d-block m-auto"
                  style={{
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                    width: '10rem'
                  }}
                >
                  <FaUserPlus className="me-2" /> Add User
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Add_inoice;
