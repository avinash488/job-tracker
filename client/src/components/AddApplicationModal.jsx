import { useState } from 'react';

const AddApplicationModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    applied_date: '',
    follow_up_date: '',
    job_url: '',
    location: '',
    salary_range: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ marginTop: 0 }}>Add New Application</h3>
        <form onSubmit={handleSubmit}>
          <label>Company *</label>
          <input name="company" value={form.company} onChange={handleChange} required style={inputStyle} />

          <label>Role *</label>
          <input name="role" value={form.role} onChange={handleChange} required style={inputStyle} />

          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Ghosted</option>
          </select>

          <label>Applied Date</label>
          <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange} style={inputStyle} />

          <label>Follow-up Date</label>
          <input type="date" name="follow_up_date" value={form.follow_up_date} onChange={handleChange} style={inputStyle} />

          <label>Job URL</label>
          <input name="job_url" value={form.job_url} onChange={handleChange} style={inputStyle} />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} style={inputStyle} />

          <label>Salary Range</label>
          <input name="salary_range" value={form.salary_range} onChange={handleChange} style={inputStyle} />

          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} style={inputStyle} />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{
              padding: '0.5rem 1.5rem', backgroundColor: '#ccc',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>
              Cancel
            </button>
            <button type="submit" style={{
              padding: '0.5rem 1.5rem', backgroundColor: '#2ecc71',
              color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationModal;