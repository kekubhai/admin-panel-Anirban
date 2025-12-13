'use client';

import { motion } from 'framer-motion';
import { Bot, Globe, Shield, Zap, ArrowRight, Check, X, Activity } from 'lucide-react';
import React from 'react';

const Features = () => {
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

    return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0d1020]">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Voice Agents That Act,
            <br />
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Not Just Respond
            </span>
                    </h2>
          <p className="text-2xl sm:text-3xl text-gray-200 max-w-3xl mb-8 leading-relaxed">
            Design, deploy, and monitor AI voice agents that handle real conversations – across calls, workflows, and tools.
          </p>
          <div className="flex items-center gap-6 text-base text-gray-300">
            <span>&lt; 280ms latency</span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <span>120+ integrations</span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <span>50M+ monthly calls</span>
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
            <h3 className="text-2xl font-semibold mb-8 text-white">Latency & Audio Flow Visualization</h3>
            <div className="h-24 border border-slate-800 bg-slate-950/50 p-4 flex items-center justify-center overflow-hidden">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 100"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Background grid lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgb(71, 85, 105)" strokeWidth="0.5" opacity="0.3" />
                
                {/* Complex waveform with multiple ridges and grooves */}
                <motion.path
                  d="M 0 50 L 5 48 L 10 45 L 15 50 L 20 55 L 25 52 L 30 50 L 35 35 L 40 20 L 45 15 L 50 25 L 55 40 L 60 50 L 65 58 L 70 60 L 75 58 L 80 50 L 85 42 L 90 38 L 95 40 L 100 45 L 105 50 L 110 48 L 115 45 L 120 30 L 125 15 L 130 10 L 135 8 L 140 12 L 145 25 L 150 40 L 155 52 L 160 60 L 165 65 L 170 68 L 175 65 L 180 58 L 185 50 L 190 45 L 195 42 L 200 40 L 205 42 L 210 48 L 215 52 L 220 50 L 225 45 L 230 38 L 235 35 L 240 38 L 245 45 L 250 50 L 255 48 L 260 45 L 265 30 L 270 18 L 275 12 L 280 15 L 285 28 L 290 42 L 295 52 L 300 58 L 305 60 L 310 58 L 315 52 L 320 48 L 325 47 L 330 48 L 335 50 L 340 52 L 345 50 L 350 48 L 355 40 L 360 35 L 365 38 L 370 45 L 375 50 L 380 52 L 385 50 L 390 48 L 395 47 L 400 50"
                  stroke="rgb(148, 163, 184)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                
                {/* Glowing effect overlay */}
                <motion.path
                  d="M 0 50 L 5 48 L 10 45 L 15 50 L 20 55 L 25 52 L 30 50 L 35 35 L 40 20 L 45 15 L 50 25 L 55 40 L 60 50 L 65 58 L 70 60 L 75 58 L 80 50 L 85 42 L 90 38 L 95 40 L 100 45 L 105 50 L 110 48 L 115 45 L 120 30 L 125 15 L 130 10 L 135 8 L 140 12 L 145 25 L 150 40 L 155 52 L 160 60 L 165 65 L 170 68 L 175 65 L 180 58 L 185 50 L 190 45 L 195 42 L 200 40 L 205 42 L 210 48 L 215 52 L 220 50 L 225 45 L 230 38 L 235 35 L 240 38 L 245 45 L 250 50 L 255 48 L 260 45 L 265 30 L 270 18 L 275 12 L 280 15 L 285 28 L 290 42 L 295 52 L 300 58 L 305 60 L 310 58 L 315 52 L 320 48 L 325 47 L 330 48 L 335 50 L 340 52 L 345 50 L 350 48 L 355 40 L 360 35 L 365 38 L 370 45 L 375 50 L 380 52 L 385 50 L 390 48 L 395 47 L 400 50"
                  stroke="rgb(148, 163, 184)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.2"
                  filter="blur(2px)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </svg>
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
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 hover:border-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Human Handoff</h3>
            <div className="text-xs text-slate-400 mb-6 font-mono">Escalation Rate: 6% | Avg Wait: 12s</div>
            <div className="flex items-center justify-center h-24 border border-slate-800 bg-slate-950/50">
              <span className="text-lg font-mono text-slate-200">Human↑₃ [»</span>
            </div>
          </motion.div>
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
