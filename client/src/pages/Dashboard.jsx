import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import AddApplicationModal from '../components/AddApplicationModal';
import ApplicationTable from '../components/ApplicationTable';
import KanbanBoard from '../components/KanbanBoard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('kanban'); // 'kanban' or 'table'

  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  };

  const fetchApplications = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${API_URL}/api/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (err) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();

    // Browser notification for follow-ups due today
    const today = new Date().toISOString().split('T')[0];
    const due = applications.filter(a => a.follow_up_date === today);
    if (due.length > 0 && Notification.permission === 'granted') {
      new Notification(`📬 ${due.length} follow-up(s) due today!`);
    } else if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleAdd = async (form) => {
    try {
      const token = await getToken();
      const res = await axios.post(`${API_URL}/api/applications`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications([res.data, ...applications]);
      setShowModal(false);
      toast.success('Application added!');
    } catch (err) {
      toast.error('Failed to add application');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(applications.filter(a => a.id !== id));
      toast.success('Application deleted!');
    } catch (err) {
      toast.error('Failed to delete application');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = await getToken();
      const res = await axios.put(`${API_URL}/api/applications/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(applications.map(a => a.id === id ? res.data : a));
      toast.success('Status updated!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Toaster />
      <Navbar />

      <div style={{ padding: '2rem' }}>
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>My Applications ({applications.length})</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* View Toggle */}
            <div style={{ display: 'flex', backgroundColor: '#ddd', borderRadius: '6px', overflow: 'hidden' }}>
              <button
                onClick={() => setView('kanban')}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: view === 'kanban' ? '#1e1e2e' : 'transparent',
                  color: view === 'kanban' ? 'white' : 'black'
                }}>
                Kanban
              </button>
              <button
                onClick={() => setView('table')}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: view === 'table' ? '#1e1e2e' : 'transparent',
                  color: view === 'table' ? 'white' : 'black'
                }}>
                Table
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
              + Add Application
            </button>
          </div>
        </div>

        {/* View */}
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : view === 'kanban' ? (
          <KanbanBoard
            applications={applications}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ) : (
          <ApplicationTable
            applications={applications}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddApplicationModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default Dashboard;