'use client';

import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { motion } from 'framer-motion';
import { Calendar, Phone, Radio, MessageSquare, ArrowRight, Check, Zap, Shield, Globe, Clock, Users, BarChart3, Languages, Code, TestTube, Layers, Wrench, Beaker } from 'lucide-react';
import React from 'react';
import { CalendarCheck2 } from 'lucide-react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
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
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0d1020] overflow-hidden">
      {/* Dotted Background - covers entire section - Optimized for performance */}
     
      <div className="absolute inset-0 z-0">
       
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Agentic AI products that ship outcomes—
            <br />
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              not just conversations.
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stand up production-grade voice and messaging in days, not months. Add booking, drop‑in WebRTC voice, outbound campaigns, and omni‑channel integrations without re‑platforming.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 mb-8">
            * Illustrative based on typical deployments. Your results may vary.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-full transition-colors"
            >
              Get a live demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-slate-600 text-white font-semibold rounded-full hover:bg-slate-800/50 transition-colors"
            >
              Explore products
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid - Image Style Design */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Four focused products. Use one—or combine them for an end‑to‑end, outcome‑driven stack.
          </h2>
          
          {/* New Feature Cards - Image Style */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/5">
              {[
                {
                  icon: Languages,
                  title: 'Multilingual',
                  description: 'Talk to agents in English, Spanish, Mandarin, or one of 100+ other supported languages.',
                  iconColor: 'text-purple-500',
                },
                {
                  icon: Code,
                  title: 'API-native',
                  description: 'Everything is exposed as an API, with 1000s of configurations and integrations.',
                  iconColor: 'text-pink-500',
                },
                {
                  icon: TestTube,
                  title: 'Automated testing',
                  description: 'Design test suites of simulated voice agents to identify hallucination risks before going to production.',
                  iconColor: 'text-blue-400',
                },
                {
                  icon: Layers,
                  title: 'Bring your own models',
                  description: 'Bring your own API keys for transcription, LLM, or text-to-speech models. Or, plug in your own self-hosted models.',
                  iconColor: 'text-green-500',
                },
                {
                  icon: Wrench,
                  title: 'Tool calling',
                  description: 'Plug in your APIs as tools to intelligently fetch data and perform actions on your server.',
                  iconColor: 'text-orange-500',
                },
                {
                  icon: Beaker,
                  title: 'A/B experiments',
                  description: 'Test different variations of prompts, voices, and flows to continuously optimize performance.',
                  iconColor: 'text-yellow-500',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative p-8",
                    index < 3 && "border-b border-white/5",
                    index % 3 !== 2 && "md:border-r border-white/5"
                  )}
                >
                  <div className="mb-4">
                    <feature.icon className={cn("w-8 h-8", feature.iconColor)} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
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
            className="mb-20 relative rounded-2xl overflow-hidden"
          >
            {/* Shiny border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-600/50 via-slate-400/30 to-slate-600/50 p-[1px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90" />
            </div>
            
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/20 via-white/10 to-slate-500/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 rounded-2xl">
              {/* Left: Visual/Icon Section */}
              <div className={`p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 ${productIndex % 2 === 0 ? 'lg:border-r border-slate-700/30' : 'lg:border-l border-slate-700/30 lg:order-2'}`}>
                <div className="relative">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${product.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${product.id})`} />
                    </svg>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    className="relative flex flex-col items-center justify-center min-h-[300px]"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/30 to-violet-500/30 blur-2xl scale-150" />
                      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-500/50 flex items-center justify-center shadow-2xl">
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-600/50 to-transparent" />
                        <product.icon className="w-16 h-16 text-white relative z-10" />
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-slate-400">{product.tagline}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right: Content Section */}
              <div className={`p-8 lg:p-12 flex flex-col justify-center ${productIndex % 2 === 0 ? '' : 'lg:order-1'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white leading-tight">
                    {product.details.title}
                  </h2>
                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    {product.details.subtitle}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {product.details.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-4 border border-slate-700/30 rounded-lg bg-slate-800/30"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                            <highlight.icon className="w-4 h-4 text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">{highlight.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{highlight.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold  transition-all border border-slate-500/30 shadow-lg"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
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
          className="text-center border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-12 rounded-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            See it live
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us what outcome you want—bookings, renewals, lead recovery—and we'll show the product that delivers it.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold  transition-colors"
          >
            Book a demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;

