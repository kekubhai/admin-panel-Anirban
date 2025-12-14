'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Globe, Shield, Zap, ArrowRight, Check, X, Activity, Phone } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { DottedMap } from '@/components/ui/dotted-map';
import WorldMap from '@/components/ui/world-map';
import { MagicCard } from '@/components/ui/magic-card';

// Call popup locations around the world
const callLocations = [
  { id: 1, lat: 40.7128, lng: -74.006, city: 'New York', country: 'USA', duration: '2:34' },
  { id: 2, lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK', duration: '1:45' },
  { id: 3, lat: 35.6762, lng: 139.6503, city: 'Tokyo', country: 'Japan', duration: '3:12' },
  { id: 4, lat: -33.8688, lng: 151.2093, city: 'Sydney', country: 'Australia', duration: '0:58' },
  { id: 5, lat: 19.076, lng: 72.8777, city: 'Mumbai', country: 'India', duration: '4:21' },
  { id: 6, lat: 55.7558, lng: 37.6173, city: 'Moscow', country: 'Russia', duration: '1:33' },
  { id: 7, lat: -23.5505, lng: -46.6333, city: 'São Paulo', country: 'Brazil', duration: '2:08' },
  { id: 8, lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'Singapore', duration: '1:55' },
  { id: 9, lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', duration: '3:44' },
  { id: 10, lat: 25.2048, lng: 55.2708, city: 'Dubai', country: 'UAE', duration: '2:17' },
];

const Features = () => {
  const [activePopups, setActivePopups] = useState<typeof callLocations>([]);

  // Cycle through call popups
  useEffect(() => {
    let currentIndex = 0;
    
    const showNextPopup = () => {
      const location = callLocations[currentIndex];
      setActivePopups(prev => [...prev, location].slice(-2)); // Keep max 2 popups
      currentIndex = (currentIndex + 1) % callLocations.length;
    };

    // Show first popup immediately
    showNextPopup();
    
    // Show new popup every 3 seconds (slower for better performance)
    const interval = setInterval(showNextPopup, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const codeSnippet = `{
  "action": "refund",
  "amount": 49.99,
  "reason": "customer_request"
}`;

  const eventLog = [
    'Inbound Call Detected [+0ms]',
    'Intent Classified: Billing [+120ms]',
    'CRM Context Loaded [+245ms]',
    'Agent Response Generated [+280ms]',
    'Action Triggered: Refund $49.99',
  ];

  // Convert lat/lng to approximate x/y positions for popup positioning
  const getPopupPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0d1020]">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header with Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Text Content */}
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Voice Agents That Act,
              <br />
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Not Just Respond
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-xl mb-8 leading-relaxed">
              Design, deploy, and monitor AI voice agents that handle real conversations – across calls, workflows, and tools.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-base text-gray-300">
              <span>&lt; 280ms latency</span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              <span>120+ integrations</span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              <span>50M+ monthly calls</span>
            </div>
          </div>

          {/* Right: Dotted Map with Call Popups */}
          <div className="relative h-[400px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent rounded-lg overflow-hidden">
            {/* Map Background */}
            <div className="border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent rounded-lg overflow-hidden">
              <WorldMap />
            </div>

            {/* Animated Call Popups */}
            <AnimatePresence mode="popLayout">
              {activePopups.map((popup, index) => {
                const pos = getPopupPosition(popup.lat, popup.lng);
                return (
                  <motion.div
                    key={`${popup.id}-${index}-${Date.now()}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-10"
                    style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Simple pulse indicator */}
                    <div className="absolute -left-1 -top-1 w-3 h-3 bg-blue-500/50 rounded-full animate-ping" />
                    
                    {/* Popup Card */}
                    <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 shadow-xl min-w-[130px]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs font-semibold text-white">{popup.city}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">{popup.country}</span>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-blue-400" />
                          <span className="text-[10px] font-mono text-blue-400">{popup.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-white">LIVE</span>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          {/* Interruption-Aware Dialogue */}
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-sm font-semibold tracking-wider text-slate-200 mb-4">
                INTERRUPTION-AWARE DIALOGUE
              </h3>
              <div className="flex items-center gap-3 text-base font-mono text-gray-100">
                <span>Audio Stream</span>
                <ArrowRight className="w-5 h-5" />
                <span>LLM Context</span>
                <ArrowRight className="w-5 h-5" />
                <span>Response</span>
              </div>
            </div>
            <div className="h-32 border border-slate-800 bg-slate-950/50 p-4 font-mono text-sm text-slate-300 space-y-2">
              <div className="animate-pulse">Processing audio chunks...</div>
              <div className="text-xs text-slate-400">Buffer: 16kHz | PCM 16-bit</div>
              <div className="text-xs text-emerald-400">⚡ Latency: 275ms | Active: 2.3s</div>
            </div>
          </motion.div>

          {/* Event Log */}
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <div className="space-y-4">
              {eventLog.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-base"
                >
                  <div className="w-2 h-2 mt-2 bg-slate-400 rounded-full" />
                  <span className="font-mono text-gray-100">{event}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Real-Time Agent State */}
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Real-Time Agent State</h3>
            <div className="text-xs text-slate-400 mb-6 font-mono">Session Duration: 00:02:47 | Turns: 8</div>
            <div className="flex flex-wrap gap-4">
              {['Listen', 'Request Info', 'Response Reframe'].map((state) => (
                <button
                  key={state}
                  className="px-6 py-3 text-base font-mono border border-slate-600 bg-slate-800/50 text-gray-100 hover:bg-slate-700/50 transition-colors"
                >
                  {state}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tool Calling Engine */}
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-8 text-white">Tool Calling Engine</h3>
            <div className="border border-slate-800 bg-slate-950/80 p-6">
              <pre className="text-sm font-mono text-emerald-300">{codeSnippet}</pre>
            </div>
          </motion.div>

          {/* Latency Visualization */}
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-8 text-white">Real-Time Performance</h3>
            <div className="h-48 border border-slate-800/50 bg-[#0a0a14] rounded-lg p-6 relative overflow-hidden">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 160"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Define gradient for area fill */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="rgb(37, 99, 235)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="rgb(29, 78, 216)" stopOpacity="0" />
                  </linearGradient>
                  
                  {/* Glow effect for line */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Filled area under curve */}
                <motion.path
                  d="M 0 140 L 0 120 Q 40 110, 80 115 T 160 105 Q 200 90, 240 95 T 320 75 L 400 60 L 400 160 L 0 160 Z"
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Main line */}
                <motion.path
                  d="M 0 120 Q 40 110, 80 115 T 160 105 Q 200 90, 240 95 T 320 75 L 400 60"
                  stroke="rgb(96, 165, 250)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                
                {/* Data points */}
                {[
                  { x: 80, y: 115, value: '2,847' },
                  { x: 160, y: 105, value: '3,124' },
                  { x: 240, y: 95, value: '3,833' },
                  { x: 320, y: 75, value: '4,291' },
                ].map((point, index) => (
                  <g key={index}>
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="rgb(96, 165, 250)"
                      stroke="rgb(30, 58, 138)"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                      className="cursor-pointer"
                    />
                    {index === 2 && (
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5 }}
                      >
                        {/* Vertical line indicator */}
                        <line
                          x1={point.x}
                          y1={point.y}
                          x2={point.x}
                          y2="140"
                          stroke="rgb(59, 130, 246)"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          opacity="0.5"
                        />
                        {/* Tooltip */}
                        <rect
                          x={point.x - 35}
                          y={point.y - 35}
                          width="70"
                          height="28"
                          rx="6"
                          fill="rgb(15, 23, 42)"
                          stroke="rgb(71, 85, 105)"
                          strokeWidth="1"
                        />
                        <text
                          x={point.x}
                          y={point.y - 15}
                          textAnchor="middle"
                          fill="white"
                          fontSize="16"
                          fontWeight="600"
                          fontFamily="monospace"
                        >
                          {point.value}
                        </text>
                      </motion.g>
                    )}
                  </g>
                ))}
              </svg>
              
              {/* Metric label */}
              <div className="absolute top-4 left-4 text-xs text-slate-400 font-mono">
                Calls / Hour
              </div>
            </div>
          </motion.div>

          {/* Compliance & Guardrails */}
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Compliance & Guardrails</h3>
            <div className="text-xs text-slate-400 mb-6 font-mono">Policy Checks: 1,247 | Violations: 0</div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-base">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-100">Allow refund &lt; $500</span>
              </div>
              <div className="flex items-center gap-4 text-base">
                <X className="w-5 h-5 text-red-400" />
                <span className="text-gray-100">Prevent account closure</span>
              </div>
            </div>
          </motion.div>

          {/* Human Handoff */}
       
        </motion.div>

        {/* Conversation Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-12 mb-6"
        >
          <div className="max-w-3xl">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              BUILT FOR LONG,
              <br />
              MESSY CONVERSATIONS
            </h3>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
              Real calls aren't clean. People interrupt, change their mind, go off-script. Our agents maintain conversational{' '}
              <span className="italic text-white">state</span> across turns, tools, and silence – without resetting context.
            </p>
            <div className="flex items-center gap-6 text-base font-mono text-slate-200">
              <span>User speaks</span>
              <ArrowRight className="w-5 h-5" />
              <span>Interrupts</span>
              <ArrowRight className="w-5 h-5" />
              <span>Agent evaluates</span>
            </div>
                </div>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-12 mb-6"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Trusted by Industry Leaders
            </h3>
            <p className="text-xl text-gray-300">
              Powering millions of conversations every day
    </p>
  </div>
  
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50M+', label: 'Calls Handled', sublabel: 'Monthly' },
              { value: '94%', label: 'Automation Rate', sublabel: 'First Contact Resolution' },
              { value: '<280ms', label: 'Avg Response', sublabel: 'Latency' },
              { value: '99.97%', label: 'Uptime SLA', sublabel: 'Last 12 Months' },
              { value: '47%', label: 'Cost Reduction', sublabel: 'vs Human Agents' },
              { value: '4.8/5', label: 'Customer Rating', sublabel: 'Satisfaction Score' },
              { value: '120+', label: 'Integrations', sublabel: 'CRM & Tools' },
              { value: '24/7', label: 'Availability', sublabel: 'Global Coverage' },
            ].map((stat, index) => (
              <motion.div
        key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg font-semibold text-gray-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-12"
        >
          <div className="mb-10">
            <div className="text-sm font-semibold tracking-wider text-slate-200 mb-6">
              SYSTEM CONTROLS
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-white">Agent Config</h3>
        </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {['Policy', 'Guardrails', 'Allowed actions', 'Failbacks'].map((control) => (
              <div
                key={control}
                className="px-6 py-4 border border-slate-700 bg-slate-900/50 text-base font-mono text-gray-100 hover:bg-slate-800/50 transition-colors"
              >
                {control}
      </div>
    ))}
  </div>
          <div className="pt-10 border-t border-white/5">
            <h4 className="text-2xl sm:text-3xl font-semibold mb-4 text-white">
              Ready to build agents that hold up in production?
            </h4>
            <p className="text-base text-gray-300 mb-8">
              Join 2,500+ companies processing 50M+ conversations monthly
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-8 py-4 text-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors">
                Explore Documentation
              </button>
              <button className="px-8 py-4 text-lg border border-slate-600 text-white font-semibold hover:bg-slate-800/50 transition-colors">
                Request Access
              </button>
            </div>
          </div>
        </motion.div>
</div>
</section>
  );
};

export default Features;
