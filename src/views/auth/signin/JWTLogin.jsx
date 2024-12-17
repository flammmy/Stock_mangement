import React,{useContext } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { AuthContext } from '../../../contexts/authContext'

const JWTLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext)
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      // API call to login endpoint
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
      const response = await axios.post(
        `${API_BASE_URL}/api/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // On success, extract user data from the response
      const user = response.data.data;
  
      // Dispatch LOGIN action to update the state
      dispatch({
        type: 'LOGIN',
        payload: { user },
      });
  
      // Persist user data in localStorage
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirect or navigate after successful login
      console.log('Login successful:', user);
      navigate('/dashboard');
    } catch (error) {
      // Handle error
      console.error('Login failed:', error.response?.data || error.message);
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

          {/* <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div> */}

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
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
