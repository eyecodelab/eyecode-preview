// Award-announced editions checked as of 2026-11-08. See docs/RESEARCH-AWARDS-2026.md.
// Bibliographic summaries only: no invented analyses, results, affiliations, or presentation labels.
// Conference year is retained even when proceedings appeared in the following calendar year.
export const awardTopics={
  "theory": [
    "Lý thuyết học máy",
    "Learning theory"
  ],
  "language": [
    "Mô hình ngôn ngữ",
    "Language models"
  ],
  "optimization": [
    "Tối ưu hóa",
    "Optimization"
  ],
  "alignment": [
    "Căn chỉnh & an toàn AI",
    "AI alignment & safety"
  ],
  "attribution": [
    "Đóng góp của dữ liệu",
    "Data attribution"
  ],
  "segmentation": [
    "Phân đoạn ảnh & video",
    "Image & video segmentation"
  ],
  "embodied": [
    "Học cho tác tử hiện thân",
    "Embodied learning"
  ],
  "generation": [
    "Mô hình sinh",
    "Generative modeling"
  ],
  "scientific": [
    "Học máy cho tính toán khoa học",
    "Scientific machine learning"
  ],
  "uncertainty": [
    "Ước lượng độ không chắc chắn",
    "Uncertainty estimation"
  ],
  "reconstruction": [
    "Tái dựng hình học 3D & 4D",
    "3D & 4D reconstruction"
  ],
  "rendering": [
    "Biểu diễn & dựng ảnh",
    "Scene representation & rendering"
  ],
  "imaging": [
    "Nhiếp ảnh tính toán",
    "Computational imaging"
  ],
  "control": [
    "Điều khiển & thao tác robot",
    "Robot control & manipulation"
  ],
  "perception": [
    "Nhận thức & bộ nhớ robot",
    "Robot perception & memory"
  ],
  "bio-robotics": [
    "Robot sinh học–cơ điện",
    "Biosyncretic robotics"
  ]
};

export const verifiedAwardPapers=[
  {
    "id": "iclr-2026-transformer-succinctness",
    "conferenceId": "iclr",
    "year": 2026,
    "title": "Transformers are Inherently Succinct",
    "authors": [
      "Pascal Bergsträßer",
      "Ryan Cotterell",
      "Anthony W. Lin"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Bài báo nghiên cứu mức độ cô đọng của Transformer khi biểu diễn ngôn ngữ hình thức. Các chứng minh so sánh kích thước biểu diễn với automata và logic thời gian, đồng thời chỉ ra độ khó của việc kiểm chứng mô hình.",
      "en": "Studies how compactly Transformers represent formal languages. The proofs compare their representation size with automata and temporal logic, while exposing the computational difficulty of model verification."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/5f7804e8855efe5554025217abc49315-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2510.19315"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/5f7804e8855efe5554025217abc49315-Abstract-Conference.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.iclr.cc/2026/04/23/announcing-the-iclr-2026-outstanding-papers/",
      "evidence": "ICLR 2026 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2026-llms-get-lost",
    "conferenceId": "iclr",
    "year": 2026,
    "title": "LLMs Get Lost In Multi-Turn Conversation",
    "authors": [
      "Philippe Laban",
      "Hiroaki Hayashi",
      "Yingbo Zhou",
      "Jennifer Neville"
    ],
    "topic": "language",
    "summary": {
      "vi": "Nghiên cứu kiểm tra vì sao mô hình ngôn ngữ gặp khó khăn khi yêu cầu được cung cấp qua nhiều lượt hội thoại. Phương pháp mô phỏng tách năng lực giải bài toán khỏi độ tin cậy và phân tích ảnh hưởng của những giả định hình thành quá sớm.",
      "en": "Examines failures when instructions arrive over multiple conversation turns. Simulated conversations separate task aptitude from reliability and trace how premature assumptions affect later responses."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/59f6421e64707225fdf5b28840679a07-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2505.06120",
      "code": "https://github.com/microsoft/lost_in_conversation"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/59f6421e64707225fdf5b28840679a07-Abstract-Conference.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.iclr.cc/2026/04/23/announcing-the-iclr-2026-outstanding-papers/",
      "evidence": "ICLR 2026 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2026-polar-express",
    "conferenceId": "iclr",
    "year": 2026,
    "title": "The Polar Express: Optimal Matrix Sign Methods and their Application to the Muon Algorithm",
    "authors": [
      "Noah Amsel",
      "David Persson",
      "Christopher Musco",
      "Robert M. Gower"
    ],
    "topic": "optimization",
    "summary": {
      "vi": "Polar Express giải bài toán phân rã cực của ma trận trong bộ tối ưu Muon. Phương pháp chọn đa thức qua bài toán minimax, sử dụng phép nhân ma trận phù hợp GPU và phân tích sai số trong tính toán độ chính xác hữu hạn.",
      "en": "Computes the matrix polar decomposition used by Muon. Minimax-designed polynomial iterations use GPU-friendly matrix multiplications, with analysis of approximation error and finite-precision behavior."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/df88b275bef31ac96c85f0c4013734fc-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2505.16932",
      "code": "https://github.com/NoahAmsel/PolarExpress/"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/df88b275bef31ac96c85f0c4013734fc-Abstract-Conference.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.iclr.cc/2026/04/23/announcing-the-iclr-2026-outstanding-papers/",
      "evidence": "ICLR 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2025-deep-safety-alignment",
    "conferenceId": "iclr",
    "year": 2025,
    "title": "Safety Alignment Should be Made More Than Just a Few Tokens Deep",
    "authors": [
      "Xiangyu Qi",
      "Ashwinee Panda",
      "Kaifeng Lyu",
      "Xiao Ma",
      "Subhrajit Roy",
      "Ahmad Beirami",
      "Prateek Mittal",
      "Peter Henderson"
    ],
    "topic": "alignment",
    "summary": {
      "vi": "Bài báo phân tích hiện tượng căn chỉnh an toàn chỉ tập trung vào vài token đầu của câu trả lời. Các thí nghiệm và mục tiêu fine-tuning có điều chuẩn khảo sát cách kéo dài hành vi an toàn và hạn chế sự suy giảm sau fine-tuning.",
      "en": "Investigates safety alignment concentrated in the first output tokens. Case studies and regularized fine-tuning objectives explore deeper alignment and its persistence under subsequent fine-tuning."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2406.05946",
      "code": "https://github.com/Unispac/shallow-vs-deep-alignment"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/",
      "evidence": "ICLR 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2025-llm-finetuning-dynamics",
    "conferenceId": "iclr",
    "year": 2025,
    "title": "Learning Dynamics of LLM Finetuning",
    "authors": [
      "Yi Ren",
      "Danica J. Sutherland"
    ],
    "topic": "language",
    "summary": {
      "vi": "Nghiên cứu phân rã từng bước thay đổi dự đoán trong quá trình fine-tuning mô hình ngôn ngữ. Khung phân tích liên hệ ảnh hưởng giữa các câu trả lời với hiện tượng lặp, hallucination và sự suy giảm xác suất của đáp án mong muốn trong DPO.",
      "en": "Decomposes prediction changes during language-model fine-tuning. The framework connects interactions between responses with repetition, hallucination, and decreasing preferred-response probability during prolonged DPO training."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/afe1aa79e5eea7955f553c61a307273e-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2407.10490",
      "code": "https://github.com/Joshua-Ren/Learning_dynamics_LLM"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/afe1aa79e5eea7955f553c61a307273e-Abstract-Conference.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/",
      "evidence": "ICLR 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2025-alphaedit",
    "conferenceId": "iclr",
    "year": 2025,
    "title": "AlphaEdit: Null-Space Constrained Knowledge Editing for Language Models",
    "authors": [
      "Junfeng Fang",
      "Houcheng Jiang",
      "Kun Wang",
      "Yunshan Ma",
      "Jie Shi",
      "Xiang Wang",
      "Xiangnan He",
      "Tat-Seng Chua"
    ],
    "topic": "language",
    "summary": {
      "vi": "AlphaEdit cập nhật kiến thức trong mô hình ngôn ngữ mà hạn chế tác động lên kiến thức cần giữ lại. Phương pháp chiếu thay đổi tham số vào không gian null của biểu diễn kiến thức được bảo toàn, kèm phân tích và thí nghiệm chỉnh sửa tuần tự.",
      "en": "Updates language-model knowledge while limiting interference with retained facts. Parameter changes are projected into a null space associated with preserved knowledge, supported by analysis and sequential-editing experiments."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/29c8c615b3187ee995029284702d3f43-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2410.02355",
      "code": "https://github.com/jianghoucheng/AlphaEdit"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/29c8c615b3187ee995029284702d3f43-Abstract-Conference.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/",
      "evidence": "ICLR 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2025-in-run-data-shapley",
    "conferenceId": "iclr",
    "year": 2025,
    "title": "Data Shapley in One Training Run",
    "authors": [
      "Jiachen T. Wang",
      "Prateek Mittal",
      "Dawn Song",
      "Ruoxi Jia"
    ],
    "topic": "attribution",
    "summary": {
      "vi": "In-Run Data Shapley đánh giá đóng góp của dữ liệu đối với một lần huấn luyện cụ thể. Phương pháp tích lũy giá trị Shapley của các bước cập nhật gradient, tránh phải huấn luyện lại mô hình trên nhiều tập con dữ liệu.",
      "en": "Attributes training data contributions to a particular model run. It accumulates Shapley values of gradient updates rather than repeatedly retraining models on different data subsets."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/20fdaf67581e6d7157376d1ed584040a-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2406.11011"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/20fdaf67581e6d7157376d1ed584040a-Abstract-Conference.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/",
      "evidence": "ICLR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2025-sam-2",
    "conferenceId": "iclr",
    "year": 2025,
    "title": "SAM 2: Segment Anything in Images and Videos",
    "authors": [
      "Nikhila Ravi",
      "Valentin Gabeur",
      "Yuan-Ting Hu",
      "Ronghang Hu",
      "Chaitanya Ryali",
      "Tengyu Ma",
      "Haitham Khedr",
      "Roman Rädle",
      "Chloe Rolland",
      "Laura Gustafson",
      "Eric Mintun",
      "Junting Pan",
      "Kalyan Vasudev Alwala",
      "Nicolas Carion",
      "Chao-Yuan Wu",
      "Ross Girshick",
      "Piotr Dollár",
      "Christoph Feichtenhofer"
    ],
    "topic": "segmentation",
    "summary": {
      "vi": "SAM 2 mở rộng phân đoạn theo prompt từ ảnh sang video. Kiến trúc Transformer với bộ nhớ dạng streaming kết hợp quy trình thu thập dữ liệu có tương tác, giúp theo dõi vùng được chỉ định qua các khung hình.",
      "en": "Extends promptable segmentation from images to video. A Transformer with streaming memory works with an interactive data engine to maintain prompted object masks across frames."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/45c1f6a8cbf2da59ebf2c802b4f742cd-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2408.00714",
      "code": "https://github.com/facebookresearch/sam2"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/45c1f6a8cbf2da59ebf2c802b4f742cd-Abstract-Conference.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/",
      "evidence": "ICLR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iclr-2025-speculative-cascades",
    "conferenceId": "iclr",
    "year": 2025,
    "title": "Faster Cascades via Speculative Decoding",
    "authors": [
      "Harikrishna Narasimhan",
      "Wittawat Jitkrittum",
      "Ankit Singh Rawat",
      "Seungyeon Kim",
      "Neha Gupta",
      "Aditya Krishna Menon",
      "Sanjiv Kumar"
    ],
    "topic": "language",
    "summary": {
      "vi": "Nghiên cứu kết hợp cơ chế chuyển yêu cầu giữa mô hình nhỏ và lớn với speculative decoding. Quy tắc chuyển mô hình được thực thi qua suy đoán và kiểm tra song song, nhằm khảo sát đánh đổi giữa chi phí suy luận và chất lượng câu trả lời.",
      "en": "Combines model cascades with speculative decoding. Deferral rules are implemented through speculative execution and parallel verification to study inference cost–quality trade-offs."
    },
    "links": {
      "paper": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/6f43166f50f26e8d8f3edc5545b0749f-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2405.19261"
    },
    "metadataSource": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/6f43166f50f26e8d8f3edc5545b0749f-Abstract-Conference.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/",
      "evidence": "ICLR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-artificial-hivemind",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond)",
    "authors": [
      "Liwei Jiang",
      "Yuanjun Chai",
      "Margaret Li",
      "Mickel Liu",
      "Raymond Fok",
      "Nouha Dziri",
      "Yulia Tsvetkov",
      "Maarten Sap",
      "Yejin Choi"
    ],
    "topic": "language",
    "summary": {
      "vi": "Infinity-Chat cung cấp các yêu cầu mở cùng đánh giá của con người để nghiên cứu sự đa dạng trong câu trả lời. Bài báo phân tích mức lặp bên trong một mô hình, sự tương đồng giữa các mô hình và khác biệt trong sở thích của người đánh giá.",
      "en": "Introduces Infinity-Chat to study diversity in open-ended responses. The analysis examines repetition within models, similarity across models, and differences in human preferences that automated judges may miss."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/754d5a526a5ee5a47220664a0eb92751-Abstract-Datasets_and_Benchmarks_Track.html",
      "arxiv": "https://arxiv.org/abs/2510.22954"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/754d5a526a5ee5a47220664a0eb92751-Abstract-Datasets_and_Benchmarks_Track.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper · Datasets and Benchmarks Track"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-gated-attention",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "Gated Attention for Large Language Models: Non-linearity, Sparsity, and Attention-Sink-Free",
    "authors": [
      "Zihan Qiu",
      "Zekun Wang",
      "Bo Zheng",
      "Zeyu Huang",
      "Kaiyue Wen",
      "Songlin Yang",
      "Rui Men",
      "Le Yu",
      "Fei Huang",
      "Suozhi Huang",
      "Dayiheng Liu",
      "Jingren Zhou",
      "Junyang Lin"
    ],
    "topic": "attention",
    "summary": {
      "vi": "Nghiên cứu khảo sát vai trò của gating trong softmax attention. Một cổng sigmoid theo từng head được đặt sau scaled dot-product attention để phân tích tính phi tuyến, độ thưa, độ ổn định huấn luyện và hiện tượng attention sink.",
      "en": "Studies gating in softmax attention. Head-specific sigmoid gates after scaled dot-product attention provide a controlled way to examine nonlinearity, sparsity, training stability, and attention sinks."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/904e89bb4e632e75fb47f093b620b257-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2505.06708",
      "code": "https://github.com/qiuzh20/gated_attention"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/904e89bb4e632e75fb47f093b620b257-Abstract-Conference.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-deep-self-supervised-rl",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "1000 Layer Networks for Self-Supervised RL: Scaling Depth Can Enable New Goal-Reaching Capabilities",
    "authors": [
      "Kevin Wang",
      "Ishaan Javali",
      "Michał Bortkiewicz",
      "Tomasz Trzcinski",
      "Benjamin Eysenbach"
    ],
    "topic": "embodied",
    "summary": {
      "vi": "Bài báo khảo sát việc tăng độ sâu mạng trong học tăng cường tự giám sát theo mục tiêu. Các thí nghiệm locomotion và manipulation phân tích cách kiến trúc sâu, kết nối residual và quy mô huấn luyện ảnh hưởng đến hành vi đạt mục tiêu.",
      "en": "Studies network depth in self-supervised goal-conditioned reinforcement learning. Locomotion and manipulation experiments examine how deep residual architectures and training scale affect goal-reaching behavior."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e74ee34cc0f2d0780f34ee77d8fba25b-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2503.14858",
      "project": "https://wang-kevin3290.github.io/scaling-crl/"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e74ee34cc0f2d0780f34ee77d8fba25b-Abstract-Conference.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-diffusion-dynamical-regularization",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "Why Diffusion Models Don’t Memorize: The Role of Implicit Dynamical Regularization in Training",
    "authors": [
      "Tony Bonnaire",
      "Raphaël Urfin",
      "Giulio Biroli",
      "Marc Mezard"
    ],
    "topic": "generation",
    "summary": {
      "vi": "Nghiên cứu phân biệt thời điểm mô hình diffusion bắt đầu sinh mẫu hữu ích và thời điểm ghi nhớ dữ liệu huấn luyện. Thí nghiệm cùng mô hình random features phân tích cách động lực học tối ưu tạo ra một khoảng huấn luyện có khả năng khái quát hóa.",
      "en": "Separates the onset of useful diffusion generation from later training-data memorization. Experiments and a random-features model analyze how training dynamics create a window of generalization before memorization."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/ceb7f3cc876a6dcb15130a645b5a4507-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2505.17638",
      "code": "https://github.com/tbonnair/Why-Diffusion-Models-Don-t-Memorize"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/ceb7f3cc876a6dcb15130a645b5a4507-Abstract-Conference.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-rlvr-reasoning-capacity",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?",
    "authors": [
      "Yang Yue",
      "Zhiqi Chen",
      "Rui Lu",
      "Andrew Zhao",
      "Zhaokai Wang",
      "Yang Yue",
      "Shiji Song",
      "Gao Huang"
    ],
    "topic": "language",
    "summary": {
      "vi": "Nghiên cứu so sánh mô hình nền và mô hình huấn luyện bằng phần thưởng kiểm chứng được trên các bài toán suy luận. Đánh giá pass@k và phân tích phân phối lời giải giúp phân biệt lấy mẫu hiệu quả hơn với việc xuất hiện kiểu suy luận mới.",
      "en": "Compares base models and models trained with verifiable rewards on reasoning tasks. Pass@k and solution-distribution analyses distinguish improved sampling efficiency from the emergence of new reasoning patterns."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/537d5aa768c2d534016a4d06f87bc8fb-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2504.13837"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/537d5aa768c2d534016a4d06f87bc8fb-Abstract-Conference.html",
    "award": {
      "type": "runner-up",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper Runner-up"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-transductive-mistake-bounds",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "Optimal Mistake Bounds for Transductive Online Learning",
    "authors": [
      "Zachary Chase",
      "Steve Hanneke",
      "Shay Moran",
      "Jonathan Shafer"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Bài báo nghiên cứu lợi ích của việc biết trước chuỗi đầu vào chưa gán nhãn trong học trực tuyến. Các cận trên và cận dưới liên hệ số lỗi với chiều Littlestone, làm rõ khác biệt giữa thiết lập transductive và trực tuyến thông thường.",
      "en": "Studies the value of seeing an unlabeled input sequence before online prediction. Matching bounds relate mistakes to Littlestone dimension and clarify the gap between transductive and standard online learning."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/df59090e951681e0f98d40f131c4b628-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2512.12567"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/df59090e951681e0f98d40f131c4b628-Abstract-Conference.html",
    "award": {
      "type": "runner-up",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper Runner-up"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2025-superposition-scaling",
    "conferenceId": "neurips",
    "year": 2025,
    "title": "Superposition Yields Robust Neural Scaling",
    "authors": [
      "Yizhou Liu",
      "Ziming Liu",
      "Jeff Gore"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Nghiên cứu dùng mô hình đơn giản với các đặc trưng chồng lấp để giải thích quy luật scaling. Phân tích hình học và thí nghiệm mô hình ngôn ngữ khảo sát quan hệ giữa chiều biểu diễn, mức superposition và sai số.",
      "en": "Uses a toy model of overlapping features to investigate scaling laws. Geometric analysis and language-model measurements connect representation dimension, superposition strength, and prediction loss."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e97ac22927560eb2de6b658498cbc575-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2505.10465",
      "code": "https://github.com/liuyz0/SuperpositionScaling"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e97ac22927560eb2de6b658498cbc575-Abstract-Conference.html",
    "award": {
      "type": "runner-up",
      "source": "https://blog.neurips.cc/2025/11/26/announcing-the-neurips-2025-best-paper-awards/",
      "evidence": "NeurIPS 2025 — Best Paper Runner-up"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2024-visual-autoregressive-modeling",
    "conferenceId": "neurips",
    "year": 2024,
    "title": "Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction",
    "authors": [
      "Keyu Tian",
      "Yi Jiang",
      "Zehuan Yuan",
      "Bingyue Peng",
      "Liwei Wang"
    ],
    "topic": "generation",
    "summary": {
      "vi": "VAR mô hình hóa việc sinh ảnh như dự đoán biểu diễn ở độ phân giải tiếp theo. Cách sinh từ thô đến tinh thay thế thứ tự quét từng token, đồng thời cho phép nghiên cứu scaling và các tác vụ chỉnh sửa ảnh.",
      "en": "Models image generation as predicting the next resolution scale. Coarse-to-fine generation replaces raster-order token prediction and supports studies of scaling and image editing."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/9a24e284b187f662681440ba15c416fb-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2404.02905",
      "code": "https://github.com/FoundationVision/VAR"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/9a24e284b187f662681440ba15c416fb-Abstract-Conference.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2024/12/10/announcing-the-neurips-2024-best-paper-awards/",
      "evidence": "NeurIPS 2024 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2024-stochastic-taylor-estimator",
    "conferenceId": "neurips",
    "year": 2024,
    "title": "Stochastic Taylor Derivative Estimator: Efficient amortization for arbitrary differential operators",
    "authors": [
      "Zekun Shi",
      "Zheyuan Hu",
      "Min Lin",
      "Kenji Kawaguchi"
    ],
    "topic": "scientific",
    "summary": {
      "vi": "STDE xử lý chi phí tính các toán tử vi phân bậc cao trong mạng neural. Phương pháp kết hợp Taylor-mode automatic differentiation với ngẫu nhiên hóa phép co tensor để ước lượng toán tử, phục vụ các bài toán như physics-informed neural networks.",
      "en": "Addresses the cost of high-order differential operators in neural networks. Taylor-mode automatic differentiation and randomized tensor contractions estimate operators for applications such as physics-informed neural networks."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/dd2eb5250696753ea37141bbd89bb569-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2412.00088",
      "code": "https://github.com/sail-sg/stde"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/dd2eb5250696753ea37141bbd89bb569-Abstract-Conference.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2024/12/10/announcing-the-neurips-2024-best-paper-awards/",
      "evidence": "NeurIPS 2024 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2024-selective-language-modeling",
    "conferenceId": "neurips",
    "year": 2024,
    "title": "Not All Tokens Are What You Need for Pretraining",
    "authors": [
      "Zhenghao Lin",
      "Zhibin Gou",
      "Yeyun Gong",
      "Xiao Liu",
      "Yelong Shen",
      "Ruochen Xu",
      "Chen Lin",
      "Yujiu Yang",
      "Jian Jiao",
      "Nan Duan",
      "Weizhu Chen"
    ],
    "topic": "language",
    "summary": {
      "vi": "Rho-1 đặt câu hỏi liệu mọi token có đóng góp như nhau khi pretraining. Selective Language Modeling dùng mô hình tham chiếu chấm điểm token và tập trung hàm mất mát vào những token phù hợp với phân phối mục tiêu.",
      "en": "Questions whether every pretraining token deserves equal weight. Selective Language Modeling scores tokens with a reference model and focuses training loss on tokens aligned with the target distribution."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/3322a9a72a1707de14badd5e552ff466-Abstract-Conference.html"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/3322a9a72a1707de14badd5e552ff466-Abstract-Conference.html",
    "award": {
      "type": "runner-up",
      "source": "https://blog.neurips.cc/2024/12/10/announcing-the-neurips-2024-best-paper-awards/",
      "evidence": "NeurIPS 2024 — Best Paper Runner-up"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2024-diffusion-autoguidance",
    "conferenceId": "neurips",
    "year": 2024,
    "title": "Guiding a Diffusion Model with a Bad Version of Itself",
    "authors": [
      "Tero Karras",
      "Miika Aittala",
      "Tuomas Kynkäänniemi",
      "Jaakko Lehtinen",
      "Timo Aila",
      "Samuli Laine"
    ],
    "topic": "generation",
    "summary": {
      "vi": "Bài báo nghiên cứu cách điều khiển chất lượng ảnh mà không gắn chặt với mức đa dạng. Autoguidance dùng một phiên bản nhỏ hơn hoặc huấn luyện ít hơn của cùng mô hình diffusion để hướng dẫn quá trình sinh mẫu.",
      "en": "Studies control of image quality separately from diversity. Autoguidance steers diffusion sampling using a smaller or less-trained version of the same model rather than an unconditional model."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/5ee7ed60a7e8169012224dec5fe0d27f-Abstract-Conference.html",
      "arxiv": "https://arxiv.org/abs/2406.02507",
      "code": "https://github.com/NVlabs/edm2"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/5ee7ed60a7e8169012224dec5fe0d27f-Abstract-Conference.html",
    "award": {
      "type": "runner-up",
      "source": "https://blog.neurips.cc/2024/12/10/announcing-the-neurips-2024-best-paper-awards/",
      "evidence": "NeurIPS 2024 — Best Paper Runner-up"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "neurips-2024-prism-alignment",
    "conferenceId": "neurips",
    "year": 2024,
    "title": "The PRISM Alignment Dataset: What Participatory, Representative and Individualised Human Feedback Reveals About the Subjective and Multicultural Alignment of Large Language Models",
    "authors": [
      "Hannah Rose Kirk",
      "Alexander Whitefield",
      "Paul Röttger",
      "Andrew Bean",
      "Katerina Margatina",
      "Juan Ciro",
      "Rafael Mosquera",
      "Max Bartolo",
      "Adina Williams",
      "He He",
      "Bertie Vidgen",
      "Scott A. Hale"
    ],
    "topic": "alignment",
    "summary": {
      "vi": "PRISM liên kết bối cảnh nhân khẩu học và sở thích tự khai báo với phản hồi trong hội thoại giữa người dùng và mô hình ngôn ngữ. Bộ dữ liệu hỗ trợ phân tích tính đại diện, khác biệt văn hóa và sự bất đồng trong dữ liệu căn chỉnh.",
      "en": "Connects participant demographics and stated preferences with feedback on language-model conversations. The dataset enables analysis of representation, cultural variation, and disagreement in alignment data."
    },
    "links": {
      "paper": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/be2e1b68b44f2419e19f6c35a1b8cf35-Abstract-Datasets_and_Benchmarks_Track.html",
      "arxiv": "https://arxiv.org/abs/2404.16019",
      "code": "https://github.com/HannahKirk/prism-alignment"
    },
    "metadataSource": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/be2e1b68b44f2419e19f6c35a1b8cf35-Abstract-Datasets_and_Benchmarks_Track.html",
    "award": {
      "type": "best",
      "source": "https://blog.neurips.cc/2024/12/10/announcing-the-neurips-2024-best-paper-awards/",
      "evidence": "NeurIPS 2024 — Best Paper · Datasets and Benchmarks Track"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2025-conformal-bayesian-quadrature",
    "conferenceId": "icml",
    "year": 2025,
    "title": "Conformal Prediction as Bayesian Quadrature",
    "authors": [
      "Jake C. Snell",
      "Thomas L. Griffiths"
    ],
    "topic": "uncertainty",
    "summary": {
      "vi": "Bài báo xem lại conformal prediction từ góc nhìn Bayesian để đánh giá rủi ro khi triển khai mô hình. Bayesian quadrature được dùng để biểu diễn phân phối tổn thất có thể gặp, thay vì chỉ dựa vào bảo đảm tần suất.",
      "en": "Revisits conformal prediction from a Bayesian perspective on deployment risk. Bayesian quadrature represents plausible test-loss distributions beyond the information conveyed by frequentist guarantees alone."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v267/snell25a.html",
      "arxiv": "https://arxiv.org/abs/2502.13228",
      "code": "https://github.com/jakesnell/conformal-as-bayes-quad"
    },
    "metadataSource": "https://proceedings.mlr.press/v267/snell25a.html",
    "award": {
      "type": "outstanding",
      "source": "https://icml.cc/virtual/2025/awards_detail",
      "evidence": "ICML 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2025-algorithmic-creativity",
    "conferenceId": "icml",
    "year": 2025,
    "title": "Roll the dice & look before you leap: Going beyond the creative limits of next-token prediction",
    "authors": [
      "Vaishnavh Nagarajan",
      "Chen Henry Wu",
      "Charles Ding",
      "Aditi Raghunathan"
    ],
    "topic": "generation",
    "summary": {
      "vi": "Nghiên cứu xây dựng các tác vụ thuật toán nhỏ để kiểm tra khả năng lập kế hoạch và sinh kết quả đa dạng. So sánh dự đoán một token với phương pháp nhiều token và nhiễu đầu vào tạo một môi trường kiểm nghiệm có kiểm soát cho tính sáng tạo.",
      "en": "Builds minimal algorithmic tasks for testing planning and diverse generation. Comparisons of next-token learning, multi-token methods, and input noise provide a controlled testbed for creative behavior."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v267/nagarajan25a.html",
      "arxiv": "https://arxiv.org/abs/2504.15266",
      "code": "https://github.com/ChenWu98/algorithmic-creativity"
    },
    "metadataSource": "https://proceedings.mlr.press/v267/nagarajan25a.html",
    "award": {
      "type": "outstanding",
      "source": "https://icml.cc/virtual/2025/awards_detail",
      "evidence": "ICML 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2025-collabllm",
    "conferenceId": "icml",
    "year": 2025,
    "title": "CollabLLM: From Passive Responders to Active Collaborators",
    "authors": [
      "Shirley Wu",
      "Michel Galley",
      "Baolin Peng",
      "Hao Cheng",
      "Gavin Li",
      "Yao Dou",
      "Weixin Cai",
      "James Zou",
      "Jure Leskovec",
      "Jianfeng Gao"
    ],
    "topic": "language",
    "summary": {
      "vi": "CollabLLM huấn luyện mô hình cho mục tiêu hợp tác qua nhiều lượt thay vì chỉ câu trả lời kế tiếp. Mô phỏng hội thoại ước lượng phần thưởng dài hạn để mô hình chủ động làm rõ ý định và hỗ trợ người dùng hoàn thành công việc.",
      "en": "Trains models for collaboration across conversation turns rather than only the next response. Simulated interactions estimate longer-term rewards for clarifying user intent and supporting task completion."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v267/wu25i.html",
      "arxiv": "https://arxiv.org/abs/2502.00640",
      "code": "https://github.com/Wuyxin/collabllm"
    },
    "metadataSource": "https://proceedings.mlr.press/v267/wu25i.html",
    "award": {
      "type": "outstanding",
      "source": "https://icml.cc/virtual/2025/awards_detail",
      "evidence": "ICML 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2025-missing-data-score-matching",
    "conferenceId": "icml",
    "year": 2025,
    "title": "Score Matching with Missing Data",
    "authors": [
      "Josh Givens",
      "Song Liu",
      "Henry Reeve"
    ],
    "topic": "uncertainty",
    "summary": {
      "vi": "Nghiên cứu mở rộng score matching cho dữ liệu thiếu ở những tập tọa độ khác nhau. Hai hướng importance weighting và variational estimation được phân tích để học phân phối mà không cần quan sát đầy đủ mọi biến.",
      "en": "Extends score matching to observations missing arbitrary subsets of coordinates. Importance-weighted and variational estimators enable distribution learning without fully observed data."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v267/givens25a.html",
      "arxiv": "https://arxiv.org/abs/2506.00557",
      "code": "https://github.com/joshgivens/ScoreMatchingwithMissingData"
    },
    "metadataSource": "https://proceedings.mlr.press/v267/givens25a.html",
    "award": {
      "type": "outstanding",
      "source": "https://icml.cc/virtual/2025/awards_detail",
      "evidence": "ICML 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2025-masked-diffusion-token-order",
    "conferenceId": "icml",
    "year": 2025,
    "title": "Train for the Worst, Plan for the Best: Understanding Token Ordering in Masked Diffusions",
    "authors": [
      "Jaeyeon Kim",
      "Kulin Shah",
      "Vasilis Kontonis",
      "Sham M. Kakade",
      "Sitan Chen"
    ],
    "topic": "generation",
    "summary": {
      "vi": "Bài báo phân tích đánh đổi giữa bài toán infilling khi huấn luyện và khả năng chọn thứ tự token khi suy luận của masked diffusion. Các kết quả lý thuyết và thực nghiệm khảo sát cách thứ tự giải mã thích ứng tránh những bài toán con khó.",
      "en": "Analyzes the trade-off between difficult training-time infilling and flexible inference-time token order in masked diffusion. Theory and experiments show how adaptive decoding can avoid difficult subproblems."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v267/kim25ah.html",
      "arxiv": "https://arxiv.org/abs/2502.06768"
    },
    "metadataSource": "https://proceedings.mlr.press/v267/kim25ah.html",
    "award": {
      "type": "outstanding",
      "source": "https://icml.cc/virtual/2025/awards_detail",
      "evidence": "ICML 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2025-prediction-worst-off",
    "conferenceId": "icml",
    "year": 2025,
    "title": "The Value of Prediction in Identifying the Worst-Off",
    "authors": [
      "Unai Fischer-Abaigar",
      "Christoph Kern",
      "Juan Carlos Perdomo"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Nghiên cứu đánh giá vai trò của dự đoán khi chính sách cần ưu tiên những người gặp khó khăn nhất. Mô hình toán học và trường hợp thất nghiệp dài hạn so sánh cải thiện dự đoán với mở rộng năng lực cung cấp hỗ trợ.",
      "en": "Studies prediction in policies prioritizing the worst-off. Mathematical models and a long-term unemployment case study compare better predictions with expanding administrative capacity to provide assistance."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v267/fischer-abaigar25a.html",
      "arxiv": "https://arxiv.org/abs/2501.19334"
    },
    "metadataSource": "https://proceedings.mlr.press/v267/fischer-abaigar25a.html",
    "award": {
      "type": "outstanding",
      "source": "https://icml.cc/virtual/2025/awards_detail",
      "evidence": "ICML 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-flexibility-trap",
    "conferenceId": "icml",
    "year": 2026,
    "title": "The Flexibility Trap: Rethinking the Value of Arbitrary Order in Diffusion Language Models",
    "authors": [
      "Zanlin Ni",
      "Shenzhi Wang",
      "Yang Yue",
      "Tianyu Yu",
      "Weilin Zhao",
      "Yeguo Hua",
      "Tianyi Chen",
      "Jun Song",
      "Cheng Yu",
      "Bo Zheng",
      "Gao Huang"
    ],
    "topic": "language",
    "summary": {
      "vi": "Nghiên cứu kiểm tra giả định rằng sinh token theo thứ tự tùy ý luôn hỗ trợ suy luận trong diffusion language models. JustGRPO dùng thứ tự trái sang phải trong RL rollouts để khảo sát việc né token không chắc chắn, đồng thời giữ giải mã song song khi suy luận.",
      "en": "Tests whether arbitrary token order helps reasoning in diffusion language models. JustGRPO uses left-to-right RL rollouts to investigate avoidance of uncertain decisions while retaining parallel inference decoding."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/ni26e.html",
      "arxiv": "https://arxiv.org/abs/2601.15165",
      "code": "https://github.com/LeapLabTHU/JustGRPO"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/ni26e.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-high-accuracy-sampling",
    "conferenceId": "icml",
    "year": 2026,
    "title": "High-Accuracy Sampling for Diffusion Models and Log-Concave Distributions",
    "authors": [
      "Fan Chen",
      "Sinho Chewi",
      "Constantinos Costis Daskalakis",
      "Alexander Rakhlin"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Bài báo xây dựng thuật toán lấy mẫu dựa trên truy vấn score hoặc gradient cho diffusion và phân phối log-concave. Phân tích độ phức tạp làm rõ quan hệ giữa độ chính xác đích, sai số score và các giả định về dữ liệu.",
      "en": "Develops sampling algorithms using score or gradient queries for diffusion and log-concave distributions. Complexity analysis connects target accuracy with score error and assumptions about the data distribution."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/chen26p.html",
      "arxiv": "https://arxiv.org/abs/2602.01338"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/chen26p.html",
    "award": {
      "type": "outstanding",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-obfuscation-atlas",
    "conferenceId": "icml",
    "year": 2026,
    "title": "The Obfuscation Atlas: Mapping Where Honesty Emerges in RLVR with Deception Probes",
    "authors": [
      "Mohammad Taufeeque",
      "Stefan Heimersheim",
      "Adam Gleave",
      "Chris Cundy"
    ],
    "topic": "alignment",
    "summary": {
      "vi": "Nghiên cứu kiểm tra mô hình lập trình được huấn luyện cùng bộ phát hiện hành vi đánh lừa. Khung phân loại tách thay đổi biểu diễn khỏi cách diễn đạt né bộ phát hiện, đồng thời khảo sát tác động của điều chuẩn KL và mức phạt.",
      "en": "Examines coding models trained against deception detectors. A taxonomy distinguishes representation drift from detector-evading output strategies, with analysis of KL regularization and detector penalties."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/taufeeque26a.html",
      "arxiv": "https://arxiv.org/abs/2602.15515",
      "code": "https://github.com/AlignmentResearch/obfuscation-atlas"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/taufeeque26a.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-motion-attribution",
    "conferenceId": "icml",
    "year": 2026,
    "title": "Motion Attribution for Video Generation",
    "authors": [
      "Xindi Wu",
      "Despoina Paschalidou",
      "Jun Gao",
      "Antonio Torralba",
      "Laura Leal-Taixé",
      "Olga Russakovsky",
      "Sanja Fidler",
      "Jonathan Lorraine"
    ],
    "topic": "attribution",
    "summary": {
      "vi": "Motive nghiên cứu những clip huấn luyện nào ảnh hưởng đến chuyển động trong video được sinh. Phương pháp attribution dựa trên gradient dùng mặt nạ theo chuyển động để tách động lực thời gian khỏi vẻ ngoài tĩnh và hỗ trợ chọn dữ liệu fine-tuning.",
      "en": "Investigates which training clips influence generated motion. Gradient-based attribution uses motion-weighted masks to separate temporal dynamics from static appearance and guide fine-tuning data selection."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/wu26aq.html",
      "arxiv": "https://arxiv.org/abs/2601.08828"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/wu26aq.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-language-model-memorization",
    "conferenceId": "icml",
    "year": 2026,
    "title": "How much can language models memorize?",
    "authors": [
      "John Xavier Morris",
      "Chawin Sitawarin",
      "Chuan Guo",
      "Narine Kokhlikyan",
      "G. Edward Suh",
      "Alexander M Rush",
      "Kamalika Chaudhuri",
      "Saeed Mahloujifar"
    ],
    "topic": "language",
    "summary": {
      "vi": "Bài báo tách ghi nhớ dữ liệu cụ thể khỏi khái quát hóa về quá trình sinh dữ liệu. Một phép đo dựa trên thông tin và các thí nghiệm dung lượng mô hình khảo sát quan hệ giữa kích thước dữ liệu, ghi nhớ và membership inference.",
      "en": "Separates memorization of particular data from generalization about its generating process. An information-based measure and capacity experiments study data size, memorization, and membership inference."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/morris26a.html",
      "arxiv": "https://arxiv.org/abs/2505.24832"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/morris26a.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-diffusion-consistency-rmt",
    "conferenceId": "icml",
    "year": 2026,
    "title": "A Random Matrix Theory Perspective on the Consistency of Diffusion Models",
    "authors": [
      "Binxu Wang",
      "Jacob A Zavatone-Veth",
      "Cengiz Pehlevan"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Nghiên cứu lý giải vì sao các mô hình diffusion học từ tập con khác nhau có thể sinh kết quả tương tự với cùng noise seed. Khung random matrix phân tích thống kê Gaussian chung và biến thiên do dữ liệu hữu hạn, làm cơ sở so sánh với mô hình phi tuyến.",
      "en": "Investigates why diffusion models trained on separate data splits can generate similar outputs from the same noise. Random-matrix analysis isolates shared Gaussian statistics and finite-data variability as a baseline for nonlinear models."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/wang26kf.html",
      "arxiv": "https://arxiv.org/abs/2602.02908",
      "code": "https://github.com/Animadversio/diffusion-consistency-rmt"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/wang26kf.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icml-2026-grokking-ridge-regression",
    "conferenceId": "icml",
    "year": 2026,
    "title": "To Grok Grokking: Provable Grokking in Ridge Regression",
    "authors": [
      "Mingyue Xu",
      "Gal Vardi",
      "Itay Safran"
    ],
    "topic": "theory",
    "summary": {
      "vi": "Bài báo chứng minh hiện tượng khái quát hóa xuất hiện muộn trong ridge regression. Phân tích gradient descent với weight decay liên hệ thời gian trì hoãn với siêu tham số và khảo sát cách điều chỉnh chúng để làm mạnh hoặc loại bỏ grokking.",
      "en": "Proves delayed generalization in ridge regression. Analysis of gradient descent with weight decay connects the delay to training hyperparameters and examines how tuning can amplify or remove grokking."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v306/xu26bd.html",
      "arxiv": "https://arxiv.org/abs/2601.19791",
      "code": "https://github.com/raymondmyxu/to-grok-grokking"
    },
    "metadataSource": "https://proceedings.mlr.press/v306/xu26bd.html",
    "award": {
      "type": "honorable",
      "source": "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/",
      "evidence": "ICML 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2026-d4rt",
    "conferenceId": "cvpr",
    "year": 2026,
    "title": "Efficiently Reconstructing Dynamic Scenes One D4RT at a Time",
    "authors": [
      "Chuhan Zhang",
      "Guillaume Le Moing",
      "Skanda Koppula",
      "Ignacio Rocco",
      "Liliane Momeni",
      "Junyu Xie",
      "Shuyang Sun",
      "Rahul Sukthankar",
      "Joëlle K. Barral",
      "Raia Hadsell",
      "Zoubin Ghahramani",
      "Andrew Zisserman",
      "Junlin Zhang",
      "Mehdi S. M. Sajjadi"
    ],
    "topic": "reconstruction",
    "summary": {
      "vi": "D4RT kết hợp ước lượng độ sâu, tương ứng không-thời gian và tham số camera từ video động. Một giao diện truy vấn điểm thống nhất thay thế nhiều decoder theo tác vụ, giúp khảo sát tái dựng cảnh 4D bằng mạng feed-forward.",
      "en": "Combines depth, spatiotemporal correspondence, and camera estimation from dynamic video. A unified point-query interface replaces separate task decoders in a feed-forward approach to 4D scene reconstruction."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2026/html/Zhang_Efficiently_Reconstructing_Dynamic_Scenes_One_D4RT_at_a_Time_CVPR_2026_paper.html",
      "arxiv": "https://arxiv.org/abs/2512.08924",
      "project": "https://d4rt-paper.github.io/"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2026/html/Zhang_Efficiently_Reconstructing_Dynamic_Scenes_One_D4RT_at_a_Time_CVPR_2026_paper.html",
    "award": {
      "type": "best",
      "source": "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers",
      "evidence": "CVPR 2026 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2026-nitrogen",
    "conferenceId": "cvpr",
    "year": 2026,
    "title": "NitroGen: An Open Foundation Model for Generalist Gaming Agents",
    "authors": [
      "Loïc Magne",
      "Anas Awadalla",
      "Guanzhi Wang",
      "Yinzhen Xu",
      "Joshua Belofsky",
      "Fengyuan Hu",
      "Joohwan Kim",
      "Ludwig Schmidt",
      "Georgia Gkioxari",
      "Jan Kautz",
      "Yisong Yue",
      "Yejin Choi",
      "Yuke Zhu",
      "Linxi Fan"
    ],
    "topic": "embodied",
    "summary": {
      "vi": "NitroGen nghiên cứu agent thị giác–hành động có thể chơi nhiều trò chơi. Dữ liệu hành động được trích từ video gameplay, kết hợp behavior cloning và môi trường đánh giá đa trò chơi để khảo sát khả năng chuyển giao sang trò chơi mới.",
      "en": "Studies vision–action agents across games. Actions extracted from gameplay video support behavior cloning and a multi-game evaluation environment for examining transfer to unseen games."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2026/html/Magne_NitroGen_An_Open_Foundation_Model_for_Generalist_Gaming_Agents_CVPR_2026_paper.html",
      "arxiv": "https://arxiv.org/abs/2601.02427",
      "code": "https://github.com/MineDojo/NitroGen"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2026/html/Magne_NitroGen_An_Open_Foundation_Model_for_Generalist_Gaming_Agents_CVPR_2026_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers",
      "evidence": "CVPR 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2026-sam-3d",
    "conferenceId": "cvpr",
    "year": 2026,
    "title": "SAM 3D: 3Dfy Anything in Images",
    "authors": [
      "Xingyu Chen",
      "Fu-Jen Chu",
      "Pierre Gleize",
      "Kevin J Liang",
      "Alexander Sax",
      "Hao Tang",
      "Weiyao Wang",
      "Michelle Guo",
      "Thibaut Hardin",
      "Xiang Li",
      "Aohan Lin",
      "Jia-Wei Liu",
      "Ziqi Ma",
      "Anushka Sagar",
      "Bowen Song",
      "Xiaodong Wang",
      "Jianing Yang",
      "Bowen Zhang",
      "Piotr Dollár",
      "Georgia Gkioxari",
      "Matt Feiszli",
      "Jitendra Malik"
    ],
    "topic": "reconstruction",
    "summary": {
      "vi": "SAM 3D tái dựng hình học, texture và bố trí đối tượng từ một ảnh. Quy trình gán nhãn có con người và mô hình tham gia kết hợp pretraining tổng hợp với căn chỉnh dữ liệu thực để xử lý ảnh có che khuất và nền phức tạp.",
      "en": "Reconstructs object geometry, texture, and layout from a single image. Human- and model-assisted annotation combines synthetic pretraining with real-image alignment for cluttered and occluded scenes."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2026/html/Chen_SAM_3D_3Dfy_Anything_in_Images_CVPR_2026_paper.html",
      "arxiv": "https://arxiv.org/abs/2511.16624",
      "code": "https://github.com/facebookresearch/sam-3d-objects"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2026/html/Chen_SAM_3D_3Dfy_Anything_in_Images_CVPR_2026_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers",
      "evidence": "CVPR 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2025-vggt",
    "conferenceId": "cvpr",
    "year": 2025,
    "title": "VGGT: Visual Geometry Grounded Transformer",
    "authors": [
      "Jianyuan Wang",
      "Minghao Chen",
      "Nikita Karaev",
      "Andrea Vedaldi",
      "Christian Rupprecht",
      "David Novotny"
    ],
    "topic": "reconstruction",
    "summary": {
      "vi": "VGGT dùng một mạng feed-forward để suy ra camera, độ sâu, point map và quỹ đạo điểm từ một hoặc nhiều ảnh. Kiến trúc chung nghiên cứu cách học các thuộc tính hình học 3D liên quan trong cùng mô hình thay vì những bộ giải riêng biệt.",
      "en": "Uses one feed-forward network to infer cameras, depth, point maps, and tracks from one or many images. The shared architecture studies jointly learned 3D geometry instead of separate task-specific solvers."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_VGGT_Visual_Geometry_Grounded_Transformer_CVPR_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2503.11651",
      "code": "https://github.com/facebookresearch/vggt"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_VGGT_Visual_Geometry_Grounded_Transformer_CVPR_2025_paper.html",
    "award": {
      "type": "best",
      "source": "https://cvpr.thecvf.com/Conferences/2025/BestPapersDemos",
      "evidence": "CVPR 2025 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2025-megasam",
    "conferenceId": "cvpr",
    "year": 2025,
    "title": "MegaSaM: Accurate, Fast and Robust Structure and Motion from Casual Dynamic Videos",
    "authors": [
      "Zhengqi Li",
      "Richard Tucker",
      "Forrester Cole",
      "Qianqian Wang",
      "Linyi Jin",
      "Vickie Ye",
      "Angjoo Kanazawa",
      "Aleksander Holynski",
      "Noah Snavely"
    ],
    "topic": "reconstruction",
    "summary": {
      "vi": "MegaSaM ước lượng camera và độ sâu từ video đơn mắt có chuyển động cảnh và camera không kiểm soát. Các thay đổi trong huấn luyện và suy luận của deep visual SLAM nhắm đến video đời thường mà giả định cảnh tĩnh không còn phù hợp.",
      "en": "Estimates cameras and depth from casual monocular videos with dynamic scenes and unconstrained camera motion. Training and inference changes to deep visual SLAM address violations of static-scene assumptions."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2025/html/Li_MegaSaM_Accurate_Fast_and_Robust_Structure_and_Motion_from_Casual_CVPR_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2412.04463",
      "project": "https://mega-sam.github.io/",
      "code": "https://github.com/mega-sam/mega-sam"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2025/html/Li_MegaSaM_Accurate_Fast_and_Robust_Structure_and_Motion_from_Casual_CVPR_2025_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://cvpr.thecvf.com/Conferences/2025/BestPapersDemos",
      "evidence": "CVPR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2025-navigation-world-models",
    "conferenceId": "cvpr",
    "year": 2025,
    "title": "Navigation World Models",
    "authors": [
      "Amir Bar",
      "Gaoyue Zhou",
      "Danny Tran",
      "Trevor Darrell",
      "Yann LeCun"
    ],
    "topic": "embodied",
    "summary": {
      "vi": "NWM dự đoán quan sát thị giác tương lai từ lịch sử và hành động điều hướng. Conditional Diffusion Transformer được dùng để mô phỏng, đánh giá quỹ đạo và đưa thêm ràng buộc vào lập kế hoạch thay vì cố định một chính sách hành động.",
      "en": "Predicts future visual observations from history and navigation actions. A conditional diffusion Transformer simulates and evaluates trajectories, allowing planning constraints beyond a fixed navigation policy."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2025/html/Bar_Navigation_World_Models_CVPR_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2412.03572"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2025/html/Bar_Navigation_World_Models_CVPR_2025_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://cvpr.thecvf.com/Conferences/2025/BestPapersDemos",
      "evidence": "CVPR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2025-molmo-pixmo",
    "conferenceId": "cvpr",
    "year": 2025,
    "title": "Molmo and PixMo: Open Weights and Open Data for State-of-the-Art Vision-Language Models",
    "authors": [
      "Matt Deitke",
      "Christopher Clark",
      "Sangho Lee",
      "Rohun Tripathi",
      "Yue Yang",
      "Jae Sung Park",
      "Mohammadreza Salehi",
      "Niklas Muennighoff",
      "Kyle Lo",
      "Luca Soldaini",
      "Jiasen Lu",
      "Taira Anderson",
      "Erin Bransom",
      "Kiana Ehsani",
      "Huong Ngo",
      "YenSung Chen",
      "Ajay Patel",
      "Mark Yatskar",
      "Chris Callison-Burch",
      "Andrew Head",
      "Rose Hendrix",
      "Favyen Bastani",
      "Eli VanderBilt",
      "Nathan Lambert",
      "Yvonne Chou",
      "Arnavi Chheda",
      "Jenna Sparks",
      "Sam Skjonsberg",
      "Michael Schmitz",
      "Aaron Sarnat",
      "Byron Bischoff",
      "Pete Walsh",
      "Chris Newell",
      "Piper Wolters",
      "Tanmay Gupta",
      "Kuo-Hao Zeng",
      "Jon Borchardt",
      "Dirk Groeneveld",
      "Crystal Nam",
      "Sophie Lebrecht",
      "Caitlin Wittlif",
      "Carissa Schoenick",
      "Oscar Michel",
      "Ranjay Krishna",
      "Luca Weihs",
      "Noah A. Smith",
      "Hannaneh Hajishirzi",
      "Ross Girshick",
      "Ali Farhadi",
      "Aniruddha Kembhavi"
    ],
    "topic": "language",
    "summary": {
      "vi": "Molmo và PixMo nghiên cứu cách xây dựng mô hình thị giác–ngôn ngữ với dữ liệu và trọng số mở. Các bộ dữ liệu caption, hỏi đáp và chỉ điểm do con người thu thập cung cấp nền tảng để phân tích lựa chọn mô hình và quy trình huấn luyện.",
      "en": "Studies open-data, open-weight vision–language models. Human-collected captions, question answering, and pointing data provide a basis for examining model choices and training pipelines without distilling proprietary VLM outputs."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2025/html/Deitke_Molmo_and_PixMo_Open_Weights_and_Open_Data_for_State-of-the-Art_CVPR_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2409.17146",
      "project": "https://molmo.allenai.org/blog",
      "code": "https://github.com/allenai/molmo"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2025/html/Deitke_Molmo_and_PixMo_Open_Weights_and_Open_Data_for_State-of-the-Art_CVPR_2025_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://cvpr.thecvf.com/Conferences/2025/BestPapersDemos",
      "evidence": "CVPR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "cvpr-2025-student-splatting-scooping",
    "conferenceId": "cvpr",
    "year": 2025,
    "title": "3D Student Splatting and Scooping",
    "authors": [
      "Jialin Zhu",
      "Jiangbei Yue",
      "Feixiang He",
      "He Wang"
    ],
    "topic": "rendering",
    "summary": {
      "vi": "SSS xem lại biểu diễn hỗn hợp trong 3D Gaussian Splatting. Các phân phối Student có mật độ dương và âm cùng phương pháp lấy mẫu tối ưu hóa mới cho phép nghiên cứu biểu diễn cảnh ngoài giả định Gaussian thông thường.",
      "en": "Revisits mixture representations in 3D Gaussian Splatting. Student distributions with positive and negative densities, together with a sampling-based optimizer, explore scene representations beyond conventional Gaussian components."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhu_3D_Student_Splatting_and_Scooping_CVPR_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2503.10148"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhu_3D_Student_Splatting_and_Scooping_CVPR_2025_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://cvpr.thecvf.com/Conferences/2025/BestPapersDemos",
      "evidence": "CVPR 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iccv-2025-brickgpt",
    "conferenceId": "iccv",
    "year": 2025,
    "title": "Generating Physically Stable and Buildable Brick Structures from Text",
    "authors": [
      "Ava Pun",
      "Kangle Deng",
      "Ruixuan Liu",
      "Deva Ramanan",
      "Changliu Liu",
      "Jun-Yan Zhu"
    ],
    "topic": "generation",
    "summary": {
      "vi": "BrickGPT sinh cấu trúc gạch lắp ghép từ mô tả văn bản. Mô hình autoregressive kết hợp kiểm tra tính hợp lệ và rollback dựa trên vật lý để ràng buộc thiết kế có thể đứng vững và lắp ráp được.",
      "en": "Generates interlocking brick structures from text. An autoregressive model uses validity checks and physics-aware rollback to constrain designs for stability and assembly."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/ICCV2025/html/Pun_Generating_Physically_Stable_and_Buildable_Brick_Structures_from_Text_ICCV_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2505.05469",
      "project": "https://avalovelace1.github.io/BrickGPT/"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/ICCV2025/html/Pun_Generating_Physically_Stable_and_Buildable_Brick_Structures_from_Text_ICCV_2025_paper.html",
    "award": {
      "type": "best",
      "source": "https://www.thecvf.com/?page_id=413",
      "evidence": "ICCV 2025 — Best Paper · Marr Prize"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iccv-2025-spatially-varying-autofocus",
    "conferenceId": "iccv",
    "year": 2025,
    "title": "Spatially-Varying Autofocus",
    "authors": [
      "Yingsi Qin",
      "Aswin C. Sankaranarayanan",
      "Matthew O'Toole"
    ],
    "topic": "imaging",
    "summary": {
      "vi": "Bài báo nghiên cứu hệ quang học có thể lấy nét ở các độ sâu khác nhau theo từng vị trí ảnh. Lohmann lens và bộ điều biến ánh sáng pha kết hợp ước lượng contrast, disparity để điều chỉnh bản đồ lấy nét.",
      "en": "Studies spatially selective focusing at different image locations. A Lohmann lens and phase-only spatial light modulator combine with contrast and disparity cues to iteratively adjust the focus map."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/ICCV2025/html/Qin_Spatially-Varying_Autofocus_ICCV_2025_paper.html",
      "code": "https://github.com/Image-Science-Lab-cmu/SVAF"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/ICCV2025/html/Qin_Spatially-Varying_Autofocus_ICCV_2025_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://www.thecvf.com/?page_id=413",
      "evidence": "ICCV 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iccv-2025-rayzer",
    "conferenceId": "iccv",
    "year": 2025,
    "title": "RayZer: A Self-supervised Large View Synthesis Model",
    "authors": [
      "Hanwen Jiang",
      "Hao Tan",
      "Peng Wang",
      "Haian Jin",
      "Yue Zhao",
      "Sai Bi",
      "Kai Zhang",
      "Fujun Luan",
      "Kalyan Sunkavalli",
      "Qixing Huang",
      "Georgios Pavlakos"
    ],
    "topic": "reconstruction",
    "summary": {
      "vi": "RayZer học dựng cảnh 3D từ các ảnh chưa biết camera mà không dùng giám sát hình học 3D. Mô hình tách biểu diễn camera và cảnh, dùng cấu trúc tia cùng việc dựng lại góc nhìn để học từ dữ liệu ảnh 2D.",
      "en": "Learns 3D scene reconstruction from images without known cameras or 3D supervision. Disentangled camera and scene representations use ray structure and view reconstruction to learn from 2D images."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/ICCV2025/html/Jiang_RayZer_A_Self-supervised_Large_View_Synthesis_Model_ICCV_2025_paper.html",
      "arxiv": "https://arxiv.org/abs/2505.00702",
      "project": "https://hwjiang1510.github.io/RayZer/",
      "code": "https://github.com/hwjiang1510/RayZer"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/ICCV2025/html/Jiang_RayZer_A_Self-supervised_Large_View_Synthesis_Model_ICCV_2025_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://www.thecvf.com/?page_id=413",
      "evidence": "ICCV 2025 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iccv-2023-single-photon-imaging",
    "conferenceId": "iccv",
    "year": 2023,
    "title": "Passive Ultra-Wideband Single-Photon Imaging",
    "authors": [
      "Mian Wei",
      "Sotiris Nousias",
      "Rahul Gulve",
      "David B. Lindell",
      "Kiriakos N. Kutulakos"
    ],
    "topic": "imaging",
    "summary": {
      "vi": "Nghiên cứu tái dựng biến thiên ánh sáng từ timestamp photon mà không đồng bộ với nguồn sáng. Lý thuyết ước lượng flux và thuật toán miền Fourier cho phép phân tích chuyển động cảnh và tín hiệu ánh sáng ở nhiều thang thời gian.",
      "en": "Reconstructs changing light intensity from photon timestamps without source synchronization. Flux-estimation theory and a Fourier-domain algorithm analyze scene motion and illumination over widely different timescales."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/ICCV2023/html/Wei_Passive_Ultra-Wideband_Single-Photon_Imaging_ICCV_2023_paper.html",
      "project": "https://www.dgp.toronto.edu/projects/ultra-wideband/",
      "code": "https://github.com/t-cig/UWB1D"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/ICCV2023/html/Wei_Passive_Ultra-Wideband_Single-Photon_Imaging_ICCV_2023_paper.html",
    "award": {
      "type": "best",
      "source": "https://www.thecvf.com/?page_id=413",
      "evidence": "ICCV 2023 — Best Paper · Marr Prize"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iccv-2023-controlnet",
    "conferenceId": "iccv",
    "year": 2023,
    "title": "Adding Conditional Control to Text-to-Image Diffusion Models",
    "authors": [
      "Lvmin Zhang",
      "Anyi Rao",
      "Maneesh Agrawala"
    ],
    "topic": "generation",
    "summary": {
      "vi": "ControlNet bổ sung điều kiện không gian cho mô hình text-to-image diffusion đã được huấn luyện. Nhánh điều khiển dùng zero-initialized convolutions để tiếp nhận cạnh, độ sâu hoặc pose trong khi bảo toàn backbone gốc.",
      "en": "Adds spatial conditioning to pretrained text-to-image diffusion models. A control branch with zero-initialized convolutions accepts edges, depth, or poses while preserving the original backbone."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhang_Adding_Conditional_Control_to_Text-to-Image_Diffusion_Models_ICCV_2023_paper.html",
      "arxiv": "https://arxiv.org/abs/2302.05543",
      "code": "https://github.com/lllyasviel/ControlNet"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhang_Adding_Conditional_Control_to_Text-to-Image_Diffusion_Models_ICCV_2023_paper.html",
    "award": {
      "type": "best",
      "source": "https://www.thecvf.com/?page_id=413",
      "evidence": "ICCV 2023 — Best Paper · Marr Prize"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iccv-2023-segment-anything",
    "conferenceId": "iccv",
    "year": 2023,
    "title": "Segment Anything",
    "authors": [
      "Alexander Kirillov",
      "Eric Mintun",
      "Nikhila Ravi",
      "Hanzi Mao",
      "Chloe Rolland",
      "Laura Gustafson",
      "Tete Xiao",
      "Spencer Whitehead",
      "Alexander C. Berg",
      "Wan-Yen Lo",
      "Piotr Dollar",
      "Ross Girshick"
    ],
    "topic": "segmentation",
    "summary": {
      "vi": "Segment Anything xây dựng bài toán phân đoạn có thể điều khiển bằng prompt. Mô hình, quy trình thu thập dữ liệu tương tác và bộ dữ liệu mask quy mô lớn tạo nền tảng cho phân đoạn trên các ảnh và tác vụ mới.",
      "en": "Defines promptable image segmentation. A model, interactive data engine, and large mask dataset provide a foundation for segmentation across new images and tasks."
    },
    "links": {
      "paper": "https://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html",
      "arxiv": "https://arxiv.org/abs/2304.02643",
      "code": "https://github.com/facebookresearch/segment-anything"
    },
    "metadataSource": "https://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html",
    "award": {
      "type": "honorable",
      "source": "https://www.thecvf.com/?page_id=413",
      "evidence": "ICCV 2023 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "eccv-2024-freeform-pixels",
    "conferenceId": "eccv",
    "year": 2024,
    "title": "Minimalist Vision with Freeform Pixels",
    "authors": [
      "Jeremy Klotz",
      "Shree K. Nayar"
    ],
    "topic": "imaging",
    "summary": {
      "vi": "Nghiên cứu thiết kế camera tối giản với pixel có hình dạng tự do theo từng nhiệm vụ. Phần cứng được mô hình hóa như lớp đầu mạng neural để học mặt nạ quang học, hướng tới cảm biến ít phép đo và hạn chế thông tin nhận dạng.",
      "en": "Designs task-specific cameras with freeform pixel shapes. Modeling hardware as a network’s first layer learns optical masks for low-measurement sensing with limited identifying visual detail."
    },
    "links": {
      "paper": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/8113_ECCV_2024_paper.php",
      "arxiv": "https://arxiv.org/abs/2501.00142",
      "code": "https://github.com/ColumbiaComputerVision/mincam"
    },
    "metadataSource": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/8113_ECCV_2024_paper.php",
    "award": {
      "type": "best",
      "source": "https://www.ecva.net/awards.php",
      "evidence": "ECCV 2024 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "eccv-2024-concept-arithmetics",
    "conferenceId": "eccv",
    "year": 2024,
    "title": "Concept Arithmetics for Circumventing Concept Inhibition in Diffusion Models",
    "authors": [
      "Vitali Petsiuk",
      "Kate Saenko"
    ],
    "topic": "alignment",
    "summary": {
      "vi": "Bài báo kiểm tra giới hạn của việc chặn khái niệm trong text-to-image diffusion. Phân tích kết hợp nhiều khái niệm qua compositional inference làm rõ những lỗ hổng cần xem xét khi đánh giá cơ chế an toàn của mô hình.",
      "en": "Examines limitations of concept inhibition in text-to-image diffusion. Analysis of compositional inference shows why combining concepts matters when evaluating model safety mechanisms."
    },
    "links": {
      "paper": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/12206_ECCV_2024_paper.php",
      "arxiv": "https://arxiv.org/abs/2404.13706"
    },
    "metadataSource": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/12206_ECCV_2024_paper.php",
    "award": {
      "type": "honorable",
      "source": "https://www.ecva.net/awards.php",
      "evidence": "ECCV 2024 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "eccv-2024-rasterized-edge-gradients",
    "conferenceId": "eccv",
    "year": 2024,
    "title": "Rasterized Edge Gradients: Handling Discontinuities Differentiably",
    "authors": [
      "Stanislav Pidhorskyi",
      "Tomas Simon",
      "Gabriel Schwartz",
      "He Wen",
      "Yaser Sheikh",
      "Jason Saragih"
    ],
    "topic": "rendering",
    "summary": {
      "vi": "Nghiên cứu xử lý gradient tại biên che khuất trong differentiable rasterization. Khái niệm micro-edge xấp xỉ quá trình liên tục phía sau pixel rời rạc, cho phép tối ưu hình học mà không phải thay đổi ảnh của forward pass.",
      "en": "Addresses gradients at visibility discontinuities in differentiable rasterization. Micro-edges approximate the continuous process behind discrete pixels, enabling geometry optimization without altering the forward rendering."
    },
    "links": {
      "paper": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/11059_ECCV_2024_paper.php",
      "arxiv": "https://arxiv.org/abs/2405.02508",
      "code": "https://github.com/facebookresearch/DRTK"
    },
    "metadataSource": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/11059_ECCV_2024_paper.php",
    "award": {
      "type": "honorable",
      "source": "https://www.ecva.net/awards.php",
      "evidence": "ECCV 2024 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "eccv-2026-heat-kernel-textures",
    "conferenceId": "eccv",
    "year": 2026,
    "title": "Heat Kernel Textures: the Geodesic Gaussians That Do Not Splat",
    "authors": [
      "Simone Foti",
      "Caner Korkmaz",
      "Stefanos Zafeiriou",
      "Tolga Birdal"
    ],
    "topic": "rendering",
    "summary": {
      "vi": "HKTex biểu diễn texture trực tiếp trên mặt lưới tam giác bằng anisotropic heat kernels. Tối ưu vị trí và mật độ trên đa tạp thay thế UV unwrapping, hỗ trợ học texture từ ảnh đa góc nhìn hoặc texture sẵn có.",
      "en": "Represents textures directly on triangle meshes with anisotropic heat kernels. Surface-aware optimization and density control replace UV unwrapping when fitting existing textures or multi-view images."
    },
    "links": {
      "paper": "https://link.springer.com/chapter/10.1007/978-3-032-37595-7_17",
      "arxiv": "https://arxiv.org/abs/2609.07557",
      "project": "https://circle-group.github.io/research/HeatKernelTextures/",
      "code": "https://github.com/circle-group/hktex"
    },
    "metadataSource": "https://link.springer.com/chapter/10.1007/978-3-032-37595-7_17",
    "award": {
      "type": "best",
      "source": "https://bsky.app/profile/eccv.bsky.social/post/3mv5nc3ds7c27",
      "evidence": "ECCV 2026 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "eccv-2026-lsrm",
    "conferenceId": "eccv",
    "year": 2026,
    "title": "LSRM: High-Fidelity Object-Centric Reconstruction via Scaled Context Windows",
    "authors": [
      "Zhengqin Li",
      "Cheng Zhang",
      "Jakob Engel",
      "Zhao Dong"
    ],
    "topic": "reconstruction",
    "summary": {
      "vi": "LSRM mở rộng cửa sổ ngữ cảnh trong tái dựng đối tượng 3D bằng sparse attention. Pipeline thô đến tinh, định tuyến theo hình học và sequence parallelism tập trung tính toán vào vùng giàu thông tin để học hình học và vật liệu.",
      "en": "Scales context windows for object-centric 3D reconstruction using sparse attention. Coarse-to-fine prediction, geometry-aware routing, and sequence parallelism focus computation on informative regions for geometry and appearance recovery."
    },
    "links": {
      "paper": "https://link.springer.com/chapter/10.1007/978-3-032-37447-9_15",
      "arxiv": "https://arxiv.org/abs/2604.05182"
    },
    "metadataSource": "https://link.springer.com/chapter/10.1007/978-3-032-37447-9_15",
    "award": {
      "type": "honorable",
      "source": "https://bsky.app/profile/eccv.bsky.social/post/3mv5nc3ds7c27",
      "evidence": "ECCV 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "eccv-2026-poppy",
    "conferenceId": "eccv",
    "year": 2026,
    "title": "Poppy: Polarization-Based Plug-and-Play Guidance for Enhancing Monocular Normal Estimation",
    "authors": [
      "Irene Kim",
      "Sai Tanmay Reddy Chakkera",
      "Alexandros Graikos",
      "Dimitris Samaras",
      "Akshat Dave"
    ],
    "topic": "imaging",
    "summary": {
      "vi": "Poppy dùng ảnh phân cực để tinh chỉnh pháp tuyến bề mặt từ backbone RGB đã đóng băng. Tối ưu offset đầu vào, đầu ra và phân rã phản xạ qua differentiable rendering đưa thêm ràng buộc vật lý ở thời điểm suy luận.",
      "en": "Refines surface normals from frozen RGB backbones using polarization measurements. Input/output offsets and reflectance decomposition are optimized through differentiable rendering to add physical constraints at inference time."
    },
    "links": {
      "paper": "https://link.springer.com/chapter/10.1007/978-3-032-37350-2_9",
      "arxiv": "https://arxiv.org/abs/2603.27891",
      "project": "https://irnkim.github.io/poppy/",
      "code": "https://github.com/irnkim/poppy"
    },
    "metadataSource": "https://link.springer.com/chapter/10.1007/978-3-032-37350-2_9",
    "award": {
      "type": "honorable",
      "source": "https://bsky.app/profile/eccv.bsky.social/post/3mv5nc3ds7c27",
      "evidence": "ECCV 2026 — Honorable Mention"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icra-2026-omniretarget",
    "conferenceId": "icra",
    "year": 2026,
    "title": "OmniRetarget: Interaction-Preserving Data Generation for Humanoid Whole-Body Loco-Manipulation and Scene Interaction",
    "authors": [
      "Lujie Yang",
      "Xiaoyu Huang",
      "Zhen Wu",
      "Angjoo Kanazawa",
      "Pieter Abbeel",
      "Carmelo Sferrazza",
      "C. Karen Liu",
      "Rocky Duan",
      "Guanya Shi"
    ],
    "topic": "control",
    "summary": {
      "vi": "OmniRetarget chuyển động tác người sang robot humanoid bằng cách bảo toàn quan hệ giữa cơ thể, vật thể và địa hình. Interaction mesh cùng ràng buộc động học tạo dữ liệu chuyển động và tăng cường dữ liệu cho loco-manipulation.",
      "en": "Retargets human motion to humanoids while preserving body–object–terrain relationships. An interaction mesh and kinematic constraints generate and augment motion data for loco-manipulation."
    },
    "links": {
      "paper": "https://arxiv.org/abs/2509.26633",
      "project": "https://omniretarget.github.io/",
      "code": "https://github.com/amazon-far/holosoma"
    },
    "metadataSource": "https://arxiv.org/abs/2509.26633",
    "award": {
      "type": "best",
      "source": "https://www.ieee-ras.org/lujie-yang-on-teaching-humanoid-robots-by-preserving-interactions/",
      "evidence": "ICRA 2026 — Best Conference Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icra-2025-gaussians-on-manifolds",
    "conferenceId": "icra",
    "year": 2025,
    "title": "Marginalizing and Conditioning Gaussians onto Linear Approximations of Smooth Manifolds with Applications in Robotics",
    "authors": [
      "Zi Cong Guo",
      "James R. Forbes",
      "Timothy D. Barfoot"
    ],
    "topic": "uncertainty",
    "summary": {
      "vi": "Bài báo xây dựng công thức marginalization và conditioning Gaussian trên đa tạp tuyến tính tổng quát. Tuyến tính hóa mở rộng phương pháp sang đa tạp trơn, với các ứng dụng ước lượng covariance trong SLAM và tối ưu có ràng buộc.",
      "en": "Derives Gaussian marginalization and conditioning on general linear manifolds. Linearization extends the method to smooth manifolds, with covariance-estimation applications in SLAM and constrained optimization."
    },
    "links": {
      "paper": "https://arxiv.org/abs/2409.09871"
    },
    "metadataSource": "https://arxiv.org/abs/2409.09871",
    "award": {
      "type": "best",
      "source": "https://www.ieee-ras.org/awards-recognition/conference-awards/ieee-icra-best-conference-paper-award/",
      "evidence": "ICRA 2025 — Best Conference Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "icra-2025-mac-vo",
    "conferenceId": "icra",
    "year": 2025,
    "title": "MAC-VO: Metrics-aware Covariance for Learning-based Stereo Visual Odometry",
    "authors": [
      "Yuheng Qiu",
      "Yutian Chen",
      "Zihao Zhang",
      "Wenshan Wang",
      "Sebastian Scherer"
    ],
    "topic": "perception",
    "summary": {
      "vi": "MAC-VO đưa độ không chắc chắn theo đơn vị đo vào visual odometry stereo. Covariance được học phục vụ chọn keypoint và gán trọng số residual, liên kết độ tin cậy của phép ghép ảnh với tối ưu pose graph.",
      "en": "Introduces metric-aware uncertainty to stereo visual odometry. Learned covariance guides keypoint selection and residual weighting, connecting image-matching reliability with pose-graph optimization."
    },
    "links": {
      "paper": "https://arxiv.org/abs/2409.09479",
      "project": "https://mac-vo.github.io/",
      "code": "https://github.com/MAC-VO/MAC-VO"
    },
    "metadataSource": "https://arxiv.org/abs/2409.09479",
    "award": {
      "type": "best",
      "source": "https://www.ieee-ras.org/awards-recognition/conference-awards/ieee-icra-best-conference-paper-award/",
      "evidence": "ICRA 2025 — Best Conference Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iros-2026-lt-mem",
    "conferenceId": "iros",
    "year": 2026,
    "title": "LT-Mem: Volatility-Aware Spatio-Temporal Memory for Lifelong Scene Understanding",
    "authors": [
      "Yumin Lee",
      "Hyoseok Ju",
      "Giseop Kim"
    ],
    "topic": "perception",
    "summary": {
      "vi": "LT-Mem duy trì lịch sử và danh tính đối tượng khi robot quay lại môi trường thay đổi theo thời gian. Bộ nhớ Live, Delta và Meta được cập nhật theo mức biến động, kết hợp dữ liệu nhiều phiên để hỗ trợ truy vấn lịch sử cảnh.",
      "en": "Maintains object identity and history across revisits to changing environments. Volatility-aware updates to Live, Delta, and Meta memories support temporal scene queries from aligned multi-session observations."
    },
    "links": {
      "paper": "https://arxiv.org/abs/2608.19059",
      "project": "https://lt-mem.github.io/"
    },
    "metadataSource": "https://arxiv.org/abs/2608.19059",
    "award": {
      "type": "best",
      "source": "https://team-aprl.github.io/assets/news/lt-mem-iros2026-best-paper-certificate-preview.webp",
      "evidence": "IROS 2026 — Best Paper · Official winner certificate, hosted by the authors’ university laboratory"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "iros-2025-interdigitated-electrodes",
    "conferenceId": "iros",
    "year": 2025,
    "title": "Interdigitated Electrodes for Selective Stimulation of Skeletal Muscle Actuators in Biosyncretic Robots",
    "authors": [
      "Lianchao Yang",
      "Chuang Zhang",
      "Qi Zhang",
      "Yiwei Zhang",
      "Hengshen Qin",
      "Lianqing Liu"
    ],
    "topic": "bio-robotics",
    "summary": {
      "vi": "Nghiên cứu điều khiển chọn lọc các bộ truyền động cơ xương trong robot sinh học–cơ điện. Điện cực màng mỏng dạng đan xen được tối ưu để kích thích những vùng cơ khác nhau, hỗ trợ phối hợp nhiều đơn vị truyền động.",
      "en": "Studies selective control of skeletal-muscle actuators in biosyncretic robots. Optimized thin-film interdigitated electrodes target different muscle regions to support coordinated actuation."
    },
    "links": {
      "paper": "https://events.infovaya.com/uploads/documents/pdfviewer/80/65/200114-4372.pdf"
    },
    "metadataSource": "https://events.infovaya.com/uploads/documents/pdfviewer/80/65/200114-4372.pdf",
    "award": {
      "type": "best",
      "source": "https://english.sia.cas.cn/news/Events/202512/t20251212_1136776.html",
      "evidence": "IROS 2025 — Best Paper · SIA/CAS institutional announcement, 2025-11-14; HTTPS certificate issue noted in the verification report"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "corl-2025-unified-force-position",
    "conferenceId": "corl",
    "year": 2025,
    "title": "Learning a Unified Policy for Position and Force Control in Legged Loco-Manipulation",
    "authors": [
      "Peiyuan Zhi",
      "Peiyang Li",
      "Jianqin Yin",
      "Baoxiong Jia",
      "Siyuan Huang"
    ],
    "topic": "control",
    "summary": {
      "vi": "Nghiên cứu học chính sách thống nhất cho điều khiển vị trí và lực ở robot có chân. Học tăng cường trong mô phỏng dùng lịch sử trạng thái để ước lượng lực và bù chuyển động, hỗ trợ thao tác tiếp xúc mà không cần cảm biến lực.",
      "en": "Learns a unified position-and-force policy for legged robots. Simulated reinforcement learning uses state history to estimate forces and compensate motion, supporting contact-rich manipulation without force sensors."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v305/zhi25a.html",
      "arxiv": "https://arxiv.org/abs/2505.20829",
      "project": "https://unified-force.github.io/",
      "code": "https://github.com/unified-force/UniFP"
    },
    "metadataSource": "https://proceedings.mlr.press/v305/zhi25a.html",
    "award": {
      "type": "best",
      "source": "https://2025.corl.org/program/awards",
      "evidence": "CoRL 2025 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "corl-2025-fabrica",
    "conferenceId": "corl",
    "year": 2025,
    "title": "Fabrica: Dual-Arm Assembly of General Multi-Part Objects via Integrated Planning and Learning",
    "authors": [
      "Yunsheng Tian",
      "Joshua Jacob",
      "Yijiang Huang",
      "Jialiang Zhao",
      "Edward Li Gu",
      "Pingchuan Ma",
      "Annan Zhang",
      "Farhad Javid",
      "Branden Romero",
      "Sachin Chitta",
      "Shinjiro Sueda",
      "Hui Li",
      "Wojciech Matusik"
    ],
    "topic": "control",
    "summary": {
      "vi": "Fabrica kết hợp lập kế hoạch phân cấp với chính sách điều khiển học được cho lắp ráp hai tay robot. Hệ thống liên kết thứ tự lắp, chọn grasp và đường đi với điều khiển tiếp xúc cục bộ trên các hình học đa chi tiết.",
      "en": "Combines hierarchical planning and learned control for dual-arm assembly. Assembly sequences, grasps, and motion plans connect with local contact policies across multi-part object geometries."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v305/tian25a.html",
      "arxiv": "https://arxiv.org/abs/2506.05168",
      "project": "https://fabrica.csail.mit.edu/",
      "code": "https://github.com/yunshengtian/Fabrica"
    },
    "metadataSource": "https://proceedings.mlr.press/v305/tian25a.html",
    "award": {
      "type": "best",
      "source": "https://2025.corl.org/program/awards",
      "evidence": "CoRL 2025 — Best Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "corl-2024-poliformer",
    "conferenceId": "corl",
    "year": 2024,
    "title": "PoliFormer: Scaling On-Policy RL with Transformers Results in Masterful Navigators",
    "authors": [
      "Kuo-Hao Zeng",
      "Zichen Zhang",
      "Kiana Ehsani",
      "Rose Hendrix",
      "Jordi Salvador",
      "Alvaro Herrasti",
      "Ross Girshick",
      "Aniruddha Kembhavi",
      "Luca Weihs"
    ],
    "topic": "embodied",
    "summary": {
      "vi": "PoliFormer học điều hướng trong nhà từ ảnh RGB bằng học tăng cường quy mô lớn trong mô phỏng. Vision encoder và causal Transformer cung cấp biểu diễn quan sát cùng bộ nhớ lịch sử để nghiên cứu chuyển giao sang robot thực.",
      "en": "Learns indoor navigation from RGB using large-scale simulated reinforcement learning. A vision encoder and causal Transformer combine perception with history for studying transfer to real robots."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v270/zeng25a.html",
      "arxiv": "https://arxiv.org/abs/2406.20083"
    },
    "metadataSource": "https://proceedings.mlr.press/v270/zeng25a.html",
    "award": {
      "type": "outstanding",
      "source": "https://2024.corl.org/program/awards",
      "evidence": "CoRL 2024 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "corl-2024-one-model-to-drift",
    "conferenceId": "corl",
    "year": 2024,
    "title": "One Model to Drift Them All: Physics-Informed Conditional Diffusion Model for Driving at the Limits",
    "authors": [
      "Franck Djeumou",
      "Thomas Jonathan Lew",
      "Nan Ding",
      "Michael Thompson",
      "Makoto Suminaka",
      "Marcus Greiff",
      "John Subosits"
    ],
    "topic": "control",
    "summary": {
      "vi": "Nghiên cứu điều khiển xe gần giới hạn bám đường bằng mô hình diffusion có điều kiện. Phân phối tham số động lực học gắn kiến thức vật lý được cập nhật từ đo lường trực tuyến và tích hợp vào model predictive control.",
      "en": "Controls vehicles near handling limits using conditional diffusion. A physics-informed dynamics-parameter distribution is conditioned on online measurements and integrated into model predictive control."
    },
    "links": {
      "paper": "https://proceedings.mlr.press/v270/djeumou25a.html"
    },
    "metadataSource": "https://proceedings.mlr.press/v270/djeumou25a.html",
    "award": {
      "type": "outstanding",
      "source": "https://2024.corl.org/program/awards",
      "evidence": "CoRL 2024 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "rss-2026-flashsac",
    "conferenceId": "rss",
    "year": 2026,
    "title": "FlashSAC: Fast and Stable Off-Policy Reinforcement Learning for High-Dimensional Robot Control",
    "authors": [
      "Donghu Kim",
      "Youngdo Lee",
      "Minho Park",
      "Kinam Kim",
      "Takuma Seno",
      "I. Made Aswin Nahrendra",
      "Sehee Min",
      "Daniel Palenicek",
      "Florian Vogt",
      "Danica Kragic",
      "Jan Peters",
      "Jaegul Choo",
      "Hojoon Lee"
    ],
    "topic": "control",
    "summary": {
      "vi": "FlashSAC nghiên cứu tính ổn định của off-policy RL cho robot có không gian điều khiển lớn. Giới hạn norm trọng số, đặc trưng và gradient kết hợp mô phỏng song song cùng replay buffer để hạn chế khuếch đại sai số critic.",
      "en": "Studies stable off-policy learning for high-dimensional robot control. Bounds on weight, feature, and gradient norms combine with parallel simulation and replay to limit critic-error amplification."
    },
    "links": {
      "paper": "https://www.roboticsproceedings.org/rss22/p099.html",
      "arxiv": "https://arxiv.org/abs/2604.04539"
    },
    "metadataSource": "https://www.roboticsproceedings.org/rss22/p099.html",
    "award": {
      "type": "outstanding",
      "source": "https://roboticsconference.org/2026/program/awards/",
      "evidence": "RSS 2026 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  },
  {
    "id": "rss-2025-feast",
    "conferenceId": "rss",
    "year": 2025,
    "title": "FEAST: A Flexible Mealtime-Assistance System Towards In-the-Wild Personalization",
    "authors": [
      "Rajat Kumar Jenamani",
      "Tom Silver",
      "Ben Dodson",
      "Shiqin Tong",
      "Anthony Song",
      "Yuting Yang",
      "Ziang Liu",
      "Benjamin Howe",
      "Aimee Whitneck",
      "Tapomayukh Bhattacharjee"
    ],
    "topic": "control",
    "summary": {
      "vi": "FEAST hỗ trợ cá nhân hóa robot trợ giúp bữa ăn trong môi trường gia đình. Phần cứng mô-đun, nhiều phương thức tương tác và behavior tree có tham số cho phép điều chỉnh việc ăn, uống và lau miệng theo nhu cầu người dùng.",
      "en": "Personalizes robotic mealtime assistance in homes. Modular hardware, multiple interaction methods, and parameterized behavior trees adapt feeding, drinking, and mouth-wiping to individual needs."
    },
    "links": {
      "paper": "https://www.roboticsproceedings.org/rss21/p083.html",
      "arxiv": "https://arxiv.org/abs/2506.14968",
      "project": "https://emprise.cs.cornell.edu/feast/"
    },
    "metadataSource": "https://www.roboticsproceedings.org/rss21/p083.html",
    "award": {
      "type": "outstanding",
      "source": "https://roboticsconference.org/2025/program/awards/",
      "evidence": "RSS 2025 — Outstanding Paper"
    },
    "verifiedOn": "2026-11-08",
    "media": [],
    "related": []
  }
];
