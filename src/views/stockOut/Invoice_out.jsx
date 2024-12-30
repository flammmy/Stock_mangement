import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserPlus, FaTrash, FaPlus } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';

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
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [shadeNo, setShadeNo] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchShadeNo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/available`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data.data);
        setShadeNo(response.data.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchShadeNo();
  }, []);

  const handleShadeNoChange = async (event) => {
    setLoading(true);
    const selectedProductId = event.target.value; // Get the selected product ID

    if (selectedProductId) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/checkstocks/${selectedProductId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setLoading(false);

        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    } else {
      setProducts(null); // Clear products state if no shade is selected
    }
  };

  useEffect(() => {
    const fetchBanksData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/operator/bank`, {
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
  const navigate = useNavigate();

  const columns = [
    { id: 'product_shadeNo', label: 'Shade No' },
    { id: 'product_purchase_shade_no', label: 'Pur. Shade No' },
    { id: 'lot_no', label: 'LOT No' },
    { id: 'width', label: 'Width' },
    { id: 'length', label: 'Length' },
    { id: 'unit', label: ' Unit' },
    { id: 'area_sq_ft', label: 'Area(sqft)' },
    { id: 'type', label: 'Type' },
    { id: 'qty', label: 'Quantity' }
  ];

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      const isAlreadySelected = prevSelected.some((row) => row.id === id);

      if (isAlreadySelected) {
        // Deselect: Remove the row from the selected rows
        return prevSelected.filter((row) => row.id !== id);
      } else {
        // Select: Add the row to the selected rows
        const newRow = products.find((p) => p.id === id);
        return [...prevSelected, newRow];
      }
    });
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
                <hr />

                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <label htmlFor="shadeNo" className="form-label mb-0 fw-medium">
                      Select Shade No
                    </label>
                    <Form.Control
                      as="select"
                      id="shadeNo"
                      className="form-select px-2"
                      style={{ width: '8rem', minWidth: 'fit-content' }}
                      onChange={handleShadeNoChange}
                    >
                      <option value="">Select</option>

                      {shadeNo.map((shade) => {
                        return (
                          <option key={shade.id} value={shade.id}>
                            {shade.shadeNo}
                          </option>
                        );
                      })}
                    </Form.Control>
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
                                      {/* Empty header for checkbox column */}
                                      <input
                                        type="checkbox"
                                        // onChange={(e) => setSelectedRows(e.target.checked ? products.map((row) => row.id) : [])}
                                        // checked={selectedRows.length === products.length}
                                      />
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
                                    <tr key={row.id}>
                                      <td>
                                        <input type="checkbox" onChange={() => handleCheckboxChange(row.id)} />
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
                                  <th>Rate</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedRows.map((row) => (
                                  <tr key={row.id}>
                                    {/* {columns.map((column) => (
                                      <td key={column.id}>
                                        <input type="text" value={row[column.id]}/>
                                      </td>
                                    ))} */}

                                    <td key="shadeNo"> {row.product_shadeNo}</td>
                                    <td key="pur_shadeNo"> {row.product_shadeNo}</td>
                                    <td key="lot_no">
                                      <input type="text" />
                                    </td>
                                    <td key="width">
                                    <input type="text"  placeholder={`max: ${row.width}`} max={Number(row.width)} />

                                    </td>
                                    <td key="length">
                                      <input type="text"  placeholder={`max: ${row.length}`} max={Number(row.length)}/>
                                    </td>
                                    <td key="unit">
                                      <select className='form-control' style={{width:'5rem',paddingInline:'10px'}} >
                                        <option value="" disabled selected>Select</option>
                                        <option value="meter">meter</option>
                                        <option value="milimeter">milimeter</option>
                                      </select>
                                    </td>
                                    <td key="area">
                                      <input type="text" />
                                    </td>
                                    <td key="type">
                                    <select className='form-control' style={{width:'5rem',paddingInline:'10px'}}>
                                        <option value="" disabled selected>Select</option>
                                        <option value="roll">Roll</option>
                                        <option value="box">Box</option>
                                      </select>
                                    </td>
                                    <td key="qty">
                                      <input type="text" placeholder={`max: ${row.qty}`} />
                                    </td>
                                    <td key="rate">
                                      <input type="text" />
                                    </td>
                                    <td key="amount">
                                      <input type="text" />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Invoice_out;
