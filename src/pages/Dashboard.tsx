import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { ChevronDown, Download, FileText, Settings } from 'lucide-react';
import { productTypes, complianceObjectives, onboardingStatus } from '../data/applications';

const statusData = [
  { name: 'Identified', value: onboardingStatus.identified, color: '#22c55e' },
  { name: 'Information Collection In Progress', value: onboardingStatus.informationCollectionInProgress, color: '#eab308' },
  { name: 'Information Collection Completed', value: onboardingStatus.informationCollectionCompleted, color: '#3b82f6' },
  { name: 'Onboarding Completed', value: onboardingStatus.onboardingCompleted, color: '#06b6d4' },
  { name: 'Onboarding Failed', value: onboardingStatus.onboardingFailed, color: '#1e293b' },
  { name: 'Onboarded Offline', value: onboardingStatus.onboardedOffline, color: '#8b5cf6' }
];

const radarData = [
  { subject: 'Identified', A: 5, fullMark: 10 },
  { subject: 'Info Collection In Progress', A: 1, fullMark: 10 },
  { subject: 'Info Collection Completed', A: 0, fullMark: 10 },
  { subject: 'Onboarding Completed', A: 0, fullMark: 10 },
  { subject: 'Onboarding Failed', A: 2, fullMark: 10 },
  { subject: 'Onboarded Offline', A: 1, fullMark: 10 }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'summary' | 'additional'>('summary');
  const [selectedProductType, setSelectedProductType] = useState(productTypes[0]);
  const [selectedCompliance, setSelectedCompliance] = useState(complianceObjectives[0]);
  const [selectedTimeline, setSelectedTimeline] = useState('Till Now');

  const totalApplications = Object.values(onboardingStatus).reduce((a, b) => a + b, 0);
  const applicationsWithNoChanges = 0;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'summary'
              ? 'bg-blue-600 text-white rounded-t-lg'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('additional')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'additional'
              ? 'bg-blue-600 text-white rounded-t-lg'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          Additional Information
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-6">Application Onboarding Status</h2>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Product Type */}
          <div>
            <label className="block text-xs text-slate-500 mb-2">Product Type</label>
            <div className="relative">
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white pr-10"
              >
                {productTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Compliance Objective */}
          <div>
            <label className="block text-xs text-slate-500 mb-2">Compliance Objective</label>
            <div className="relative">
              <select
                value={selectedCompliance}
                onChange={(e) => setSelectedCompliance(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white pr-10"
              >
                {complianceObjectives.map((obj) => (
                  <option key={obj} value={obj}>{obj}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-xs text-slate-500 mb-2">Timeline</label>
            <div className="relative">
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white pr-10"
              >
                <option value="Till Now">Till Now</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="Last Year">Last Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-12 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">Total applications</span>
            <span className="text-xl font-bold text-slate-700">{totalApplications}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-semibold">Applications with no changes</span>
            <span className="text-xl font-bold text-slate-700">{applicationsWithNoChanges}</span>
            <span className="text-emerald-500 text-sm">({((applicationsWithNoChanges / totalApplications) * 100).toFixed(2)}%)</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          <div className="flex justify-end gap-2 absolute top-0 right-0 z-10">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <FileText size={18} className="text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Download size={18} className="text-slate-400" />
            </button>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                />
                <Radar
                  name="Applications"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Labels */}
          <div className="absolute top-[15%] right-[20%] text-xs text-slate-500">
            Identified: {onboardingStatus.identified} ({((onboardingStatus.identified / totalApplications) * 100).toFixed(2)}%)
          </div>
          <div className="absolute top-[35%] right-[5%] text-xs text-slate-500">
            Information Collection Completed: {onboardingStatus.informationCollectionCompleted} (0%)
          </div>
          <div className="absolute bottom-[35%] right-[5%] text-xs text-slate-500">
            Information Collection In Progress: {onboardingStatus.informationCollectionInProgress} ({((onboardingStatus.informationCollectionInProgress / totalApplications) * 100).toFixed(2)}%)
          </div>
          <div className="absolute bottom-[20%] left-[20%] text-xs text-slate-500">
            Onboarding Completed: {onboardingStatus.onboardingCompleted} (0%)
          </div>
          <div className="absolute top-[55%] left-[5%] text-xs text-slate-500">
            Onboarding Failed: {onboardingStatus.onboardingFailed} ({((onboardingStatus.onboardingFailed / totalApplications) * 100).toFixed(2)}%)
          </div>
          <div className="absolute top-[20%] left-[20%] text-xs text-slate-500">
            Onboarded Offline: {onboardingStatus.onboardedOffline} ({((onboardingStatus.onboardedOffline / totalApplications) * 100).toFixed(2)}%)
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-6">
          <span className="text-sm text-slate-500">1/3</span>
          <button className="p-1 hover:bg-slate-100 rounded">
            <ChevronDown className="rotate-90" size={16} />
          </button>
          <button className="p-1 hover:bg-slate-100 rounded">
            <ChevronDown className="-rotate-90" size={16} />
          </button>
        </div>
      </div>

      {/* Settings Button */}
      <button className="fixed bottom-24 right-6 w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-slate-600 transition-colors">
        <Settings size={18} />
      </button>
    </div>
  );
}

