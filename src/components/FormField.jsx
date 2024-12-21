import React, { useState, memo, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

const FormField = memo(({ icon: Icon, label, type = 'text', name, value, onChange, options = null, required = true}) => {
    return (
      <Form.Group className="mb-3 position-relative">
        <Form.Label className="d-flex align-items-center">
          <Icon className="me-2" style={{ color: '#3f4d67' }} />
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
              borderColor: '#3f4d67',
            }}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
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
            style={{
              paddingLeft: '40px',
              borderColor: '#3f4d67',
            }}
          />
        )}
        <Icon
          className="position-absolute"
          style={{
            left: '10px',
            top: '38px',
            color: '#3f4d67',
            opacity: 0.5,
          }}
        />
      </Form.Group>
    );
  });

  export default FormField;