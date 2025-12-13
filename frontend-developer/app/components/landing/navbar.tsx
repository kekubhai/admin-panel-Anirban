'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
import { Tinos } from 'next/font/google';
interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isExternal?: boolean;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: 'CUSTOM AGENTS', href: '/agents' },
  { label: 'PRICING', href: '/pricing' },
  { label: 'DOCS', href: '/docs', isExternal: true },
  {
    label: 'RESOURCES',
    href: '#',
    hasDropdown: true,
    children: [
      { label: 'Blog', href: '/blog', description: 'Latest updates and insights' },
      { label: 'Case Studies', href: '/case-studies', description: 'Success stories' },
      { label: 'API Reference', href: '/api-reference', description: 'Technical documentation' },
      { label: 'Community', href: '/community', description: 'Join our community' },
    ],
  },
  { label: 'CAREERS', href: '/careers' },
  { label: 'ENTERPRISE', href: '/enterprise' },
];

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0a1a] via-[#0d1020] to-[#12101f] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-1">
            <Image
              src="/dark-logo.png"
              alt="Logo"
              width={60}
              height={60}
              className=""
            />
            <span className="text-white font-bold text-xl tracking-wider bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              pectrum.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
                  >
                    {item.label}
                    {item.isExternal && <ExternalLink className="w-3 h-3 opacity-50" />}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[240px] animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="relative group px-5 py-2.5 text-[13px] font-semibold text-white bg-slate-700  hover:bg-blue-400 transition-all duration-200 tracking-wide shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              <span className="relative z-10">OPEN DASHBOARD</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#0a0a1a] to-[#0d1020] border-t border-white/5 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                    {item.isExternal && <ExternalLink className="w-3.5 h-3.5 opacity-50" />}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 px-4">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-5 py-3 text-sm font-semibold text-black bg-[#7FFFD4] hover:bg-[#6ee7c2] transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                OPEN DASHBOARD
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

