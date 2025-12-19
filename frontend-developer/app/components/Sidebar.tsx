'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  LogOut, 
  User as UserIcon, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useAuthInfo } from '@propelauth/react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  activeTab: string;
  onChange: (tab: string) => void;
  onLogout: () => Promise<void> | void;
  navigationItems?: Array<{ name: string; icon: any; color: string }>;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeTab,
  onChange,
  onLogout,
  navigationItems = [],
  isCollapsed,
  onToggleCollapse
}: SidebarProps) {
  const { userClass } = useAuthInfo();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [organizationName, setOrganizationName] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  // Sidebar is open if manually pinned (!isCollapsed) OR hovered
  const isSidebarOpen = !isCollapsed || isHovered;

  useEffect(() => {
    if (userClass) {
      const orgs = userClass.getOrgs?.() || [];
      if (orgs.length > 0) {
        const org = orgs[0] as any;
        const orgName = org.orgName || org.name || '';
        setOrganizationName(orgName);
      } else {
        setOrganizationName('My Organization');
      }
    } else {
      setOrganizationName('My Organization');
    }
  }, [userClass]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-out shadow-sm border-r hidden lg:flex flex-col ${
        isSidebarOpen ? 'w-64' : 'w-16'
      } ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'}`}
    >
      {/* Header Section */}
      <div className={`relative h-16 flex items-center transition-all duration-300 ${!isSidebarOpen ? 'justify-center px-0' : 'justify-between px-6'}`}>
        {/* Organization Logo/Name Container */}
        <div className={`flex items-center gap-3 transition-all duration-300 overflow-hidden ${
          !isSidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'
        }`}>
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
               {/* Bolna Logo Placeholder */}
               <div className="flex flex-col">
                  <span className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Xpectrum</span>
                  <div className="h-1 w-full bg-blue-500/50 mt-0.5"></div>
               </div>
            </div>
          )}
        </div>

        {/* Collapsed State Logo */}
        <div className={`absolute left-0 right-0 mx-auto flex justify-center transition-all duration-300 ${
          !isSidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}>
           <span className={`text-xs font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>BOLNA</span>
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className={`p-1 transition-colors duration-200 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} ${isSidebarOpen ? 'ml-auto' : 'hidden'}`}
          title={isCollapsed ? "Pin Sidebar Open" : "Unpin Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <nav className="flex flex-col gap-1 px-3"> 
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => onChange(item.name)}
                className={`relative w-full flex items-center group transition-all duration-200 rounded-lg ${
                  isActive
                    ? (isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-blue-50 text-blue-700')
                    : (isDarkMode ? 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900')
                } ${!isSidebarOpen 
                      ? 'justify-center h-10 px-0' 
                      : 'gap-3 px-3 h-10' 
                    }`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                {/* Active Indicator (Left Border) - Only in dark mode or specific design preference */}
                {isActive && isDarkMode && (
                  <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-blue-500 rounded-r-full" />
                )}

                <IconComponent className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${
                  isActive 
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : (isDarkMode ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600')
                }`} />

                {/* Label */}
                <span className={`text-sm font-medium truncate transition-all duration-300 ${
                  isSidebarOpen ? 'opacity-100 ml-0 max-w-full' : 'opacity-0 max-w-0 w-0 overflow-hidden'
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className={`p-3 border-t ${isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-white'}`}>
        {/* Theme Toggle */}
        <button
            onClick={toggleTheme}
            className={`w-full flex items-center mb-2 rounded-lg transition-colors duration-200 group ${
              isDarkMode 
                ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200' 
                : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'
            } ${!isSidebarOpen ? 'justify-center h-10 px-0' : 'gap-3 px-3 h-10'}`}
            title={!isSidebarOpen ? (isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode') : undefined}
          >
            {isDarkMode ? <Sun className="h-4 w-4 flex-shrink-0" /> : <Moon className="h-4 w-4 flex-shrink-0" />}
            <span className={`text-sm font-medium transition-all duration-300 ${
               isSidebarOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 w-0 overflow-hidden'
            }`}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
        </button>

        {/* Account Settings and Logout */}
        <div className="flex flex-col gap-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof window !== 'undefined' && window.location) {
                window.location.assign('/account');
              }
            }}
            className={`w-full flex items-center rounded-lg transition-colors duration-200 group ${
              isDarkMode 
                ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200' 
                : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'
            } ${!isSidebarOpen ? 'justify-center h-10 px-0' : 'gap-3 px-3 h-10'}`}
            title={!isSidebarOpen ? 'Account Settings' : undefined}
          >
            <UserIcon className="h-4 w-4 flex-shrink-0" />
            <span className={`text-sm font-medium transition-all duration-300 ${
               isSidebarOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 w-0 overflow-hidden'
            }`}>
              Team
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
