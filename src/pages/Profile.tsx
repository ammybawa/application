import { useState } from 'react';
import { User, Mail, Phone, Building, Shield, Save, Camera } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@cybersolve.com',
    phone: '+1 (555) 123-4567',
    department: 'IT Security',
    role: 'Business Analyst',
    organization: 'CyberSolve Innovation Labs'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic would go here
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Profile Settings</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>

        {/* Avatar Section */}
        <div className="relative px-6 pb-6">
          <div className="absolute -top-12 left-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                JS
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
                  <Camera size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="pt-16">
            <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
            <p className="text-slate-500">{profile.role} at {profile.organization}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="px-6 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Building size={16} />
                Department
              </label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Shield size={16} />
                Role
              </label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Building size={16} />
                Organization
              </label>
              <input
                type="text"
                value={profile.organization}
                onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-700">Two-Factor Authentication</div>
              <div className="text-sm text-slate-500">Add an extra layer of security to your account</div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-700">Change Password</div>
              <div className="text-sm text-slate-500">Last changed 30 days ago</div>
            </div>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-100 transition-colors">
              Update
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-700">Active Sessions</div>
              <div className="text-sm text-slate-500">Manage your active login sessions</div>
            </div>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-100 transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

