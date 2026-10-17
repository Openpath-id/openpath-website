export interface ApplicantStory {
  id: string;
  programId?: string;
  badge: string;
  authorName: string;
  authorRole: string;
  avatarUrl?: string;
  title: string;
  excerpt: string;
  slug: string;
}

export const DUMMY_STORIES: ApplicantStory[] = [
  {
    id: "story-1",
    badge: "Beasiswa Pendidikan",
    authorName: "St Nurhikma Maulida",
    authorRole: "LPDP (jenjang doktoral)",
    title: "Gagal Dua Kali, Berhasil di Percobaan Ketiga",
    excerpt:
      "Dua pendaftaran pertamanya terhenti di masalah administrasi. Ia tetap mencoba lagi untuk memahami alur seleksi, sehingga di percobaan ketiga semua dokumen sudah siap.",
    slug: "gagal-dua-kali-berhasil-di-percobaan-ketiga",
  },
  {
    id: "story-2",
    badge: "Beasiswa Pendidikan",
    authorName: "Emharis Gigih Pratama",
    authorRole: "LPDP S2, jalur afirmasi Santri 2019",
    title: "Menyiapkan Tiga Tahap Seleksi LPDP, dari Administrasi sampai Wawancara",
    excerpt:
      "Seleksi tahap pertama dan kedua relatif mudah diukur, tetapi tahap substansi paling sulit diprediksi. Ia membagikan apa yang dinilai di wawancara: kepemimpinan, nasionalisme, dan akademik.",
    slug: "menyiapkan-tiga-tahap-seleksi-lpdp",
  },
  {
    id: "story-3",
    badge: "Beasiswa Pendidikan",
    authorName: "Ahmad Zaki Fuadi",
    authorRole: "Awardee KIP-Kuliah & Prestasi Nasional",
    title: "Kiat Lolos Beasiswa Unggulan dengan Portofolio Kegiatan Organisasi",
    excerpt:
      "Kunci utama ada pada konsistensi esai kontribusi. Jelaskan rencana konkret setelah lulus yang berdampak langsung pada masyarakat sekitar.",
    slug: "kiat-lolos-beasiswa-unggulan-portofolio",
  },
];
