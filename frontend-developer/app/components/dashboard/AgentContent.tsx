'use client';

import React from 'react';
import { FileText, Settings, Mic, Phone, Layers, BookOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const AgentContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-xl border shadow-sm flex flex-col h-full ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
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
  );
};