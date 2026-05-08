const statusColors = {
  Applied: '#3498db',
  Interview: '#f39c12',
  Offer: '#2ecc71',
  Rejected: '#e74c3c',
  Ghosted: '#95a5a6'
};

const ApplicationTable = ({ applications, onDelete, onStatusChange }) => {
  if (applications.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>No applications yet. Add one!</p>;
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e1e2e', color: 'white' }}>
            <th style={th}>Company</th>
            <th style={th}>Role</th>
            <th style={th}>Status</th>
            <th style={th}>Applied Date</th>
            <th style={th}>Follow-up</th>
            <th style={th}>Location</th>
            <th style={th}>Salary</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={td}>
                {app.job_url
                  ? <a href={app.job_url} target="_blank" rel="noreferrer">{app.company}</a>
                  : app.company}
              </td>
              <td style={td}>{app.role}</td>
              <td style={td}>
                <select
                  value={app.status}
                  onChange={(e) => onStatusChange(app.id, e.target.value)}
                  style={{
                    backgroundColor: statusColors[app.status],
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer'
                  }}>
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Ghosted</option>
                </select>
              </td>
              <td style={td}>{app.applied_date || '—'}</td>
              <td style={td}>{app.follow_up_date || '—'}</td>
              <td style={td}>{app.location || '—'}</td>
              <td style={td}>{app.salary_range || '—'}</td>
              <td style={td}>
                <button
                  onClick={() => onDelete(app.id)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const th = {
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: '600'
};

const td = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #eee'
};

export default ApplicationTable;