import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1e1e2e',
      color: 'white'
    }}>
      <h2 style={{ margin: 0 }}>🗂️ Job Tracker</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.9rem' }}>{user?.email}</span>
        <button
          onClick={logout}
          style={{
            padding: '0.4rem 1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;