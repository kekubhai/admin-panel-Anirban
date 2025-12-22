'use client';

import React from 'react';
import { Save, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const AgentActions = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col gap-4">
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
  );
};