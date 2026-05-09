import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { LayoutGrid, Table, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import AddApplicationModal from '../components/AddApplicationModal';
import ApplicationTable from '../components/ApplicationTable';
import KanbanBoard from '../components/KanbanBoard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusColors = {
  Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Interview: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Offer: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Ghosted: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('kanban');

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Toaster />
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{status}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {applications.filter(a => a.status === status).length}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{status}</span>
            </div>
          ))}
        </div>

        {/* Header Row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            All Applications
            <span className="ml-2 text-sm font-normal text-gray-400">({applications.length})</span>
          </h2>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setView('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === 'kanban'
                    ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                <LayoutGrid size={15} />
                Kanban
              </button>
              <button
                onClick={() => setView('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === 'table'
                    ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                <Table size={15} />
                Table
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              <Plus size={16} />
              Add Application
            </button>
          </div>
        </div>

        {/* View */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
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