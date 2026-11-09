// Planning-only facts checked against official sources on 2026-11-08.
// Existing editions, secondary milestones, paper routes and CORE metadata stay in conferences.mjs.
import {conferences,fields} from './conferences.mjs';
import {matchesFields} from '../../js/deadline-time.js';
export const planningVerifiedOn='2026-11-08';
// Tracker-only additions: do not add empty directories to the paper library.
// Rankings retain their explicit source/version; HRI was upgraded in ICORE2026.
export const additionalConferences=[
 ['wacv','WACV','Winter Conference on Applications of Computer Vision','vision','https://wacv.thecvf.com/','A',763],
 ['bmvc','BMVC','British Machine Vision Conference','vision','https://www.bmva.org/bmvc','A',296],
 ['icpr','ICPR','International Conference on Pattern Recognition','vision','https://iapr.org/conferences/international-conference-on-pattern-recognition/','B',1169],
 ['accv','ACCV','Asian Conference on Computer Vision','vision','https://accv2026.org/','B',167],
 ['aaai','AAAI','AAAI Conference on Artificial Intelligence','learning','https://aaai.org/conference/aaai/','A*',1629],
 ['ijcai','IJCAI','International Joint Conference on Artificial Intelligence','learning','https://ijcai.org/','A*',1313],
 ['acmmm','ACM MM','ACM International Conference on Multimedia','vision','https://www.acmmm.org/','A*',37,'2026-11-09'],
 ['hri','HRI','ACM/IEEE International Conference on Human-Robot Interaction','robotics','https://humanrobotinteraction.org/2027/','A*',2310,'2026-11-09'],
 ['acl','ACL','Annual Meeting of the Association for Computational Linguistics','learning','https://2027.aclweb.org/','A*',196,'2026-11-09'],
 ['emnlp','EMNLP','Conference on Empirical Methods in Natural Language Processing','learning','https://2026.emnlp.org/','A*',448,'2026-11-09'],
 ['ismar','ISMAR','IEEE International Symposium on Mixed and Augmented Reality','vision','https://www.ieeeismar.net/2027/','A*',785,'2026-11-09']
].map(([id,acronym,name,field,url,core_rank,record,verifiedOn=planningVerifiedOn])=>({id,acronym,name,field,url,core_rank,
 core_rank_edition:'ICORE2026',core_rank_source:`https://portal.core.edu.au/conf-ranks/${record}/`,
 verifiedOn,deadlineOnly:true}));
export const deadlineFields={...fields,
 general:['AI tổng quát','General AI'],nlp:['Xử lý ngôn ngữ tự nhiên','NLP'],
 multimedia:['Đa phương tiện & XR','Multimedia & XR']};
// Tracker-only relevance, curated from official calls/areas (2026-11-09).
// Primary = specialization; related = substantial recurring research;
// adjacent = meaningful interdisciplinary scope. Omitted fields do not match.
// This single per-field map drives filtering and grouping, independently of CORE.
export const conferenceScopes=Object.fromEntries([
 ['cvpr',['vision'],['learning','multimedia'],['robotics','nlp'],'https://cvpr.thecvf.com/Conferences/2027/CallForPapers'],
 ['iccv',['vision'],['learning','multimedia'],['robotics','nlp'],'https://iccv.thecvf.com/Conferences/2025/CallForPapers'],
 ['eccv',['vision'],['learning','multimedia'],['robotics','nlp'],'https://eccv.ecva.net/Conferences/2026/CallForPapers'],
 ['neurips',['learning'],['vision','robotics','nlp'],[],'https://neurips.cc/Conferences/2026/CallForPapers'],
 ['iclr',['learning'],['vision','robotics','nlp'],['general','multimedia'],'https://iclr.cc/Conferences/2027/CallForPapers'],
 ['icml',['learning'],['vision','robotics','nlp'],[],'https://icml.cc/Conferences/2026/CallForPapers'],
 ['icra',['robotics'],['learning'],['vision','multimedia'],'https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra/icra-keywords/',['https://2026.ieee-icra.org/attend/plenary-sessions/','https://ieeexplore.ieee.org/document/8794287/']],
 ['iros',['robotics'],['learning'],['vision','multimedia'],'https://www.ieee-ras.org/conferences-workshops/financially-co-sponsored/iros/keywords-4/',['https://2026.ieee-iros.org/program/paper_index/']],
 ['corl',['robotics'],['learning'],['vision','nlp'],'https://www.corl.org/contributions/call-for-papers'],
 ['rss',['robotics'],['learning'],['vision'],'https://roboticsconference.org/information/cfp/',['https://roboticsconference.org/2026/program/papers/']],
 ['wacv',['vision'],['learning','multimedia'],['robotics','nlp'],'https://wacv.thecvf.com/Conferences/2027/CallForPapers'],
 ['bmvc',['vision'],['learning','multimedia'],['robotics','nlp'],'https://bmvc2026.bmva.org/calls/call-for-papers/'],
 ['icpr',['vision'],['learning'],['nlp'],'https://icpr2026.org/'],
 ['accv',['vision'],['learning','multimedia'],['robotics','nlp'],'https://accv2026.org/'],
 ['aaai',['general'],['vision','learning','robotics','nlp'],['multimedia'],'https://aaai.org/conference/aaai/aaai-27/areas-and-topics/'],
 ['ijcai',['general'],['vision','learning','robotics','nlp'],[],'https://2027.ijcai.org/ijcai-2027-call-for-papers-main-track/'],
 ['acmmm',['multimedia'],['vision','learning','nlp'],['robotics'],'https://2026.acmmm.org/site/cfp-guidelines.html'],
 ['hri',['robotics'],[],['vision','learning','nlp'],'https://humanrobotinteraction.org/2027/full-papers/',['https://humanrobotinteraction.org/2026/schedule/']],
 ['acl',['nlp'],['learning'],['robotics','multimedia'],'https://2027.aclweb.org/calls/main/'],
 ['emnlp',['nlp'],['learning'],['robotics','multimedia'],'https://2026.emnlp.org/calls/main_conference_papers/'],
 ['ismar',['multimedia'],[],['vision','learning','nlp'],'https://www.ieeeismar.net/2026/call-for-papers/']
].map(([id,primary,related,adjacent,source,additionalSources=[]])=>{
 const relevance=Object.fromEntries([['primary',primary],['related',related],['adjacent',adjacent]].flatMap(([level,fields])=>fields.map(field=>[field,level])));
 return [id,{relevance,fields:Object.keys(relevance),source,...(additionalSources.length?{additionalSources}:{})}];
}));
// Stable representative topics and published proceedings only. URLs never derive
// from the selected future edition. Topic names remain academic English in VI/EN.
export const conferenceDetails=Object.fromEntries([
 ['cvpr',['3D Vision','Recognition & Segmentation','Video Understanding','Visual Representation Learning','Vision & Language','Generative Vision','Embodied Vision'],'https://openaccess.thecvf.com/CVPR2026'],
 ['iccv',['Multi-view Geometry','Computational Imaging','Visual Recognition','Scene Understanding','Video Analysis','Multimodal Learning','Robot Vision'],'https://openaccess.thecvf.com/ICCV2025'],
 ['eccv',['3D Vision','Recognition & Segmentation','Visual Representation Learning','Vision & Graphics','Vision & Language','Video Understanding','Embodied Vision'],'https://www.ecva.net/papers.php'],
 ['neurips',['Deep Learning','Generative Models','Reinforcement Learning','Optimization','Learning Theory','Probabilistic Methods','Language & Multimodal Models'],'https://papers.nips.cc/'],
 ['iclr',['Representation Learning','Deep Learning','Generative Models','Reinforcement Learning','Causal Reasoning','Optimization','Learning Theory'],'https://proceedings.iclr.cc/'],
 ['icml',['Statistical Learning','Deep Learning','Reinforcement Learning','Optimization','Probabilistic Methods','Trustworthy ML','ML Systems'],'https://proceedings.mlr.press/v306/'],
 ['icra',['Robot Perception','SLAM & Navigation','Robot Manipulation','Motion Planning','Robot Control','Robot Learning','Human–Robot Interaction'],'https://ieeexplore.ieee.org/xpl/conhome/1000639/all-proceedings'],
 ['iros',['Robot Perception','SLAM & Navigation','Robot Manipulation','Robot Learning','Human–Robot Interaction','Embodied AI','Multi-Robot Systems'],'https://ieeexplore.ieee.org/xpl/conhome/1000393/all-proceedings'],
 ['corl',['Robot Learning','Imitation Learning','Reinforcement Learning','Robotic Perception','Robot Manipulation','Motion Planning','Human–Robot Interaction'],'https://proceedings.mlr.press/v305/'],
 ['rss',['Robot Perception','SLAM & Navigation','Robot Manipulation','Motion Planning','Robot Learning','Robot Control','Multi-Robot Systems'],'https://www.roboticsproceedings.org/'],
 ['wacv',['Applied Computer Vision','Visual Recognition','3D Vision','Image & Video Analysis','Multimodal Learning','Computational Imaging','Virtual & Augmented Reality'],'https://openaccess.thecvf.com/WACV2026'],
 ['bmvc',['3D Vision','Image & Video Understanding','Recognition & Segmentation','Visual Learning','Multimodal Learning','Robot Vision'],'https://bmvc2025.bmva.org/proceedings/conference-proceedings/'],
 ['icpr',['Pattern Recognition','Computer Vision','Machine Learning','Image & Signal Processing','Document Analysis','Biometrics','Medical Image Analysis'],'https://link.springer.com/conference/icpr'],
 ['accv',['3D Vision','Image & Video Understanding','Recognition & Segmentation','Vision & Language','Computational Photography','Generative Vision','Robot Vision'],'https://link.springer.com/conference/accv'],
 ['aaai',['Machine Learning','Natural Language Processing','Knowledge Representation','Planning & Search','Computer Vision','Multiagent Systems','Intelligent Robotics'],'https://aaai.org/aaai-publications/aaai-conference-proceedings/'],
 ['ijcai',['Machine Learning','Natural Language Processing','Knowledge Representation','Automated Reasoning','Planning & Search','Multiagent Systems','Computer Vision','Robotics'],'https://ijcai.org/all_proceedings/'],
 ['acmmm',['Multimodal Learning','Multimedia & Language','Embodied & Immersive Multimedia','Generative Models','Multimedia Retrieval','Multimedia Reasoning','Responsible Multimedia'],'https://www.acmmm.org/index_pasteditions.html'],
 ['hri',['Human–Robot Interaction','Robot Learning','Social Robotics','Human–Robot Collaboration','Multimodal Interaction','Robot Perception','Natural Language Interaction'],'https://dl.acm.org/doi/proceedings/10.1145/3757279'],
 ['acl',['Language Modeling','Machine Translation','Dialogue Systems','Machine Learning for NLP','Multimodal Language Grounding','Speech Processing','NLP & Symbolic Reasoning'],'https://aclanthology.org/venues/acl/'],
 ['emnlp',['Empirical NLP','Language Modeling','Information Extraction','Machine Translation','Dialogue Systems','Multimodal Language Grounding','NLP Evaluation'],'https://aclanthology.org/venues/emnlp/'],
 ['ismar',['Mixed & Augmented Reality','Tracking & Registration','Computer Vision','Machine Learning for XR','Conversational Interfaces','Immersive Visualization','Telepresence'],'https://www.ismar.net/past_symposiums/']
].map(([id,mainTopics,proceedingsUrl])=>[id,{mainTopics,proceedingsUrl}]));
// Resource evidence is separate from deadline facts. A platform fallback says
// where the series has submitted, never that an upcoming edition is open.
// Edition-specific kits/portals must not be inherited by later editions.
export const conferenceResources=Object.fromEntries([
 ['cvpr','https://openreview.net/','https://cvpr.thecvf.com/Conferences/2027/AuthorGuidelines'],
 ['iccv','https://openreview.net/','https://iccv.thecvf.com/Conferences/2025/AuthorGuidelines'],
 ['eccv','https://openreview.net/','https://eccv.ecva.net/Conferences/2026/SubmissionPolicies'],
 ['neurips','https://openreview.net/','https://neurips.cc/Conferences/2026/CallForPapers'],
 ['iclr','https://openreview.net/','https://iclr.cc/Conferences/2027/AuthorGuidelines'],
 ['icml','https://openreview.net/','https://icml.cc/Conferences/2026/CallForPapers'],
 ['icra','https://ras.papercept.net/','https://2027.ieee-icra.org/contribute/call-for-icra-2027-papers-now-accepting-submissions/'],
 ['iros','https://ras.papercept.net/','https://2026.ieee-iros.org/call-for-papers/'],
 ['corl','https://openreview.net/','https://www.corl.org/contributions/instruction-for-authors'],
 ['rss','https://openreview.net/','https://roboticsconference.org/information/cfp/'],
 ['wacv','https://openreview.net/','https://wacv.thecvf.com/Conferences/2027/AuthorGuides'],
 ['bmvc','https://openreview.net/','https://bmvc2026.bmva.org/authors/submit-your-paper/'],
 ['icpr','https://cmt3.research.microsoft.com/','https://icpr2026.org/2025/11/10/CMT-open.html'],
 ['accv','https://openreview.net/','https://accv2026.org/submissions/author-guidelines/'],
 ['aaai','https://openreview.net/','https://aaai.org/conference/aaai/aaai-27/submission-instructions/'],
 ['ijcai','https://chairingtool.com/','https://2026.ijcai.org/ijcai-ecai-2026-call-for-papers-main-track/'],
 ['acmmm','https://openreview.net/','https://2026.acmmm.org/site/cfp-guidelines.html'],
 ['hri','https://new.precisionconference.com/submissions','https://humanrobotinteraction.org/2027/full-papers/'],
 ['acl','https://openreview.net/','https://2027.aclweb.org/calls/main/'],
 ['emnlp','https://openreview.net/','https://2026.emnlp.org/calls/main_conference_papers/'],
 ['ismar','https://new.precisionconference.com/','https://www.ieeeismar.net/2026/call-for-papers/']
].map(([id,url,source])=>[id,{submissionPortal:{url,source},editions:{}}]));
conferenceResources.cvpr.editions[2027]={
 // The author page contains the current kit; its media-host download timed out
 // during verification, so use the reliable official guidelines destination.
 template:{url:'https://cvpr.thecvf.com/Conferences/2027/AuthorGuidelines',source:conferenceResources.cvpr.submissionPortal.source},
 submission:{url:'https://openreview.net/group?id=thecvf.com/CVPR/2027/Conference',source:conferenceResources.cvpr.submissionPortal.source}
};
conferenceResources.rss.editions[2027]={
 template:{url:'https://roboticsconference.org/docs/paper-template-latex.tar.gz',source:conferenceResources.rss.submissionPortal.source},
 submission:{url:'https://openreview.net/group?id=roboticsfoundation.org/RSS/2027/Conference',source:conferenceResources.rss.submissionPortal.source}
};
// The IJCAI 2027 submission process explicitly says "Submission site: TBA".
// Its official author kit is available; only the evidenced platform landing is used.
conferenceResources.ijcai.editions[2027]={
 template:{url:'https://ijcai.org/sites/default/files/Guidelines/FormattingGuidelines-IJCAI-27.zip',source:'https://www.ijcai.org/authors_kit'}
};
export function conferenceResourceLinks(id,year,resources=conferenceResources){
 const series=resources[id],edition=series?.editions?.[year];
 const submission=edition?.submission||series?.submissionPortal;
 return {templateUrl:edition?.template?.url||null,submissionUrl:submission?.url||null,
  submissionLabel:submission?(edition?.submission?'Submit Paper':'Submission Portal'):null};
}
export const deadlineConferences=[...conferences,...additionalConferences].map(c=>({...c,fields:conferenceScopes[c.id].fields,relevance:conferenceScopes[c.id].relevance,...conferenceDetails[c.id]}));
export const rankingGroups={a:'A*/A',b:'B*/B'};
// Preserve CoRL's existing EyeCode A* display convention without changing its
// official Unranked metadata. No CORE B* tier is inferred or assigned.
export const deadlineRankGroup=c=>c.id==='corl'||['A*','A'].includes(c.core_rank)?'a':c.core_rank==='B'?'b':null;
export const matchesRanking=(conference,selected)=>selected.includes(deadlineRankGroup(conference));
// OR within each group; AND between groups. Empty selections match nothing.
// Both the static list and browser use the same canonical conference view model.
export const matchesDeadlineFilters=(conference,selectedFields,selectedRanks)=>matchesFields(conference,selectedFields)&&matchesRanking(conference,selectedRanks);
export const seriesSchedule={
 cvpr:{interval:1,primaryType:'abstract'},iccv:{interval:2,primaryType:'abstract'},eccv:{interval:2,primaryType:'abstract'},
 neurips:{interval:1,primaryType:'abstract'},iclr:{interval:1,primaryType:'abstract'},icml:{interval:1,primaryType:'abstract'},
 icra:{interval:1,primaryType:'full'},iros:{interval:1,primaryType:'full'},corl:{interval:1,primaryType:'full'},rss:{interval:1,primaryType:'extendedAbstract'},
 wacv:{interval:1,primaryType:'abstract'},bmvc:{interval:1,primaryType:'abstract'},
 icpr:{interval:2,primaryType:'full'},accv:{interval:2,primaryType:'abstract'},
 aaai:{interval:1,primaryType:'abstract'},ijcai:{interval:1,primaryType:'abstract'},
 acmmm:{interval:1,primaryType:'abstract'},hri:{interval:1,primaryType:'abstract'},
 acl:{interval:1,primaryType:'full'},emnlp:{interval:1,primaryType:'full'},ismar:{interval:1,primaryType:'abstract'}
};
// Historical primary deadlines only. Exact clocks are retained only when verified.
// Missing clocks remain null; the planner applies calculation-only fallbacks.
// Different primary types are not pooled.
export const historicalPrimaries=[
 ['cvpr',2025,'abstract','2024-11-07','https://cvpr.thecvf.com/Conferences/2025/CallForPapers'],
 ['iccv',2023,'full','2023-03-08','https://iccv2023.thecvf.com/submission.timeline-36800-2-12-8.php'],
 ['iccv',2025,'abstract','2025-03-03','https://iccv.thecvf.com/Conferences/2025/Dates','2025-03-03T23:59:00-10:00','HST · UTC−10:00'],
 ['eccv',2024,'abstract','2024-02-29','https://eccv.ecva.net/Conferences/2024/Dates'],
 // Official Dates page countdown: 2026/05/05 11:59:59 UTC.
 ['neurips',2026,'abstract','2026-05-04','https://neurips.cc/Conferences/2026/Dates','2026-05-04T23:59:59-12:00','AoE · UTC−12:00'],
 ['neurips',2025,'abstract','2025-05-11','https://neurips.cc/Conferences/2025/Dates'],
 ['neurips',2024,'abstract','2024-05-15','https://neurips.cc/Conferences/2024/CallForPapers'],
 // Official Dates page countdown: 2026/09/19 11:59:59 UTC.
 ['iclr',2027,'abstract','2026-09-18','https://iclr.cc/Conferences/2027/Dates','2026-09-18T23:59:59-12:00','AoE · UTC−12:00'],
 ['iclr',2026,'abstract','2025-09-19','https://iclr.cc/Conferences/2026/Dates'],
 ['iclr',2025,'abstract','2024-09-27','https://iclr.cc/Conferences/2025/Dates'],
 ['icml',2026,'abstract','2026-01-23','https://icml.cc/Conferences/2026/Dates','2026-01-23T23:59:59-12:00','AoE · UTC−12:00'],
 ['icml',2025,'abstract','2025-01-23','https://icml.cc/Conferences/2025/Dates'],
 ['icra',2026,'full','2025-09-15','https://2026.ieee-icra.org/contribute/'],
 ['icra',2025,'full','2024-09-15','https://www.ieee-ras.org/images/conferences/ICRA/2025/ICRA_2025_Call_for_Papers_Announcement.pdf'],
 ['iros',2025,'full','2025-03-02','https://2025.ieee-iros.org/UsefulInfo'],
 ['corl',2025,'full','2025-04-30','https://2025.corl.org/contributions'],
 ['corl',2024,'full','2024-06-06','https://2024.corl.org/home']
].map(([conferenceId,year,type,date,source,at=null,timezone=null])=>({conferenceId,year,type,date,source,at,timezone,verifiedOn:planningVerifiedOn}));
export const editionVenues={
 'cvpr-2027':{city:'Seattle',country:['Hoa Kỳ','United States'],source:'https://cvpr.thecvf.com/Conferences/2027',verifiedOn:planningVerifiedOn},
 'iccv-2027':{city:'Hong Kong',country:['Trung Quốc','China'],building:'Hong Kong Convention and Expo Center',source:'https://iccv.thecvf.com/Conferences/2027',verifiedOn:planningVerifiedOn},
 'icml-2027':{city:'Rio de Janeiro',country:['Brazil','Brazil'],building:'Riocentro',source:'https://icml.cc/Conferences/2027',verifiedOn:planningVerifiedOn},
 'rss-2027':{city:'Athens',country:['Hy Lạp','Greece'],building:'Megaron Athens International Conference Centre (MAICC)',source:'https://roboticsconference.org/attending/travel/',verifiedOn:planningVerifiedOn}
};
// An additional officially announced edition, used by this tracker without creating
// guessed local edition-page URLs or changing the paper library's edition registry.
const irosSource='https://www.ieee-ras.org/event/2027-ieee-rsj-international-conference-on-intelligent-robots-and-systems-iros-70525/';
const aoe='AoE · UTC−12:00';
const instant=(at,timezone=aoe,label)=>({at,timezone,...(label?{label}:{})});
const icpr2028Source='https://iapr.org/docs/newsletters/2025-Vol-47-No-1.pdf';
export const planningEditions=[{
 id:'iros-2027',conferenceId:'iros',year:2027,source:irosSource,verifiedOn:planningVerifiedOn,
 deadlines:{full:{date:'2027-03-01',at:null,timezone:null}},
 conferenceDates:{start:'2027-09-27',end:'2027-10-01',source:irosSource},
 venue:{city:'Florence',country:['Ý','Italy'],building:'Fortezza da Basso',source:irosSource,verifiedOn:planningVerifiedOn}
},
 // WACV's final independent new-paper round. Its mandatory enrollment is the
 // primary, not the later paper deadline or a revision-only milestone.
 {id:'wacv-2027',conferenceId:'wacv',year:2027,verifiedOn:planningVerifiedOn,
  source:'https://wacv.thecvf.com/Conferences/2027/AuthorGuides',abstractRequired:true,
  deadlines:{abstract:{date:'2026-08-21',at:null,timezone:aoe,label:['Đăng ký bài · Vòng 2','Paper enrollment · Round 2']},full:{date:'2026-08-28',at:null,timezone:aoe}},
  conferenceDates:{start:'2027-01-04',end:'2027-01-08',source:'https://wacv.thecvf.com/Conferences/2027'},
  venue:{city:'Buena Vista, Florida',country:['Hoa Kỳ','United States'],building:'Disney Springs',source:'https://wacv.thecvf.com/Conferences/2027',verifiedOn:planningVerifiedOn}},
 {id:'bmvc-2026',conferenceId:'bmvc',year:2026,verifiedOn:planningVerifiedOn,
  source:'https://bmvc2026.bmva.org/dates/',abstractRequired:true,
  deadlines:{abstract:instant('2026-05-22T23:59:00-12:00'),full:instant('2026-05-29T23:59:00-12:00')},
  conferenceDates:{start:'2026-11-23',end:'2026-11-26',source:'https://bmvc2026.bmva.org/'},
  venue:{city:'Lancaster',country:['Vương quốc Anh','United Kingdom'],building:'Lancaster Town Hall',source:'https://bmvc2026.bmva.org/',verifiedOn:planningVerifiedOn}},
 {id:'icpr-2026',conferenceId:'icpr',year:2026,verifiedOn:planningVerifiedOn,
  source:'https://icpr2026.org/dates.html',deadlines:{full:{date:'2026-01-10',at:null,timezone:aoe}},
  conferenceDates:{start:'2026-08-17',end:'2026-08-22',source:'https://icpr2026.org/'},
  venue:{city:'Lyon',country:['Pháp','France'],source:'https://icpr2026.org/',verifiedOn:planningVerifiedOn}},
 {id:'icpr-2028',conferenceId:'icpr',year:2028,verifiedOn:planningVerifiedOn,
  source:icpr2028Source,deadlines:{},
  conferenceDates:{start:'2028-08-07',end:'2028-08-11',source:icpr2028Source},
  venue:{city:'Sydney',country:['Úc','Australia'],source:icpr2028Source,verifiedOn:planningVerifiedOn}},
 {id:'accv-2026',conferenceId:'accv',year:2026,verifiedOn:planningVerifiedOn,
  source:'https://accv2026.org/submissions/author-guidelines/',abstractRequired:true,
  deadlines:{abstract:instant('2026-07-03T23:59:00Z','GMT · UTC+00:00'),full:instant('2026-07-05T23:59:00Z','GMT · UTC+00:00')},
  conferenceDates:{start:'2026-12-14',end:'2026-12-18',source:'https://accv2026.org/'},
  venue:{city:'Osaka',country:['Nhật Bản','Japan'],source:'https://accv2026.org/',verifiedOn:planningVerifiedOn}},
 {id:'aaai-2027',conferenceId:'aaai',year:2027,verifiedOn:planningVerifiedOn,
  source:'https://aaai.org/conference/aaai/aaai-27/submission-instructions/',abstractRequired:true,
  deadlines:{abstract:instant('2026-07-21T23:59:00-12:00'),full:instant('2026-07-28T23:59:00-12:00')},
  conferenceDates:{start:'2027-02-16',end:'2027-02-23',source:'https://aaai.org/conference/aaai/aaai-27/'},
  venue:{city:'Montréal',country:['Canada','Canada'],source:'https://aaai.org/conference/aaai/aaai-27/',verifiedOn:planningVerifiedOn}},
 {id:'ijcai-2027',conferenceId:'ijcai',year:2027,verifiedOn:planningVerifiedOn,
  source:'https://2027.ijcai.org/ijcai-2027-call-for-papers-main-track/',abstractRequired:true,
  deadlines:{abstract:instant('2027-01-04T23:59:00-12:00'),full:instant('2027-01-11T23:59:00-12:00')},
  conferenceDates:{start:'2027-08-07',end:'2027-08-13',source:'https://2027.ijcai.org/'},
  venue:{city:'Kyoto',country:['Nhật Bản','Japan'],source:'https://2027.ijcai.org/',verifiedOn:planningVerifiedOn}},
 // For ARR conferences, the initial full-paper review deadline is primary, not
 // the later venue commitment or author-reviewer registration milestone.
 {id:'acl-2027',conferenceId:'acl',year:2027,verifiedOn:'2026-11-09',
  source:'https://2027.aclweb.org/calls/main/',deadlines:{full:instant('2027-01-04T23:59:00-12:00')},
  conferenceDates:{start:'2027-08-17',end:'2027-08-22',source:'https://www.aclweb.org/portal/content/acl-2027-first-call-papers'},
  venue:{city:'Kyoto',country:['Nhật Bản','Japan'],source:'https://www.aclweb.org/portal/content/acl-2027-first-call-papers',verifiedOn:'2026-11-09'}},
 {id:'emnlp-2026',conferenceId:'emnlp',year:2026,verifiedOn:'2026-11-09',
  source:'https://2026.emnlp.org/calls/main_conference_papers/',deadlines:{full:instant('2026-05-25T23:59:00-12:00')}},
 {id:'acmmm-2026',conferenceId:'acmmm',year:2026,verifiedOn:'2026-11-09',abstractRequired:true,
  source:'https://2026.acmmm.org/site/cfp-guidelines.html',
  deadlines:{abstract:instant('2026-03-25T23:59:00-12:00'),full:instant('2026-04-01T23:59:00-12:00')}},
 {id:'acmmm-2027',conferenceId:'acmmm',year:2027,verifiedOn:'2026-11-09',
  source:'https://www.acmmm.org/',deadlines:{},
  venue:{city:'Hong Kong',country:['Trung Quốc','China'],source:'https://www.acmmm.org/',verifiedOn:'2026-11-09'}},
 {id:'hri-2027',conferenceId:'hri',year:2027,verifiedOn:'2026-11-09',abstractRequired:true,
  source:'https://humanrobotinteraction.org/2027/full-papers/',
  deadlines:{abstract:instant('2026-09-11T23:59:00-12:00'),full:instant('2026-09-18T23:59:00-12:00')},
  conferenceDates:{start:'2027-03-08',end:'2027-03-12',source:'https://humanrobotinteraction.org/2027/full-papers/'},
  venue:{city:'Santa Clara, California',country:['Hoa Kỳ','United States'],source:'https://humanrobotinteraction.org/2027/full-papers/',verifiedOn:'2026-11-09'}},
 {id:'ismar-2026',conferenceId:'ismar',year:2026,verifiedOn:'2026-11-09',abstractRequired:true,
  source:'https://www.ieeeismar.net/2026/call-for-papers/',
  deadlines:{abstract:instant('2026-03-09T23:59:00-12:00'),full:instant('2026-03-16T23:59:00-12:00')}},
 {id:'ismar-2027',conferenceId:'ismar',year:2027,verifiedOn:'2026-11-09',
  source:'https://www.ieeeismar.net/2027/',deadlines:{},
  venue:{city:'Kobe',country:['Nhật Bản','Japan'],source:'https://www.ieeeismar.net/2027/',verifiedOn:'2026-11-09'}}
];
