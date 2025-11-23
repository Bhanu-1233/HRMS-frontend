import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import EmployeeForm from '../components/employees/EmployeeForm';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const [empRes, teamRes] = await Promise.all([
      axiosClient.get('/employees'),
      axiosClient.get('/teams')
    ]);
    setEmployees(empRes.data);
    setTeams(teamRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    await axiosClient.delete(`/employees/${id}`);
    load();
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 2 }}>
        <h2>Employees</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Teams</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>
                    {e.firstName} {e.lastName}
                  </td>
                  <td>{e.email}</td>
                  <td>{e.position}</td>
                  <td>{e.teams.map((t) => t.team.name).join(', ')}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: '0.25rem' }}
                      onClick={() => setSelected(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5">No employees yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h3>{selected ? 'Edit Employee' : 'Add Employee'}</h3>
        <EmployeeForm
          employee={selected}
          teams={teams}
          onSaved={() => {
            setSelected(null);
            load();
          }}
        />
      </div>
    </div>
  );
}
