'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LandingNavbar from './components/landing/navbar';
import { ArrowRight, Zap, Shield, Globe, Bot } from 'lucide-react';
import Link from 'next/link';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Tinos ,Cormorant_Garamond } from 'next/font/google';
import Features from './components/Features';
import Products from './components/Products';
import { TypingAnimation } from '@/components/ui/typing-animation';

const tinos = Tinos({
  subsets: ['latin'],
  weight: ['400', '700'],
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white ${cormorant_garamond.className}`}>
      <LandingNavbar />
      
      {/* Hero Section with Aurora Background */}
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/5 border border-white/10">
              <span className="w-2 h-2 bg-slate-400 animate-pulse" />
              <span className="text-gray-300">Now with AI Voice Agents</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight ">
              <TypingAnimation className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                Build Voice Agents
              </TypingAnimation>
              <br />
              <span className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                That{' '}
              </span>
              <span className="bg-gradient-to-r from-white via-pink-200 to-pink-300  text-slate-900 ">
                Works For You
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl sm:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed mt-6">
              Create intelligent voice agents that understand context, handle complex conversations, 
              and integrate seamlessly with your existing systems.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-all duration-200 shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      <Features />

      <Products />

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '10M+', label: 'API Calls Daily' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '<100ms', label: 'Avg Latency' },
              { value: '500+', label: 'Enterprise Customers' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of developers building the future of voice AI.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-all duration-200 shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40"
          >
            Start Building Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2024 VAPI. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
