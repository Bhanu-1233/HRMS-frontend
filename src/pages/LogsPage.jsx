import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  const load = async () => {
    const res = await axiosClient.get('/logs?limit=100');
    setLogs(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Audit Logs</h2>
      <div className="card" style={{ marginTop: '0.5rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Action</th>
              <th>User</th>
              <th>Entity</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
                <td>{log.action}</td>
                <td>{log.user?.email || '-'}</td>
                <td>
                  {log.entityType} #{log.entityId || '-'}
                </td>
                <td>{log.message}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="5">No logs yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
