// Verified bibliographic metadata and schedules, separate from translated analysis.
// Missing values stay null. Dates without a published clock time are date-only.
import {awardTopics,verifiedAwardPapers} from './award-papers.mjs';
import {paperEnrichment} from './paper-enrichment.mjs';
import {curatedPapers} from './curated-papers.mjs';
export const verifiedOn='2026-11-08';
export const fields={vision:['Thị giác máy tính','Computer Vision'],learning:['Học máy','Machine Learning'],robotics:['Robot học','Robotics']};
// Official records verified 2026-11-08; RSS explicitly uses historical CORE2018, not ICORE2026.
const coreRanks={cvpr:['A*',604],iccv:['A*',638],eccv:['A*',479],neurips:['A*',98],iclr:['A*',2273],icml:['A*',1121],icra:['A*',2051],iros:['A',792],corl:['Unranked',2308],rss:['A*',1709,'CORE2018']};
export const conferences=[
 ['cvpr','CVPR','IEEE/CVF Conference on Computer Vision and Pattern Recognition','vision','https://cvpr.thecvf.com/'],
 ['iccv','ICCV','IEEE/CVF International Conference on Computer Vision','vision','https://iccv.thecvf.com/'],
 ['eccv','ECCV','European Conference on Computer Vision','vision','https://eccv.ecva.net/'],
 ['neurips','NeurIPS','Conference on Neural Information Processing Systems','learning','https://neurips.cc/'],
 ['iclr','ICLR','International Conference on Learning Representations','learning','https://iclr.cc/'],
 ['icml','ICML','International Conference on Machine Learning','learning','https://icml.cc/'],
 ['icra','ICRA','IEEE International Conference on Robotics and Automation','robotics','https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra'],
 ['iros','IROS','IEEE/RSJ International Conference on Intelligent Robots and Systems','robotics','https://www.ieee-ras.org/conferences-workshops/financially-co-sponsored/iros'],
 ['corl','CoRL','Conference on Robot Learning','robotics','https://www.corl.org/'],
 ['rss','RSS','Robotics: Science and Systems','robotics','https://roboticsconference.org/']
].map(([id,acronym,name,field,url])=>({id,acronym,name,field,url,
 core_rank:coreRanks[id]?.[0]??null,
 core_rank_edition:coreRanks[id]?(coreRanks[id][2]||'ICORE2026'):null,
 core_rank_source:coreRanks[id]?`https://portal.core.edu.au/conf-ranks/${coreRanks[id][1]}/`:null
}));
const instant=(at,timezone,label)=>({at,timezone,...(label?{label}:{})});
const date=(date,timezone=null)=>({date,at:null,timezone});
const edition=(conferenceId,year,source,deadlines={},conferenceDates=null,notes=null)=>({id:`${conferenceId}-${year}`,conferenceId,year,source,verifiedOn,deadlines:{abstract:null,full:null,supplementary:null,notification:null,...deadlines},conferenceDates,notes});
// These editions require the abstract/enrollment stage before a full paper; sources are documented in docs/CONFERENCE-DEADLINES.md.
const requiredAbstract=(...args)=>({...edition(...args),abstractRequired:true});
export const editions=[
 requiredAbstract('cvpr',2027,'https://cvpr.thecvf.com/Conferences/2027/CallForPapers',{
  abstract:instant('2026-11-10T23:59:00-12:00','AoE · UTC−12:00',['Đăng ký bài','Paper enrollment']),full:instant('2026-11-16T23:59:00-12:00','AoE · UTC−12:00'),supplementary:instant('2026-11-23T23:59:00-12:00','AoE · UTC−12:00'),notification:date('2027-02-25','AoE · UTC−12:00')
 },{start:'2027-06-20',end:'2027-06-25',source:'https://cvpr.thecvf.com/Conferences/2027/Dates'}),
 requiredAbstract('cvpr',2026,'https://cvpr.thecvf.com/Conferences/2026/Dates',{abstract:date('2025-11-07','AoE · UTC−12:00'),full:date('2025-11-13','AoE · UTC−12:00'),supplementary:date('2025-11-20','AoE · UTC−12:00'),notification:date('2026-02-20')},{start:'2026-06-03',end:'2026-06-07',source:'https://cvpr.thecvf.com/Conferences/2026/Dates'}),
 edition('iccv',2027,'https://iccv.thecvf.com/Conferences/2027/Dates',{}, {start:'2027-10-03',end:'2027-10-07',source:'https://iccv.thecvf.com/Conferences/2027/Dates'}),
 requiredAbstract('eccv',2026,'https://eccv.ecva.net/Conferences/2026/CallForPapers',{abstract:instant('2026-02-26T23:00:00+01:00','CET · UTC+01:00'),full:instant('2026-03-05T23:00:00+01:00','CET · UTC+01:00'),supplementary:instant('2026-03-12T23:00:00+01:00','CET · UTC+01:00'),notification:date('2026-06-17')}),
 requiredAbstract('neurips',2026,'https://neurips.cc/Conferences/2026/Dates',{abstract:date('2026-05-04','AoE · UTC−12:00'),full:date('2026-05-06','AoE · UTC−12:00'),notification:date('2026-09-24','AoE · UTC−12:00')},{start:'2026-12-06',end:'2026-12-12',source:'https://neurips.cc/Conferences/2026/Dates',label:['Sydney · địa điểm chính','Sydney · main location']}),
 requiredAbstract('iclr',2027,'https://iclr.cc/Conferences/2027/CallForPapers',{abstract:date('2026-09-18','AoE · UTC−12:00'),full:date('2026-09-25','AoE · UTC−12:00'),notification:date('2026-12-16','AoE · UTC−12:00')},{start:'2027-04-26',end:'2027-04-30',source:'https://iclr.cc/Conferences/2027'}),
 edition('icml',2027,'https://icml.cc/Conferences/2027/Dates',{}, {start:'2027-07-31',end:'2027-08-06',source:'https://icml.cc/Conferences/2027/Dates'}),
 edition('icra',2027,'https://2027.ieee-icra.org/announcements/call-for-technical-papers/',{full:instant('2026-09-16T23:59:00-08:00','PST · UTC−08:00'),supplementary:instant('2026-09-22T23:59:00-08:00','PST · UTC−08:00',['Video bổ sung (đợt cuối)','Accompanying video (final window)']),notification:date('2027-01-31')},null,['Đã áp dụng hạn gia hạn ngày 16/09 từ danh sách Important Deadlines chính thức.','Uses the September 16 extension in the official Important Deadlines list.']),
 edition('iros',2026,'https://www.ieee-ras.org/event/2026-ieee-rsj-international-conference-on-intelligent-robots-and-systems-iros-61738/',{full:date('2026-03-01')}),
 edition('corl',2026,'https://2026.corl.org/contributions',{full:date('2026-05-28','AoE · UTC−12:00')},{start:'2026-11-09',end:'2026-11-12',source:'https://www.corl.org/'}),
 requiredAbstract('rss',2027,'https://roboticsconference.org/',{
  abstract:instant('2026-12-04T23:59:00-12:00','AoE · UTC−12:00',['Extended abstract','Extended abstract']),full:instant('2027-04-16T23:59:00-12:00','AoE · UTC−12:00',['Bài hoàn chỉnh · sau vòng mời','Final paper · invited stage']),supplementary:instant('2027-04-19T23:59:00-12:00','AoE · UTC−12:00'),notification:instant('2027-04-30T23:59:00-12:00','AoE · UTC−12:00')
 },{start:'2027-07-06',end:'2027-07-11',source:'https://roboticsconference.org/'},['Quy trình nhiều vòng: cần nộp extended abstract trước khi được mời nộp bài hoàn chỉnh.','Multi-stage process: an extended abstract is required before invitation to submit a final paper.'])
];
export const awardLabels={best:['Giải Best Paper chính thức','Official Best Paper'],outstanding:['Giải Outstanding Paper chính thức','Official Outstanding Paper'],'runner-up':['Best Paper Runner-up chính thức','Official Best Paper Runner-up'],honorable:['Honorable Mention chính thức','Official Honorable Mention'],student:['Giải Best Student Paper chính thức','Official Best Student Paper'],'student-honorable':['Best Student Paper Honorable Mention chính thức','Official Best Student Paper Honorable Mention'],pick:['EyeCode Pick · tuyển chọn biên tập','EyeCode Pick · editorial selection']};
export const topics={residual:['Học residual','Residual learning'],attention:['Attention & Transformers','Attention & Transformers'],counting:['Đếm đối tượng','Object counting'],lidar:['LiDAR & SLAM','LiDAR & SLAM'],...awardTopics};
const basePapers=[
 {id:'cvpr-2016-deep-residual-learning',conferenceId:'cvpr',year:2016,title:'Deep Residual Learning for Image Recognition',authors:['Kaiming He','Xiangyu Zhang','Shaoqing Ren','Jian Sun'],topic:'residual',summary:{vi:'Các kết nối tắt giúp mạng học phần thay đổi so với đầu vào, hỗ trợ tối ưu hóa mạng sâu.',en:'Shortcut connections let a network learn changes relative to its input, helping optimize deeper networks.'},links:{paper:'https://arxiv.org/abs/1512.03385'},metadataSource:'https://arxiv.org/abs/1512.03385',award:{type:'best',source:'https://www.thecvf.com/?page_id=413',evidence:'CVPR Best Paper Award · 2016'},verifiedOn,media:[],related:['ai-hoc-tu-du-lieu']},
 {id:'neurips-2017-attention-is-all-you-need',conferenceId:'neurips',year:2017,title:'Attention is All you Need',authors:['Ashish Vaswani','Noam Shazeer','Niki Parmar','Jakob Uszkoreit','Llion Jones','Aidan N Gomez','Łukasz Kaiser','Illia Polosukhin'],topic:'attention',summary:{vi:'Transformer dùng attention để mô hình hóa chuỗi mà không cần mạng hồi quy hoặc tích chập.',en:'The Transformer uses attention to model sequences without recurrent or convolutional networks.'},links:{paper:'https://papers.nips.cc/paper_files/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html'},metadataSource:'https://papers.nips.cc/paper/7181-attention-is-all-you-need',award:null,verifiedOn,media:[],related:['rag-la-gi']},
 {id:'rss-2014-loam',conferenceId:'rss',year:2014,title:'LOAM: Lidar Odometry and Mapping in Real-time',authors:['Ji Zhang','Sanjiv Singh'],topic:'lidar',summary:{vi:'Tách ước lượng chuyển động nhanh và lập bản đồ chậm hơn để kết hợp dữ liệu LiDAR trong thời gian thực.',en:'Separates fast motion estimation from slower mapping to process LiDAR measurements in real time.'},links:{paper:'https://www.roboticsproceedings.org/rss10/p07.html'},metadataSource:'https://www.roboticsproceedings.org/rss10/p07.html',award:null,verifiedOn,media:[],related:['robot-cam-nhan-va-hanh-dong']},
 {id:'cvpr-2023-indiscernible-object-counting',conferenceId:'cvpr',year:2023,title:'Indiscernible Object Counting in Underwater Scenes',authors:['Guolei Sun','Zhaochong An','Yun Liu','Ce Liu','Christos Sakaridis','Deng-Ping Fan','Luc Van Gool'],topic:'counting',summary:{vi:'Nghiên cứu đếm các đối tượng khó phân biệt trong cảnh dưới nước và giới thiệu bộ dữ liệu IOCfish5K.',en:'Studies counting hard-to-distinguish objects in underwater scenes and introduces the IOCfish5K dataset.'},links:{paper:'https://openaccess.thecvf.com/content/CVPR2023/papers/Sun_Indiscernible_Object_Counting_in_Underwater_Scenes_CVPR_2023_paper.pdf',code:'https://github.com/GuoleiSun/Indiscernible-Object-Counting'},metadataSource:'https://github.com/GuoleiSun/Indiscernible-Object-Counting',award:{type:'pick'},verifiedOn,media:[],related:['dem-doi-tuong']},
 ...verifiedAwardPapers,
 ...curatedPapers
];
// Optional per-paper additions (thumbnail, figures, resources, embeds) live in paper-enrichment.mjs.
// Merging never changes bibliographic or award metadata; links are combined key by key.
export const papers=basePapers.map(paper=>{const extra=paperEnrichment[paper.id];return extra?{...paper,...extra,links:{...paper.links,...extra.links}}:paper;});
export const conferenceUrl=(id,lang='vi')=>`conference-${id}${lang==='en'?'-en':''}.html`;
export const editionUrl=(id,lang='vi')=>`conference-${id}${lang==='en'?'-en':''}.html`;
export const paperUrl=(id,lang='vi')=>`paper-${id}${lang==='en'?'-en':''}.html`;
export const hubUrl=(type,lang='vi')=>({research:lang==='en'?'ai-research-en.html':'nghien-cuu-ai.html',papers:lang==='en'?'papers-en.html':'papers.html',deadlines:lang==='en'?'deadlines-en.html':'deadlines.html'})[type];
// An independently approved article can point at a shared paper with paperId.
export const paperReviewSections=['overview','problem','key-idea','methodology','results','limitations','takeaways','resources'];
