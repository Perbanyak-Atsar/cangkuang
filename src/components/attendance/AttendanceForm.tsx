import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { sectors, statuses, getWhatsAppNumber, formatWhatsAppMessage } from './constants';

interface FormData {
  nama: string;
  sektor: string;
  status: string;
  kehadiran: string;
  alasan: string;
  membawa_kontakan: string;
  nama_kontakan: string;
}

const AttendanceForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    sektor: '',
    status: '',
    kehadiran: '',
    alasan: '',
    // membawa_kontakan: '',
    // nama_kontakan: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbxoVkU1XaUvlSjC-tYl65CWYDnHAxtoRoyjYWvsZsPtPUY2fbDZq78qzizde_XYuj1H/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'no-cors'
      });

      setShowSuccess(true);
      setTimeout(() => {
        const waNumber = getWhatsAppNumber(formData.sektor);
        const waMessage = formatWhatsAppMessage(formData);
        
        if (waNumber) {
          window.location.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${waMessage}`;
        }
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
          Nama
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          required
          value={formData.nama}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="sektor" className="block text-sm font-medium text-gray-700">
          Sektor
        </label>
        <select
          id="sektor"
          name="sektor"
          required
          value={formData.sektor}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Pilih Sektor</option>
          {sectors.map(sector => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          required
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Pilih Status</option>
          {statuses.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="kehadiran" className="block text-sm font-medium text-gray-700">
          Kehadiran
        </label>
        <select
          id="kehadiran"
          name="kehadiran"
          required
          value={formData.kehadiran}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Pilih Kehadiran</option>
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Tidak Hadir</option>
        </select>
      </div>

      {formData.kehadiran === 'Tidak Hadir' && (
        <div>
          <label htmlFor="alasan" className="block text-sm font-medium text-gray-700">
            Alasan Tidak Hadir
          </label>
          <textarea
            id="alasan"
            name="alasan"
            rows={3}
            value={formData.alasan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}
    {false && (
      <div>
        <label htmlFor="membawa_kontakan" className="block text-sm font-medium text-gray-700">
          Membawa Kontakan
        </label>
        <select
          id="membawa_kontakan"
          name="membawa_kontakan"
          required
          value={formData.membawa_kontakan}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Pilih Jawaban</option>
          <option value="Ya">Ya</option>
          <option value="Tidak">Tidak</option>
        </select>
      </div>
      )}

      {formData.membawa_kontakan === 'Ya' && (
        <div>
          <label htmlFor="nama_kontakan" className="block text-sm font-medium text-gray-700">
            Nama Kontakan
          </label>
          <input
            type="text"
            id="nama_kontakan"
            name="nama_kontakan"
            value={formData.nama_kontakan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Kirim
            </>
          )}
        </button>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <Check className="h-12 w-12 text-green-500" />
            </div>
            <p className="text-center text-lg font-medium">
              Data Berhasil Disimpan & Akan dikirim ke WhatsApp
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default AttendanceForm;