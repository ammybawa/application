import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Truck, FileText, Users, Plus } from 'lucide-react';
import clsx from 'clsx';
import { useApplications } from '../context/ApplicationContext';
import { Application } from '../types';

const AppIcon = ({ type, name }: { type: string; name: string }) => {
  // Special handling for specific apps
  if (name === 'Trakk') {
    return (
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
        <div className="text-[#0066b3] font-bold text-lg tracking-tight">
          <span className="text-[#0066b3]">S</span>
          <span className="text-[#0066b3]">A</span>
          <span className="text-[#0066b3]">P</span>
        </div>
      </div>
    );
  }

  if (name === 'WorkForce') {
    return (
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
        <svg viewBox="0 0 48 48" className="w-10 h-10">
          <circle cx="24" cy="14" r="8" fill="#1e3a5f"/>
          <path d="M24 24c-8 0-14 6-14 14v2h28v-2c0-8-6-14-14-14z" fill="#1e3a5f"/>
          <circle cx="24" cy="12" r="4" fill="#4fd1c5"/>
          <path d="M18 28l6 4 6-4" stroke="#4fd1c5" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    );
  }

  switch (type) {
    case 'activedirectory':
      return (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
          <svg viewBox="0 0 48 48" className="w-10 h-10">
            <rect fill="#00adef" x="2" y="2" width="20" height="20" />
            <rect fill="#7fba00" x="26" y="2" width="20" height="20" />
            <rect fill="#f25022" x="2" y="26" width="20" height="20" />
            <rect fill="#ffb900" x="26" y="26" width="20" height="20" />
          </svg>
        </div>
      );
    case 'mysql':
      return (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="text-center">
            <span className="text-[#00758f] font-bold text-xs block">My</span>
            <span className="text-[#f29111] font-bold text-sm">SQL</span>
          </div>
        </div>
      );
    case 'sqlserver':
      return (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md p-2">
          <div className="text-center">
            <div className="text-[#cc2927] text-[8px] mb-0.5">Microsoft</div>
            <div className="flex items-center gap-0.5">
              <svg viewBox="0 0 20 20" className="w-3 h-3">
                <polygon fill="#cc2927" points="0,0 20,10 0,20"/>
              </svg>
              <span className="text-[#666] font-semibold text-[9px]">SQL Server</span>
            </div>
          </div>
        </div>
      );
    case 'oracle':
      return (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="text-center">
            <span className="text-[#c74634] font-bold text-xs block">ORACLE</span>
            <span className="text-slate-600 text-[6px] block leading-tight">HUMAN CAPITAL</span>
            <span className="text-slate-600 text-[6px] block leading-tight">MANAGEMENT</span>
          </div>
        </div>
      );
    case 'salesforce':
      return (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 40 28" className="w-8 h-6 mb-0.5">
              <path fill="#00a1e0" d="M16.5,4.5c2.2-2.3,5.3-3.7,8.7-3.7c4.8,0,9,2.8,11,6.9c1.5-0.7,3.2-1,4.9-1c6.6,0,12,5.4,12,12s-5.4,12-12,12c-1.1,0-2.2-0.2-3.2-0.5c-1.8,2.5-4.7,4.1-8,4.1c-2.2,0-4.2-0.7-5.8-1.9c-1.9,2.2-4.7,3.6-7.9,3.6c-4.2,0-7.8-2.5-9.4-6.1C3,29.1,0,25.4,0,21c0-5.4,4-9.8,9.1-10.5C10.4,7.3,13.2,5.1,16.5,4.5z"/>
            </svg>
            <span className="text-[#00a1e0] font-medium text-[8px]">salesforce</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-slate-500 font-bold text-sm">{name.charAt(0)}</span>
        </div>
      );
  }
};

const ApplicationCard = ({ app, onStartOnboarding }: { app: Application; onStartOnboarding: (app: Application) => void }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={clsx('rounded-xl p-5 card-hover relative', app.gradient)}>
      <div className="text-white font-semibold text-lg mb-4 text-center">{app.name}</div>

      <div className="flex justify-center mb-4">
        <AppIcon type={app.type} name={app.name} />
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-white/80 text-sm">Status</span>
        <span className="text-white font-medium">{app.status} %</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/30 rounded-full mb-4">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${app.status}%` }}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
          title="Requirements"
        >
          <FileText size={20} />
        </button>
        <button
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white relative"
          title="Start Onboarding"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => onStartOnboarding(app)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap z-10">
              Start Onboarding
            </div>
          )}
        </button>
        <button
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
          title="Users"
        >
          <Users size={20} />
        </button>
        <button
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
          title="Transfer"
        >
          <Truck size={20} />
        </button>
      </div>
    </div>
  );
};

export default function ApplicationOnboarding() {
  const navigate = useNavigate();
  const { applications } = useApplications();
  const [activeTab, setActiveTab] = useState<'IGA' | 'SSO' | 'PAM'>('IGA');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    app.category === activeTab
  );

  const handleStartOnboarding = (app: Application) => {
    // Navigate to questionnaire with this app
    navigate(`/questionnaire/${app.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl overflow-hidden shadow-sm">
        {(['IGA', 'SSO', 'PAM'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'flex-1 py-4 text-center font-medium transition-colors',
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            {tab} Onboarding
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-slate-600 font-medium">Applications {activeTab}</span>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Application Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
        {filteredApps.map((app) => (
          <ApplicationCard
            key={app.id}
            app={app}
            onStartOnboarding={handleStartOnboarding}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredApps.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={40} className="text-slate-400" />
          </div>
          <div className="text-slate-600 text-lg font-medium mb-2">No {activeTab} Applications Found</div>
          <p className="text-slate-500 text-sm mt-2 mb-6">
            {searchQuery ? 'Try adjusting your search' : 'Add applications through the Applications page to see them here'}
          </p>
          {!searchQuery && (
            <a 
              href="/applications" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add Application
            </a>
          )}
        </div>
      )}
    </div>
  );
}
