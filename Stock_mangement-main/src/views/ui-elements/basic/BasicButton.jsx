import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceiverCRUD = () => {
  const [receivers, setReceivers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    gst_no: '',
    pan_no: '',
    reg_address: '',
    work_address: '',
    area: '',
    tel_no: '',
    email: '',
    owner_mobile: '',
    status: 0,
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedReceivers = receivers.map((receiver, index) =>
        index === editIndex ? formData : receiver
      );
      setReceivers(updatedReceivers);
      setEditIndex(null);
    } else {
      setReceivers([...receivers, formData]);
    }
    setFormData({
      name: '',
      code: '',
      gst_no: '',
      pan_no: '',
      reg_address: '',
      work_address: '',
      area: '',
      tel_no: '',
      email: '',
      owner_mobile: '',
      status: 0,
    });
  };

  const handleEdit = (index) => {
    setFormData(receivers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedReceivers = receivers.filter((_, i) => i !== index);
    setReceivers(updatedReceivers);
  };

  const formStyle = {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    borderRadius: '8px',
    border: '1px solid #ced4da',
    padding: '12px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  };

  const buttonStyle = {
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
  };

  const tableContainerStyle = {
    marginTop: '40px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const tableStyle = {
    width: '100%',
    marginBottom: '1rem',
    color: '#212529',
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    verticalAlign: 'middle',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '12px',
    verticalAlign: 'middle',
    textAlign: 'left',
    borderTop: '1px solid #dee2e6',
  };

  const tableRowHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">Receiver Management</h2>
      
      <form className="form-container" style={formStyle} onSubmit={(e) => e.preventDefault()}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Receiver Name"
            value={formData.name}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="code"
            placeholder="Code"
            value={formData.code}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="gst_no"
            placeholder="GST No"
            value={formData.gst_no}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="pan_no"
            placeholder="PAN No"
            value={formData.pan_no}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="reg_address"
            placeholder="Registered Address"
            value={formData.reg_address}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="work_address"
            placeholder="Work Address"
            value={formData.work_address}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="tel_no"
            placeholder="Telephone No"
            value={formData.tel_no}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            className="form-control"
            type="text"
            name="owner_mobile"
            placeholder="Owner Mobile"
            value={formData.owner_mobile}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style = inputFocusStyle}
          />
        </div>
        <button
          type="button"
          className="btn btn-lg btn-primary w-100"
          onClick={handleAddOrUpdate}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
        >
          {editIndex !== null ? 'Update Receiver' : 'Add Receiver'}
        </button>
      </form>

      <div className="table-container mt-5" style={tableContainerStyle}>
        <table className="table" style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {receivers.map((receiver, index) => (
              <tr key={index} style={tableRowHoverStyle}>
                <td style={tdStyle}>{receiver.name}</td>
                <td style={tdStyle}>{receiver.code}</td>
                <td style={tdStyle}>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(index)}
                    style={buttonStyle}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                    style={buttonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiverCRUD;
