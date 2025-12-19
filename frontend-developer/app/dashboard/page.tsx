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
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-200 text-gray-700'} text-sm font-medium`}>
                Available balance: <span className="font-bold">$4.95</span>
              </div>
              <button className={`px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'} text-sm font-medium flex items-center gap-2`}>
                <span className="font-bold">$</span> Add more funds
              </button>
              <button className={`px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'} text-sm font-medium flex items-center gap-2`}>
                <HelpCircle className="h-4 w-4" /> Help
              </button>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center justify-between">
            <span>You're currently on a trial plan, which limits outbound calls to your <a href="#" className="underline font-medium">verified phone numbers</a>. To unlock full calling access, please upgrade by adding funds to your account.</span>
          </div>

          {/* Main 3-Column Layout */}
          <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
            
            {/* Left Column: Agent List */}
            <div className="col-span-3 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Agents</h2>
              </div>
              
              <div className="flex gap-2">
                <button className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <Upload className="h-4 w-4" /> Import
                </button>
                <button className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <Plus className="h-4 w-4" /> New Agent
                </button>
              </div>

              <div className={`relative`}>
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  placeholder="Search agents..." 
                  className={`w-full pl-9 pr-4 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                />
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto">
                {agentsList.map(agent => (
                  <button 
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedAgentId === agent.id 
                        ? (isDarkMode ? 'bg-slate-800 border-slate-600 text-white shadow-sm' : 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm')
                        : (isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50')
                    }`}
                  >
                    <span className="font-medium">{agent.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle & Right Columns Merged: Agent Details & Actions */}
            <div className="col-span-9 flex flex-col gap-6">
              
              {/* Top Card: Header Info + Call Buttons */}
              <div className={`p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Zynvo Agent</h2>
                      <div className="flex gap-2">
                        <button className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-600'}`}>
                          <Copy className="h-3 w-3" /> Agent ID
                        </button>
                        <button className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-600'}`}>
                          <Share2 className="h-3 w-3" /> Share
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm mb-4">
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>Cost per min: ~ $0.098</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Transcriber</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>LLM</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div> <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Voice</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Telephony</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Platform</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                      <Phone className="h-4 w-4" /> Get call from agent
                    </button>
                    <button className={`py-2.5 px-6 rounded-lg text-sm font-bold flex items-center gap-2 border transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                      <Phone className="h-4 w-4" /> Set inbound agent
                    </button>
                    <a href="#" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                      Purchase phone numbers <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Content + Right Actions */}
              <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                
                {/* Main Content (Tabs + Inputs) */}
                <div className={`col-span-8 rounded-xl border shadow-sm flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                  {/* Tabs */}
                  <div className={`px-2 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
                    <div className="flex gap-1 overflow-x-auto">
                      {[
                        { name: 'Agent', icon: FileText },
                        { name: 'LLM', icon: Settings },
                        { name: 'Audio', icon: Mic },
                        { name: 'Engine', icon: Settings },
                        { name: 'Call', icon: Phone },
                        { name: 'Tools', icon: Layers },
                        { name: 'Analytics', icon: BookOpen },
                        { name: 'Inbound', icon: Phone }
                      ].map((tab, i) => (
                        <button 
                          key={tab.name}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                            i === 0 
                              ? 'border-blue-500 text-blue-600' 
                              : `border-transparent ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'}`
                          }`}
                        >
                          <tab.icon className="h-4 w-4" />
                          {tab.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Agent Welcome Message</label>
                        <input 
                          type="text" 
                          defaultValue="Heyy, are you free for a short survey about ZynvoSocial?"
                          className={`w-full p-3 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                        />
                        <p className={`mt-1 text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>This will be the initial message from the agent. You can use variables here using {'{variable_name}'}</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Agent Prompt</label>
                          <button className={`text-xs px-2 py-1 rounded border flex items-center gap-1 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-600'}`}>
                            <Settings className="h-3 w-3" /> AI Edit
                          </button>
                        </div>
                        <div className={`w-full p-4 rounded-lg border text-sm font-mono leading-relaxed h-64 overflow-y-auto ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                          <p className="mb-4 font-bold">Personality</p>
                          <p className="mb-4">Zynvo Assist is friendly, youthful, and campus-vibe conversational.</p>
                          <p className="mb-4">They speak clearly, calmly, and positively, making users—especially students—feel welcomed and supported during onboarding calls.</p>
                          <p>They naturally switch between English and Hindi based on the user's preference. Tone stays warm, respectful, and helpful, never robotic or sales-y.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Actions Sidebar */}
                <div className="col-span-4 flex flex-col gap-4">
                  <button className={`w-full py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-between gap-2 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'}`}>
                    See all call logs <ExternalLink className="h-4 w-4" />
                  </button>

                  <div className={`p-4 rounded-xl border flex flex-col gap-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
                        <Save className="h-4 w-4" /> Save agent
                      </button>
                      <button className={`p-2.5 rounded-lg border flex items-center justify-center ${isDarkMode ? 'bg-slate-800 border-slate-700 text-red-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50'}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className={`text-xs text-center ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Last updated a month ago</p>
                  </div>

                  <div className={`p-4 rounded-xl border flex flex-col gap-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <button className={`w-full py-2.5 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700' : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100'}`}>
                      Chat with agent
                    </button>
                    <p className={`text-xs text-center flex items-center justify-center gap-1 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>
                      <span className="text-xs">💡</span> Chat is the fastest way to test and refine the agent.
                    </p>
                    <div className={`h-px w-full my-1 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}></div>
                    <button className={`w-full py-2.5 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                      Test via <span className="text-blue-500">web call</span>
                    </button>
                    <p className={`text-xs text-center ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Test your agent with voice calls</p>
                  </div>
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