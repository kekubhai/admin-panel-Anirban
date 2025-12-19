'use client';

import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { motion } from 'framer-motion';
import { Calendar, Phone, Radio, MessageSquare, ArrowRight, Check, Zap, Shield, Globe, Clock, Users, BarChart3, Languages, Code, TestTube, Layers, Wrench, Beaker } from 'lucide-react';
import React from 'react';
import { CalendarCheck2 } from 'lucide-react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { AnimatedList } from '@/components/ui/animated-list';
import { AnimatedListDemo } from './AnimatedListsection';
const Products = () => {
  const products = [
    {
      id: 'appoint',
      icon: Calendar,
      name: 'Xpectrum Appoint',
      tagline: 'Appointment Scheduling',
      description: 'AI‑assisted booking across voice, chat, SMS, WhatsApp, and email with live calendar sync.',
      features: [
        'More booked slots, fewer no‑shows',
        'Google/O365 sync, reminders, reschedule/cancel',
        'Multilingual & compliance‑ready',
      ],
      details: {
        title: 'Appointment Scheduling that actually books.',
        subtitle: 'Turn missed calls and messages into confirmed slots. Run across voice, chat, SMS, WhatsApp, and email with real‑time calendar sync and smart follow‑ups.',
        highlights: [
          { icon: Calendar, title: 'Calendar native', desc: 'Google / O365 sync, resource calendars, buffers, time‑zones, recurring rules, and ICS invites.' },
          { icon: Users, title: 'No‑show control', desc: 'Multi‑channel reminders, smart reschedules, and waitlist backfill to reduce leakage.' },
          { icon: Zap, title: 'Pre‑built flows', desc: 'Missed‑call → booking, follow‑up "+1 day", intake forms, and payments via secure handoff.' },
          { icon: Shield, title: 'Compliance‑ready', desc: 'HIPAA/SOC2 options, audit trails, consent capture, and data‑retention controls.' },
        ],
      },
    },
    {
      id: 'voicekit',
      icon: Radio,
      name: 'VoiceKit',
      tagline: 'WebRTC Voice for Any Chatbot',
      description: 'Drop‑in, low‑latency voice with barge‑in, STT/TTS, handoff, and analytics.',
      features: [
        'LiveKit/WebRTC core, ~sub‑second latency*',
        'Interruptible TTS & agent barge‑in',
        'Handoff to human; call recording & QA',
      ],
      details: {
        title: 'Give any chatbot a natural, interruptible voice.',
        subtitle: 'WebRTC voice in a drop‑in SDK with STT/TTS, barge‑in, and human handoff. Built on battle‑tested infra.',
        highlights: [
          { icon: Zap, title: 'Low latency', desc: 'Optimized audio path with jitter buffers and echo control for clear, real‑time dialogs.' },
          { icon: Phone, title: 'Interruptible TTS', desc: 'Barge‑in support so users can speak over long utterances; context safely preserved.' },
          { icon: Users, title: 'Handoff & QA', desc: 'Escalate to a human agent when needed. Recordings, redaction, transcripts, and analytics included.' },
          { icon: Globe, title: 'SDKs', desc: 'Web & mobile SDKs with a few lines of code. Works with your existing bot stack.' },
        ],
      },
    },
    {
      id: 'dialdrive',
      icon: Phone,
      name: 'DialDrive',
      tagline: 'Outbound Calls for Any Service',
      description: 'Programmatic campaigns for reminders, renewals, reactivation, surveys, and more.',
      features: [
        'Campaign builder, segmentation, A/B tests',
        'A2P/TCPA opt‑in & consent management',
        'Outcomes webhooks; transcripts & QA',
      ],
      details: {
        title: 'Outbound that respects consent—and moves the needle.',
        subtitle: 'Run reminders, renewals, reactivation, and survey campaigns. Manage consent, track outcomes, and route follow‑ups automatically.',
        highlights: [
          { icon: BarChart3, title: 'Campaign builder', desc: 'Segment lists, set cadences, A/B test scripts, and measure contact & completion rates.' },
          { icon: Shield, title: 'Compliance built‑in', desc: 'A2P 10DLC registration, opt‑in/out, DNC handling, time‑of‑day rules, and audit trails.' },
          { icon: Zap, title: 'Outcome webhooks', desc: 'Push bookings, payments, and survey results into your CRM or data warehouse in real‑time.' },
          { icon: MessageSquare, title: 'Voicemail & retries', desc: 'Smart retries, voicemail drop, and fallback to SMS/WhatsApp/email if unreachable.' },
        ],
      },
    },
    {
      id: 'omnibridge',
      icon: MessageSquare,
      name: 'OmniBridge',
      tagline: 'Add Voice / WhatsApp / SMS / Email',
      description: 'Integrations layer to bolt omni‑channel into apps, CRMs, and helpdesks without re‑platforming.',
      features: [
        'APIs, SDKs & webhooks',
        'Chatwoot, HubSpot, Zendesk, Salesforce connectors',
        'Policy pack: A2P 10DLC, WA BSP, email IP warmup',
      ],
      details: {
        title: 'Add channels to your stack—without re‑platforming.',
        subtitle: 'Plug voice, WhatsApp, SMS, and email into CRMs, helpdesks, or your app with robust APIs, SDKs, and webhooks.',
        highlights: [
          { icon: Globe, title: 'Connectors', desc: 'Chatwoot, HubSpot, Zendesk, Salesforce, custom webhooks, and data sync patterns.' },
          { icon: Zap, title: 'Templates', desc: 'Pre‑built flows for missed call capture, lead nurture, and transactional notifications.' },
          { icon: MessageSquare, title: 'Failover routing', desc: 'Deliver across channels with intelligent fallback and unified conversation history.' },
          { icon: Shield, title: 'Security & policy', desc: 'A2P/WA policy enforcement, email IP warmup guidance, and SSO/SAML for enterprise.' },
        ],
      },
    },
  ];

  const stats = [
    { value: '24/7', label: 'Coverage' },
    { value: '-35%', label: 'No‑shows*' },
    { value: '+30%', label: 'Conversion*' },
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden">
      {/* Dotted Background - covers entire section - Optimized for performance */}
     
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-500/10 via-[#030303] to-[#030303]" />
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
            Agentic AI products that <br />
            <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">
              ship outcomes.
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
            Stand up production-grade voice and messaging in days. <span className="text-white font-medium">Add booking, WebRTC voice, and outbound campaigns</span> without re‑platforming.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative group"
              >
                <div className="absolute -inset-4 bg-white/5 rounded-none blur-xl group-hover:bg-white/10 transition-all duration-500" />
                <div className="relative">
                  <div className="text-5xl sm:text-6xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-xs text-slate-500 mb-10 font-mono">
            * Illustrative based on typical deployments. Your results may vary.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-none transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)]"
            >
              Get a live demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border border-white/10 bg-black/20 backdrop-blur-sm text-white font-bold rounded-none hover:bg-white/5 transition-all hover:border-white/30"
            >
              Explore products
            </motion.button>
          </div>
        </motion.div>

    

        {/* Features Grid - Image Style Design */}
        <div className="mb-32">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-white tracking-tight">
            Four focused products. <span className="text-slate-500">One outcome‑driven stack.</span>
          </h2>
          
          {/* New Feature Cards - Image Style */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Languages,
                  title: 'Multilingual',
                  description: 'Talk to agents in English, Spanish, Mandarin, or one of 100+ other supported languages.',
                  iconColor: 'text-slate-200',
                  gradient: 'from-slate-500/10 to-gray-500/10'
                },
                {
                  icon: Code,
                  title: 'API-native',
                  description: 'Everything is exposed as an API, with 1000s of configurations and integrations.',
                  iconColor: 'text-slate-200',
                  gradient: 'from-slate-500/10 to-gray-500/10'
                },
                {
                  icon: TestTube,
                  title: 'Automated testing',
                  description: 'Design test suites of simulated voice agents to identify hallucination risks before going to production.',
                  iconColor: 'text-slate-200',
                  gradient: 'from-slate-500/10 to-gray-500/10'
                },
                {
                  icon: Layers,
                  title: 'Bring your own models',
                  description: 'Bring your own API keys for transcription, LLM, or text-to-speech models. Or, plug in your own self-hosted models.',
                  iconColor: 'text-slate-200',
                  gradient: 'from-slate-500/10 to-gray-500/10'
                },
                {
                  icon: Wrench,
                  title: 'Tool calling',
                  description: 'Plug in your APIs as tools to intelligently fetch data and perform actions on your server.',
                  iconColor: 'text-slate-200',
                  gradient: 'from-slate-500/10 to-gray-500/10'
                },
                {
                  icon: Beaker,
                  title: 'A/B experiments',
                  description: 'Test different variations of prompts, voices, and flows to continuously optimize performance.',
                  iconColor: 'text-slate-200',
                  gradient: 'from-slate-500/10 to-gray-500/10'
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-none bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all overflow-hidden hover:bg-white/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex p-3 rounded-none bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <feature.icon className={cn("w-8 h-8", feature.iconColor)} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Products Grid - Original Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          </div>
        </div>

        {/* Detailed Product Sections - Left/Right Layout */}
        {products.map((product, productIndex) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32 relative rounded-none overflow-hidden group"
          >
            {/* Shiny border effect */}
            <div className="absolute inset-0 rounded-none bg-gradient-to-r from-white/20 via-slate-400/20 to-white/20 p-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-none bg-[#050505]" />
            </div>
            
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-slate-400/10 to-white/10 rounded-none blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-none overflow-hidden">
              {/* Left: Visual/Icon Section */}
              <div className={`p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 ${productIndex % 2 === 0 ? 'lg:border-r border-white/10' : 'lg:border-l border-white/10 lg:order-2'}`}>
                <div className="relative">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${product.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="1"/>
                        </pattern>
                        <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${product.id})`} />
                    </svg>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    className="relative flex flex-col items-center justify-center min-h-[300px]"
                  >
                    <div className="relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 rounded-none bg-gradient-to-r from-white/20 to-slate-400/20 blur-[60px] opacity-20 animate-pulse" />
                      <div className="relative w-40 h-40 rounded-none bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
                        <div className="absolute inset-0 rounded-none bg-gradient-to-br from-white/10 to-transparent" />
                        <product.icon className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                      </div>
                    </div>
                    <div className="mt-10 text-center relative z-10">
                      <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{product.name}</h3>
                      <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">{product.tagline}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right: Content Section */}
              <div className={`p-8 lg:p-16 flex flex-col justify-center ${productIndex % 2 === 0 ? '' : 'lg:order-1'}`}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white leading-tight">
                    {product.details.title}
                  </h2>
                  <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
                    {product.details.subtitle}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    {product.details.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="group/item"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-white/10 transition-colors ring-1 ring-white/10">
                            <highlight.icon className="w-5 h-5 text-slate-300" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white mb-2">{highlight.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{highlight.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-none hover:bg-white/20 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
                  >
                    Learn more
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center relative overflow-hidden rounded-none p-16 sm:p-24 border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 text-white tracking-tight">
              Ready to ship outcomes?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
              Tell us what outcome you want—bookings, renewals, lead recovery—and we'll show the product that delivers it.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-black font-bold rounded-none shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.5)] transition-all text-lg"
            >
              Book a demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;

