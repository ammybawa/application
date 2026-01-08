import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Edit, Trash2, Eye, X, ChevronDown, Play } from 'lucide-react';
import clsx from 'clsx';
import { Application } from '../types';
import AddApplicationModal from '../components/AddApplicationModal';
import { useApplications } from '../context/ApplicationContext';

// Edit/View Modal Component
function ApplicationModal({ 
  isOpen, 
  onClose, 
  application, 
  mode,
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  application: Application | null;
  mode: 'view' | 'edit';
  onSave?: (updates: Partial<Application>) => void;
}) {
  const [editData, setEditData] = useState<Partial<Application>>({});

  if (!isOpen || !application) return null;

  const handleSave = () => {
    if (onSave && Object.keys(editData).length > 0) {
      onSave(editData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className={clsx(
          'px-6 py-4 flex items-center justify-between',
          mode === 'view' ? 'bg-blue-600' : 'bg-green-600'
        )}>
          <h2 className="text-xl font-bold text-white">
            {mode === 'view' ? 'Application Details' : 'Edit Application'}
          </h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* App Icon & Name */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
            <div className={clsx(
              'w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold',
              application.gradient
            )}>
              {application.name.charAt(0)}
            </div>
            <div>
              {mode === 'view' ? (
                <>
                  <h3 className="text-xl font-semibold text-slate-800">{application.name}</h3>
                  <p className="text-slate-500">{application.type}</p>
                </>
              ) : (
                <input
                  type="text"
                  defaultValue={application.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="text-xl font-semibold text-slate-800 border border-slate-300 rounded-lg px-3 py-1 focus:outline-none focus:border-green-500"
                />
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              {mode === 'view' ? (
                <span className={clsx(
                  'px-3 py-1 text-sm font-medium rounded-full',
                  application.category === 'IGA' && 'bg-blue-100 text-blue-700',
                  application.category === 'SSO' && 'bg-green-100 text-green-700',
                  application.category === 'PAM' && 'bg-purple-100 text-purple-700'
                )}>
                  {application.category}
                </span>
              ) : (
                <select
                  defaultValue={application.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value as 'IGA' | 'SSO' | 'PAM' })}
                  className="border border-slate-300 rounded-lg px-3 py-1 focus:outline-none focus:border-green-500"
                >
                  <option value="IGA">IGA</option>
                  <option value="SSO">SSO</option>
                  <option value="PAM">PAM</option>
                </select>
              )}
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Connection Type:</span>
              {mode === 'view' ? (
                <span className="text-slate-700 capitalize">{application.type}</span>
              ) : (
                <select
                  defaultValue={application.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value as Application['type'] })}
                  className="border border-slate-300 rounded-lg px-3 py-1 focus:outline-none focus:border-green-500"
                >
                  <option value="mysql">MySQL</option>
                  <option value="oracle">Oracle</option>
                  <option value="sqlserver">SQL Server</option>
                  <option value="activedirectory">Active Directory</option>
                  <option value="salesforce">Salesforce</option>
                  <option value="custom">Custom</option>
                </select>
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Onboarding Status:</span>
              <div className="flex items-center gap-2">
                {mode === 'edit' && (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={application.status}
                    onChange={(e) => setEditData({ ...editData, status: parseInt(e.target.value) || 0 })}
                    className="w-16 border border-slate-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:border-green-500"
                  />
                )}
                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={clsx(
                      'h-full rounded-full',
                      application.status >= 100 ? 'bg-green-500' :
                      application.status > 50 ? 'bg-blue-500' :
                      application.status > 0 ? 'bg-amber-500' : 'bg-slate-300'
                    )}
                    style={{ width: `${editData.status ?? application.status}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {editData.status ?? application.status}%
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Application ID:</span>
              <span className="text-slate-700 font-mono text-sm">{application.id}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100"
          >
            {mode === 'view' ? 'Close' : 'Cancel'}
          </button>
          {mode === 'edit' && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Applications() {
  const navigate = useNavigate();
  const { applications, addApplication, updateApplication, deleteApplication } = useApplications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'IGA' | 'SSO' | 'PAM'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (app: Application) => {
    setSelectedApp(app);
    setModalMode('view');
  };

  const handleEdit = (app: Application) => {
    setSelectedApp(app);
    setModalMode('edit');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
    }
  };

  const handleStartOnboarding = (app: Application) => {
    navigate(`/questionnaire/${app.id}`);
  };

  const handleSave = (updates: Partial<Application>) => {
    if (selectedApp) {
      updateApplication(selectedApp.id, updates);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Applications</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
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
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      onClick={() => handleView(app)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-slate-400 hover:text-blue-600" 
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(app)}
                      className="p-2 hover:bg-green-100 rounded-lg transition-colors text-slate-400 hover:text-green-600" 
                      title="Edit Application"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleStartOnboarding(app)}
                      className="p-2 hover:bg-cyan-100 rounded-lg transition-colors text-slate-400 hover:text-cyan-600" 
                      title="Start Onboarding"
                    >
                      <Play size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors text-slate-400 hover:text-red-600" 
                      title="Delete Application"
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
              onClick={() => setIsAddModalOpen(true)}
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
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addApplication}
      />

      {/* View/Edit Application Modal */}
      <ApplicationModal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        application={selectedApp}
        mode={modalMode}
        onSave={handleSave}
      />
    </div>
  );
}
