
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import HistoryPage from './pages/HistoryPage';
import MethodologyPage from './pages/MethodologyPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/analysis/:id" element={<AnalysisPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
