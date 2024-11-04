import React, { useState } from 'react';
import { Phone, MessageCircle, Copy, ExternalLink } from 'lucide-react';
import FormField from '../common/FormField';

const WhatsAppGenerator: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remove any non-digit characters from phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    
    const link = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link berhasil disalin!');
  };

  const openWhatsApp = () => {
    window.open(generatedLink, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <Phone className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Nomor WhatsApp</h2>
        </div>

        <FormField
          label="Nomor WhatsApp (contoh: 628123456789)"
          name="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <MessageCircle className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Pesan</h2>
        </div>

        <FormField
          label="Pesan yang akan dikirim"
          name="message"
          type="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Generate Link
        </button>
      </div>

      {generatedLink && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Link WhatsApp</h3>
          <div className="bg-white p-4 rounded border border-gray-200 break-all">
            {generatedLink}
          </div>
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Copy className="mr-2 h-4 w-4" />
              Salin Link
            </button>
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Buka di WhatsApp
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default WhatsAppGenerator;