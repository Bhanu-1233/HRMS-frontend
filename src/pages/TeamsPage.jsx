import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import TeamForm from '../components/teams/TeamForm';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const res = await axiosClient.get('/teams');
    setTeams(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team?')) return;
    await axiosClient.delete(`/teams/${id}`);
    load();
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 2 }}>
        <h2>Teams</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.description}</td>
                  <td>{t.members.map((m) => m.employee.firstName).join(', ')}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: '0.25rem' }}
                      onClick={() => setSelected(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {teams.length === 0 && (
                <tr>
                  <td colSpan="4">No teams yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h3>{selected ? 'Edit Team' : 'Add Team'}</h3>
        <TeamForm
          team={selected}
          onSaved={() => {
            setSelected(null);
            load();
          }}
        />
      </div>
    </div>
  );
}
