import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import FormField from '../common/FormField';

interface TeacherRegistrationProps {
  onComplete: (data: { sektor: string; musyrif: string; pelajar: string[] }) => void;
}

const sektorData = {
  'Cangkuang': {
    musyrif: ['Anggara', 'Utis', 'Usman',],
    pelajar: {
      'Anggara': ['Hari', 'Utis', 'Usman', 'Muchtar'],
      'Utis': ['Husen'],
      'Usman': ['Indra'],
      'Muchtar': ['Nurdin', 'Riki', 'Aziz', 'Budi']
    }
  },
  
};

const TeacherRegistration: React.FC<TeacherRegistrationProps> = ({ onComplete }) => {
  const [sektor, setSektor] = useState('');
  const [musyrif, setMusyrif] = useState('');
  const [selectedPelajar, setSelectedPelajar] = useState<string[]>([]);
  const [musyrifList, setMusyrifList] = useState<string[]>([]);
  const [pelajarList, setPelajarList] = useState<string[]>([]);

  useEffect(() => {
    if (sektor) {
      setMusyrifList(sektorData[sektor as keyof typeof sektorData].musyrif);
      setMusyrif('');
      setSelectedPelajar([]);
    }
  }, [sektor]);

  useEffect(() => {
    if (sektor && musyrif) {
      const pelajarData = sektorData[sektor as keyof typeof sektorData].pelajar[musyrif];
      setPelajarList(pelajarData || []);
      setSelectedPelajar([]);
    }
  }, [sektor, musyrif]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sektor && musyrif && selectedPelajar.length > 0) {
      onComplete({ sektor, musyrif, pelajar: selectedPelajar });
    } else {
      alert('Mohon lengkapi semua data dan pilih minimal satu pelajar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Form Registrasi Guru</h2>
        <p className="text-gray-600 mt-2">Silakan lengkapi data untuk melanjutkan ke form laporan</p>
      </div>

      <FormField
        label="Sektor"
        name="sektor"
        type="select"
        value={sektor}
        onChange={(e) => setSektor(e.target.value)}
        options={Object.keys(sektorData).map(s => ({ value: s, label: s }))}
        required
      />

      <FormField
        label="Musyrif"
        name="musyrif"
        type="select"
        value={musyrif}
        onChange={(e) => setMusyrif(e.target.value)}
        options={musyrifList.map(m => ({ value: m, label: m }))}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Pelajar <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pelajarList.map((pelajar) => (
            <label key={pelajar} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPelajar.includes(pelajar)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPelajar([...selectedPelajar, pelajar]);
                  } else {
                    setSelectedPelajar(selectedPelajar.filter(p => p !== pelajar));
                  }
                }}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{pelajar}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Lanjutkan
        </button>
      </div>
    </form>
  );
};

export default TeacherRegistration;