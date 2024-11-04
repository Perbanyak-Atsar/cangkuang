import React, { useState, useEffect } from 'react';
import { Check, Loader2, Book, Calendar, User, Users, FileText, MessageSquare } from 'lucide-react';
import FormField from '../common/FormField';

interface StudentReport {
  name: string;
  attendance: string;
  control: string;
  contact: string;
  fee: string;
  bulletins: string;
}

interface FormData {
  teacherName: string;
  courseDate: string;
  bookPage: string;
  youthStatus: string;
  periodStart: string;
  periodEnd: string;
  studentReports: StudentReport[];
  youthConditionNotes: string;
  contactNotes: string;
}

interface TeacherReportFormProps {
  registrationData: {
    sektor: string;
    musyrif: string;
    pelajar: string[];
  };
}

const TeacherReportForm: React.FC<TeacherReportFormProps> = ({ registrationData }) => {
  const [formData, setFormData] = useState<FormData>({
    teacherName: registrationData.musyrif,
    courseDate: new Date().toISOString().split('T')[0],
    bookPage: '',
    youthStatus: '',
    periodStart: new Date().toISOString().split('T')[0],
    periodEnd: new Date().toISOString().split('T')[0],
    studentReports: registrationData.pelajar.map(name => ({
      name,
      attendance: '',
      control: '',
      contact: '',
      fee: '',
      bulletins: ''
    })),
    youthConditionNotes: '',
    contactNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentReportChange = (index: number, field: keyof StudentReport, value: string) => {
    setFormData(prev => ({
      ...prev,
      studentReports: prev.studentReports.map((report, i) => 
        i === index ? { ...report, [field]: value } : report
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        sektor: registrationData.sektor,
        timestamp: new Date().toISOString()
      };

      await fetch('https://script.google.com/macros/s/AKfycbyhh9ibuwbA2PyeVpqQtt4lZPmIUdaVJ3iMpuBNfIhKa8QvhNRghfi9ZvL4zc2qiBGUcg/exec', {
        method: 'POST',
        body: JSON.stringify({
          data: payload,
          sheet: 'Laporan Guru'
        }),
        mode: 'no-cors'
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form or redirect
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
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            <User className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Informasi Guru</h2>
          </div>
          
          <FormField
            label="Nama Guru"
            name="teacherName"
            type="text"
            value={formData.teacherName}
            onChange={handleChange}
            required
          />

          <FormField
            label="Tanggal Kursus"
            name="courseDate"
            type="text"
            value={formData.courseDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            <Book className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Detail Pembelajaran</h2>
          </div>

          <FormField
            label="Buku/Halaman"
            name="bookPage"
            type="text"
            value={formData.bookPage}
            onChange={handleChange}
            required
          />

          <FormField
            label="Status Pemuda"
            name="youthStatus"
            type="text"
            value={formData.youthStatus}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <Calendar className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Periode Laporan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Tanggal Mulai"
            name="periodStart"
            type="text"
            value={formData.periodStart}
            onChange={handleChange}
            required
          />

          <FormField
            label="Tanggal Selesai"
            name="periodEnd"
            type="text"
            value={formData.periodEnd}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <Users className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Laporan Pelajar</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pemuda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontrol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jml Sebar Buletin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.studentReports.map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={report.attendance}
                      onChange={(e) => handleStudentReportChange(index, 'attendance', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={report.control}
                      onChange={(e) => handleStudentReportChange(index, 'control', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={report.contact}
                      onChange={(e) => handleStudentReportChange(index, 'contact', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={report.fee}
                      onChange={(e) => handleStudentReportChange(index, 'fee', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={report.bulletins}
                      onChange={(e) => handleStudentReportChange(index, 'bulletins', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <MessageSquare className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Catatan</h2>
        </div>

        <FormField
          label="Catatan mengenai kondisi Pemuda"
          name="youthConditionNotes"
          type="textarea"
          value={formData.youthConditionNotes}
          onChange={handleChange}
          required
        />

        <FormField
          label="Catatan mengenai Kontakan Pemuda"
          name="contactNotes"
          type="textarea"
          value={formData.contactNotes}
          onChange={handleChange}
          required
        />
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
              Simpan Laporan
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
              Laporan berhasil disimpan!
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default TeacherReportForm;