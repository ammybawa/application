import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Application } from '../types';

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (application: Application) => void;
}

const gradientOptions = [
  { value: 'gradient-blue', label: 'Blue', color: '#3b82f6' },
  { value: 'gradient-cyan', label: 'Cyan', color: '#06b6d4' },
  { value: 'gradient-orange', label: 'Orange', color: '#f97316' },
  { value: 'gradient-purple', label: 'Purple', color: '#8b5cf6' },
  { value: 'gradient-pink', label: 'Pink', color: '#ec4899' },
  { value: 'gradient-coral', label: 'Coral', color: '#f43f5e' },
  { value: 'gradient-green', label: 'Green', color: '#22c55e' },
  { value: 'gradient-brown', label: 'Brown', color: '#a16207' },
  { value: 'gradient-slate', label: 'Slate', color: '#64748b' },
  { value: 'gradient-teal', label: 'Teal', color: '#14b8a6' },
];

const databaseTypes: { value: 'mysql' | 'oracle' | 'sqlserver' | 'activedirectory' | 'salesforce' | 'custom'; label: string }[] = [
  { value: 'mysql', label: 'MySQL' },
  { value: 'oracle', label: 'Oracle' },
  { value: 'sqlserver', label: 'SQL Server' },
  { value: 'activedirectory', label: 'Active Directory' },
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'custom', label: 'Custom / API (LDAP, ServiceNow, etc.)' },
];

const categories = [
  { value: 'IGA', label: 'IGA (Identity Governance & Administration)' },
  { value: 'SSO', label: 'SSO (Single Sign-On)' },
  { value: 'PAM', label: 'PAM (Privileged Access Management)' },
];

export default function AddApplicationModal({ isOpen, onClose, onAdd }: AddApplicationModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    type: 'mysql' | 'oracle' | 'sqlserver' | 'activedirectory' | 'salesforce' | 'custom';
    category: 'IGA' | 'SSO' | 'PAM';
    gradient: string;
    description: string;
    owner: string;
    hostname: string;
    port: string;
  }>({
    name: '',
    type: 'mysql',
    category: 'IGA',
    gradient: 'gradient-blue',
    description: '',
    owner: '',
    hostname: '',
    port: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Application name is required';
    }
    if (!formData.owner.trim()) {
      newErrors.owner = 'Application owner email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.owner)) {
      newErrors.owner = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newApp: Application = {
      id: formData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: formData.name,
      icon: 'custom',
      type: formData.type,
      status: 0,
      gradient: formData.gradient,
      category: formData.category,
    };

    onAdd(newApp);
    
    // Reset form
    setFormData({
      name: '',
      type: 'mysql' as const,
      category: 'IGA' as const,
      gradient: 'gradient-blue',
      description: '',
      owner: '',
      hostname: '',
      port: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Add New Application</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Application Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Application Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Salesforce, SAP, Oracle HCM"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the application..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Owner Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Application Owner Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="owner@company.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.owner ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.owner && <p className="mt-1 text-sm text-red-500">{errors.owner}</p>}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Database/Connection Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Connection Type
                </label>
                <div className="relative">
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'mysql' | 'oracle' | 'sqlserver' | 'activedirectory' | 'salesforce' | 'custom' })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {databaseTypes.map((db) => (
                      <option key={db.value} value={db.value}>
                        {db.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'IGA' | 'SSO' | 'PAM' })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Connection Details (Optional) */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Connection Details (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hostname
                  </label>
                  <input
                    type="text"
                    value={formData.hostname}
                    onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
                    placeholder="db.example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Port
                  </label>
                  <input
                    type="text"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    placeholder="3306"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Card Color */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Card Color
              </label>
              <div className="flex flex-wrap gap-2">
                {gradientOptions.map((gradient) => (
                  <button
                    key={gradient.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, gradient: gradient.value })}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      formData.gradient === gradient.value
                        ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: gradient.color }}
                    title={gradient.label}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-slate-200 pt-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Preview
              </label>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg ${formData.gradient}`}
                >
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {formData.name || 'Application Name'}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {formData.type} • {formData.category}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    formData.category === 'IGA' ? 'bg-blue-100 text-blue-700' :
                    formData.category === 'SSO' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {formData.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
            >
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

