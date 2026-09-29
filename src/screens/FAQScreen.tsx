import React, { useState } from 'react';
import { FAQItem, ActiveTab } from '../types';
import { faqList } from '../data/mockData';

interface FAQScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FAQScreen: React.FC<FAQScreenProps> = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = ['All', 'ATS Mechanics', 'Data & Privacy', 'Career Shifters', 'Optimization', 'Pricing'];

  const filteredFaqs = faqList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full bg-surface min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary-container selection:text-on-primary">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-low border border-white/[0.08] shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-primary">menu_book</span>
            <span className="font-['Inter',sans-serif] text-xs font-bold text-primary uppercase tracking-widest">
              Knowledge Repository
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-['Inter',sans-serif] text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about ATS parsers, privacy protocols, salary metrics, and how CareerPilot elevates your application success.
          </p>
        </div>

        {/* Search Bar & Filter Categories */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[22px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic, e.g. 'ATS score', 'privacy', 'pricing', 'PDF'..."
              className="w-full bg-surface-container-low pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 text-on-surface text-sm sm:text-base focus:outline-none focus:border-primary transition-colors shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-['Inter',sans-serif] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-surface-container-low border border-white/[0.06] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between text-on-surface hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="space-y-1 pr-4">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider block font-['Inter',sans-serif]">
                        {faq.category}
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg font-bold">
                        {faq.question}
                      </h3>
                    </div>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-on-surface-variant font-['Inter',sans-serif] text-sm sm:text-base leading-relaxed border-t border-white/[0.04] pt-4 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center rounded-2xl bg-surface-container-low text-on-surface-variant space-y-2">
              <span className="material-symbols-outlined text-[36px] text-primary">help_outline</span>
              <p className="text-base font-semibold text-on-surface">No matching answers found</p>
              <p className="text-xs">
                Try searching for a different term or ask our floating AI assistant directly!
              </p>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="p-8 rounded-3xl bg-surface-container-low border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-on-surface">
              Have a custom career question?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter',sans-serif]">
              Our real-time autonomous telemetry assistant is available 24/7 on the bottom right.
            </p>
          </div>

          <button
            onClick={() => {
              const chatBtn = document.getElementById('ai-chat-toggle');
              chatBtn?.click();
            }}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_15px_rgba(76,215,246,0.3)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            <span>Ask Career AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
