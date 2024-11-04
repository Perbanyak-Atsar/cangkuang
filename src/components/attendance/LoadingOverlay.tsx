import React from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface LoadingOverlayProps {
  loading: boolean;
  success: boolean;
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, success, message }) => {
  if (!loading && !success) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
        {loading ? (
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        ) : (
          <CheckCircle className="w-8 h-8 text-green-600" />
        )}
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;