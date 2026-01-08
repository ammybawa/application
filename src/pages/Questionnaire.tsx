import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, Info, Eye, EyeOff, Download, Plus, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import { useApplications } from '../context/ApplicationContext';

interface FormData {
  displayName: string;
  description: string;
  applicationOwnerEmail: string;
  complianceRequirements: string[];
  databaseType: string;
  hostname: string;
  portNumber: string;
  databaseName: string;
  serviceAccountName: string;
  serviceAccountPassword: string;
  accountsReconciliationType: 'stored_procedure' | 'query';
  accountsReconciliationQuery: string;
  accountDisablementType: 'stored_procedure' | 'query';
  accountDisablementQuery: string;
  accountModificationType: 'stored_procedure' | 'query';
  accountModificationQuery: string;
  accountUnlockType: 'stored_procedure' | 'query';
  accountUnlockQuery: string;
  entitlementsReconciliationType: 'stored_procedure' | 'query';
  entitlementsReconciliationQuery: string;
  assignEntitlementsType: 'stored_procedure' | 'query';
  assignEntitlementsQuery: string;
  accountCreationType: 'stored_procedure' | 'query';
  accountCreationQuery: string;
}

interface AttributeMapping {
  igaAttribute: string;
  appAttribute: string;
  igaValue: string;
  appValue: string;
}

interface Entitlement {
  id: string;
  name: string;
  nameInIGA: string;
  description: string;
  isCertifiable: boolean;
  isPrivileged: boolean;
  isRequestable: boolean;
}

// Empty initial form data - will be populated from app context
const getEmptyFormData = (appName: string = ''): FormData => ({
  displayName: appName,
  description: '',
  applicationOwnerEmail: '',
  complianceRequirements: [],
  databaseType: '',
  hostname: '',
  portNumber: '',
  databaseName: '',
  serviceAccountName: '',
  serviceAccountPassword: '',
  accountsReconciliationType: 'query',
  accountsReconciliationQuery: '',
  accountDisablementType: 'query',
  accountDisablementQuery: '',
  accountModificationType: 'query',
  accountModificationQuery: '',
  accountUnlockType: 'query',
  accountUnlockQuery: '',
  entitlementsReconciliationType: 'query',
  entitlementsReconciliationQuery: '',
  assignEntitlementsType: 'query',
  assignEntitlementsQuery: '',
  accountCreationType: 'query',
  accountCreationQuery: '',
});

const initialMappings: AttributeMapping[] = [];

const initialEntitlements: Entitlement[] = [];

const tabs = [
  { id: 'general', label: 'General Information' },
  { id: 'connection', label: 'Connection Details' },
  { id: 'app-metadata', label: 'Application Metadata' },
  { id: 'entitlement-metadata', label: 'Entitlement Metadata' },
  { id: 'requestable-roles', label: 'Requestable Roles' }
];

export default function Questionnaire() {
  const { appId } = useParams<{ appId: string }>();
  const { getApplication } = useApplications();
  
  // Get the application from context if appId is provided
  const application = appId ? getApplication(appId) : null;
  
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<FormData>(getEmptyFormData(application?.name || ''));
  const [showPassword, setShowPassword] = useState(false);
  const [selectedIgaProduct, setSelectedIgaProduct] = useState('SailPoint IdentityIQ');
  const [attributeMappings] = useState<AttributeMapping[]>(initialMappings);
  const [entitlements] = useState<Entitlement[]>(initialEntitlements);
  const [showCompletionPage, setShowCompletionPage] = useState(false);
  const [confirmOffline, setConfirmOffline] = useState(false);

  // Update form data when application changes
  useEffect(() => {
    if (application) {
      setFormData(prev => ({
        ...prev,
        displayName: application.name,
      }));
    }
  }, [application]);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderRadioGroup = (
    name: string,
    value: 'stored_procedure' | 'query',
    onChange: (val: 'stored_procedure' | 'query') => void
  ) => (
    <div className="flex items-center gap-6 mb-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name={name} checked={value === 'stored_procedure'} onChange={() => onChange('stored_procedure')} className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-slate-600">Stored Procedure</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name={name} checked={value === 'query'} onChange={() => onChange('query')} className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-slate-600">Query *</span>
      </label>
    </div>
  );

  const renderGeneralInfo = () => (
    <div className="space-y-6">
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Display Name*</label>
        <input type="text" value={formData.displayName} onChange={(e) => updateFormData('displayName', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
        <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Description</label>
        <input type="text" value={formData.description} onChange={(e) => updateFormData('description', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
        <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Application Owner's Email*</label>
        <input type="email" value={formData.applicationOwnerEmail} onChange={(e) => updateFormData('applicationOwnerEmail', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
        <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Compliance Requirements</label>
        <div className="w-full px-4 py-3 border border-slate-300 rounded-lg min-h-[48px] flex flex-wrap gap-2">
          {formData.complianceRequirements.map((req, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{req}</span>
          ))}
        </div>
        <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
    </div>
  );

  const renderConnectionDetails = () => (
    <div className="space-y-6">
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Database Type*</label>
        <input type="text" value={formData.databaseType} onChange={(e) => updateFormData('databaseType', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Hostname*</label>
        <input type="text" value={formData.hostname} onChange={(e) => updateFormData('hostname', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Port Number*</label>
        <input type="text" value={formData.portNumber} onChange={(e) => updateFormData('portNumber', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Service Account Name*</label>
        <input type="text" value={formData.serviceAccountName} onChange={(e) => updateFormData('serviceAccountName', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
      </div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">Service Account Password*</label>
        <input type={showPassword ? 'text' : 'password'} value={formData.serviceAccountPassword} onChange={(e) => updateFormData('serviceAccountPassword', e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 pr-24" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* SQL Queries */}
      {[
        { label: 'Accounts Reconciliation', field: 'accountsReconciliation', type: formData.accountsReconciliationType, query: formData.accountsReconciliationQuery },
        { label: 'Account Disablement Function', field: 'accountDisablement', type: formData.accountDisablementType, query: formData.accountDisablementQuery },
        { label: 'Account Modification Function', field: 'accountModification', type: formData.accountModificationType, query: formData.accountModificationQuery },
        { label: 'Account Creation Function', field: 'accountCreation', type: formData.accountCreationType, query: formData.accountCreationQuery },
        { label: 'Entitlements Reconciliation', field: 'entitlementsReconciliation', type: formData.entitlementsReconciliationType, query: formData.entitlementsReconciliationQuery },
        { label: 'Assign Entitlements', field: 'assignEntitlements', type: formData.assignEntitlementsType, query: formData.assignEntitlementsQuery },
      ].map((item) => (
        <div key={item.field} className="relative border border-slate-300 rounded-lg p-4 pt-6">
          <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-slate-500">{item.label}</label>
          {renderRadioGroup(item.field, item.type as any, (val) => updateFormData(`${item.field}Type` as any, val))}
          <input type="text" value={item.query} onChange={(e) => updateFormData(`${item.field}Query` as any, e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
        </div>
      ))}
    </div>
  );

  const renderAppMetadata = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-2">Define the mapping between attributes in your Application <span className="font-semibold">{formData.displayName || 'your app'}</span> and IGA</h3>
        <p className="text-slate-600 mb-6">E.g. "Email Address" in your Application {formData.displayName || 'your app'} maps to "Email" in IGA.</p>

        {/* Visual Mapping Diagram */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            {/* IGA System */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-700 mb-4">IGA System</h4>
              <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-800" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Mappings */}
            <div className="flex-1 px-8">
              {attributeMappings.map((mapping, idx) => (
                <div key={idx} className="flex items-center justify-between mb-4 last:mb-0">
                  <div className="text-right flex-1">
                    <div className="text-xs text-cyan-600 font-medium">{mapping.igaAttribute}</div>
                    <div className="text-sm text-slate-700">{mapping.igaValue}</div>
                  </div>
                  <div className="px-4 flex items-center">
                    <span className="text-slate-300">- - - - - - - -</span>
                    <span className="text-xs text-slate-400 mx-2">data flow</span>
                    <span className="text-slate-300">- - - - - - - -</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs text-cyan-600 font-medium">{mapping.appAttribute}</div>
                    <div className="text-sm text-slate-700">{mapping.appValue}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Your Application */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-700 mb-4">Your Application</h4>
              <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-slate-400 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-600 mb-4">Please pick one pair of attributes from both sides, and click the Add (+) button.</p>
        
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs text-slate-500 mb-2">User attributes in IGA*</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500 bg-white">
                <option>Display Name (Display Name)</option>
                <option>Email</option>
                <option>First Name</option>
                <option>Last Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs text-slate-500 mb-2">User attributes in application {formData.displayName || 'your app'}*</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500 bg-white">
                <option>Entitlement Name</option>
                <option>username</option>
                <option>email</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
          <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Entitlement Types */}
      <div className="border-t border-slate-200 pt-8">
        <h3 className="text-lg font-medium text-slate-800 mb-2">
          Identify the Entitlement types and corresponding attributes in your Application <span className="font-semibold">{formData.displayName || 'your app'}</span>. Usually these are multi-valued attribute.
        </h3>
        <p className="text-slate-500 text-sm mb-4">E.g. "Role Memberships", "Group memberships" etc.</p>
        
        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <div className="text-center text-slate-600 font-medium">capability</div>
        </div>

        <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">S.No</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Capability Attributes</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Unique Identifier</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Display Name</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-3 text-sm text-slate-700">1</td>
              <td className="px-4 py-3 text-sm text-slate-700">capability</td>
              <td className="px-4 py-3 text-center"><input type="radio" name="unique" className="w-4 h-4" /></td>
              <td className="px-4 py-3 text-center"><input type="radio" name="display" className="w-4 h-4" /></td>
              <td className="px-4 py-3 text-center">
                <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEntitlementMetadata = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-slate-800">Entitlements File Upload</h3>
      <p className="text-slate-600">
        Provide the application entitlements to be managed by IGA system. Entitlements can be listed in a simple template. Entitlements can be uploaded to IdentityXpress using upload function.
      </p>

      <div className="flex items-center gap-4 p-4 border border-dashed border-slate-300 rounded-lg">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Choose file
        </button>
        <span className="text-slate-400">or drag and drop file here</span>
        <div className="flex-1"></div>
        <button className="px-6 py-2 border-2 border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-2">
          <Download size={16} />
          Download Sample
        </button>
      </div>

      {/* Entitlements Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-10 px-4 py-3"><input type="checkbox" className="w-4 h-4" /></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Entitlement Name *</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Entitlement Name (In IGA)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Description *</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Is Certifiable?</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Is Privileged?</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Is Requestable?</th>
            </tr>
          </thead>
          <tbody>
            {entitlements.map((ent) => (
              <tr key={ent.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3"><input type="checkbox" className="w-4 h-4" /></td>
                <td className="px-4 py-3 text-sm text-slate-700">{ent.name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{ent.nameInIGA}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{ent.description}</td>
                <td className="px-4 py-3 text-center text-sm">{ent.isCertifiable ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-center text-sm">{ent.isPrivileged ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-center text-sm">{ent.isRequestable ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Items per page:</span>
          <select className="border border-slate-200 rounded px-2 py-1 text-sm">
            <option>5</option>
            <option>10</option>
            <option>25</option>
          </select>
        </div>
        <span className="text-sm text-slate-600">1 - 5 of 25</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 text-slate-400">{'<'}</button>
          <button className="px-2 py-1 text-slate-400">{'>'}</button>
        </div>
      </div>
    </div>
  );

  const renderRequestableRoles = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-slate-800">Requestable Roles for <span className="font-semibold">{formData.displayName || 'your app'}</span></h3>
      <p className="text-slate-600">Define which roles can be requested by users in the access request process.</p>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Role Name</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Requestable</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Requires Approval</th>
            </tr>
          </thead>
          <tbody>
            {['Admin', 'User', 'Manager', 'Viewer'].map((role, idx) => (
              <tr key={idx} className="border-t border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">{role}</td>
                <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="w-4 h-4" /></td>
                <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="w-4 h-4" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCompletionPage = () => (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => setShowCompletionPage(false)} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6">
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-2">{formData.displayName || 'Application'}'s Information Collected</h1>
      <p className="text-slate-600 mb-8">Application is now ready for onboarding to SailPoint IdentityIQ.</p>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs text-slate-500 mb-2">Product Instance</label>
          <div className="relative">
            <select value={selectedIgaProduct} onChange={(e) => setSelectedIgaProduct(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none bg-white">
              <option>SailPoint IdentityIQ</option>
              <option>SailPoint IdentityNow</option>
              <option>Saviynt</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
        <div className="flex items-end">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Onboard Now
          </button>
        </div>
        <div className="flex items-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Application
          </button>
        </div>
      </div>

      <p className="text-slate-600 mb-6">Proceed with onboarding the application to non-production IGA environment.</p>

      <div className="flex items-center gap-2 mb-8">
        <input type="checkbox" checked={confirmOffline} onChange={(e) => setConfirmOffline(e.target.checked)} className="w-4 h-4" id="offline" />
        <label htmlFor="offline" className="text-slate-700">Confirm Application Onboarded Offline</label>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <button className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors w-full mb-3">
            Consult an Expert
          </button>
          <p className="text-sm text-slate-600">Consult an IGA expert for onboarding the application to IGA system.</p>
        </div>
        <div>
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors w-full mb-3">
            Onboard Later
          </button>
          <p className="text-sm text-slate-600">Select onboard later to review and modify the application before onboard.</p>
        </div>
      </div>
    </div>
  );

  const getTabIndex = (tabId: string) => tabs.findIndex(t => t.id === tabId);
  const currentIndex = getTabIndex(activeTab);

  if (showCompletionPage) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        {renderCompletionPage()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">IGA Onboarding: {formData.displayName || 'New Application'}</h1>
        <div className="relative">
          <label className="block text-xs text-slate-500 mb-1">IGA Product</label>
          <select value={selectedIgaProduct} onChange={(e) => setSelectedIgaProduct(e.target.value)} className="appearance-none px-4 py-2 pr-10 border border-slate-300 rounded-lg bg-white">
            <option>SailPoint IdentityIQ</option>
            <option>SailPoint IdentityNow</option>
            <option>Saviynt</option>
          </select>
          <ChevronDown className="absolute right-3 bottom-2.5 text-slate-400" size={16} />
        </div>
      </div>

      {/* Progress Tabs */}
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex-1 py-3 px-4 text-sm font-medium transition-colors relative',
              index <= currentIndex ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-slate-200 text-slate-600',
              index === 0 && 'rounded-l-lg',
              index === tabs.length - 1 && 'rounded-r-lg'
            )}
            style={{
              clipPath: index < tabs.length - 1 
                ? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)'
                : 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)',
              marginLeft: index > 0 ? '-12px' : '0'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {activeTab === 'general' && renderGeneralInfo()}
        {activeTab === 'connection' && renderConnectionDetails()}
        {activeTab === 'app-metadata' && renderAppMetadata()}
        {activeTab === 'entitlement-metadata' && renderEntitlementMetadata()}
        {activeTab === 'requestable-roles' && renderRequestableRoles()}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={() => {
              const prevIndex = currentIndex - 1;
              if (prevIndex >= 0) setActiveTab(tabs[prevIndex].id);
            }}
            disabled={currentIndex === 0}
            className={clsx('px-6 py-2 rounded-lg transition-colors border', currentIndex === 0 ? 'border-slate-200 text-slate-400' : 'border-orange-400 text-orange-500 hover:bg-orange-50')}
          >
            Back
          </button>
          <button
            onClick={() => {
              const nextIndex = currentIndex + 1;
              if (nextIndex < tabs.length) {
                setActiveTab(tabs[nextIndex].id);
              } else {
                setShowCompletionPage(true);
              }
            }}
            className="px-6 py-2 border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
