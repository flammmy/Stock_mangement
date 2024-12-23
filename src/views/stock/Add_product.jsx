import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import { FaPlus, FaTrash } from 'react-icons/fa';
const Add_product = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductData();
  }, []);
  const handleAddRow = () => {
    setItems([
      ...items,
      {
        lot_no: '',
        stock_details_Id: '',
        invoice_id: '',
        width: '',
        length: '',
        unit: ''
      }
    ]);
  };
  const handleDeleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          {/* <Col md={12} lg={12}>
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
        </Col> */}
          <div className="card shadow-lg border-0 rounded-lg" style={{ borderRadius: '10px' }}>
            <div className="card-body p-5" style={{ borderRadius: '8px' }}>
              <div className="d-flex justify-content-between">
                <h5>Invoice Items</h5>
                <Button variant="success" onClick={handleAddRow} className="px-1 py-1">
                  <FaPlus /> Add Item
                </Button>
              </div>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Stock Invoice Detail ID</th>
                    <th>LOT No</th>
                    <th>Width</th>
                    <th>Length</th>
                    <th>Unit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                      <Form.Control
                          type="text"
                          value={id}
                          disabled
                        />
                      </td>
                      <td>
                        <Form.Control
                          as="select"
                          value={item.stock_details_Id}
                          onChange={(e) => handleRowChange(index, 'purchase_shadeNo', e.target.value)}

                        />
                      </td>

                      <td>
                        <Form.Control
                          type="text"
                          value={item.hsn_sac_code}
                          onChange={(e) => handleRowChange(index, 'hsn_sac_code', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={item.total_product}
                          onChange={(e) => handleRowChange(index, 'total_product', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control type="text" value={item.unit} onChange={(e) => handleRowChange(index, 'unit', e.target.value)} />
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
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Add_product;
