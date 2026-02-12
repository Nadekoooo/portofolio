import type { ResearchPaper } from "@/types";

export const papers: ResearchPaper[] = [
  {
    id: "rp-001",
    title:
      "S-TEA: Sequential Slow Transfer Learning untuk Pemetaan Kemiskinan dengan Citra Satelit",
    authors: ["R. Salim", "C. Yudistira", "V. D. L. Tjoeng", "A. F. Wicaksono"],
    abstract:
      "Pemantauan kemiskinan yang akurat dan granular di Indonesia merupakan prasyarat fundamental untuk perencanaan pembangunan yang efektif, namun terhambat oleh keterbatasan data survei konvensional yang mahal. Penelitian ini bertujuan mengembangkan kerangka kerja inovatif S-TEA (Sequential Slow Transfer Learning) untuk memprediksi tingkat kemiskinan kecamatan menggunakan data citra satelit dan geospasial yang tersedia publik. Metodologi mengadopsi strategi sequential fine-tuning berdasarkan konsep slow learner pada tugas proksi klasifikasi intensitas Night-time Lights, NDVI, dan LST. Hasil penelitian menunjukkan kerangka kerja S-TEA mampu memitigasi catastrophic forgetting dengan penurunan CPCF relatif hingga 81,5% dibanding baseline, menghasilkan peta kemiskinan beresolusi tinggi yang lebih akurat.",
    venue: "Buletin Pagelaran Mahasiswa Nasional Bidang TIK (Gemastik)",
    year: 2024,
    pdfUrl: "/papers/s-tea-transfer-learning.pdf",
    featured: true,
  },
  {
    id: "rp-002",
    title:
      "SCENT: Semantic Chaptering dengan Exponential-Decay dan Neural Taxonomy",
    authors: ["C. Yudistira", "Tim Suika"], // Update with your teammates
    abstract:
      "Pertumbuhan masif konten video pendek di platform media sosial memicu kebutuhan mendesak akan sistem otomatis yang mampu mengekstraksi pengetahuan dari himpunan data video tersebut. Penelitian ini menawarkan pendekatan modular untuk mengoptimalkan video understanding multi-modal dengan efisiensi sumber daya. Utamanya adalah pipeline multi-modal berbasis chaptering yang mengintegrasikan ekstraksi keyframe, scene detection, dan transkripsi audio. Pipeline efisien ini menghasilkan empat output simultan: penyusunan taksonomi, peringkasan hierarkis, dan analisis konten multi-dimensi (content scoring), mencapai pemahaman video yang seimbang tanpa memerlukan infrastruktur GPU enterprise yang mahal.",
    venue: "Satria Data 2025 - Big Data Challenge",
    year: 2025,
    pdfUrl: "/papers/scent-semantic-chaptering.pdf",
    featured: true,
  },
];