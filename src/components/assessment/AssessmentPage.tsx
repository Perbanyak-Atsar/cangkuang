import React from 'react';
import AssessmentForm from './AssessmentForm';
import { ClipboardCheck, Share2 } from 'lucide-react';

const AssessmentPage: React.FC = () => {
  const assessmentLink = `${window.location.origin}/assessment`;

  const copyAssessmentLink = () => {
    navigator.clipboard.writeText(assessmentLink);
    alert('Link berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Form Asesmen Internal</h1>
          <p className="text-gray-600 mt-2">Evaluasi kemampuan dan perkembangan anggota</p>
          
          <button
            onClick={copyAssessmentLink}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Salin Link Form
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <AssessmentForm />
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;