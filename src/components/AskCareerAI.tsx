import React, { useState, useRef, useEffect } from 'react';
import { askCareerPilotAI } from '../services/aiService';
import { ChatMessage, ActiveTab } from '../types';

interface AskCareerAIProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AskCareerAI: React.FC<AskCareerAIProps> = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content:
        '👋 Welcome to CareerPilot Telemetry AI! I can evaluate your resume bullets, reverse-engineer ATS parser bottlenecks, or suggest targeted upskill pathways. What are you looking to optimize today?',
      timestamp: 'Just now',
      suggestedActions: [
        'Improve my resume ATS score',
        'Recommend high-growth AI courses',
        'How does salary benchmarking work?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const reply = await askCareerPilotAI(textToSend, history);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content:
          'I encountered a brief telemetry hiccup, but here is a tip: ensure every resume bullet point pairs an active leadership verb with a quantified metric (%, $, or time saved)!',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 rounded-2xl bg-surface-container-low/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)] p-4 space-y-3 flex flex-col max-h-[520px] transition-all animate-fadeIn">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-on-surface">
                CareerPilot AI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              title="Close chat"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-sm max-h-72">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[90%] whitespace-pre-line leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-on-primary font-medium shadow-md'
                      : 'bg-surface-container text-on-surface border border-white/[0.05]'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-on-surface-variant mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action)}
                        className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container-highest text-primary font-['Inter',sans-serif] text-xs font-semibold rounded-lg transition-colors text-left border border-primary/20 cursor-pointer"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-primary font-['Inter',sans-serif] text-xs p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200" />
                <span>Analyzing career telemetry...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick shortcuts to main app tabs */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-xs text-on-surface-variant">
            <span>Quick Nav:</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('resume-score');
                  setIsOpen(false);
                }}
                className="text-primary hover:underline cursor-pointer"
              >
                Score Resume
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setActiveTab('resume-builder');
                  setIsOpen(false);
                }}
                className="text-secondary hover:underline cursor-pointer"
              >
                Builder
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setActiveTab('courses');
                  setIsOpen(false);
                }}
                className="text-tertiary hover:underline cursor-pointer"
              >
                Courses
              </button>
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-surface-container-highest px-3 py-2 rounded-xl border border-white/[0.08]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about resumes, skills, or careers..."
              className="bg-transparent w-full text-on-surface placeholder-on-surface-variant focus:outline-none font-['Inter',sans-serif] text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-1.5 text-primary hover:text-primary-fixed-dim transition-colors disabled:opacity-40 cursor-pointer"
              title="Send"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        id="ai-chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open CareerPilot Assistant"
        className="h-13 px-5 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-['Inter',sans-serif] text-sm font-bold flex items-center gap-2 shadow-[0_0_24px_rgba(76,215,246,0.35)] hover:shadow-[0_0_36px_rgba(76,215,246,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">
          {isOpen ? 'chat_bubble' : 'smart_toy'}
        </span>
        <span>{isOpen ? 'Close Telemetry' : 'Ask Career AI'}</span>
      </button>
    </div>
  );
};
