import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUserTag, 
  FaLock, 
  FaCheckCircle, 
  FaUserPlus 
} from 'react-icons/fa';

const AddUser = () => {
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
  const roles = ['Operator', 'Supervisor'];
  const statuses = ['Active✅', 'Inactive❌'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          role: formData.role == 'operator' ? 2 : 3,
          password: formData.password,
          status: formData.status == 'active' ? 1 : 0
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      navigate('/users');
      toast.success('User added successfully');
    } catch (error) {
        toast.error('Error adding user');
    }
  };

  const mainColor = '#3f4d67';
  const lightColor = '#f0f4f8';

  const FormField = ({ icon: Icon, label, type = 'text', name, value, onChange, options = null, required = true }) => (
    <Form.Group className="mb-3 position-relative">
      <Form.Label className="d-flex align-items-center">
        <Icon className="me-2" style={{color: mainColor}} />
        {label}
      </Form.Label>
      {options ? (
        <Form.Select 
          name={name} 
          value={value} 
          onChange={onChange} 
          required={required}
          style={{
            paddingLeft: '40px',
            borderColor: mainColor
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          type={type}
          placeholder={`Enter ${label.toLowerCase()}`}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-control-icon"
          style={{
            paddingLeft: '40px',
            borderColor: mainColor
          }}
        />
      )}
      <Icon 
        className="position-absolute" 
        style={{
          left: '10px', 
          top: '38px', 
          color: mainColor, 
          opacity: 0.5
        }} 
      />
    </Form.Group>
  );

  return (
    <Container fluid className="pt-4 px-5" style={{border:'3px dashed #14ab7f', borderRadius: '8px',background:'#ff9d0014'}}>
      <Row className="justify-content-center">
        <Col md={10} lg={10} style={{flexGrow: '1'}}>
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
              <h2 className="m-0 text-white">Add New User</h2>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormField 
                      icon={FaUser}
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    
                    <FormField 
                      icon={FaUser}
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    
                    <FormField 
                      icon={FaEnvelope}
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    
                    <FormField 
                      icon={FaPhone}
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Col>
                  
                  <Col md={6}>
                    <FormField 
                      icon={FaUserTag}
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      options={roles}
                    />
                    
                    <FormField 
                      icon={FaLock}
                      label="Create Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    
                    <FormField 
                      icon={FaCheckCircle}
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      options={statuses}
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

export default AddUser;