import { Trash2, ExternalLink } from 'lucide-react';

const statusStyles = {
  Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Interview: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Offer: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Ghosted: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const ApplicationTable = ({ applications, onDelete, onStatusChange }) => {
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-600">
        <p className="text-lg font-medium">No applications yet</p>
        <p className="text-sm">Click Add Application to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Company</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Role</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Applied</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Follow-up</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Location</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Salary</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className={`border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  index % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/30'
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                  <div className="flex items-center gap-1.5">
                    {app.company}
                    {app.job_url && (
                      <a href={app.job_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{app.role}</td>
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) => onStatusChange(app.id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border-none cursor-pointer focus:outline-none ${statusStyles[app.status]}`}
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                    <option>Ghosted</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{app.applied_date || '—'}</td>
                <td className="px-4 py-3 text-orange-500 dark:text-orange-400 font-medium">{app.follow_up_date || '—'}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{app.location || '—'}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{app.salary_range || '—'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDelete(app.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;