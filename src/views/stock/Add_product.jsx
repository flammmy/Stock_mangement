import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaUserPlus, FaTrash, FaPlus } from 'react-icons/fa';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
const Add_product = () => {
  const { id,no } = useParams();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    invoice_no: '',
    lot_no: '',
    product_id:'',
    purchase_shadeNo: '',
    invoice_id: '',
    width: '',
    length: '',
    unit: '',
    type: ''

  });
  const [items, setItems] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const mainColor = '#3f4d67';

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
        // console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setAllProducts(response.data.data);
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
        invoice_no: '',
        lot_no: '',
        shade_no:'',
        purchase_shadeNo: '',
        invoice_id: '',
        width: '',
        length: '',
        unit: '',
        type: ''
      }
    ]);
  };
  const handleDeleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setItems((prevRows) => {
      const updatedRows = [...prevRows];
      if(field === 'product_id') {
        const selectedProduct = allProducts.find((product) => product.id == value);
        if(selectedProduct) {
          updatedRows[0].product_id = value;
          updatedRows[0].purchase_shadeNo = selectedProduct.purchase_shade_no;
        }
      }
      else{
        updatedRows[0][field] = value;
      }
      // Sync with formData
      setFormData((prevFormData) => {
        console.log(field)
        const updatedData = prevFormData;
        updatedData[field] = value;
        return updatedData;
      });

      return updatedRows;
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData['invoice_id'] = id;
    formData['invoice_no'] = no;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/stocks`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Stock added successfully');
      // navigate('/users');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding stock';
      toast.error(errorMessage);
    }

    console.log(formData);
  };
  return (
    <Container fluid className="pt-4 px-5" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          
          <div className="card shadow-lg border-0 rounded-lg" style={{ borderRadius: '10px' }}>
            <div className="card-body p-5" style={{ borderRadius: '8px' }}>
              <div className="d-flex justify-content-between">
                <h5>Invoice Items</h5>
                <Button variant="success" onClick={handleAddRow} className="px-1 py-1">
                  <FaPlus /> Add Item
                </Button>
              </div>
              <form  onSubmit={handleSubmit}>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Shade No</th>
                    <th>Pur.Shade No</th>
                    <th>LOT No</th>
                    <th>Width</th>
                    <th>Length</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Control type="text" value={no} disabled className='px-1' />
                      </td>
                      <td>
                        <Form.Control
                          as="select"
                          value={item.shadeNo}
                          onChange={(e) => handleRowChange(index, 'product_id', e.target.value)}
                          className="px-1"
                        >
                          <option value="">Select Shade No.</option>
                          {allProducts.map((product, idx) => (
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
                          className="px-1"
                        />
                      </td>

                      <td>
                        <Form.Control
                          type="text"
                          value={item.lot_no}
                          onChange={(e) => handleRowChange(index, 'lot_no', e.target.value)}
                          className='px-1'
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={item.width}
                          onChange={(e) => handleRowChange(index, 'width', e.target.value)}
                          className='px-1'
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={item.length}
                          onChange={(e) => handleRowChange(index, 'length', e.target.value)}
                          className='px-1'
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={item.length}
                          onChange={(e) => handleRowChange(index, 'qty', e.target.value)}
                          className='px-1'
                        />
                      </td>
                      <td>
                        <Form.Control
                          as="select"
                          value={item.type}
                          onChange={(e) => handleRowChange(index, 'type', e.target.value)}
                          className='px-1'
                        >
                          <option value="" disabled>Select type</option>
                          <option value="roll">Roll</option>
                          <option value="box">Box</option>
                        </Form.Control>
                      </td>
                      <td>
                        <Form.Control as="select" value={item.unit} onChange={(e) => handleRowChange(index, 'unit', e.target.value)} className='px-1' >
                          <option value="" disabled>Select Unit</option>
                          <option value="meter">meter</option>
                          <option value="inch">inch</option>
                        </Form.Control>
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
                  <FaUserPlus className="me-2" /> Add Stock
                </Button>
              </form>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Add_product;
