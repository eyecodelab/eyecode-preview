// Reusable per-paper enrichment, keyed by paper ID. Future conferences add entries here
// and analysis articles under src/content/published/; no layout code changes are needed.
//
// Entry shape (all optional):
//  thumbnail: {url:'images/papers/<id>/thumbnail.webp', width:1280, height:720, alt:{vi,en}, source, license}
//  links:     {pdf, arxiv, slides, code, project, video}  (HTTPS, official/verified only)
//  media:     [{type:'figure', section:<paperReviewSections id>, url, width, height, alt, caption, source, attribution, license}]
//  embeds:    [{type:'pdf'|'slides'|'video', url, title:{vi,en}, permission:<HTTPS source proving embedding is allowed>}]
//  awardLabel: {vi,en}  exact official award wording when it is more specific than the generic type label
// Thumbnails and figures are included only when the source license permits reuse.
export const paperEnrichment={
 "cvpr-2025-megasam": {
  "awardLabel": {
   "vi": "Best Paper Honorable Mention (CVPR 2025)",
   "en": "Best Paper Honorable Mention · CVPR 2025"
  },
  "links": {
   "pdf": "https://openaccess.thecvf.com/content/CVPR2025/papers/Li_MegaSaM_Accurate_Fast_and_Robust_Structure_and_Motion_from_Casual_CVPR_2025_paper.pdf",
   "arxiv": "https://arxiv.org/abs/2412.04463",
   "code": "https://github.com/mega-sam/mega-sam",
   "project": "https://mega-sam.github.io/"
  },
  "thumbnail": {
   "url": "images/papers/cvpr-2025-megasam/pipeline.svg",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ EyeCode về pipeline MegaSaM",
    "en": "EyeCode schematic of the MegaSaM pipeline"
   },
   "source": "https://arxiv.org/abs/2412.04463",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-megasam/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ luồng dữ liệu: video, độ sâu đơn ảnh, theo dõi camera, backend, độ sâu nhất quán",
     "en": "Data flow: video, mono depth, camera tracking, backend, consistent depth"
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode về pipeline theo mô tả trong bài; không phải bản sao hình của tác giả.",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)."
    },
    "source": "https://arxiv.org/abs/2412.04463",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-megasam/sintel-ate.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột ATE trên Sintel khi biết tiêu cự cho sáu phương pháp",
     "en": "Bar chart of Sintel ATE with known focal length for six methods"
    },
    "caption": {
     "vi": "Biểu đồ cột EyeCode của cột ATE calibrated trong Bảng 1 (càng thấp càng tốt); minh họa gốc, số liệu chép từ bài.",
     "en": "EyeCode bar chart of the calibrated ATE column of Table 1 (lower is better); original illustration, values copied from the paper."
    },
    "source": "https://arxiv.org/abs/2412.04463",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-megasam/ablation-rte.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột RTE trên Sintel cho các cấu hình ablation",
     "en": "Bar chart of Sintel RTE for the ablation configurations"
    },
    "caption": {
     "vi": "Biểu đồ cột EyeCode của cột RTE trong Bảng 5 (càng thấp càng tốt); minh họa gốc, số liệu chép từ bài.",
     "en": "EyeCode bar chart of the RTE column of Table 5 (lower is better); original illustration, values copied from the paper."
    },
    "source": "https://arxiv.org/abs/2412.04463",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": [],
  "affiliations": [
   "Google DeepMind",
   "UC Berkeley",
   "University of Michigan"
  ]
 },
 "cvpr-2025-molmo-pixmo": {
  "awardLabel": {
   "vi": "Best Paper Honorable Mention (CVPR 2025)",
   "en": "Best Paper Honorable Mention · CVPR 2025"
  },
  "links": {
   "pdf": "https://arxiv.org/pdf/2409.17146",
   "project": "https://molmo.allenai.org/blog",
   "code": "https://github.com/allenai/molmo",
   "video": "https://www.youtube.com/watch?v=spBxYa3eAlA"
  },
  "affiliations": [
   "University of Washington",
   "Allen Institute for AI"
  ],
  "thumbnail": {
   "url": "images/papers/cvpr-2025-molmo-pixmo/pipeline.svg",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ luồng dữ liệu của Molmo: ảnh, crop chồng lấn, ViT, pooling, LLM, văn bản hoặc điểm",
    "en": "Molmo data flow: image, overlapping crops, ViT, pooling, LLM, text or points"
   },
   "source": "https://arxiv.org/abs/2409.17146",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-molmo-pixmo/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ luồng dữ liệu của Molmo",
     "en": "Molmo data flow schematic"
    },
    "caption": {
     "vi": "Sơ đồ EyeCode minh họa phương pháp như mô tả trong bài báo; không phải bản sao hình của tác giả.",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)."
    },
    "source": "https://arxiv.org/abs/2409.17146",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-molmo-pixmo/results-bars.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột điểm trung bình 11 benchmark của Molmo-72B, Molmo-7B-D, MolmoE-1B và các mô hình khác",
     "en": "Bar chart of the 11-benchmark average for Molmo-72B, Molmo-7B-D, MolmoE-1B and other models"
    },
    "caption": {
     "vi": "Biểu đồ EyeCode vẽ lại cột 11-avg từ Bảng 1 của bài báo (trục bắt đầu từ 50); không phải hình của tác giả.",
     "en": "EyeCode chart redrawn from the 11-avg column of Table 1 of the paper (axis starts at 50); not the authors' figure."
    },
    "source": "https://arxiv.org/abs/2409.17146",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-molmo-pixmo/pixmo-datasets.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Bảy tập dữ liệu PixMo với số lượng chính, chia thành do con người gán nhãn và tổng hợp",
     "en": "The seven PixMo datasets with their main counts, split into human-annotated and synthetic"
    },
    "caption": {
     "vi": "Sơ đồ EyeCode tóm tắt bảy tập PixMo theo Mục 3 của bài báo; không phải hình của tác giả.",
     "en": "EyeCode diagram summarising the seven PixMo datasets per Section 3 of the paper; not the authors' figure."
    },
    "source": "https://arxiv.org/abs/2409.17146",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": []
 },
 "cvpr-2025-navigation-world-models": {
  "awardLabel": {
   "vi": "Best Paper Honorable Mention (CVPR 2025)",
   "en": "Best Paper Honorable Mention · CVPR 2025"
  },
  "links": {
   "pdf": "https://arxiv.org/pdf/2412.03572",
   "arxiv": "https://arxiv.org/abs/2412.03572",
   "code": "https://github.com/facebookresearch/nwm/",
   "project": "https://www.amirbar.net/nwm/"
  },
  "affiliations": [
   "FAIR at Meta",
   "New York University",
   "Berkeley AI Research"
  ],
  "thumbnail": {
   "url": "images/papers/cvpr-2025-navigation-world-models/thumbnail.webp",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ khối CDiT của Navigation World Models",
    "en": "CDiT block diagram from Navigation World Models"
   },
   "source": "https://arxiv.org/abs/2412.03572",
   "license": "CC BY 4.0"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-navigation-world-models/cdit.webp",
    "width": 742,
    "height": 1200,
    "alt": {
     "vi": "Sơ đồ khối CDiT",
     "en": "CDiT block diagram"
    },
    "caption": {
     "vi": "Khối CDiT: self-attention trên khung đích và cross-attention tới các khung ngữ cảnh.",
     "en": "The CDiT block: self-attention on the target frame and cross-attention to context frames."
    },
    "source": "https://arxiv.org/abs/2412.03572",
    "attribution": "Amir Bar, Gaoyue Zhou, Danny Tran, Trevor Darrell, Yann LeCun",
    "license": "CC BY 4.0"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-navigation-world-models/planning-rollouts.webp",
    "width": 1400,
    "height": 304,
    "alt": {
     "vi": "Ba quỹ đạo ứng viên, khung cuối tưởng tượng và giá trị mất mát so với ảnh đích",
     "en": "Three candidate trajectories, imagined final frames and loss against the goal image"
    },
    "caption": {
     "vi": "Ví dụ lập kế hoạch: quỹ đạo có khung cuối gần đích nhất (loss thấp nhất) được chọn.",
     "en": "Planning example: the trajectory whose imagined final frame is closest to the goal (lowest loss) is selected."
    },
    "source": "https://arxiv.org/abs/2412.03572",
    "attribution": "Amir Bar, Gaoyue Zhou, Danny Tran, Trevor Darrell, Yann LeCun",
    "license": "CC BY 4.0"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-navigation-world-models/unknown-env.webp",
    "width": 1400,
    "height": 278,
    "alt": {
     "vi": "Dự đoán trong môi trường chưa thấy",
     "en": "Predictions in an unseen environment"
    },
    "caption": {
     "vi": "Dự đoán của NWM trong môi trường không có trong huấn luyện.",
     "en": "NWM predictions in an environment not seen in training."
    },
    "source": "https://arxiv.org/abs/2412.03572",
    "attribution": "Amir Bar, Gaoyue Zhou, Danny Tran, Trevor Darrell, Yann LeCun",
    "license": "CC BY 4.0"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-navigation-world-models/planning-loop.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ vòng lập kế hoạch trong NWM",
     "en": "Diagram of the planning loop inside NWM"
    },
    "caption": {
     "vi": "Vòng lập kế hoạch: lấy mẫu hành động bằng CEM, mô phỏng, chấm khung cuối với ảnh đích và chọn năng lượng thấp nhất (minh họa gốc của EyeCode theo Mục 3.3 và Phụ lục 7).",
     "en": "Planning loop: sample actions with CEM, simulate, score the final frame against the goal and keep the lowest energy (original EyeCode illustration of Sec. 3.3 and Appendix 7)."
    },
    "source": "https://arxiv.org/abs/2412.03572",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-navigation-world-models/fvd-chart.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột FVD của NWM và DIAMOND trên bốn dataset",
     "en": "Bar chart of FVD for NWM and DIAMOND on four datasets"
    },
    "caption": {
     "vi": "FVD của video 16 giây (càng thấp càng tốt), vẽ lại từ Bảng 6 của bài báo; giá trị làm tròn một chữ số thập phân.",
     "en": "FVD of 16-second videos (lower is better), redrawn from Table 6 of the paper; values rounded to one decimal."
    },
    "source": "https://arxiv.org/abs/2412.03572",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": []
 },
 "cvpr-2025-student-splatting-scooping": {
  "links": {
   "pdf": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhu_3D_Student_Splatting_and_Scooping_CVPR_2025_paper.pdf",
   "arxiv": "https://arxiv.org/abs/2503.10148",
   "code": "https://github.com/realcrane/3D-student-splatting-and-scooping"
  },
  "affiliations": [
   "University College London, UK",
   "University of Leeds, UK"
  ],
  "awardLabel": {
   "vi": "Best Paper Honorable Mention (CVPR 2025)",
   "en": "Best Paper Honorable Mention · CVPR 2025"
  },
  "thumbnail": {
   "url": "images/papers/cvpr-2025-student-splatting-scooping/thumbnail.webp",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ EyeCode về luồng dữ liệu của SSS: điểm SfM, thành phần Student-t, render, cập nhật SGHMC, tái chế thành phần",
    "en": "EyeCode schematic of the SSS data flow: SfM points, Student-t components, rendering, SGHMC update, component recycling"
   },
   "source": "https://arxiv.org/abs/2503.10148",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-student-splatting-scooping/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ EyeCode về luồng dữ liệu của SSS: điểm SfM, thành phần Student-t, render, cập nhật SGHMC, tái chế thành phần",
     "en": "EyeCode schematic of the SSS data flow: SfM points, Student-t components, rendering, SGHMC update, component recycling"
    },
    "caption": {
     "vi": "Sơ đồ EyeCode (minh họa gốc về phương pháp như mô tả trong bài báo; không phải bản sao hình của các tác giả).",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)."
    },
    "source": "https://arxiv.org/abs/2503.10148",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-student-splatting-scooping/sweep.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ đường PSNR trung bình trên Mip-NeRF 360 theo ngân sách thành phần: SSS 27,72 đến 28,84; 3DGS-MCMC 27,47 đến 28,56; GES 20,59 đến 23,86; 3DHGS 19,63 đến 22,12; 3DGS 19,16 đến 21,75",
     "en": "Line chart of Mip-NeRF 360 average PSNR versus component budget: SSS 27.72 to 28.84; 3DGS-MCMC 27.47 to 28.56; GES 20.59 to 23.86; 3DHGS 19.63 to 22.12; 3DGS 19.16 to 21.75"
    },
    "caption": {
     "vi": "Biểu đồ EyeCode vẽ lại từ Bảng 7 của phụ lục (hàng trung bình). Baseline do tác giả huấn luyện lại với giới hạn densification.",
     "en": "EyeCode redraw of the average rows of supplement Table 7. Baselines were re-trained by the authors with densification capped."
    },
    "source": "https://arxiv.org/abs/2503.10148",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-student-splatting-scooping/ablation.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột PSNR ablation trên Tanks and Temples: 3DGS 23,14; SGD với t dương 23,80; SGHMC với 3DGS 24,52; SGHMC với t dương 24,53; SSS đầy đủ 24,87",
     "en": "Bar chart of Tanks and Temples ablation PSNR: 3DGS 23.14; SGD with positive t 23.80; SGHMC with 3DGS 24.52; SGHMC with positive t 24.53; full SSS 24.87"
    },
    "caption": {
     "vi": "Biểu đồ EyeCode vẽ lại từ Bảng 20 của phụ lục; trục cột bắt đầu ở 22 dB.",
     "en": "EyeCode redraw of supplement Table 20; the bar axis starts at 22 dB."
    },
    "source": "https://arxiv.org/abs/2503.10148",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": []
 },
 "cvpr-2025-vggt": {
  "links": {
   "pdf": "https://jytime.github.io/data/VGGT_CVPR25.pdf",
   "code": "https://github.com/facebookresearch/vggt",
   "project": "https://vgg-t.github.io/",
   "slides": "https://docs.google.com/presentation/d/1JVuPnuZx6RgAy-U5Ezobg73XpBi7FrOh/edit?usp=sharing"
  },
  "thumbnail": {
   "url": "images/papers/cvpr-2025-vggt/pipeline.svg",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ minh họa luồng dữ liệu của VGGT do EyeCode vẽ",
    "en": "EyeCode schematic of the VGGT data flow"
   },
   "source": "https://arxiv.org/abs/2503.11651",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-vggt/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ minh họa luồng dữ liệu của VGGT do EyeCode vẽ",
     "en": "EyeCode schematic of the VGGT data flow"
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode về luồng dữ liệu VGGT theo mô tả trong bài báo; không phải bản sao hình của tác giả.",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)."
    },
    "source": "https://arxiv.org/abs/2503.11651",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2025-vggt/results-table1.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột AUC@30 trên RealEstate10K của VGGT và các baseline, lấy từ Bảng 1",
     "en": "Bar chart of RealEstate10K AUC@30 for VGGT and baselines, from Table 1"
    },
    "caption": {
     "vi": "Biểu đồ gốc của EyeCode vẽ lại số liệu từ Bảng 1 của bài báo (AUC@30 trên RealEstate10K, càng cao càng tốt).",
     "en": "Original EyeCode chart redrawing numbers from Table 1 of the paper (RealEstate10K AUC@30, higher is better)."
    },
    "source": "https://arxiv.org/abs/2503.11651",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2025-vggt/ablation-table5.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột ablation attention trên ETH3D, lấy từ Bảng 5",
     "en": "Bar chart of the attention ablation on ETH3D, from Table 5"
    },
    "caption": {
     "vi": "Biểu đồ gốc của EyeCode vẽ lại Bảng 5 của bài báo: lỗi point map Overall trên ETH3D (càng thấp càng tốt).",
     "en": "Original EyeCode chart redrawing Table 5 of the paper: ETH3D point-map Overall error (lower is better)."
    },
    "source": "https://arxiv.org/abs/2503.11651",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": [],
  "awardLabel": {
   "vi": "Best Paper (CVPR 2025)",
   "en": "Best Paper · CVPR 2025"
  }
 },
 "cvpr-2026-chordedit": {
  "links": {
   "pdf": "https://arxiv.org/pdf/2602.19083",
   "arxiv": "https://arxiv.org/abs/2602.19083",
   "code": "https://github.com/ChordEdit/ChordEdit",
   "project": "https://chordedit.github.io",
   "video": "https://www.youtube.com/watch?v=cgwRTLJpvE4"
  },
  "awardLabel": {
   "vi": "Best Student Paper Honorable Mention (CVPR 2026)",
   "en": "Best Student Paper Honorable Mention · CVPR 2026"
  },
  "thumbnail": {
   "url": "images/papers/cvpr-2026-chordedit/pipeline.svg",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ EyeCode: hai truy vấn ở t và t−δ được trộn thành trường chord, đi một bước rồi tinh chỉnh tùy chọn",
    "en": "EyeCode diagram: two queries at t and t-delta blend into the chord field, then one step and optional refinement"
   },
   "source": "https://arxiv.org/abs/2602.19083",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-chordedit/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ EyeCode: hai truy vấn ở t và t−δ được trộn thành trường chord, đi một bước rồi tinh chỉnh tùy chọn",
     "en": "EyeCode diagram: two queries at t and t-delta blend into the chord field, then one step and optional refinement"
    },
    "source": "https://arxiv.org/abs/2602.19083",
    "license": "Original EyeCode illustration",
    "caption": {
     "vi": "Sơ đồ EyeCode minh họa luồng dữ liệu của ChordEdit (minh họa gốc, không phải hình của tác giả).",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)"
    },
    "attribution": "EyeCode Tech"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-chordedit/runtime-chart.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột thang log: runtime mỗi lần chỉnh sửa của chín cấu hình trên PIE-bench, ChordEdit 0,38 và 0,20 giây, Direct Inversion + MasaCtrl 79,10 giây",
     "en": "Log-scale bar chart: runtime per edit of nine configurations on PIE-bench, ChordEdit 0.38 and 0.20 seconds, Direct Inversion + MasaCtrl 79.10 seconds"
    },
    "caption": {
     "vi": "Biểu đồ EyeCode vẽ lại cột runtime của Bảng 1 (thang log). Minh họa gốc, không phải hình của tác giả.",
     "en": "EyeCode redraw of the runtime column of Table 1 (log scale). Original illustration, not the authors' figure."
    },
    "source": "https://arxiv.org/abs/2602.19083",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-chordedit/naive-vs-chord.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ điểm: PSNR và CLIP-Edited của trường naive so với trường Chord trên InstaFlow, SwiftBrush-v2 và SD-Turbo",
     "en": "Dot plot: PSNR and CLIP-Edited of the naive field versus the Chord field on InstaFlow, SwiftBrush-v2 and SD-Turbo"
    },
    "caption": {
     "vi": "Biểu đồ EyeCode vẽ lại Bảng 3 (trục bắt đầu từ 20, không phải 0). Minh họa gốc, không phải hình của tác giả.",
     "en": "EyeCode redraw of Table 3 (axes start at 20, not zero). Original illustration, not the authors' figure."
    },
    "source": "https://arxiv.org/abs/2602.19083",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": [],
  "affiliations": [
   "Guangdong University of Technology",
   "Huizhou University",
   "Shenzhen University",
   "Peking University"
  ]
 },
 "cvpr-2026-d4rt": {
  "links": {
   "pdf": "https://storage.googleapis.com/d4rt_assets/D4RT_paper.pdf",
   "arxiv": "https://arxiv.org/abs/2512.08924",
   "project": "https://d4rt-paper.github.io/"
  },
  "affiliations": [
   "Google DeepMind",
   "University College London",
   "University of Oxford"
  ],
  "awardLabel": {
   "vi": "Best Paper (CVPR 2026)",
   "en": "Best Paper · CVPR 2026"
  },
  "thumbnail": {
   "url": "images/papers/cvpr-2026-d4rt/pipeline.svg",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ: encoder đọc video một lần, truy vấn điểm, giải mã thành điểm 3D",
    "en": "Diagram: encode the video once, query points, decode to 3D points"
   },
   "source": "https://arxiv.org/abs/2512.08924",
   "license": "Own work"
  },
  "media": [
   {
    "type": "figure",
    "section": "key-idea",
    "url": "images/papers/cvpr-2026-d4rt/fig1-overview.webp",
    "width": 1040,
    "height": 860,
    "compact": true,
    "zoom": {"en": "Open full-resolution image", "vi": "Mở ảnh độ phân giải đầy đủ"},
    "alt": {
     "vi": "Hình 1 của bài báo: video đi qua encoder thành biểu diễn cảnh toàn cục, các truy vấn độc lập được giải mã thành point cloud, point track và tham số camera",
     "en": "Figure 1 of the paper: a video goes through an encoder to a global scene representation, and independent queries are decoded into point clouds, point tracks and camera parameters"
    },
    "caption": {
     "vi": "Hình 1. Tổng quan D4RT: video được mã hóa một lần, các truy vấn độc lập được giải mã thành point cloud, point track và tham số camera. Nguồn: bài báo gốc [1].",
     "en": "Figure 1. Overview of D4RT: the video is encoded once, and independent queries are decoded into point clouds, point tracks and camera parameters. Source: original paper [1]."
    },
    "source": "https://arxiv.org/abs/2512.08924",
    "attribution": "Reproduced from Zhang et al., CVPR 2026 (arXiv:2512.08924)",
    "license": "arXiv non-exclusive license; rights remain with the authors"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-d4rt/fig2-architecture.webp",
    "width": 2110,
    "height": 510,
    "compact": true,
    "zoom": {"en": "Open full-resolution image", "vi": "Mở ảnh độ phân giải đầy đủ"}, "wide": true,
    "alt": {
     "vi": "Hình 2 của bài báo: tổng quan mô hình gồm video, truy vấn (u, v, t_src, t_tgt, t_cam) cùng các embedding, encoder self-attention, biểu diễn cảnh toàn cục và decoder cross-attention trả về vị trí 3D P",
     "en": "Figure 2 of the paper: model overview showing the video, the query (u, v, t_src, t_tgt, t_cam) with embeddings, a self-attention encoder, the global scene representation and a cross-attention decoder that outputs the 3D position P"
    },
    "caption": {
     "vi": "Hình 2. Tổng quan mô hình D4RT: encoder self-attention, biểu diễn cảnh toàn cục và decoder cross-attention trả về vị trí 3D của một truy vấn. Nguồn: bài báo gốc [1].",
     "en": "Figure 2. D4RT model overview: a self-attention encoder, the global scene representation, and a cross-attention decoder that returns the 3D position of a query. Source: original paper [1]."
    },
    "source": "https://arxiv.org/abs/2512.08924",
    "attribution": "Reproduced from Zhang et al., CVPR 2026 (arXiv:2512.08924)",
    "license": "arXiv non-exclusive license; rights remain with the authors"
   },
   {
    "type": "figure",
    "section": "results",
    "slot": "results-table",
    "url": "images/papers/cvpr-2026-d4rt/table3-throughput.webp",
    "width": 1000,
    "height": 340,
    "compact": true,
    "zoom": {"en": "Open full-resolution image", "vi": "Mở ảnh độ phân giải đầy đủ"}, "wide": true,
    "alt": {
     "vi": "Bảng 3 của bài báo: số track tối đa ở 60, 24, 10 và 1 FPS. DELTA 0, 5, 408, 5.770; SpatialTrackerV2 29, 84, 219, 2.290; D4RT 550, 1.570, 3.890, 40.180",
     "en": "Table 3 of the paper: maximum track count at 60, 24, 10 and 1 FPS. DELTA 0, 5, 408, 5,770; SpatialTrackerV2 29, 84, 219, 2,290; D4RT 550, 1,570, 3,890, 40,180"
    },
    "caption": {
     "vi": "Bảng 3. Thông lượng tracking 3D: số track 3D toàn video tối đa của mỗi phương pháp trên một GPU A100 ở từng mức FPS mục tiêu (càng cao càng tốt). Nguồn: bài báo gốc [1].",
     "en": "Table 3. 3D tracking throughput: maximum number of full-video 3D point tracks per method on a single A100 GPU at each target frame rate (higher is better). Source: original paper [1]."
    },
    "source": "https://arxiv.org/abs/2512.08924",
    "attribution": "Reproduced from Zhang et al., CVPR 2026 (arXiv:2512.08924)",
    "license": "arXiv non-exclusive license; rights remain with the authors"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-d4rt/fig4-qualitative.webp",
    "width": 2120,
    "height": 925,
    "compact": true,
    "zoom": {"en": "Open full-resolution image", "vi": "Mở ảnh độ phân giải đầy đủ"}, "wide": true,
    "alt": {
     "vi": "Hình 4 của bài báo: dựng lại cảnh con thiên nga trên ao, bông hoa và đoàn tàu mô hình bằng MegaSaM, pi3, SpatialTrackerV2 và D4RT",
     "en": "Figure 4 of the paper: reconstructions of a swan on a pond, a flower and a model train by MegaSaM, pi3, SpatialTrackerV2 and D4RT"
    },
    "caption": {
     "vi": "Hình 4. Kết quả tái dựng của các phương pháp trên ba cảnh động. Nguồn: bài báo gốc [1].",
     "en": "Figure 4. Reconstruction results across methods on three dynamic scenes. Source: original paper [1]."
    },
    "source": "https://arxiv.org/abs/2512.08924",
    "attribution": "Reproduced from Zhang et al., CVPR 2026 (arXiv:2512.08924)",
    "license": "arXiv non-exclusive license; rights remain with the authors"
   }
  ],
  "embeds": [],
  "header": {
   "figureNote": {
    "vi": "Các hình và Bảng 3 được lấy từ bài báo gốc [1] để minh họa; bản quyền thuộc về các tác giả (arXiv non-exclusive license). Quyền tái sử dụng chưa được xác nhận.",
    "en": "The figures and Table 3 are reproduced from the original paper [1] for illustration; copyright remains with the authors (arXiv non-exclusive license). Reuse permission has not been confirmed."
   },
   "variant": "compact",
   "badge": {
    "vi": "Best Paper",
    "en": "Best Paper"
   },
   "summary": {
    "vi": "D4RT là transformer feed-forward mã hóa video một lần, rồi trả lời các truy vấn điểm nhẹ để khôi phục độ sâu, quỹ đạo điểm, đám mây điểm và tham số camera trong một mô hình duy nhất.",
    "en": "D4RT is a feed-forward transformer that encodes a video once, then answers lightweight point queries to recover depth, point tracks, point clouds and camera parameters, unifying several 4D reconstruction tasks in one model."
   },
   "resourceOrder": [
    "paper",
    "code",
    "project",
    "slides",
    "video"
   ],
   "references": [
    {
     "title": "Efficiently Reconstructing Dynamic Scenes One D4RT at a Time",
     "url": "https://arxiv.org/abs/2512.08924",
     "type": {
      "vi": "Bài báo hội nghị, CVPR 2026 (arXiv:2512.08924)",
      "en": "Conference paper, CVPR 2026 (arXiv:2512.08924)"
     }
    },
    {
     "title": "D4RT project page",
     "url": "https://d4rt-paper.github.io/",
     "type": {
      "vi": "Trang dự án",
      "en": "Project website"
     }
    },
    {
     "title": "D4RT: Unified, Fast 4D Scene Reconstruction & Tracking",
     "url": "https://deepmind.google/blog/d4rt-teaching-ai-to-see-the-world-in-four-dimensions/",
     "type": {
      "vi": "Bài blog, Google DeepMind (22/01/2026)",
      "en": "Blog post, Google DeepMind (22 Jan 2026)"
     }
    },
    {
     "title": "CVPR 2026 Best Papers",
     "url": "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers",
     "type": {
      "vi": "Thông báo giải thưởng, CVPR 2026",
      "en": "Award announcement, CVPR 2026"
     }
    }
   ]
  }
 },
 "cvpr-2026-native-compact-structured-latents": {
  "links": {
   "pdf": "https://arxiv.org/pdf/2512.14692",
   "arxiv": "https://arxiv.org/abs/2512.14692",
   "code": "https://github.com/microsoft/TRELLIS.2",
   "project": "https://microsoft.github.io/TRELLIS.2/",
   "video": "https://microsoft.github.io/TRELLIS.2/assets/trellis2.mp4"
  },
  "affiliations": [
   "Tsinghua University",
   "Microsoft Research",
   "Microsoft AI",
   "University of Science and Technology of China (USTC)"
  ],
  "awardLabel": {
   "vi": "Best Student Paper (CVPR 2026)",
   "en": "Best Student Paper · CVPR 2026"
  },
  "thumbnail": {
   "url": "images/papers/cvpr-2026-native-compact-structured-latents/thumbnail.webp",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ hai giai đoạn: nén mesh thành O-Voxel và SC-VAE, rồi sinh cấu trúc thưa, latent hình dạng và latent vật liệu từ ảnh.",
    "en": "Two-stage schematic: compress a mesh into O-Voxel and an SC-VAE, then generate sparse structure, shape latents and material latents from an image."
   },
   "source": "https://arxiv.org/abs/2512.14692",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-native-compact-structured-latents/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ hai giai đoạn: nén mesh thành O-Voxel và SC-VAE, rồi sinh cấu trúc thưa, latent hình dạng và latent vật liệu từ ảnh.",
     "en": "Two-stage schematic: compress a mesh into O-Voxel and an SC-VAE, then generate sparse structure, shape latents and material latents from an image."
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode về luồng dữ liệu theo mô tả trong bài báo; không phải bản sao hình của tác giả.",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)."
    },
    "source": "https://arxiv.org/abs/2512.14692",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-native-compact-structured-latents/ovoxel.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ nội dung một voxel O-Voxel: dual vertex, cờ giao cạnh, trọng số chia cho hình dạng và sáu kênh PBR cho vật liệu.",
     "en": "Diagram of what one O-Voxel stores: dual vertex, edge flags and splitting weight for shape, and six PBR channels for material."
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode theo Mục 3.1 của bài báo; không phải bản sao hình của tác giả.",
     "en": "EyeCode original illustration of Section 3.1 of the paper; not a reproduction of the authors' figure."
    },
    "source": "https://arxiv.org/abs/2512.14692",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-native-compact-structured-latents/tokens.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột số token latent mỗi tài sản từ Bảng 1: mô hình đề xuất 9,6K (1024) và 2,2K (512) so với Trellis 9,6K, Direct3D-S2 17K, SparseFlex 56K và 225K.",
     "en": "Bar chart of latent tokens per asset from Table 1: proposed 9.6K (1024) and 2.2K (512) versus Trellis 9.6K, Direct3D-S2 17K, SparseFlex 56K and 225K."
    },
    "caption": {
     "vi": "Biểu đồ gốc của EyeCode vẽ lại cột #Token của Bảng 1; các giá trị là số liệu in trong bài.",
     "en": "EyeCode original chart of the #Token column of Table 1; values are as printed in the paper."
    },
    "source": "https://arxiv.org/abs/2512.14692",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": []
 },
 "cvpr-2026-nitrogen": {
  "links": {
   "arxiv": "https://arxiv.org/abs/2601.02427",
   "pdf": "https://arxiv.org/pdf/2601.02427",
   "code": "https://github.com/MineDojo/NitroGen",
   "project": "https://nitrogen.minedojo.org/"
  },
  "awardLabel": {
   "vi": "Best Paper Honorable Mention (CVPR 2026)",
   "en": "Best Paper Honorable Mention · CVPR 2026"
  },
  "affiliations": [
   "NVIDIA",
   "UChicago",
   "Stanford",
   "Caltech",
   "UT Austin"
  ],
  "thumbnail": {
   "url": "images/papers/cvpr-2026-nitrogen/thumbnail.webp",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ tổng quan NitroGen trên nền trắng",
    "en": "NitroGen overview figure on a white background"
   },
   "source": "https://arxiv.org/abs/2601.02427",
   "license": "CC BY-SA 4.0"
  },
  "media": [
   {
    "type": "figure",
    "section": "overview",
    "url": "images/papers/cvpr-2026-nitrogen/overview.webp",
    "width": 1400,
    "height": 609,
    "alt": {
     "vi": "Tổng quan ba thành phần của NitroGen",
     "en": "Overview of NitroGen's three components"
    },
    "caption": {
     "vi": "Tổng quan: agent nền tảng đa game, simulator phổ quát và dataset quy mô internet.",
     "en": "Overview: the multi-game foundation agent, the universal simulator and the internet-scale dataset."
    },
    "source": "https://arxiv.org/abs/2601.02427",
    "attribution": "Magne et al. (CC BY-SA 4.0, arXiv:2601.02427)",
    "license": "CC BY-SA 4.0"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-nitrogen/action-extraction.webp",
    "width": 1400,
    "height": 578,
    "alt": {
     "vi": "Pipeline trích xuất hành động",
     "en": "Action extraction pipeline"
    },
    "caption": {
     "vi": "Pipeline trích xuất hành động: template matching rồi SegFormer đọc joystick và nút.",
     "en": "Action extraction: template matching, then SegFormer parsing of joysticks and buttons."
    },
    "source": "https://arxiv.org/abs/2601.02427",
    "attribution": "Magne et al. (CC BY-SA 4.0, arXiv:2601.02427)",
    "license": "CC BY-SA 4.0"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-nitrogen/rollouts.webp",
    "width": 1400,
    "height": 1120,
    "alt": {
     "vi": "Các lượt chạy của agent trong game 2D và 3D",
     "en": "Agent rollouts in 2D and 3D games"
    },
    "caption": {
     "vi": "Các lượt chạy của agent trong môi trường game 2D và 3D.",
     "en": "Agent rollouts across 2D and 3D game environments."
    },
    "source": "https://arxiv.org/abs/2601.02427",
    "attribution": "Magne et al. (CC BY-SA 4.0, arXiv:2601.02427)",
    "license": "CC BY-SA 4.0"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-nitrogen/policy-architecture.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ EyeCode của policy NitroGen: một khung hình qua SigLIP 2 và DiT thành 16 hành động",
     "en": "EyeCode schematic of the NitroGen policy: one frame through SigLIP 2 and a DiT to 16 actions"
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode theo Mục 2.3 và Phụ lục A; không phải bản sao hình của tác giả.",
     "en": "Original EyeCode illustration based on Sec. 2.3 and Appendix A; not a reproduction of the authors' figure."
    },
    "source": "https://arxiv.org/abs/2601.02427",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-nitrogen/transfer-chart.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột EyeCode: fine-tune từ NitroGen so với huấn luyện từ đầu trên hai game bị giữ lại",
     "en": "EyeCode bar chart: fine-tuned from NitroGen versus trained from scratch on two held-out games"
    },
    "caption": {
     "vi": "Biểu đồ vẽ lại của EyeCode từ các giá trị in trong Hình 7 của bài báo (tỷ lệ hoàn thành tác vụ, %).",
     "en": "EyeCode redraw of the values printed in Figure 7 of the paper (task completion, %)."
    },
    "source": "https://arxiv.org/abs/2601.02427",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": []
 },
 "cvpr-2026-sam-3d": {
  "awardLabel": {
   "vi": "Best Paper Honorable Mention (CVPR 2026)",
   "en": "Best Paper Honorable Mention · CVPR 2026"
  },
  "links": {
   "pdf": "https://arxiv.org/pdf/2511.16624",
   "arxiv": "https://arxiv.org/abs/2511.16624",
   "code": "https://github.com/facebookresearch/sam-3d-objects",
   "project": "https://ai.meta.com/research/sam3d/",
   "dataset": "https://ai.meta.com/datasets/sa-3dao-sam-3d-artist-objects/"
  },
  "affiliations": [
   "Meta Superintelligence Labs"
  ],
  "thumbnail": {
   "url": "images/papers/cvpr-2026-sam-3d/pipeline.svg",
   "width": 1280,
   "height": 720,
   "alt": {
    "vi": "Sơ đồ minh họa của EyeCode: ảnh và mặt nạ qua DINOv2, mô hình hình học, mô hình texture, bộ giải mã ra vật thể 3D và layout",
    "en": "EyeCode schematic: image and mask through DINOv2, geometry model, texture model, decoders to a 3D object and layout"
   },
   "source": "https://arxiv.org/abs/2511.16624",
   "license": "Original EyeCode illustration"
  },
  "media": [
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-sam-3d/pipeline.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ minh họa của EyeCode: ảnh và mặt nạ qua DINOv2, mô hình hình học, mô hình texture, bộ giải mã ra vật thể 3D và layout",
     "en": "EyeCode schematic: image and mask through DINOv2, geometry model, texture model, decoders to a 3D object and layout"
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode về luồng dữ liệu của phương pháp theo mô tả trong bài báo; không phải bản sao hình của tác giả.",
     "en": "EyeCode schematic (original illustration of the method as described in the paper; not a reproduction of the authors' figure)."
    },
    "source": "https://arxiv.org/abs/2511.16624",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "methodology",
    "url": "images/papers/cvpr-2026-sam-3d/data-engine.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Sơ đồ EyeCode: vòng lặp data engine gồm chọn vật, chọn mesh tốt nhất trong 6 đến 10 ứng viên, căn vào đám mây điểm, huấn luyện lại, và nhánh họa sĩ cho ca khó",
     "en": "EyeCode diagram: the data-engine loop of picking an object, choosing the best of 6 to 10 meshes, aligning to a point cloud, retraining, plus an artist branch for hard cases"
    },
    "caption": {
     "vi": "Minh họa gốc của EyeCode về data engine theo Mục 3.2 và phụ lục A.5 của bài báo (thời gian trung bình mỗi bước và tổng sản lượng do bài báo nêu); không phải bản sao hình của tác giả.",
     "en": "Original EyeCode illustration of the data engine following Section 3.2 and appendix A.5 of the paper (average time per step and total yield as stated there); not a reproduction of the authors' figure."
    },
    "source": "https://arxiv.org/abs/2511.16624",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   },
   {
    "type": "figure",
    "section": "results",
    "url": "images/papers/cvpr-2026-sam-3d/stage-gains.svg",
    "width": 1280,
    "height": 720,
    "alt": {
     "vi": "Biểu đồ cột của EyeCode: F1@0.01 trên SA-3DAO tăng từ 0,1349 sau pretraining lên 0,2344 sau DPO với Art-3DO",
     "en": "EyeCode bar chart: F1@0.01 on SA-3DAO rising from 0.1349 after pretraining to 0.2344 after DPO on Art-3DO"
    },
    "caption": {
     "vi": "Biểu đồ gốc của EyeCode vẽ lại cột F1@0.01 của Bảng 4 trong bài báo; giá trị chép đúng như bản in.",
     "en": "Original EyeCode bar chart of the F1@0.01 column of Table 4 in the paper; values copied as printed."
    },
    "source": "https://arxiv.org/abs/2511.16624",
    "attribution": "EyeCode Tech",
    "license": "Original EyeCode illustration"
   }
  ],
  "embeds": []
 }
};
