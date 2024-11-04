import React, { useState } from 'react';
import { 
  Users, Clock, Book, Target, Heart, UserCheck, Briefcase, 
  BookOpen, GraduationCap, UserPlus, Award, Shield
} from 'lucide-react';

const authorizedMusyrif = [
  "Agnan", "Rifki", "Aziz", "Riki", "Imam", "Toni", "Nandar", "Indra", 
  "Asep", "Engkos", "Ito", "Mulyana", "Anggara", "Utis", "Usman", "Muchtar", 
  "Dani", "Mama abdul"
];

const GuideContent: React.FC = () => {
  const [name, setName] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAccess = () => {
    if (authorizedMusyrif.includes(name.trim())) {
      setIsAuthorized(true);
    } else {
      alert('Maaf, Anda tidak memiliki akses ke panduan ini.');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Selamat Datang, Musyrif</h2>
          <p className="text-gray-600 mt-2">Silakan masukkan nama Ustadz untuk mengakses Panduan Proses Halqah.</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && checkAccess()}
            placeholder="Nama Musyrif"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={checkAccess}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Masuk
          </button>
        </div>
      </div>
    );
  }

  const processSteps = [
    {
      title: 'Kontak Murokaz',
      icon: UserPlus,
      duration: '±2 Bulan',
      material: 'Disesuaikan',
      volume: 'Disesuaikan',
      notes: "Kontak intens minimal seminggu sekali. Target: hadir ke daurah dalam 2 bulan. Jika tidak bersedia, masuk kontakan A\"am dengan intensitas lebih rendah."
    },
    {
      title: 'Daurah',
      icon: Users,
      duration: 'Min 1 kali sebulan',
      material: 'Materi Daurah Islam Kaffah',
      volume: '3 materi dalam 1 pertemuan',
      notes: 'Peserta adalah yang sudah dikontak intens min. 2 bulan, paham konsep hidup yang benar, dan sadar kewajiban terikat syariat Islam.'
    },
    {
      title: 'Follow Up Daurah',
      icon: Target,
      duration: '-',
      material: '-',
      volume: '-',
      notes: 'Tawaran kajian rutin pekanan di akhir daurah. Kajian harus mulai max. 1 pekan setelah daurah. Dicatat sebagai HU setelah 1 bulan berjalan.'
    },
    {
      title: 'HU',
      icon: BookOpen,
      duration: 'Min 3 bln (Min 12x)',
      material: 'Silabus dari MW',
      volume: 'Disesuaikan waktu',
      notes: 'Tahap seleksi untuk lanjut ke CP. Jumlah peserta tidak dibatasi, sesuai kemampuan kontrol.'
    },
    {
      title: 'CP',
      icon: GraduationCap,
      duration: 'Min 2 bln (Min 8x liqo)',
      material: "Islam Ideology, Tentang 000 (ta\"rif), Tentang Parpol",
      volume: 'Optimasi target',
      notes: "Dijelaskan: (1) Larangan riba, (2) Kewajiban pakaian syar\"i istri, (3) Tidak terlibat parpol lain."
    },
    {
      title: 'P',
      icon: Book,
      duration: '±1 thn (±52x) untuk Nizham Al-Islam, ±6 bln (±26x) untuk At-Takattul, ±6 bln (±26x) untuk Mafahim 000',
      material: 'Nizham Al-Islam, At-Takattul, Mafahim 000, Min Muqawwimat',
      volume: '± 4-5 hal (Nizham Al-Islam), ± 2 hal (At-Takattul), ± 3 hal (Mafahim 000)',
      notes: 'Tidak terlibat riba, istri berjilbab, tidak terikat parpol lain. Setelah 4 kitab dasar, evaluasi untuk tahzib. Jika tidak mau tahzib dihentikan dari proses halqah setelah dilakukan treatment/diskusi. Jika setuju, dijelaskan 3 nasyrah idari sebelum tahzib. Nasyrah Tabanni, nasyrah menjadi bagian integral 000 dan nasyrah Qasam..'
    },
    {
      title: 'K',
      icon: Award,
      duration: 'Setiap pekan ada halqah',
      material: 'Sesuai urutan kitab',
      volume: 'Normal',
      notes: 'Jika perlu percepatan pematangan K menjadi musyrif, manajer menunjuk musyrif berkemampuan lebih untuk program crash.'
    }
  ];

  const importantNotes = [
    {
      icon: Target,
      title: 'Fokus pada Target',
      content: 'Musyrif harus fokus pada target dan perencanaan transformasi HU menjadi CP, CP menjadi P, dan P menjadi K. Semua upaya diperlukan untuk mencapai target ini, termasuk mutabaah dan mengaktifkan binaan dalam aktivitas dakwah sejak awal.'
    },
    {
      icon: UserCheck,
      title: 'Kompetensi Khusus',
      content: 'Musyrif yang menangani HU dan CP harus memiliki kompetensi khusus sebagai musyrif HU dan CP, berdasarkan hasil asesmen.'
    },
    {
      icon: Heart,
      title: 'Perhatian pada Nafsiyah',
      content: 'Musyrif sungguh-sungguh memperhatikan nafsiyah binaannya baik HU, CP, P dan K. pelaksanaan kewajiban fardhiyah masing-masing seperti ibadah fardhu tidak boleh ada persoalan lagi. Ibadah sunnah harus menjadi kebiasaan seperti sholat berjamaah di masjid atau mushola, tilawah al Quran, sholat malam, puasa sunnah dll. Paling tidak ada satu yang diunggulkan. Misalnya dia ahli tahajud atau ahli puasa atau ahli tilawah dan hafalan al Quran.'
    },
    {
      icon: Shield,
      title: 'Aktivasi Dakwah',
      content: 'Aktivasi untuk dakwah dimulai sejak tahap HU, dengan mengajak teman-teman untuk mengaji, membuat pengajian keluarga, dan kegiatan dakwah lainnya.'
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">A. Tahapan Proses Halqah</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Durasi:</span> {step.duration}</p>
                  <p><span className="font-medium">Materi:</span> {step.material}</p>
                  <p><span className="font-medium">Volume:</span> {step.volume}</p>
                  <p className="text-gray-600 mt-2">{step.notes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">B. Hal-hal Penting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {importantNotes.map((note, index) => {
            const Icon = note.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                </div>
                <p className="text-gray-600">{note.content}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GuideContent;