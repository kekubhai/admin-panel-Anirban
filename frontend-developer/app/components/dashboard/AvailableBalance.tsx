'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const AvailableBalance = () => {
  const { isDarkMode } = useTheme();
  
  return (
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
  );
};