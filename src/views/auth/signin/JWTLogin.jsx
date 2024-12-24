// import React,{useContext } from 'react';
// import { Row, Col, Alert, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import axios from 'axios';
// import { AuthContext } from '../../../contexts/authContext'

// const JWTLogin = () => {
//   const navigate = useNavigate();
//   const { dispatch } = useContext(AuthContext)
//   const handleLogin = async (values, { setSubmitting, setErrors }) => {
//     try {
//       // API call to login endpoint
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
//       const response = await axios.post(
//         `${API_BASE_URL}/api/login`,
//         {
//           email: values.email,
//           password: values.password,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         }
//       );
  
//       // On success, extract user data from the response
//       const user = response.data.user;
//       const token = response.data.access_token;
  
//       // Dispatch LOGIN action to update the state
//       dispatch({
//         type: 'LOGIN',
//         payload: { user,token },
//       });
  
//       // Persist user data in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
  
//       // Redirect or navigate after successful login
//       console.log('Login successful:', user);
//       navigate('/dashboard');
//     } catch (error) {
//       // Handle error
//       console.error('Login failed:', error.response?.data || error.message);
//       setErrors({
//         submit: error.response?.data?.message || 'Something went wrong. Please try again.',
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         email: 'operator@gmail.com',
//         password: 'Password#910',
//         submit: null,
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//         password: Yup.string().max(255).required('Password is required'),
//       })}
//       onSubmit={handleLogin}
//     >
//       {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//         <form noValidate onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <label htmlFor="email" className="text-start w-100 text-black">Email</label>
//             <input
//               className="form-control"
//               name="email"
//               id="email"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="email"
//               value={values.email}
//             />
//             {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
//           </div>
//           <div className="form-group mb-4">
//             <label htmlFor="password" className="text-start w-100 text-black">Password</label>
//             <input
//               className="form-control"
//               name="password"
//               id="password"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="password"
//               value={values.password}
//             />
//             {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
//           </div>

//           {/* <div className="custom-control custom-checkbox text-start mb-4 mt-2">
//             <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
//             <label className="custom-control-label" htmlFor="customCheck1">
//               Save credentials.
//             </label>
//           </div> */}

//           {errors.submit && (
//             <Col sm={12}>
//               <Alert variant="danger">{errors.submit}</Alert>
//             </Col>
//           )}

//           <Row>
//             <Col mt={2}>
//               <Button
//                 className="btn-block mb-4"
//                 disabled={isSubmitting}
//                 size="large"
//                 type="submit"
//                 variant="primary"
//               >
//                 {isSubmitting ? 'Logging in...' : 'Login'}
//               </Button>
//             </Col>
//           </Row>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default JWTLogin;



// import React, { useContext, useState, useEffect, useRef } from 'react';
// import { Row, Col, Alert, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import axios from 'axios';
// import { AuthContext } from '../../../contexts/authContext';
// import './login.scss';

// const JWTLogin = () => {
//   const [captchaText, setCaptchaText] = useState('');
//   const [userCaptchaInput, setUserCaptchaInput] = useState(''); // State for user input
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     initializeCaptcha(ctx);
//   }, []);

//   const generateRandomChar = (min, max) =>
//     String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

//   const generateCaptchaText = () => {
//     let captcha = '';
//     for (let i = 0; i < 3; i++) {
//       captcha += generateRandomChar(65, 90);
//       captcha += generateRandomChar(97, 122);
//       captcha += generateRandomChar(48, 57);
//     }
//     return captcha.split('').sort(() => Math.random() - 0.5).join('');
//   };

//   const drawCaptchaOnCanvas = (ctx, captcha) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
//     const letterSpace = 150 / captcha.length;
//     for (let i = 0; i < captcha.length; i++) {
//       const xInitialSpace = 25;
//       ctx.font = '20px Roboto Mono';
//       ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
//       ctx.fillText(captcha[i], xInitialSpace + i * letterSpace,
//         Math.floor(Math.random() * 16 + 25), 100);
//     }
//   };

//   const initializeCaptcha = (ctx) => {
//     const newCaptcha = generateCaptchaText();
//     setCaptchaText(newCaptcha);
//     drawCaptchaOnCanvas(ctx, newCaptcha);
//   };

//   const navigate = useNavigate();
//   const { dispatch } = useContext(AuthContext);

//   const handleLogin = async (values, { setSubmitting, setErrors }) => {
//     try {
//       // Check if the captcha is correct
//       if (userCaptchaInput !== captchaText) {
//         setErrors({ captcha: 'Captcha is incorrect' });
//         setSubmitting(false);
//         return;
//       }

//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//       const response = await axios.post(
//         `${API_BASE_URL}/api/login`,
//         {
//           email: values.email,
//           password: values.password,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (response.status === 200) {
//         const user = response.data.user;
//         const token = response.data.access_token;

//         dispatch({
//           type: 'LOGIN',
//           payload: { user, token },
//         });

//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(user));

//         console.log('Login successful:', user);
//         navigate('/dashboard');
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//       setErrors({
//         submit: error.response?.data?.message || 'Something went wrong. Please try again.',
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         email: 'operator@gmail.com',
//         password: 'Password#910',
//         submit: null,
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//         password: Yup.string().max(255).required('Password is required'),
//       })}
//       onSubmit={handleLogin}
//     >
//       {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//         <form noValidate onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <label htmlFor="email" className="text-start w-100 text-black">Email</label>
//             <input
//               className="form-control"
//               name="email"
//               id="email"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="email"
//               value={values.email}
//             />
//             {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
//           </div>

//           <div className="form-group mb-4">
//             <label htmlFor="password" className="text-start w-100 text-black">Password</label>
//             <input
//               className="form-control"
//               name="password"
//               id="password"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="password"
//               value={values.password}
//             />
//             {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
//           </div>

//           {errors.submit && (
//             <Col sm={12}>
//               <Alert variant="danger">{errors.submit}</Alert>
//             </Col>
//           )}

//           <div>
//             <h2 className="heading" style={{ fontSize: "14px", width: "100%", textAlign: "start" }}>
//               Captcha
//             </h2>
//             <div className="container">
//               <div className="wrapper">
//                 <canvas ref={canvasRef} width="200" height="70"></canvas>
//                 <button
//                   id="reload-button"
//                   type="button"
//                   onClick={() => {
//                     setUserCaptchaInput(''); // Reset user input on reload
//                     initializeCaptcha(canvasRef.current.getContext('2d'));
//                   }}
//                 >
//                   Reload
//                 </button>
//               </div>
//               <input
//                 type="text"
//                 id="user-input"
//                 placeholder="Enter the text in the image"
//                 value={userCaptchaInput} // Bind captcha input value to state
//                 onChange={(e) => setUserCaptchaInput(e.target.value)} // Update state on input change
//                 onBlur={handleBlur}
//               />
//               {touched.captcha && errors.captcha && <small className="text-danger form-text">{errors.captcha}</small>}
//             </div>
//           </div>

//           <Row style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
//             <Col mt={2}>
//               <Button
//                 className="btn-block mb-4"
//                 disabled={isSubmitting}
//                 size="large"
//                 type="submit"
//                 variant="primary"
//               >
//                 {isSubmitting ? 'Logging in...' : 'Login'}
//               </Button>
//             </Col>
//           </Row>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default JWTLogin;






import React, { useContext, useState, useEffect, useRef } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { AuthContext } from '../../../contexts/authContext';
import './login.scss';

const JWTLogin = () => {
  const [captchaText, setCaptchaText] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState(''); // State for user input
  const [captchaError, setCaptchaError] = useState(''); // State for captcha error message
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initializeCaptcha(ctx);
  }, []);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = '';
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha.split('').sort(() => Math.random() - 0.5).join('');
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = '20px Roboto Mono';
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(captcha[i], xInitialSpace + i * letterSpace,
        Math.floor(Math.random() * 16 + 25), 100);
    }
  };

  const initializeCaptcha = (ctx) => {
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      // Check if the captcha is correct
      if (userCaptchaInput !== captchaText) {
        setCaptchaError('Incorrect captcha'); // Set captcha error message
        setSubmitting(false);
        return;
      }

      setCaptchaError(''); // Reset captcha error if the captcha is correct

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

      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.access_token;

        dispatch({
          type: 'LOGIN',
          payload: { user, token },
        });

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Login successful:', user);
        navigate('/dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
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

          {/* Display Captcha Error Alert */}
          {captchaError && (
            <Col sm={12}>
              <Alert variant="danger">{captchaError}</Alert>
            </Col>
          )}

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <div>
            <h2 className="heading" style={{ fontSize: "14px", width: "100%", textAlign: "start" }}>
              Captcha
            </h2>
            <div className="container">
              <div className="wrapper">
                <canvas ref={canvasRef} width="200" height="70"></canvas>
                <button
                  id="reload-button"
                  type="button"
                  onClick={() => {
                    setUserCaptchaInput(''); // Reset user input on reload
                    initializeCaptcha(canvasRef.current.getContext('2d'));
                    setCaptchaError(''); // Reset captcha error
                  }}
                >
                  Reload
                </button>
              </div>
              <input
                type="text"
                id="user-input"
                placeholder="Enter the text in the image"
                value={userCaptchaInput} // Bind captcha input value to state
                onChange={(e) => setUserCaptchaInput(e.target.value)} // Update state on input change
                onBlur={handleBlur}
              />
            </div>
          </div>

          <Row style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
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
