import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>HRMS</h2>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/logs">Logs</NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <div className="topbar">
          <div>
            <strong>{user?.organizationId && 'Organization Admin'}</strong>
          </div>
          <div>
            {user && (
              <>
                <span style={{ marginRight: '0.5rem' }}>
                  {user.name} ({user.email})
                </span>
                <button className="btn btn-secondary" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
