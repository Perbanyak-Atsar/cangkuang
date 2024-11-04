import React, { useState, useEffect } from 'react';
import FormField from '../common/FormField';
import { Check, Loader2 } from 'lucide-react';

interface SektorData {
  [key: string]: {
    [key: string]: string[] | { [key: string]: string[] };
  };
}

const sektorData: SektorData = {
  "Cangkuang": {
    "Anggara": ["Hari", "Utis", "Usman"],
    "Utis": ["Husen"],
    "Usman": ["Indra"],
    "Muchtar": ["Nurdin", "Riki", "Aziz", "Budi"]
  },
  "Pangalengan": {
    "Dani": ["Mama Abdul", "Rifki"],
    "Mama Abdul": {
      "1": ["Rikrik", "Abi", "Pak Enjang", "Fajar", "Syarif"],
      "2": ["Mulyana"],
      "3": ["Pak Eman", "Pak Usan RT", "Pak Yana"]
    },
    "Rifki": ["Danis", "Hari", "Opik", "Ujang"]
  },
  "Banjaran": {
    "Agnan": ["Iman", "Furqon", "Arif"],
    "Aziz": ["Sofian", "Hidayat", "Tio", "Ridwan"],
    "Riki": ["Agnan", "Toni", "Nandar"],
    "Imam": ["Anggara", "Asep", "Rahmat", "Deni P", "Engkos"],
    "Toni": ["Arba", "Fardan", "Yusuf"],
    "Nandar": ["Marno"],
    "Indra Gumilar": ["Imam", "Mulyana", "Aep", "Dani"]
  }
};

interface FormData {
  sektor: string;
  musyrif: string;
  pelajar: string;
  namaKontakan: string;
  noKontakan: string;
  segmenKontakan: string;
  kategoriKontakan: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    sektor: '',
    musyrif: '',
    pelajar: '',
    namaKontakan: '',
    noKontakan: '',
    segmenKontakan: '',
    kategoriKontakan: ''
  });

  const [musyrifList, setMusyrifList] = useState<string[]>([]);
  const [pelajarList, setPelajarList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (formData.sektor) {
      setMusyrifList(Object.keys(sektorData[formData.sektor]));
      setFormData(prev => ({ ...prev, musyrif: '', pelajar: '' }));
    }
  }, [formData.sektor]);

  useEffect(() => {
    if (formData.sektor && formData.musyrif) {
      const pelajarData = sektorData[formData.sektor][formData.musyrif];
      let pelajarArray: string[] = [];

      if (Array.isArray(pelajarData)) {
        pelajarArray = pelajarData;
      } else if (typeof pelajarData === 'object') {
        Object.entries(pelajarData).forEach(([kelompok, list]) => {
          if (Array.isArray(list)) {
            list.forEach(pelajar => {
              pelajarArray.push(`${pelajar} (Kelompok ${kelompok})`);
            });
          }
        });
      }

      setPelajarList(pelajarArray);
      setFormData(prev => ({ ...prev, pelajar: '' }));
    }
  }, [formData.sektor, formData.musyrif]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzIGIjhNwAv897SKdklTuaeHmCD9jTgEYMosodY6-UpzI4iqnVo8ZfNhHga_QdVU8nC/exec', {
        method: 'POST',
        body: JSON.stringify({
          data: Object.values(formData),
          sheet: 'Kontakan List'
        }),
        mode: 'no-cors'
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          sektor: '',
          musyrif: '',
          pelajar: '',
          namaKontakan: '',
          noKontakan: '',
          segmenKontakan: '',
          kategoriKontakan: ''
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Sektor"
        name="sektor"
        type="select"
        value={formData.sektor}
        onChange={handleChange}
        options={Object.keys(sektorData).map(sektor => ({ value: sektor, label: sektor }))}
        required
      />

      <FormField
        label="Musyrif"
        name="musyrif"
        type="select"
        value={formData.musyrif}
        onChange={handleChange}
        options={musyrifList.map(musyrif => ({ value: musyrif, label: musyrif }))}
        required
      />

      <FormField
        label="Pelajar"
        name="pelajar"
        type="select"
        value={formData.pelajar}
        onChange={handleChange}
        options={pelajarList.map(pelajar => ({ value: pelajar, label: pelajar }))}
        required
      />

      <FormField
        label="Nama Kontakan"
        name="namaKontakan"
        type="text"
        value={formData.namaKontakan}
        onChange={handleChange}
        required
      />

      <FormField
        label="No Kontakan"
        name="noKontakan"
        type="text"
        value={formData.noKontakan}
        onChange={handleChange}
        required
      />

      <FormField
        label="Segmen Kontakan"
        name="segmenKontakan"
        type="text"
        value={formData.segmenKontakan}
        onChange={handleChange}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Kategori Kontakan
        </label>
        <div className="space-x-4">
          {['Kontakan Amm', 'Kontakan Murakazah'].map((kategori) => (
            <label key={kategori} className="inline-flex items-center">
              <input
                type="radio"
                name="kategoriKontakan"
                value={kategori}
                checked={formData.kategoriKontakan === kategori}
                onChange={handleChange}
                className="form-radio text-green-600"
                required
              />
              <span className="ml-2">{kategori}</span>
            </label>
          ))}
        </div>
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

export default ContactForm;