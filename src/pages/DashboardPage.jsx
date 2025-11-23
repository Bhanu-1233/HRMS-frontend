import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function DashboardPage() {
  const [counts, setCounts] = useState({ employees: 0, teams: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [empRes, teamRes] = await Promise.all([
          axiosClient.get('/employees'),
          axiosClient.get('/teams')
        ]);
        setCounts({
          employees: empRes.data.length,
          teams: teamRes.data.length
        });
      } catch {
        // ignore
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="card">
          <strong>Total Employees</strong>
          <div style={{ fontSize: '1.5rem' }}>{counts.employees}</div>
        </div>
        <div className="card">
          <strong>Total Teams</strong>
          <div style={{ fontSize: '1.5rem' }}>{counts.teams}</div>
        </div>
      </div>
    </div>
  );
}
