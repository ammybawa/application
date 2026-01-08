import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  User,
  LogOut,
  Monitor,
  AppWindow,
  FileCheck,
  FileText,
  Upload,
  Search,
  ChevronDown,
  ChevronRight,
  Shield,
  Package,
  Users,
  Settings,
  Cog,
  Key,
  Download
} from 'lucide-react';
import clsx from 'clsx';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'HOME',
    icon: Home,
    children: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
      { id: 'logout', label: 'Logout', icon: LogOut, path: '/logout' }
    ]
  },
  {
    id: 'application',
    label: 'APPLICATION',
    icon: Monitor,
    children: [
      { id: 'applications', label: 'Application', icon: AppWindow, path: '/applications' },
      { id: 'app-onboarding', label: 'Application Onboarding', icon: FileCheck, path: '/application-onboarding' },
      { id: 'onboarding-req', label: 'Onboarding Requirements', icon: FileText, path: '/onboarding-requirements' },
      { id: 'app-upload', label: 'Application Upload Details', icon: Upload, path: '/application-upload' },
      { id: 'privileged-access-discovery', label: 'Privileged Access Discovery', icon: Search, path: '/privileged-access-discovery' },
      { id: 'privileged-access', label: 'Privileged Access', icon: Key, path: '/privileged-access' },
      { id: 'export-config', label: 'Export Configuration', icon: Download, path: '/export-configuration' }
    ]
  },
  {
    id: 'iam-services',
    label: 'IAM SERVICES',
    icon: Shield,
    children: []
  },
  {
    id: 'products',
    label: 'PRODUCTS',
    icon: Package,
    children: []
  },
  {
    id: 'access',
    label: 'ACCESS',
    icon: Users,
    children: []
  },
  {
    id: 'configuration',
    label: 'CONFIGURATION',
    icon: Cog,
    children: [
      { id: 'questionnaire', label: 'Questionnaire', icon: FileText, path: '/questionnaire' }
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['home', 'application']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (path?: string) => path && location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-40 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className="text-slate-400">identity</span>
            <span className="text-cyan-500 font-extrabold">X</span>
            <span className="text-slate-600">press</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 tracking-wider mt-1">
          CYBER<span className="text-cyan-500">●</span>SOLVE Innovation Labs
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-semibold">
            JS
          </div>
          <div>
            <div className="font-medium text-slate-700">John Smith</div>
            <div className="text-xs text-slate-400">Business Analyst</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((menu) => (
          <div key={menu.id} className="mb-1">
            <button
              onClick={() => toggleMenu(menu.id)}
              className={clsx(
                'w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors',
                expandedMenus.includes(menu.id)
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-3">
                <menu.icon size={18} />
                <span>{menu.label}</span>
              </div>
              {menu.children && menu.children.length > 0 && (
                expandedMenus.includes(menu.id) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )
              )}
            </button>

            {/* Submenu */}
            {menu.children && expandedMenus.includes(menu.id) && (
              <div className="bg-slate-50">
                {menu.children.map((child) => (
                  <Link
                    key={child.id}
                    to={child.path || '#'}
                    className={clsx(
                      'flex items-center gap-3 pl-11 pr-4 py-2.5 text-sm transition-colors',
                      isActive(child.path)
                        ? 'text-blue-600 bg-blue-100 border-r-3 border-blue-600'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    )}
                  >
                    <child.icon size={16} />
                    <span>{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 text-slate-500 hover:text-slate-700 text-sm">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
