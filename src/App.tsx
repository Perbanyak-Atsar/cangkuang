import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AttendancePage from './components/attendance/AttendancePage';
import ContactsPage from './components/contacts/ContactsPage';
import AssessmentPage from './components/assessment/AssessmentPage';
import GuidePage from './components/guide/GuidePage';
import TeacherReportPage from './components/report/TeacherReportPage';
import WhatsAppGeneratorPage from './components/whatsapp/WhatsAppGeneratorPage';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 lg:hidden z-50"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/report" element={<TeacherReportPage />} />
              <Route path="/whatsapp" element={<WhatsAppGeneratorPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;