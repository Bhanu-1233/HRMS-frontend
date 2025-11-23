import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

export default function EmployeeForm({ employee, teams, onSaved }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    teamIds: []
  });

  useEffect(() => {
    if (employee) {
      setForm({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position || '',
        teamIds: employee.teams?.map((t) => t.team.id) || []
      });
    } else {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        teamIds: []
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleTeamChange = (e) => {
    const options = Array.from(e.target.options);
    const selected = options.filter((o) => o.selected).map((o) => Number(o.value));
    setForm((f) => ({ ...f, teamIds: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let saved;
    if (employee) {
      const res = await axiosClient.put(`/employees/${employee.id}`, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        position: form.position
      });
      saved = res.data;
    } else {
      const res = await axiosClient.post('/employees', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        position: form.position
      });
      saved = res.data;
    }

    // assign teams (can be empty array)
    await axiosClient.post(`/employees/${saved.id}/teams`, {
      teamIds: form.teamIds
    });

    onSaved();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Position</label>
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Teams (multi-select)</label>
        <select
          multiple
          value={form.teamIds}
          onChange={handleTeamChange}
          size={Math.min(teams.length || 4, 6)}
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        {employee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
}
