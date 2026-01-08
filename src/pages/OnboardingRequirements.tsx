import { useState } from 'react';
import { RefreshCw, X, Download, FolderOpen, FileText, Edit, FileDown, ChevronDown, Info, Check, Plus } from 'lucide-react';
import clsx from 'clsx';
import { generateOnboardingPDF, sampleOnboardingData } from '../utils/pdfExport';
import { applications as globalApplications } from '../data/applications';
import { Application } from '../types';

interface DocumentCategory {
  name: string;
  files: { name: string; type: string }[];
}

interface ApplicationRequirement {
  id: string;
  displayName: string;
  icon: string;
  iconBg: string;
  status: string;
  progress: number;
  documents: DocumentCategory[];
}

// Convert global applications to the onboarding requirements format
const convertToRequirements = (apps: Application[]): ApplicationRequirement[] => {
  return apps.map((app, index) => ({
    id: `IDXP-${String(index + 1).padStart(2, '0')}`,
    displayName: app.name,
    icon: app.type,
    iconBg: getIconBg(app.gradient),
    status: app.status === 0 ? 'Identified' : 
            app.status < 50 ? 'Information Collection In Progress' : 
            app.status < 100 ? 'Information Collection Completed' : 'Onboarding Completed',
    progress: app.status,
    documents: []
  }));
};

const getIconBg = (gradient: string): string => {
  switch (gradient) {
    case 'gradient-blue': return 'bg-blue-50';
    case 'gradient-cyan': return 'bg-cyan-50';
    case 'gradient-orange': return 'bg-orange-50';
    case 'gradient-purple': return 'bg-purple-50';
    case 'gradient-pink': return 'bg-pink-50';
    case 'gradient-coral': return 'bg-red-50';
    case 'gradient-green': return 'bg-green-50';
    case 'gradient-brown': return 'bg-amber-50';
    case 'gradient-slate': return 'bg-slate-100';
    case 'gradient-teal': return 'bg-teal-50';
    default: return 'bg-slate-50';
  }
};

const AppIcon = ({ icon, name }: { icon: string; name: string }) => {
  const firstChar = name.charAt(0).toUpperCase();
  
  switch (icon) {
    case 'activedirectory':
      return (
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 48 48" className="w-8 h-8">
            <rect fill="#00adef" x="2" y="2" width="20" height="20" />
            <rect fill="#7fba00" x="26" y="2" width="20" height="20" />
            <rect fill="#f25022" x="2" y="26" width="20" height="20" />
            <rect fill="#ffb900" x="26" y="26" width="20" height="20" />
          </svg>
          <span className="text-[8px] text-blue-600 mt-1">Active Directory</span>
        </div>
      );
    case 'mysql':
      return (
        <div className="text-center">
          <span className="text-[#00758f] font-bold text-sm">My</span>
          <span className="text-[#f29111] font-bold text-sm">SQL</span>
        </div>
      );
    case 'oracle':
      return (
        <div className="text-center">
          <div className="text-[#c74634] font-bold text-xs">ORACLE</div>
          <div className="text-slate-500 text-[7px] leading-tight">DATABASE</div>
        </div>
      );
    case 'sqlserver':
      return (
        <div className="flex flex-col items-center">
          <div className="text-center">
            <div className="text-[10px] text-slate-500 font-semibold">SQL</div>
            <div className="text-[8px] text-slate-400">Server</div>
          </div>
        </div>
      );
    case 'salesforce':
      return (
        <div className="bg-[#00a1e0] text-white px-2 py-1 rounded text-[10px] font-medium">
          salesforce
        </div>
      );
    case 'custom':
    default:
      return (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          {firstChar}
        </div>
      );
  }
};

export default function OnboardingRequirements() {
  // Use global applications, converted to the requirements format
  const [applications] = useState<ApplicationRequirement[]>(
    convertToRequirements(globalApplications)
  );
  const [selectedApp, setSelectedApp] = useState<ApplicationRequirement | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('SailPoint IdentityIQ');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportPDF = (app: ApplicationRequirement) => {
    const exportData = {
      ...sampleOnboardingData,
      applicationName: app.displayName
    };
    generateOnboardingPDF(exportData);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {downloadSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full shadow-lg">
          <Check size={20} />
          <span>Successfully downloaded</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-700">Onboarding Requirements</h1>
        <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={40} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Applications Yet</h3>
          <p className="text-slate-500 mb-6">
            Add applications through the Applications page to see them here for onboarding.
          </p>
          <a 
            href="/applications" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Go to Applications
          </a>
        </div>
      ) : (
        /* Table */
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Application ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Application Display Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-slate-600">Requirements</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{app.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={clsx('w-14 h-14 rounded-lg flex items-center justify-center', app.iconBg)}>
                        <AppIcon icon={app.icon} name={app.displayName} />
                      </div>
                      <span className="text-sm text-slate-700">{app.displayName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {app.status && (
                      <div className="flex items-center gap-3">
                        <span className={clsx(
                          'px-2.5 py-1 text-xs font-medium rounded-full',
                          app.status === 'Identified' && 'bg-blue-100 text-blue-700',
                          app.status === 'Information Collection In Progress' && 'bg-amber-100 text-amber-700',
                          app.status === 'Information Collection Completed' && 'bg-cyan-100 text-cyan-700',
                          app.status === 'Onboarding Completed' && 'bg-green-100 text-green-700'
                        )}>
                          {app.status}
                        </span>
                        {app.progress > 0 && (
                          <div className="flex items-center gap-2">
                            <span className={clsx(
                              'px-2 py-0.5 rounded-full text-xs font-medium',
                              app.progress >= 100 ? 'bg-green-100 text-green-700' :
                              app.progress > 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            )}>
                              {app.progress}%
                            </span>
                            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={clsx(
                                  'h-full rounded-full',
                                  app.progress >= 100 ? 'bg-green-500' :
                                  app.progress > 50 ? 'bg-amber-400' : 'bg-red-400'
                                )}
                                style={{ width: `${app.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                        title="View Documents"
                      >
                        <FolderOpen size={20} className="text-amber-600" />
                      </button>
                      <button 
                        onClick={() => setShowProductModal(true)}
                        className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={20} className="text-green-600" />
                      </button>
                      <button 
                        onClick={() => handleExportPDF(app)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors" 
                        title="Export PDF"
                      >
                        <FileDown size={20} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Document Sidebar */}
      {selectedApp && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">{selectedApp.displayName}</h2>
              <button onClick={() => setSelectedApp(null)} className="p-1 hover:bg-slate-100 rounded">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <h3 className="text-sm text-slate-500 mb-4">Uploaded Application Documents</h3>

            <div className="space-y-4">
              {selectedApp.documents.length > 0 ? (
                selectedApp.documents.map((category, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{category.name}</span>
                      <Info size={16} className="text-blue-500 cursor-pointer" />
                    </div>
                    {category.files.length > 0 && (
                      <div className="space-y-2 ml-4">
                        {category.files.map((file, fileIdx) => (
                          <div key={fileIdx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-slate-400" />
                              <div>
                                <div className="text-sm text-slate-700">{file.name}</div>
                                <div className="text-xs text-slate-400">.{file.type}</div>
                              </div>
                            </div>
                            <button className="p-1 hover:bg-slate-200 rounded">
                              <Download size={14} className="text-blue-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText size={40} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No documents uploaded yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Upload documents via the Questionnaire</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Product</h3>
            
            <div className="mb-6">
              <label className="block text-xs text-slate-500 mb-2">Product Name*</label>
              <div className="relative">
                <select 
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none bg-white"
                >
                  <option>SailPoint IdentityIQ</option>
                  <option>SailPoint IdentityNow</option>
                  <option>Saviynt</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowProductModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  if (applications.length > 0) {
                    handleExportPDF(applications[0]);
                  }
                  setShowProductModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
