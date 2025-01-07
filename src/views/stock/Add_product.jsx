import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus, FaTrash, FaUserPlus, FaFileExcel, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const { id, no } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([
    {
      invoice_no: no,
      lot_no: '',
      product_id: '',
      purchase_shadeNo: '',
      width: '',
      length: '',
      unit: '',
      type: '',
      qty: 1
    }
  ]);
  const [allProducts, setAllProducts] = useState([]);
  const mainColor = '#3f4d67';

  // Fetch all products for dropdown
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAllProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);

  // Add a new row
  const handleAddRow = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        invoice_no: no,
        lot_no: '',
        product_id: '',
        purchase_shadeNo: '',
        width: '',
        length: '',
        unit: '',
        type: '',
        qty: 1
      }
    ]);
  };

  // Delete a row
  const handleDeleteRow = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Handle changes to row fields
  const handleRowChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (field === 'product_id') {
        const selectedProduct = allProducts.find((product) => product.id === parseInt(value));
        if (selectedProduct) {
          updatedItems[index].product_id = value;
          updatedItems[index].purchase_shadeNo = selectedProduct.purchase_shade_no;
        }
      } else {
        updatedItems[index][field] = value;
      }
      return updatedItems;
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {

      setFile(selectedFile);
    }
  };

  const handleRadius = () => {
    navigate(`/stocks/add-radius/${id}/${no}`);
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
        `${import.meta.env.VITE_API_BASE_URL}/api/stocks/import-csv`,
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
        navigate('/stocks');
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

    const payload = items.map((item) => ({
      ...item,
      invoice_id: id,
      invoice_no: no
    }));

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/stocks`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Stock added successfully');
      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding stock';
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <Container fluid className="pt-4 px-2" style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}>
      <Row className="justify-content-center">
        <Col md={12} lg={12} className="position-relative">
          <h2 className="text-center mb-4">Invoice Items</h2>
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
        <Col md={12} lg={12} className="absolute mt-3">
          <div className="card shadow-lg border-0 rounded-lg" style={{ borderRadius: '10px' }}>
            <div className="card-body p-5" style={{ borderRadius: '8px' }}>
              <h3 className="text-center mb-4 gap-2">Add Manually</h3>
              
              <Button variant="success" onClick={handleAddRow} className="px-1 py-1 ms-auto d-block">
                <FaPlus /> Add Item
              </Button>
              <form onSubmit={handleSubmit}>
                <Table bordered hover responsive style={{ '--bs-table-bg': '#20b2aa', '--bs-table-color': 'unset' }}>
                  <thead>
                    <tr className="text-white">
                      <th>Invoice No</th>
                      <th>Shade No</th>
                      <th>Pur. Shade No</th>
                      <th>LOT No</th>
                      <th>Width</th>
                      <th>Length</th>
                      <th>&nbsp;&nbsp;&nbsp;&nbsp;Unit&nbsp;&nbsp;&nbsp;&nbsp;</th>
                      <th>&nbsp;&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp;</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control type="text" value={no} disabled />
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            value={item.product_id}
                            onChange={(e) => handleRowChange(index, 'product_id', e.target.value)}
                          >
                            <option value="">Select Shade No.</option>
                            {allProducts.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.shadeNo}
                              </option>
                            ))}
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control type="text" value={item.purchase_shadeNo} disabled />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.lot_no}
                            onChange={(e) => handleRowChange(index, 'lot_no', e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item.width}
                            onChange={(e) => handleRowChange(index, 'width', e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item.length}
                            onChange={(e) => handleRowChange(index, 'length', e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Control as="select" value={item.unit} onChange={(e) => handleRowChange(index, 'unit', e.target.value)}>
                            <option value="">Select Unit</option>
                            <option value="meter">Meter</option>
                            <option value="inch">Milimeter</option>
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control as="select" value={item.type} onChange={(e) => handleRowChange(index, 'type', e.target.value)}>
                            <option value="">Select Type</option>
                            <option value="roll">Roll</option>
                            <option value="box">Box</option>
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control type="number" value={item.qty} onChange={(e) => handleRowChange(index, 'qty', e.target.value)} />
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

export default AddProduct;