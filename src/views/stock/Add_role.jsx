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
            D_outer: '',
            D_inner: '',
            thickness: '',
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
                D_outer: '',
                D_inner: '',
                thickness: '',
                length: '',
                unit: '',
                type: '',
                qty: 1
            }
        ]);
    };

    const handleDeleteRow = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const calculateLength = (D_outer, D_inner, thickness) => {
        const outerDiameter = parseFloat(D_outer);
        const innerDiameter = parseFloat(D_inner);
        const t = parseFloat(thickness);

        if (outerDiameter && innerDiameter && t) {
            const result = (Math.pow(outerDiameter, 2) - Math.pow(innerDiameter, 2)) / (4 * (t * 0.0393701) * Math.PI);
            return result.toFixed(2);
        }
        return '';
    };

    const handleRowChange = (index, field, value) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            const row = updatedItems[index];
            if (field === 'product_id') {
                const selectedProduct = allProducts.find((product) => product.id === parseInt(value));
                if (selectedProduct) {
                    row.product_id = value;
                    row.purchase_shadeNo = selectedProduct.purchase_shade_no;
                }
            } else if (field === 'D_outer' || field === 'D_inner' || field === 'thickness') {
                row[field] = value;
                row.length = calculateLength(Number(row.D_outer), Number(row.D_inner), Number(row.thickness));
                console.log(row.length);
            }
            else {
                row[field] = value;
            }

            //   if (['D_outer', 'D_inner', 'thickness'].includes(field)) {
            //     row.length = calculateLength(row.D_outer, row.D_inner, row.thickness);
            //   }

            return updatedItems;
        });
    };

    const handleRadius = () => {
        navigate(`/add-product/${id}/${no}`);
    };
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
                <Col md={12} lg={12} className="absolute mt-3">
                    <div className="card shadow-lg border-0 rounded-lg" style={{ borderRadius: '10px' }}>
                        <div className="card-body p-5" style={{ borderRadius: '8px' }}>
                            <h3 className="text-center mb-4 gap-2">Add Manually</h3>
                            <Button variant="success" onClick={handleRadius} className="px-1 py-1 ms-auto d-block">
                                <FaPlus /> Add By Length Width

                            </Button>
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
                                            <th>Outer Diameter</th>
                                            <th>Inner Diameter</th>
                                            <th>Thickness</th>
                                            <th>&nbsp;&nbsp;&nbsp;&nbsp;Length&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
                                                        value={item.D_outer}
                                                        onChange={(e) => handleRowChange(index, 'D_outer', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        value={item.D_inner}
                                                        onChange={(e) => handleRowChange(index, 'D_inner', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        value={item.thickness}
                                                        onChange={(e) => handleRowChange(index, 'thickness', e.target.value)}
                                                    />
                                                </td>

                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        value={item.length}
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