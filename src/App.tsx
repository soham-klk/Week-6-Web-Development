import React, { useState, useEffect } from 'react';
import { ActiveTab, ResumeData } from './types';
import { alexMercerResume } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AskCareerAI } from './components/AskCareerAI';
import { HomeScreen } from './screens/HomeScreen';
import { ResumeScoreScreen } from './screens/ResumeScoreScreen';
import { ResumeBuilderScreen } from './screens/ResumeBuilderScreen';
import { HowItWorksScreen } from './screens/HowItWorksScreen';
import { CoursesScreen } from './screens/CoursesScreen';
import { FAQScreen } from './screens/FAQScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [builderResume, setBuilderResume] = useState<ResumeData>(alexMercerResume);

  // Sync theme with html document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleApplyToBuilder = (text: string) => {
    const lines = text.split('\n').filter(Boolean);
    const firstLine = lines[0] || 'Candidate Name';
    setBuilderResume((prev) => ({
      ...prev,
      fullName: firstLine.length < 40 ? firstLine : prev.fullName,
      summary: lines.slice(1, 4).join(' ').slice(0, 300) || prev.summary,
    }));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-surface text-on-surface flex flex-col font-['Inter',sans-serif] selection:bg-primary-container selection:text-on-primary relative">
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* Main View Router */}
        <main className="flex-1 pt-20 flex flex-col w-full">
          {activeTab === 'home' && <HomeScreen setActiveTab={setActiveTab} />}
          {activeTab === 'resume-score' && (
            <ResumeScoreScreen
              setActiveTab={setActiveTab}
              onApplyToBuilder={handleApplyToBuilder}
            />
          )}
          {activeTab === 'resume-builder' && (
            <ResumeBuilderScreen
              setActiveTab={setActiveTab}
              initialResume={builderResume}
            />
          )}
          {activeTab === 'how-it-works' && (
            <HowItWorksScreen setActiveTab={setActiveTab} />
          )}
          {activeTab === 'courses' && <CoursesScreen setActiveTab={setActiveTab} />}
          {activeTab === 'faq' && <FAQScreen setActiveTab={setActiveTab} />}

          {/* Authentication & Dashboard Views */}
          {activeTab === 'login' && <LoginScreen setActiveTab={setActiveTab} />}
          {activeTab === 'signup' && <SignupScreen setActiveTab={setActiveTab} />}
          {activeTab === 'dashboard' && <DashboardScreen setActiveTab={setActiveTab} />}
          {activeTab === 'forgot-password' && (
            <ForgotPasswordScreen setActiveTab={setActiveTab} />
          )}
        </main>

        {/* Floating AI Assistant Drawer */}
        <AskCareerAI setActiveTab={setActiveTab} />

        {/* Global Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </AuthProvider>
  );
}
