import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserPlus, FaTrash, FaPlus } from 'react-icons/fa';
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
import { color } from 'd3';

const Add_inoice = () => {
  const [formData, setFormData] = useState({
    invoice_no: '',
    place_of_supply: '',
    receiver_id: '1',
    supplier_id: '1',
    date: undefined,
    irn: '',
    ack_no: '',
    ack_date: undefined,
    vehicle_no: '',
    station: '',
    ewaybill: '',
    gr_rr: '',
    transport: '',
    reverse_charge: '',
    bank_id: '',
    qr_code: '',
    products: []
  });
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleAddRow = () => {
    setItems([
      ...items,
      {
        product_id: '',
        purchase_shadeNo: '',
        hsn_sac_code: '',
        quantity: '',
        product_type: '',
        total_product: '',
        unit: '',
        rate: '',
        amount: ''
      }
    ]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      products: [
        ...prevFormData.products,
        {
          product_id: '',
          purchase_shadeNo: '',
          hsn_sac_code: '',
          quantity: 0,
          product_type: '',
          total_product: '',
          unit: '',
          rate: 0,
          amount: 0
        }
      ]
    }));
  };
  const handleDeleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setFormData((prevFormData) => {
      const updatedProducts = prevFormData.products.filter((_, i) => i !== index);
      return {
        ...prevFormData,
        products: updatedProducts
      };
    });
  };

  const handleRowChange = (index, field, value) => {
    setItems((prevRows) => {
      const updatedRows = [...prevRows];
      if (field === 'product_id') {
        const selectedProduct = products.find((product) => product.id == value);
        if (selectedProduct) {
          updatedRows[index].product_id = value;
          updatedRows[index].purchase_shadeNo = selectedProduct.purchase_shade_no;
        } else {
          updatedRows[index].purchase_shadeNo = '';
        }
      }
      else {
        updatedRows[index][field] = value;
      }

      if (field === 'amount') {
        const totalAmount = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        formData.total_amount = totalAmount;
      }
      
      // Sync with formData
      setFormData((prevFormData) => {
        const updatedProducts = [...prevFormData.products];
        updatedProducts[index] = {
          ...updatedProducts[index],
          ...updatedRows[index]
        };
        return {
          ...prevFormData,
          products: updatedProducts
        };
      });

      return updatedRows;
    });
  };

  const [receivers, setReceivers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanksData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/operator/bank`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setBanks(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBanksData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setProducts(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductData();
  }, []);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setSuppliers(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSupplierData();
  }, []);
  useEffect(() => {
    const fetchReceiverData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/receiver`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setReceivers(response.data.data);
        // console.log(response.data.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/stockin/invoice`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Invoice added successfully');
      // navigate('/users');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding user';
      toast.error(errorMessage);
      
    }

    console.log(formData);
  };

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
              <h2 className="m-0 text-white">Add Invoice</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <FormField
                      icon={FaFileInvoice}
                      label="Invoice_no"
                      name="invoice_no"
                      value={formData.invoice_no}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaUser}
                      label="Supplier"
                      name="supplier_id"
                      value={formData.supplier_id}
                      onChange={handleChange}
                      options={suppliers}
                      add={'/add-Supplier'}
                    />
                    <FormField icon={FaCalendarAlt} label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
                    <FormField
                      icon={FaMapMarkerAlt}
                      label="Place of Supply"
                      name="place_of_supply"
                      value={formData.place_of_supply}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaUsers}
                      label="Receiver"
                      name="receiver_id"
                      value={formData.receiver_id}
                      onChange={handleChange}
                      options={receivers}
                      add={'/add-Receiver'}

                    />
                  </Col>
                  <Col md={4}>
                    <FormField icon={FaTruck} label="Vehicle No" name="vehicle_no" value={formData.vehicle_no} onChange={handleChange} />
                    <FormField icon={FaCity} label="Station" name="station" value={formData.station} onChange={handleChange} />
                    <FormField icon={FaKey} label="eWaybill" name="ewaybill" value={formData.ewaybill} onChange={handleChange} />
                    <FormField icon={FaKey} label="Ack No" name="ack_no" value={formData.ack_no} onChange={handleChange} />
                    <FormField icon={FaKey} label="IRN" name="irn" value={formData.irn} onChange={handleChange} />
                   
                  </Col>

                  <Col md={4}>
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
                      name="bank_id"
                      value={formData.bank}
                      onChange={handleChange}
                      options={banks}
                      add={'/add-Bank'}

                    />
                  </Col>
                </Row>

                <div>
                  <div className="d-flex justify-content-between">
                    <h5>Invoice Items</h5>
                    <Button variant="success" onClick={handleAddRow} className="px-1 py-1">
                      <FaPlus /> Add Item
                    </Button>
                  </div>
                  <Table bordered hover responsive style={{ '--bs-table-bg': '#20b2aa', '--bs-table-color': 'unset'}}>
                    <thead >
                      <tr className='text-white'>
                        <th>&nbsp;&nbsp;Shade Number&nbsp;&nbsp;</th>
                        <th>Pur. Shade No</th>
                        <th>Total Product</th>
                        <th>&nbsp;&nbsp;Product Type&nbsp;&nbsp;</th>
                        <th>HSN/SAC</th>
                        <th>Quantity</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Form.Control
                              as="select"
                              value={item.shadeNo}
                              onChange={(e) => handleRowChange(index, 'product_id', e.target.value)}
                              className='px-1'

                            >
                              <option value="">Select Shade No.</option>
                              {products.map((product, idx) => (
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
                              onChange={(e) => handleRowChange(index, 'purchase_shadeNo', e.target.value)}
                              className='px-1'

                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={item.total_product}
                              onChange={(e) => handleRowChange(index, 'total_product', e.target.value)}
                              className='px-1'

                            />
                          </td>
                          <td>
                            <Form.Control
                              as="select"
                              value={item.product_type}
                              onChange={(e) => handleRowChange(index, 'product_type', e.target.value)}
                              className='px-1'

                              >
                              <option value="" disabled>Select type</option>
                              <option value="roll">Roll</option>
                              <option value="box">Box</option>

                              
                            </Form.Control>
                          </td>

                          <td>
                            <Form.Control
                              type="text"
                              value={item.hsn_sac_code}
                              onChange={(e) => handleRowChange(index, 'hsn_sac_code', e.target.value)}
                              className='px-1'

                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={item.quantity}
                              className='px-1'
                              onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                            />
                          </td>
                         
                          <td>
                            <Form.Control as="select" value={item.unit} onChange={(e) => handleRowChange(index, 'unit', e.target.value)} className='px-1' >
                              <option value="" disabled>Select unit</option>
                              <option value="sqft">Sq.ft.</option>
                              <option value="pcs">Pcs.</option>
                            </Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={item.rate}
                              className='px-1'
                              onChange={(e) => handleRowChange(index, 'rate', e.target.value)}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={item.amount}
                              className='px-1'
                              onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                            />
                          </td>
                          <td>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteRow(index)}>
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Row className="mt-4">
                    <Col md={3}>
                      <FormField
                        icon={FaMoneyBillWave}
                        label="Total Amount"
                        name="total_amount"
                        value={formData.total_amount}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <FormField
                        icon={FaPercentage}
                        label="SGST(%)"
                        name="sgst_percentage"
                        value={formData.sgst_percentage}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <FormField
                        icon={FaPercentage}
                        label="SGST(%)"
                        name="cgst_percentage"
                        value={formData.cgst_percentage}
                        onChange={handleChange}
                      />
                      
                    </Col>

                    <Col md={3}>
                    <FormField
                        icon={FaCalendarAlt}
                        label="Ack Date"
                        type="date"
                        name="ack_date"
                        value={formData.ack_date}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
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
                  <FaUserPlus className="me-2" /> Add Invoice
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
