import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

export default function TeamForm({ team, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (team) {
      setForm({
        name: team.name,
        description: team.description || ''
      });
    } else {
      setForm({
        name: '',
        description: ''
      });
    }
  }, [team]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (team) {
      await axiosClient.put(`/teams/${team.id}`, form);
    } else {
      await axiosClient.post('/teams', form);
    }
    onSaved();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Team Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button className="btn btn-primary" type="submit">
        {team ? 'Update Team' : 'Add Team'}
      </button>
    </form>
  );
}
