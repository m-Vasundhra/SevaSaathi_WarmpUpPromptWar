import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { AppPage } from './pages/AppPage';
import { DemoPage } from './pages/DemoPage';
import { HelpPage } from './pages/HelpPage';
import { ToastContainer } from './components/ui/ToastContainer';
import { AssistantButton } from './components/assistant/AssistantButton';

const MainRouter: React.FC = () => {
  const { currentRoute, isAssistantOpen, setIsAssistantOpen } = useApp();

  const renderRoute = () => {
    switch (currentRoute) {
      case '/':
        return <LandingPage />;
      case '/demo':
        return <DemoPage />;
      case '/help':
        return <HelpPage />;
      case '/app':
      case '/app/assistant':
      case '/app/tasks':
      case '/app/settings':
      default:
        if (currentRoute.startsWith('/app')) {
          return <AppPage />;
        }
        return <LandingPage />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {renderRoute()}

      {/* Floating AI Helper quick-trigger bubble (visible across pages when panel is closed) */}
      <AssistantButton 
        isOpen={isAssistantOpen} 
        onClick={() => setIsAssistantOpen(!isAssistantOpen)} 
      />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
