import React from 'react';
import AttendanceForm from './AttendanceForm';
import { BookOpen } from 'lucide-react';

const AttendancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Aksi Kubro Palestina</h1>
          <p className="text-gray-600 mt-2">Yuk Kita Jadi Bagian Jihad Membela Palestina</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <AttendanceForm />
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;