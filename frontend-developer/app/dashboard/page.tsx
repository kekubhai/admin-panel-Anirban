'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  Bot,
  Phone,
  FileText,
  Clock,
  Settings,
  BookOpen,
  Layers,
  Mic,
  Code,
  Server,
  GitBranch,
  Megaphone,
  HelpCircle,
  Plus,
  Upload,
  Share2,
  Trash2,
  ExternalLink,
  Play,
  Save,
  Search,
  MoreVertical,
  Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { OrgSetup } from '../components';
import { MobileNav } from '../components';
import { Sidebar } from '../components';
import { useTabPersistence } from '@/hooks/useTabPersistence';
import DashboardService from '@/service/dashboardService';
import { useTheme } from '../contexts/ThemeContext';
import { useAuthInfo } from '@propelauth/react';

import { AvailableBalance } from '../components/dashboard/AvailableBalance';
import { VoiceAgentHeader } from '../components/dashboard/VoiceAgentHeader';
import { AgentLogs } from '../components/dashboard/AgentLogs';
import { AgentActions } from '../components/dashboard/AgentActions';
import { AgentList } from '../components/dashboard/AgentList';
import { AgentContent } from '../components/dashboard/AgentContent';

// Lazy load tabs
const AgentsTab = dynamic(() => import('../components/AgentsTab'), { ssr: false });
const PhoneNumbersTab = dynamic(() => import('../components/PhoneNumbersTab'), { ssr: false });
const SMSTab = dynamic(() => import('../components/SMSTab'), { ssr: false });
const WhatsAppTab = dynamic(() => import('../components/WhatsAppTab'), { ssr: false });
const GmailTab = dynamic(() => import('../components/GmailTab'), { ssr: false });
const KnowledgeBaseTab = dynamic(() => import('../components/knowledge-base/KnowledgeBaseTab'), { ssr: false });
const ConversationLogsTab = dynamic(() => import('../components/ConversationLogsTab'), { ssr: false });

// Custom WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

// Navigation items matching the screenshot
const navigationItems = [
  { name: 'Agent Setup', icon: Bot, color: '' },
  { name: 'Call History', icon: Clock, color: '' },
  { name: 'My numbers', icon: Phone, color: '' },
  { name: 'Knowledge Base', icon: BookOpen, color: '' },
  { name: 'Batches', icon: Layers, color: '' },
  { name: 'Voice Lab', icon: Mic, color: '' },
  { name: 'Developers', icon: Code, color: '' },
  { name: 'Providers', icon: Server, color: '' },
  { name: 'Workflows', icon: GitBranch, color: '' },
  { name: 'Campaigns', icon: Megaphone, color: '' },
  { name: 'Documentation', icon: FileText, color: '' },
];

export default function DeveloperDashboard() {
  const [activeNavItem, handleNavItemChange] = useTabPersistence<string>('mainNavigation', 'Agent Setup');
  
  const handleNavItemClick = (tab: string) => {
    handleNavItemChange(tab);
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Default open to match screenshot
  const { isDarkMode } = useTheme();
  
  // Auth state
  const { userClass } = useAuthInfo();
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const logout = async (_redirectOnLogout?: boolean) => { window.location.href = '/login'; };

  // Org state
  const [showOrgSetup, setShowOrgSetup] = useState(false);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [orgSetupComplete, setOrgSetupComplete] = useState(false);
  const [organizationName, setOrganizationName] = useState<string>('');

  // Mock Data for Hardcoded View
  const agentsList = [
    { id: '1', name: 'Zynvo Agent' },
    { id: '2', name: 'My New Agent' }
  ];
  const [selectedAgentId, setSelectedAgentId] = useState('2');

  // Organization setup logic
  useEffect(() => {
    if (!loading && userClass) {
      const orgs = userClass.getOrgs?.() || [];
      setOrgs(orgs);
      if (orgs.length === 0) {
        setShowOrgSetup(true);
        setOrgSetupComplete(false);
      } else {
        setShowOrgSetup(false);
        setOrgSetupComplete(true);
        const org = orgs[0] as any;
        setOrganizationName(org.orgName || org.name || 'Organization');
      }
    }
  }, [loading, userClass]);

  // Render content based on active navigation item
  const renderContent = () => {
    if (activeNavItem === 'Agent Setup') {
      return (
        <div className="h-full flex flex-col gap-4">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Agent setup</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fine tune your agents</p>
            </div>
            <AvailableBalance />
          </div>

          {/* Banner */}
          <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center justify-between">
            <span>You're currently on a trial plan, which limits outbound calls to your <a href="#" className="underline font-medium">verified phone numbers</a>. To unlock full calling access, please upgrade by adding funds to your account.</span>
          </div>

          {/* Main 3-Column Layout */}
          <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
            
            {/* Left Column: Agent List */}
            <div className="col-span-3 flex flex-col gap-4">
              <AgentList 
                agents={agentsList} 
                selectedId={selectedAgentId} 
                onSelect={setSelectedAgentId} 
              />
            </div>

            {/* Middle & Right Columns Merged: Agent Details & Actions */}
            <div className="col-span-9 flex flex-col gap-6">
              
              {/* Top Card: Header Info + Call Buttons */}
              <VoiceAgentHeader />

              {/* Bottom Section: Content + Right Actions */}
              <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                
                {/* Main Content (Tabs + Inputs) */}
                <div className="col-span-8 h-full">
                  <AgentContent />
                </div>

                {/* Right Actions Sidebar */}
                <div className="col-span-4 flex flex-col gap-4">
                  <AgentLogs />
                  <AgentActions />
                </div>

              </div>
            </div>

          </div>
        </div>
      );
    }

    // Fallback for other tabs
    switch (activeNavItem) {
      case 'Call History': return <div className="p-8 text-center">Call History Content</div>;
      case 'My numbers': return <PhoneNumbersTab />;
      case 'Knowledge Base': return <KnowledgeBaseTab />;
      case 'Documentation': return <ConversationLogsTab organizationId={orgs.length > 0 ? (orgs[0] as any).orgName || (orgs[0] as any).name || orgs[0].orgId : undefined} />;
      default:
        return (
          <div className="max-w-7xl mx-auto">
            <div className={`p-8 border rounded-xl ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-gray-200 text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
                  <Settings className={`h-6 w-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                </div>
                <h2 className="text-2xl font-semibold">{activeNavItem}</h2>
              </div>
              <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>This section is under development and will be available soon.</p>
            </div>
          </div>
        );
    }
  };

  if (loggingOut || loading) {
    return (
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16">
            <div className={`w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}></div>
          </div>
          <p className={`mt-6 font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (showOrgSetup) {
    return (
      <OrgSetup onOrgCreated={() => {
        setShowOrgSetup(false);
        setOrgSetupComplete(true);
      }} />
    );
  }

  return (
    <>
      <div className={`min-h-screen flex font-sans ${isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'}`}>
        {/* Mobile Navigation */}
        <MobileNav
          activeTab={activeNavItem}
          onChange={(tab) => handleNavItemClick(tab)}
          navigationItems={navigationItems}
          organizationName={organizationName}
          onLogout={async () => {
            try {
              setLoggingOut(true);
              localStorage.removeItem('chatMessages');
              await logout(true);
              window.location.href = '/login';
            } catch (error) {
              setLoggingOut(false);
              window.location.href = '/login';
            }
          }}
        />

        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeNavItem}
          onChange={(tab) => handleNavItemClick(tab)}
          navigationItems={navigationItems}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogout={async () => {
            try {
              setLoggingOut(true);
              localStorage.removeItem('chatMessages');
              await logout(true);
              window.location.href = '/';
            } catch (error) {
              setLoggingOut(false);
              window.location.href = '/';
            }
          }}
        />

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} p-6 h-screen overflow-hidden flex flex-col`}>
          {orgSetupComplete ? renderContent() : (
            <div className="flex items-center justify-center h-full">
              <div className={`text-center border p-8 rounded-xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className={`w-16 h-16 flex items-center justify-center mx-auto mb-4 border rounded-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
                  <Settings className={`w-8 h-8 ${isDarkMode ? 'text-slate-400' : 'text-blue-500'}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
                  Welcome to Developer Dashboard
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  As a new user, please create your organization to get started
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-slate-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-800 transition-colors border border-slate-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-sm">Talk to us</span>
          </button>
        </div>

      </div>
    </>
  );
}