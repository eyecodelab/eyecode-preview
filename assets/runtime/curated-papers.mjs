// Additional curated paper records that extend the verified award registry without changing it.
// Same shape as src/content/award-papers.mjs entries; official awards need a source and evidence.
export const curatedPapers=[
 {
  "id": "cvpr-2026-native-compact-structured-latents",
  "conferenceId": "cvpr",
  "year": 2026,
  "title": "Native and Compact Structured Latents for 3D Generation",
  "authors": [
   "Jianfeng Xiang",
   "Xiaoxue Chen",
   "Sicheng Xu",
   "Ruicheng Wang",
   "Zelong Lv",
   "Yu Deng",
   "Hongyuan Zhu",
   "Yue Dong",
   "Hao Zhao",
   "Nicholas Jing Yuan",
   "Jiaolong Yang"
  ],
  "topic": "generation",
  "summary": {
   "vi": "Bài báo đề xuất O-Voxel, biểu diễn voxel thưa lưu cả hình học lẫn vật liệu PBR, cùng SC-VAE nén 16 lần để một tài sản 1024 có texture chỉ còn khoảng 9,6K token. Các mô hình flow-matching tổng cộng khoảng 4B tham số sinh hình dạng và vật liệu từ ảnh, được báo cáo vượt các baseline về tái tạo và sinh trên các thử nghiệm của tác giả.",
   "en": "The paper proposes O-Voxel, a sparse voxel representation holding both geometry and PBR material, and an SC-VAE with 16x compression so a textured 1024 asset needs about 9.6K tokens. Flow-matching models totaling about 4B parameters generate shape and material from an image, and the authors report gains over baselines in reconstruction and generation experiments."
  },
  "links": {
   "paper": "https://openaccess.thecvf.com/content/CVPR2026/html/Xiang_Native_and_Compact_Structured_Latents_for_3D_Generation_CVPR_2026_paper.html",
   "arxiv": "https://arxiv.org/abs/2512.14692",
   "code": "https://github.com/microsoft/TRELLIS.2",
   "project": "https://microsoft.github.io/TRELLIS.2/"
  },
  "metadataSource": "https://openaccess.thecvf.com/content/CVPR2026/html/Xiang_Native_and_Compact_Structured_Latents_for_3D_Generation_CVPR_2026_paper.html",
  "award": {
   "type": "student",
   "source": "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers",
   "evidence": "CVPR 2026 — Best Student Paper"
  },
  "verifiedOn": "2026-11-09",
  "media": [],
  "related": []
 },
 {
  "id": "cvpr-2026-chordedit",
  "conferenceId": "cvpr",
  "year": 2026,
  "title": "ChordEdit: One-Step Low-Energy Transport for Image Editing",
  "authors": [
   "Liangsi Lu",
   "Xuhang Chen",
   "Minzhe Guo",
   "Shichu Li",
   "Jingchao Wang",
   "Yang Shi"
  ],
  "topic": "generation",
  "summary": {
   "vi": "ChordEdit chỉnh sửa ảnh theo văn bản chỉ trong một bước cho các mô hình sinh ảnh một bước, không cần huấn luyện hay inversion, bằng trường điều khiển năng lượng thấp suy ra từ vận chuyển tối ưu động. Trên PIE-bench bản đầy đủ chạy 0,38 giây.",
   "en": "ChordEdit performs text-guided image editing in a single step for one-step image generators, without training or inversion, using a low-energy control field derived from dynamic optimal transport. On PIE-bench the full version runs in 0.38 seconds."
  },
  "links": {
   "paper": "https://openaccess.thecvf.com/content/CVPR2026/html/Lu_ChordEdit_One-Step_Low-Energy_Transport_for_Image_Editing_CVPR_2026_paper.html",
   "arxiv": "https://arxiv.org/abs/2602.19083",
   "code": "https://github.com/ChordEdit/ChordEdit",
   "project": "https://chordedit.github.io"
  },
  "metadataSource": "https://openaccess.thecvf.com/content/CVPR2026/html/Lu_ChordEdit_One-Step_Low-Energy_Transport_for_Image_Editing_CVPR_2026_paper.html",
  "award": {
   "type": "student-honorable",
   "source": "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers",
   "evidence": "CVPR 2026 — Best Student Paper Honorable Mention"
  },
  "verifiedOn": "2026-11-09",
  "media": [],
  "related": []
 }
];
