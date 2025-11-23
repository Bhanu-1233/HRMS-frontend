import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

export default function RegisterOrgPage() {
  const [form, setForm] = useState({
    orgName: '',
    adminName: '',
    adminEmail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosClient.post('/auth/register-org', form);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container card">
      <h2>Register Organization</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Organization Name</label>
          <input
            name="orgName"
            value={form.orgName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Admin Name</label>
          <input
            name="adminName"
            value={form.adminName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Admin Email</label>
          <input
            name="adminEmail"
            type="email"
            value={form.adminEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div style={{ color: 'red', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            {error}
          </div>
        )}
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
