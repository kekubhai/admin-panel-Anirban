'use client';

import React from 'react';
import { Copy, Share2, Phone, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const VoiceAgentHeader = () => {
  const { isDarkMode } = useTheme();

  return (
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
  );
};