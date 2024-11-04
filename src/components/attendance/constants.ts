export const sectors = [
  { value: 'Banjaran', label: 'Banjaran' },
  { value: 'Cangkuang', label: 'Cangkuang' },
  { value: 'Pangalengan', label: 'Pangalengan' }
];

export const statuses = [
  { value: 'Karyawan', label: 'Karyawan' },
  { value: 'Pelajar', label: 'Pelajar' }
];

export const getWhatsAppNumber = (sector: string): string => {
  const numbers = {
    'Cangkuang': '6281214718545',
    'Banjaran': '6285724304558',
    'Pangalengan': '6285294130558'
  };
  return numbers[sector as keyof typeof numbers] || '';
};

export const formatWhatsAppMessage = (data: any): string => {
  let message = `Assalamualaikum wr wb%0A`;
  message += `Ust saya sudah isi Form kehadirannya, berikut datanya:%0A%0A`;
  message += `Nama: ${data.nama}%0A`;
  message += `Sektor: ${data.sektor}%0A`;
  message += `Status: ${data.status}%0A`;
  message += `Kehadiran: ${data.kehadiran}%0A`;
  
  if (data.alasan) {
    message += `Alasan Tidak Hadir: ${data.alasan}%0A`;
  }
  
  message += `Membawa Kontakan: ${data.membawa_kontakan}%0A`;
  
  if (data.nama_kontakan) {
    message += `Nama Kontakan: ${data.nama_kontakan}%0A`;
  }
  
  return message;
};