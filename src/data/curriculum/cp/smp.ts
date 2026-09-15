import { MasterCPEntry } from './types';

/**
 * MASTER CAPAIAN PEMBELAJARAN RESMI JENJANG SMP (FASE D)
 * Sumber Resmi: Keputusan Kepala BSKAP No. 032/H/KR/2024 & Permendikdasmen No. 13 Tahun 2025
 */
export const SMP_CP_ENTRIES: MasterCPEntry[] = [
  {
    id: 'cp-smp-fase-d-bindo',
    subjectCode: 'BINDO',
    phase: 'D',
    level: 'SMP',
    regulationSourceId: 'DEC-BSKAP-032-2024',
    verificationStatus: 'UNVERIFIED',
    generalDescription:
      'Pada akhir Fase D, peserta didik memiliki kemampuan berbahasa untuk berkomunikasi dan bernalar sesuai dengan tujuan, konteks sosial, akademis, dan dunia kerja. Peserta didik mampu memahami, mengolah, menginterpretasi, dan mengevaluasi informasi dari berbagai tipe teks secara kritis dan kreatif.',
    elements: [
      {
        name: 'Menyimak',
        content:
          'Peserta didik mampu menganalisis dan mengevaluasi informasi berupa gagasan, pikiran, perasaan, pandangan, arahan atau pesan yang akurat dari berbagai jenis teks fiksi dan nonfiksi.',
      },
      {
        name: 'Membaca dan Memirsa',
        content:
          'Peserta didik memahami informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari berbagai teks deskripsi, narasi, puisi, eksplanasi, dan eksposisi dari teks cetak dan elektronik.',
      },
      {
        name: 'Berbicara dan Mempresentasikan',
        content:
          'Peserta didik mampu menyampaikan gagasan, pikiran, pandangan, arahan, atau pesan untuk mengajukan usul, pemecahan masalah, dan pemberian solusi secara lisan dalam bentuk monolog dan dialog logis, kritis, dan kreatif.',
      },
      {
        name: 'Menulis',
        content:
          'Peserta didik mampu menulis gagasan, pikiran, pandangan, arahan atau pesan tertulis untuk berbagai tujuan secara logis, kritis, dan kreatif.',
      },
    ],
  },
  {
    id: 'cp-smp-fase-d-mat',
    subjectCode: 'MAT',
    phase: 'D',
    level: 'SMP',
    regulationSourceId: 'DEC-BSKAP-032-2024',
    verificationStatus: 'UNVERIFIED',
    generalDescription:
      'Pada akhir Fase D, peserta didik dapat mengoperasikan bilangan rasional, memahami bentuk aljabar, persamaan dan pertidaksamaan linier satu variabel, relasi dan fungsi, sistem persamaan linier dua variabel, teorema Pythagoras, serta peluang dan statistika.',
    elements: [
      {
        name: 'Bilangan',
        content:
          'Peserta didik dapat membaca, menulis, dan membandingkan bilangan bulat, bilangan rasional, dan irasional, bilangan desimal, bilangan berpangkat bulat dan akar, bilangan dalam notasi ilmiah.',
      },
      {
        name: 'Aljabar',
        content:
          'Peserta didik dapat mengenali, memprediksi dan menggeneralisasi pola dalam bentuk susunan objek dan pola bilangan. Menyatakan suatu situasi ke dalam bentuk aljabar.',
      },
      {
        name: 'Pengukuran dan Geometri',
        content:
          'Peserta didik dapat menerapkan teorema Pythagoras dan rumus luas permukaan serta volume bangun ruang (prisma, tabung, limas, kerucut, bola).',
      },
      {
        name: 'Analisis Data dan Peluang',
        content:
          'Peserta didik dapat merumuskan pertanyaan, mengumpulkan, menyajikan, dan menganalisis data menggunakan diagram batang, lingkaran, histogram, serta menghitung ukuran pemusatan (mean, median, modus).',
      },
    ],
  },
  {
    id: 'cp-smp-fase-d-ipa',
    subjectCode: 'IPA',
    phase: 'D',
    level: 'SMP',
    regulationSourceId: 'DEC-BSKAP-032-2024',
    verificationStatus: 'UNVERIFIED',
    generalDescription:
      'Pada akhir Fase D, peserta didik memahami sistem organisasi kehidupan, klasifikasi makhluk hidup, zat dan perubahannya, sistem tubuh manusia, interaksi ekosistem, gerak dan gaya, getaran, gelombang, dan cahaya, serta tata surya.',
    elements: [
      {
        name: 'Pemahaman IPA',
        content:
          'Peserta didik mengidentifikasi sifat dan perubahan zat, sistem organisasi kehidupan mulai dari sel hingga organisme, sistem organ tubuh manusia, konsep gerak dan gaya, energi dan perubahannya, rangkaian listrik dan kemagnetan, serta lapisan bumi dan tata surya.',
      },
      {
        name: 'Keterampilan Proses',
        content:
          'Mengamati, merumuskan hipotesis, merencanakan dan melaksanakan penyelidikan ilmiah, menganalisis data, menarik kesimpulan berbasis bukti empiris, dan mempublikasikan hasil.',
      },
    ],
  },
  {
    id: 'cp-smp-fase-d-ips',
    subjectCode: 'IPS',
    phase: 'D',
    level: 'SMP',
    regulationSourceId: 'DEC-BSKAP-032-2024',
    verificationStatus: 'UNVERIFIED',
    generalDescription:
      'Pada akhir Fase D, peserta didik memahami keterkaitan kondisi geografis dengan aktivitas ekonomi masyarakat, dinamika interaksi sosial, sejarah peradaban nusantara dan kolonialisme, serta literasi finansial.',
    elements: [
      {
        name: 'Pemahaman Konsep IPS',
        content:
          'Peserta didik memahami kondisi geografis Indonesia dan dampaknya terhadap aktivitas ekonomi, sosial, dan budaya; menganalisis perubahan sosial budaya di era modern; memahami sejarah perjuangan kemerdekaan; dan mengaplikasikan literasi keuangan dasar.',
      },
      {
        name: 'Keterampilan Inkuiri Sosial',
        content:
          'Melakukan studi kasus sosial, wawancara, pemetaan wilayah, penelusuran sumber sejarah lokal, dan merefleksikan solusi atas persoalan sosial kemasyarakatan.',
      },
    ],
  },
  {
    id: 'cp-smp-fase-d-informatika',
    subjectCode: 'INFORMATIKA',
    phase: 'D',
    level: 'SMP',
    regulationSourceId: 'DEC-BSKAP-032-2024',
    verificationStatus: 'UNVERIFIED',
    generalDescription:
      'Pada akhir Fase D, peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan solusi, memanfaatkan TIK untuk integrasi konten dan kolaborasi, memahami sistem komputer dan jaringan internet, menganalisis data, serta membuat program blok/tekstual.',
    elements: [
      {
        name: 'Berpikir Komputasional (BK)',
        content:
          'Menerapkan berpikir komputasional untuk memecahkan persoalan komputasi yang mengandung struktur data diskrit berukuran kecil.',
      },
      {
        name: 'Algoritma dan Pemrograman (AP)',
        content:
          'Mampu menyusun algoritma terstruktur dan membuat program sederhana menggunakan lingkungan pemrograman visual atau tekstual.',
      },
      {
        name: 'Teknologi Informasi dan Komunikasi (TIK)',
        content:
          'Mampu memanfaatkan aplikasi perkantoran, peramban web, dan surel untuk berkomunikasi, bertukar informasi, dan berkolaborasi.',
      },
      {
        name: 'Dampak Sosial Informatika (DSI)',
        content:
          'Memahami etika berinternet, keamanan digital, hukum privasi data, dan dampak teknologi terhadap masyarakat.',
      },
    ],
  },
];
