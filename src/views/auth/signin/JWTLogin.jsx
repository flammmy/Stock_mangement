import React, { useState, useContext } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { AuthContext } from '../../../contexts/authContext';
import './Catpcha.css';

const JWTLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaMessage, setCaptchaMessage] = useState("");
  const [isCaptchaValidated, setIsCaptchaValidated] = useState(false);

  // Function to generate Captcha
  function generateCaptcha() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captchaString = "";
    for (let i = 0; i < 6; i++) {
      captchaString += chars[Math.floor(Math.random() * chars.length)];
    }
    return captchaString;
  }

  // Handle Captcha Validation
  const handleValidateCaptcha = () => {
    if (userCaptchaInput === captcha) {
      setCaptchaMessage("Captcha validation successful!");
      setIsCaptchaValidated(true);
    } else {
      setCaptchaMessage("Captcha is incorrect. Try again!");
      setCaptcha(generateCaptcha());
      setUserCaptchaInput("");
      setIsCaptchaValidated(false);
    }
  };

  // Handle Captcha Regeneration
  const handleRegenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaMessage("");
    setUserCaptchaInput("");
    setIsCaptchaValidated(false);
  };

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    if (!isCaptchaValidated) {
      setErrors({ submit: 'Please validate the Captcha first!' });
      setSubmitting(false);
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(
        `${API_BASE_URL}/api/login`,
        { email: values.email, password: values.password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const user = response.data.data;

      // Dispatch LOGIN action
      dispatch({ type: 'LOGIN', payload: { user } });

      // Persist user data in localStorage
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: 'operator@gmail.com',
        password: 'Password#910',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={handleLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="text-start w-100 text-black">Email</label>
            <input
              className="form-control"
              name="email"
              id="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="text-start w-100 text-black">Password</label>
            <input
              className="form-control"
              name="password"
              id="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="captcha-container mb-3">
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'center',
                marginRight: '10px',
                marginBottom: '10px',
                width: '100%'
              }}
            > <div className="captcha-box" style={{ color: 'black' }}>{captcha}</div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={handleRegenerateCaptcha}
              style={{
                width: '150px',
                height: '40px'
              }}            >
              Regenerate
            </button></div>
            <input
              className="form-control mb-2"
              type="text"
              value={userCaptchaInput}
              onChange={(e) => setUserCaptchaInput(e.target.value)}
              placeholder="Enter Captcha"
              required
            />
            {captchaMessage && <p className="text-muted mt-2">{captchaMessage}</p>}
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col>
              <Button
                className="btn-block mb-4"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
                onClick={handleValidateCaptcha}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
