'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Globe, Shield, Zap, MessageSquare, ArrowRight, Check, X, Activity, Lock, Server, Cpu, Network, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import WorldMap from '@/components/ui/world-map';
import { AnimatedListDemo } from './AnimatedListsection';

// --- Utility Components ---

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const isInView = true; // Ideally use intersection observer

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = Math.round(duration * 60);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * progress);
        
        if (frame === totalFrames) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(currentCount);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }
  }, [value, duration, isInView]);

  return <span>{count.toLocaleString()}</span>;
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-white/5 overflow-hidden rounded-none",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-none opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Constants ---

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

// --- Main Component ---

const Features = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Map State
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
    
    // Show new popup every 3 seconds
    const interval = setInterval(showNextPopup, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Convert lat/lng to approximate x/y positions for popup positioning
  const getPopupPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-[#030303] to-[#030303]" />
        <DotPattern
          width={24}
          height={24}
          cx={2}
          cy={2}
          cr={1.5}
          className="absolute inset-0 opacity-[0.15] fill-slate-500"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white">
            Global <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">Infrastructure</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Built on a low-latency, high-availability mesh network designed for real-time voice AI.
          </p>
        </motion.div>

        {/* World Map Visualization (Restored & Enhanced) */}
        <div className="mb-24 relative">
          <SpotlightCard className="p-0 bg-black/40 backdrop-blur-xl border-white/10 h-[500px]">
            <div className="relative w-full h-full overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-80">
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
                      <div className="bg-slate-900/95 border border-slate-700 rounded-none px-3 py-2 shadow-xl min-w-[130px] backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                          <span className="text-xs font-bold text-white tracking-wide">{popup.city}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] text-slate-400 font-mono uppercase">{popup.country}</span>
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
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 px-3 py-1.5 border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <span className="text-xs font-bold text-white tracking-widest">LIVE NETWORK</span>
              </div>
            </div>
            
            {/* Live Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 backdrop-blur-md p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Latency', value: '24ms', icon: Activity },
                { label: 'Uptime', value: '99.99%', icon: Server },
                { label: 'Active Calls', value: '1,240', icon: Phone },
                { label: 'Regions', value: '12', icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-none">
                    <stat.icon className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">{stat.label}</div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Compliance Card */}
          <SpotlightCard className="p-10">
            <div className="flex items-start justify-between mb-8">
           
             
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Enterprise Compliance</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Built-in guardrails for sensitive industries. Automatic PII redaction, audit logs, and policy enforcement checks on every turn.
            </p>
           
              <AnimatedListDemo/>
            
          </SpotlightCard>

          {/* Handoff Card */}
          <SpotlightCard className="p-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 bg-white/5 border border-white/10 rounded-none">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
                Smart Routing
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Seamless Handoff</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              When the conversation gets complex, our agents intelligently route to human experts with full context and transcript history.
            </p>
            <div className="relative h-full bg-black/40 border border-white/5 p-4 font-mono text-xs text-slate-400 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-blue-400">AI:</span>
                  <span className='text-white font-bold'>I can help with that refund.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500">User:</span>
                  <span className='text-white font-bold'>Actually, I need to speak to a manager.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-yellow-500">System:</span>
                  <span className='text-white font-bold'>Routing to Tier 2 Support... [Context Transferred]</span>
                </div>
                <div>
                  <span className="text-green-400">Agent:</span>
                  <span className='text-white font-bold'> Hi, this is Alex from Tier 2 Support. How can I assist you further?</span> 
                </div>
                <div>
                  <span className="text-user">User:</span>
                  <span className='text-white font-bold'> Yes, I was told I need to speak to a manager regarding my issue.</span>
                </div>

                <div>
                  <span className="text-agent">Agent:</span>
                  <span className='text-white font-bold'> I understand. Let me see how I can help you today will setup a call with the manager by 5pm within his availability.</span>
                </div>
                <div>
                  <span className="text-user">User:</span>
                  <span className='text-white font-bold'> Thank you.</span>
                </div>
                <div>
                  <span className="text-agent">Agent:</span>
                  <span className='text-white font-bold'> You're welcome! Is there anything else I can assist you with today?</span>
                </div>
                <div>
                  <span className="text-user">User:</span>
                  <span className='text-white font-bold'> Was wondering do you guys give support to handle financial pipeline automation?</span>
                </div>
                <div>
                  <span className="text-agent">Agent:</span>
                  <span className='text-white font-bold'> Yes, we do offer support for financial pipeline automation. I can connect you with our finance solutions specialist who can provide more details.</span>
                </div>
                <div>
                  <span className="text-user">User:</span>
                  <span className='text-white font-bold'> That would be great, thank you!</span>
                </div>
                <div>
                  <span className="text-agent">Agent:</span>
                  <span className='text-white font-bold'> My pleasure! I'll arrange for our finance solutions specialist to reach out to you shortly.</span>
                </div>
                <div>
                  <span className="text-user">User:</span>
                  <span className='text-white font-bold'> Thanks for your help today.</span>
                </div>
                <div>
                  <span className="text-agent">Agent:</span>
                  <span className='text-white font-bold'> You're very welcome! Have a wonderful day ahead.</span>
                </div>  
              </div>
            </div>
            </motion.div>
          </SpotlightCard>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '50M+', label: 'Calls Handled', sub: 'Monthly' },
            { value: '99.9%', label: 'Uptime', sub: 'SLA Guarantee' },
            { value: '<300ms', label: 'Latency', sub: 'Voice-to-Voice' },
            { value: '120+', label: 'Integrations', sub: 'One-click connect' },
          ].map((stat, index) => (
            <SpotlightCard key={index} className="p-8 text-center group hover:bg-white/10 transition-colors">
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {stat.sub}
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
