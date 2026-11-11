// Public, non-sensitive planning taxonomy only. Never store private Atlas records here.
export const pair = (vi,en) => ({vi,en});
export const groups = [
 pair('Kiến trúc AI & Học máy','AI Architectures & Learning'),
 pair('Thị giác & Trí tuệ đa phương thức','Perception & Multimodal Intelligence'),
 pair('Robot & Trí tuệ vật lý','Robotics & Physical Intelligence'),
 pair('AI cho Khoa học & Mô phỏng','AI for Science & Simulation')
];
const entries = [
 ['neural-networks-cnns',0,'Neural Networks & CNNs','Mạng nơ-ron & CNN','Học đặc trưng phân cấp và tối ưu mạng sâu.','Hierarchical features and deep-network optimization.',['Convolutional networks','Residual learning','Efficient architectures']],
 ['sequence-transformers',0,'Sequence Models & Transformers','Mô hình chuỗi & Transformer','Mô hình hóa chuỗi, attention và bộ nhớ.','Sequence modeling, attention, and memory.',['Recurrent networks','Attention','Transformers']],
 ['language-gpt',0,'Language Models & GPT','Mô hình ngôn ngữ & GPT','Tiền huấn luyện, thích nghi và suy luận ngôn ngữ.','Language pretraining, adaptation, and reasoning.',['Autoregressive models','Instruction tuning','Reasoning']],
 ['generative-models',0,'Generative Models','Mô hình sinh','Từ biến ẩn đến sinh mẫu bằng khử nhiễu.','From latent variables to denoising-based generation.',['Variational models','Adversarial learning','Diffusion']],
 ['representation-self-supervised',0,'Representation & Self-supervised Learning','Biểu diễn & Học tự giám sát','Học biểu diễn từ cấu trúc của dữ liệu.','Learning representations from data structure.',['Contrastive learning','Masked modeling','Joint embeddings']],
 ['reinforcement-imitation',0,'Reinforcement & Imitation Learning','Học tăng cường & Bắt chước','Học quyết định từ tương tác hoặc minh họa.','Learning decisions from interaction or demonstrations.',['Policy learning','Offline RL','Imitation']],
 ['computer-vision',1,'Computer Vision & Image Understanding','Thị giác máy tính & Hiểu ảnh','Biểu diễn thị giác, nhận dạng và cấu trúc cảnh.','Visual representations, recognition, and scene structure.',['Recognition','Detection','Segmentation']],
 ['3d-vision',1,'3D Vision & Scene Reconstruction','Thị giác 3D & Tái tạo cảnh','Hình học, tái tạo và biểu diễn không gian.','Geometry, reconstruction, and spatial representations.',['Multi-view geometry','Neural rendering','Dynamic scenes']],
 ['video-temporal',1,'Video & Temporal Intelligence','Video & Trí tuệ thời gian','Chuyển động, theo dõi và hiểu chuỗi hình ảnh.','Motion, tracking, and understanding visual sequences.',['Video understanding','Tracking','Temporal modeling']],
 ['audio-multimodal',1,'Audio & Multimodal Intelligence','Âm thanh & Trí tuệ đa phương thức','Liên kết tiếng nói, hình ảnh và ngôn ngữ.','Connecting speech, vision, and language.',['Speech','Audio generation','Multimodal fusion']],
 ['robotics-planning-control',2,'Robotics Planning & Control','Lập kế hoạch & Điều khiển robot','Ước lượng trạng thái, lập kế hoạch và phản hồi.','State estimation, planning, and feedback.',['Motion planning','Control','Navigation']],
 ['embodied-vla',2,'Embodied AI & VLA','AI hiện thân & VLA','Kết nối nhận thức, ngôn ngữ và hành động.','Connecting perception, language, and action.',['Robot policies','Vision-language-action','Embodied learning']],
 ['world-models',2,'World Models & Physical Reasoning','Mô hình thế giới & Suy luận vật lý','Học động lực học để tưởng tượng và quyết định.','Learning dynamics for imagination and decisions.',['Latent dynamics','Planning','Imagined behavior learning']],
 ['biology-medical',3,'Biology, Chemistry & Medical AI','AI Sinh học, Hóa học & Y khoa','Biểu diễn phân tử và học từ dữ liệu y sinh.','Molecular representations and biomedical learning.',['Molecules','Proteins','Medical imaging']],
 ['scientific-ai',3,'Scientific AI & Neural Operators','AI Khoa học & Toán tử nơ-ron','Học hệ vật lý và ánh xạ giữa các hàm.','Learning physical systems and maps between functions.',['Neural operators','Scientific ML','Inverse problems']],
 ['simulation-platforms',3,'Simulation Platforms & Sim-to-Real Learning','Nền tảng mô phỏng & Học Sim-to-Real','Môi trường mô phỏng và chuyển giao sang thực tế.','Simulated environments and transfer to reality.',['Simulation engines','Domain randomization','Sim-to-real']]
];
export const series = entries.map(([id,group,en,vi,dvi,den,branches])=>({id,slug:id,group,title:pair(vi,en),description:pair(dvi,den),branches}));
export const modelSections = [
 ['insight','Ý tưởng cốt lõi','Core Insight'],['origins','Nguồn gốc khoa học','Scientific Origins'],
 ['gap','Phương pháp trước & Khoảng trống','Previous Methods & Research Gap'],['mechanism','Đổi mới & Cơ chế','Key Innovation & Mechanism'],
 ['training','Dữ liệu & Huấn luyện','Data & Training'],['results','Kết quả & Giới hạn','Results & Limitations'],
 ['connections','Kết nối liên lĩnh vực','Cross-domain Connections'],['next','Tiến hóa tiếp theo & Cơ hội nghiên cứu','Next Evolution & Research Opportunities'],
 ['references','Tài liệu tham khảo','References']
];
export const seriesSections = [
 ['foundations','Nền tảng khoa học','Scientific Foundations'],['principles','Nguyên lý cốt lõi','Core Principles'],
 ['evolution','Dòng tiến hóa mô hình','Model Evolution Timeline'],['papers','Bài báo nền tảng','Landmark Papers'],
 ['inspiration','Cảm hứng liên lĩnh vực','Cross-domain Inspiration'],['applications','Ứng dụng','Applications'],
 ['opportunities','Cơ hội nghiên cứu','Research Opportunities']
];
export const relationships = {
 extends:pair('Mở rộng','Extends'), improves:pair('Cải tiến','Improves'), inspired_by:pair('Lấy cảm hứng từ','Inspired by'),
 uses_principle:pair('Dùng nguyên lý','Uses principle'), method_transfer:pair('Chuyển giao phương pháp','Method transfer'),
 mathematical_connection:pair('Liên hệ toán học','Mathematical connection'), applied_to:pair('Ứng dụng vào','Applied to'),
 proposed_connection:pair('Liên hệ đề xuất','Proposed connection')
};
export const text = (value,lang='vi') => typeof value==='string'?value:String(value?.[lang]??value?.en??value?.vi??'');
export function atlasUrl({series,chain,model,source,lang}={}) {
 const q=new URLSearchParams();for(const [key,value] of Object.entries({series,chain,model,source,lang}))if(value)q.set(key,value);
 return 'atlas.html'+(q.size?'?'+q:'');
}
export function resolveAtlas(data,params) {
 const seriesId=params.get('series'), chainId=params.get('chain'), modelId=params.get('model');
 if(!seriesId)return chainId||modelId?null:{kind:'overview'};
 const s=data.series.find(s=>s.id===seriesId||s.slug===seriesId);if(!s)return null;
 const chains=data.chains.filter(c=>c.series_id===s.id);
 const chain=chainId?chains.find(c=>c.id===chainId||c.slug===chainId):null;
 if(chainId&&!chain)return null;
 const models=data.models.filter(m=>chains.some(c=>c.id===m.chain_id)&&(!chain||m.chain_id===chain.id));
 const model=modelId?models.find(m=>m.id===modelId||m.slug===modelId):null;
 if(modelId&&!model)return null;
 return {kind:model?'model':chain?'chain':'series',series:s,chains,chain:chain||chains.find(c=>c.id===model?.chain_id),models,model};
}
// Only explicit, documented edges establish lineage; chronology alone is never an edge.
export function modelNeighbors(data,id) {
 const lineage=new Set(['extends','improves','inspired_by']);
 return {predecessors:data.connections.filter(c=>c.source_model_id===id&&c.target_model_id&&lineage.has(c.relationship_type)),
 successors:data.connections.filter(c=>c.target_model_id===id&&c.source_model_id&&lineage.has(c.relationship_type)),
 crossDomain:data.connections.filter(c=>(c.source_model_id===id||c.target_model_id===id)&&!lineage.has(c.relationship_type))};
}
