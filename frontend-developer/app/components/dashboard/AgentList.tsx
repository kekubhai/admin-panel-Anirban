'use client';

import React, { useState } from 'react';
import { Upload, Plus, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Agent {
  id: string;
  name: string;
}

interface AgentListProps {
  agents: Agent[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const AgentList = ({ agents, selectedId, onSelect }: AgentListProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col gap-4">
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
        {agents.map(agent => (
          <button 
            key={agent.id}
            onClick={() => onSelect(agent.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedId === agent.id 
                ? (isDarkMode ? 'bg-slate-800 border-slate-600 text-white shadow-sm' : 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm')
                : (isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50')
            }`}
          >
            <span className="font-medium">{agent.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};