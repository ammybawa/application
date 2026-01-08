import { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, Eye } from 'lucide-react';
import clsx from 'clsx';
import { applications as initialApplications } from '../data/applications';
import { Application } from '../types';
import AddApplicationModal from '../components/AddApplicationModal';

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'IGA' | 'SSO' | 'PAM'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddApplication = (newApp: Application) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleDeleteApplication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Applications</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            {(['all', 'IGA', 'SSO', 'PAM'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={clsx(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800">{applications.length}</div>
          <div className="text-sm text-slate-500">Total Applications</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{applications.filter(a => a.category === 'IGA').length}</div>
          <div className="text-sm text-slate-500">IGA Applications</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{applications.filter(a => a.category === 'SSO').length}</div>
          <div className="text-sm text-slate-500">SSO Applications</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-purple-600">{applications.filter(a => a.category === 'PAM').length}</div>
          <div className="text-sm text-slate-500">PAM Applications</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Application Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app, index) => (
              <tr
                key={app.id}
                className={clsx(
                  'border-b border-slate-50 hover:bg-slate-50 transition-colors',
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-semibold', app.gradient)}>
                      {app.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-700">{app.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 capitalize">{app.type}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    'px-2.5 py-1 text-xs font-medium rounded-full',
                    app.category === 'IGA' && 'bg-blue-100 text-blue-700',
                    app.category === 'SSO' && 'bg-green-100 text-green-700',
                    app.category === 'PAM' && 'bg-purple-100 text-purple-700'
                  )}>
                    {app.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[100px] h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full',
                          app.status === 0 ? 'bg-slate-300' :
                          app.status < 50 ? 'bg-amber-500' :
                          app.status < 100 ? 'bg-blue-500' : 'bg-green-500'
                        )}
                        style={{ width: `${app.status}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600">{app.status}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-green-500" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteApplication(app.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-red-500" 
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No applications found</div>
            <p className="text-slate-500 text-sm mt-2">
              Try adjusting your search filters or add a new application
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="inline mr-2" />
              Add Application
            </button>
          </div>
        )}
      </div>

      {/* Add Application Modal */}
      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddApplication}
      />
    </div>
  );
}
