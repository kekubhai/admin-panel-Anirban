'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const AgentLogs = () => {
  const { isDarkMode } = useTheme();

  return (
    <button className={`w-full py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-between gap-2 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'}`}>
      See all call logs <ExternalLink className="h-4 w-4" />
    </button>
  );
};