import { useState } from 'react';
import { X } from 'lucide-react';

const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400";
const labelClass = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide";

const AddApplicationModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    applied_date: '',
    follow_up_date: '',
    job_url: '',
    location: '',
    salary_range: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">New Application</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Company + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company *</label>
              <input name="company" value={form.company} onChange={handleChange} required placeholder="Google" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Role *</label>
              <input name="role" value={form.role} onChange={handleChange} required placeholder="Frontend Developer" className={inputClass} />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Ghosted</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Applied Date</label>
              <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Follow-up Date</label>
              <input type="date" name="follow_up_date" value={form.follow_up_date} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Job URL */}
          <div>
            <label className={labelClass}>Job URL</label>
            <input name="job_url" value={form.job_url} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>

          {/* Location + Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Remote / Bangalore" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Salary Range</label>
              <input name="salary_range" value={form.salary_range} onChange={handleChange} placeholder="10-15 LPA" className={inputClass} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any additional notes..." className={inputClass} />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
            >
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationModal;