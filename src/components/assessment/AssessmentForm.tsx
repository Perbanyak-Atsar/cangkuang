import React, { useState } from 'react';
import { Check, Loader2, Star, Brain, Book, Presentation, Users, Clock, Target, Lightbulb, Shield } from 'lucide-react';
import FormField from '../common/FormField';

interface RatingOption {
  value: number;
  label: string;
  color: string;
}

const ratingOptions: RatingOption[] = [
  { value: 1, label: 'BURUK', color: 'bg-red-100 text-red-600' },
  { value: 2, label: 'KURANG', color: 'bg-orange-100 text-orange-600' },
  { value: 3, label: 'BAIK', color: 'bg-blue-100 text-blue-600' },
  { value: 4, label: 'BAIK SEKALI', color: 'bg-green-100 text-green-600' },
];

const assessmentCategories = [
  { id: 'tsaqofah_hu', label: 'Tsaqofah HU', icon: Book },
  { id: 'tsaqofah_cp', label: 'Tsaqofah CP', icon: Brain },
  { id: 'tsaqofah_3_kitab', label: 'Tsaqofah 3 Kitab Dasar', icon: Book },
  { id: 'kemampuan_mengisi', label: 'Kemampuan Mengisi', icon: Presentation },
  { id: 'kemampuan_meriayah', label: 'Kemampuan Meriayah', icon: Users },
  { id: 'manajerial', label: 'Manajerial', icon: Target },
  { id: 'leadership', label: 'Leadership', icon: Users },
  { id: 'amanah_kedisiplinan', label: 'Amanah / Kedisiplinan', icon: Shield },
  { id: 'keluangan_waktu', label: 'Keluangan Waktu', icon: Clock },
  { id: 'mandiri', label: 'Mandiri', icon: Star },
  { id: 'kritis', label: 'Kritis', icon: Lightbulb },
];

const AssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    sektor: '',
    status: '',
    ...Object.fromEntries(assessmentCategories.map(cat => [cat.id, '']))
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzbZpSHDI7dLHMV_esjrllhdQufoej7mM6sqh36TLEn3GV96fmeH4pD3MPWeK-kuOWpiA/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'no-cors'
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          nama: '',
          sektor: '',
          status: '',
          ...Object.fromEntries(assessmentCategories.map(cat => [cat.id, '']))
        });
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nama"
          name="nama"
          type="text"
          value={formData.nama}
          onChange={handleChange}
          required
        />

        <FormField
          label="Sektor"
          name="sektor"
          type="select"
          value={formData.sektor}
          onChange={handleChange}
          options={[
            { value: 'Banjaran', label: 'Banjaran' },
            { value: 'Cangkuang', label: 'Cangkuang' },
            { value: 'Pangalengan', label: 'Pangalengan' }
          ]}
          required
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'Karyawan', label: 'Karyawan' },
            { value: 'Pelajar', label: 'Pelajar' }
          ]}
          required
        />
      </div>

      <div className="space-y-6">
        {assessmentCategories.map(category => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Icon className="w-5 h-5 text-green-600 mr-2" />
                <label className="text-sm font-medium text-gray-700">{category.label}</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ratingOptions.map(option => (
                  <label
                    key={`${category.id}-${option.value}`}
                    className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                      formData[category.id] === option.value.toString()
                        ? option.color
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name={category.id}
                      value={option.value}
                      checked={formData[category.id] === option.value.toString()}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Simpan
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
              Data berhasil disimpan!
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default AssessmentForm;