import {renderLearningGuide} from './atlas-guide.js';
import {groups,modelSections,seriesSections,relationships,text,pair,atlasUrl,modelNeighbors,resolveAtlas} from './atlas-data.js';
export const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lang=()=>globalThis.document?.documentElement.lang==='en'?'en':'vi';
const bi=(value,en)=>{
 const p=en===undefined?(typeof value==='string'?pair(value,value):value):pair(value,en);
 return `<span data-vi="${escape(text(p,'vi'))}" data-en="${escape(text(p,'en'))}">${escape(text(p,lang()))}</span>`;
};
const short=(v,size=160)=> typeof v==='string'?(v.length>size?v.slice(0,size).replace(/\s+\S*$/,'')+'…':v):pair(short(text(v,'vi'),size),short(text(v,'en'),size));
const paragraphs=value=>{
 const vi=text(value,'vi').split('\n\n'),en=text(value,'en').split('\n\n');
 return Array.from({length:Math.max(vi.length,en.length)},(_,i)=>(vi[i]||en[i])?`<p>${bi(pair(vi[i]||'',en[i]||''))}</p>`:'').join('');
};
const urlSafe=url=>{try{const u=new URL(url);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}};
const reference=r=>{const url=urlSafe(r.url);return url?`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(r.title)}</a>`:escape(r.title);};
const references=rows=>`<ol class="v2-references atlas-references">${[...new Map(rows.filter(Boolean).map(r=>[r.url,r])).values()].map(r=>`<li>${reference(r)}</li>`).join('')}</ol>`;
const missing=()=>`<p class="atlas-muted">${bi('Chưa có nội dung trong bản mẫu này.','Not yet populated in this prototype.')}</p>`;
const section=(id,title,body)=>`<section class="v2-article-section" id="${id}"><h2>${bi(title)}</h2>${body||missing()}</section>`;
const label=(rows,id)=>{const r=rows.find(r=>r[0]===id);return pair(r[1],r[2]);};
function anchor(data,params,title,attrs=''){
 const route=l=>atlasUrl({...params,source:data.source,lang:l});
 return `<a href="${escape(route(lang()))}" data-href-vi="${escape(route('vi'))}" data-href-en="${escape(route('en'))}" ${attrs}>${bi(title)}</a>`;
}
function modelLink(data,id){
 const m=data.models.find(m=>m.id===id);if(!m)return bi('Mô hình chưa tải','Model not loaded');
 const c=data.chains.find(c=>c.id===m.chain_id),s=data.series.find(s=>s.id===c?.series_id);
 return s?anchor(data,{series:s.id,chain:c.id,model:m.id},m.title):escape(text(m.title,lang()));
}
function edge(data,c){
 const endpoint=side=>{
  if(c[side+'_model_id'])return modelLink(data,c[side+'_model_id']);
  const principle=data.principles.find(p=>p.id===c[side+'_principle_id']);
  if(principle)return bi(principle.title);
  const paper=data.papers.find(p=>p.id===c[side+'_paper_id']);return paper?reference({title:text(paper.title,lang()),url:paper.url}):bi('Nguồn liên quan','Related source');
 };
 const status=c.verification_status==='verified'?pair('Có nguồn','Sourced'):c.verification_status==='disputed'?pair('Còn tranh luận','Disputed'):pair('Đề xuất','Proposed');
 return `<li class="atlas-edge">${endpoint('source')} <span class="atlas-edge-type">${bi(relationships[c.relationship_type]||c.relationship_type)}</span> ${endpoint('target')} <small class="atlas-certainty">${bi(status)}</small>${paragraphs(c.rationale)}${c.evidence?.length?`<div class="atlas-evidence">${c.evidence.map(reference).join(' · ')}</div>`:''}</li>`;
}
const edges=(data,rows)=>rows.length?`<ul class="atlas-edges">${rows.map(c=>edge(data,c)).join('')}</ul>`:`<p class="atlas-muted">${bi('Chưa có quan hệ được ghi nhận trong mục này.','No relationships recorded in this view.')}</p>`;
function modelNotes(m){
 const extra=m.metadata?.atlas_sections;
 return {
 insight:m.summary,origins:'',gap:'',mechanism:m.architecture_notes,training:pair(
  [text(m.data_preparation_notes,'vi'),text(m.training_notes,'vi')].filter(Boolean).join('\n\n'),
  [text(m.data_preparation_notes,'en'),text(m.training_notes,'en')].filter(Boolean).join('\n\n')),
 results:m.experiment_notes,next:'',...(extra&&typeof extra==='object'&&!Array.isArray(extra)?extra:{}),...m.sections
 };
}
export function evolutionTimeline(data,models){
 const chronological=[...models].sort((a,b)=>(a.year??Infinity)-(b.year??Infinity)||text(a.title,'en').localeCompare(text(b.title,'en')));
 return `<p class="atlas-muted">${bi('Mốc năm là năm bản thảo đầu tiên trong dữ liệu mẫu. Thứ tự thời gian không ngụ ý kế thừa; chỉ các liên kết có nhãn bên dưới mô tả quan hệ.','Sample years indicate first preprints or original publications. Chronology does not imply inheritance; only labeled links below describe relationships.')}</p><ol class="atlas-timeline">${chronological.map(m=>{
  const n=modelNeighbors(data,m.id),s=modelNotes(m);
  return `<li class="atlas-timeline-node"><header><span class="atlas-year">${escape(m.year??'—')}</span><h3>${modelLink(data,m.id)}</h3></header>${paragraphs(short(s.insight,200))}<details><summary>${bi('Khoảng trống, nguồn gốc & các nhánh','Gap, origins & branches')}</summary><dl><dt>${bi('Giới hạn trước đó','Previous limitation')}</dt><dd>${bi(short(s.gap)||pair('Chưa bổ sung','Not yet populated'))}</dd><dt>${bi('Nguồn gốc khoa học','Scientific origin')}</dt><dd>${bi(short(s.origins)||pair('Chưa bổ sung','Not yet populated'))}</dd></dl><h4>${bi('Tiền thân','Predecessors')}</h4>${edges(data,n.predecessors)}<h4>${bi('Các nhánh tiếp theo','Successor branches')}</h4>${edges(data,n.successors)}<h4>${bi('Liên hệ ngoài nhánh','Related domains & principles')}</h4>${edges(data,n.crossDomain)}</details></li>`;
 }).join('')}</ol>`;
}
function sidebar(data,view){
 const params={series:view.series.id};
 const chainLinks=view.chains.map(c=>`<li>${anchor(data,{...params,chain:c.id},c.title,view.chain?.id===c.id&&!view.model?'aria-current="page"':'')}</li>`).join('');
 const related=new Set();for(const c of data.connections){if(view.models.some(m=>m.id===c.source_model_id))related.add(c.target_model_id);if(view.models.some(m=>m.id===c.target_model_id))related.add(c.source_model_id);}
 const other=[...related].map(id=>data.models.find(m=>m.id===id)).filter(m=>m&&!view.models.some(v=>v.id===m.id));
 return `<aside class="v2-article-sidebar v2-reading-panel" id="v2-topic-panel" aria-labelledby="v2-topic-heading"><div class="v2-panel-heading"><h2 id="v2-topic-heading">${bi('Chuỗi nghiên cứu','Research Chains')}</h2><button type="button" class="v2-panel-close" data-reading-close>${bi('Đóng','Close')}</button></div><nav>${anchor(data,{},pair('Tất cả 16 series','All 16 series'),'class="v2-sidebar-category"')}<ol>${chainLinks}</ol><h3>${bi('Mô hình tiêu biểu','Landmark Models')}</h3><ol>${view.models.map(m=>`<li>${modelLink(data,m.id).replace('<a ','<a '+(m.id===view.model?.id?'aria-current="page" ':''))}</li>`).join('')}</ol>${other.length?`<h3>${bi('Chủ đề liên quan','Related topics')}</h3><ol>${other.map(m=>`<li>${modelLink(data,m.id)}</li>`).join('')}</ol>`:''}</nav></aside>`;
}
function toc(sections){return `<aside class="v2-toc v2-reading-panel" id="v2-toc-panel" aria-labelledby="v2-toc-heading"><div class="v2-panel-heading"><h2 id="v2-toc-heading">${bi('Trong bài này','On this page')}</h2><button type="button" class="v2-panel-close" data-reading-close>${bi('Đóng','Close')}</button></div><nav><ol data-reading-outline>${sections.map(([id,vi,en])=>`<li data-heading-level="2"><a href="#${id}">${bi(vi,en)}</a></li>`).join('')}</ol></nav></aside>`;}
const toolbar=()=>`<div class="v2-article-tools v2-container" aria-label="Atlas navigation"><button type="button" data-reading-toggle="topic" aria-controls="v2-topic-panel" aria-expanded="true">${bi('Chuỗi & Mô hình','Chains & Models')} <span aria-hidden="true">⌄</span></button><button type="button" data-reading-toggle="toc" aria-controls="v2-toc-panel" aria-expanded="true">${bi('Trong bài này','On this page')} <span aria-hidden="true">⌄</span></button></div><div class="v2-reading-backdrop" data-reading-backdrop hidden></div>`;
function overview(data){
 const present=[...new Set(data.series.map(s=>Number.isInteger(s.group)?s.group:4))];
 return `<section class="v2-container atlas-overview"><header class="atlas-heading"><h1>AI Research Atlas</h1><p class="v2-lead">${bi('Theo dấu nguyên lý, mô hình và các nhánh nghiên cứu.','Trace principles, models, and research branches.')}</p></header>${present.map(g=>`<section class="atlas-group"><h2>${bi(groups[g]||pair('Series trong cơ sở dữ liệu','Database series'))}</h2><div class="atlas-series-grid">${data.series.filter(s=>(Number.isInteger(s.group)?s.group:4)===g).map(s=>{
 const count=data.chains.filter(c=>c.series_id===s.id).length;
 return `<article class="atlas-series-card"><h3>${anchor(data,{series:s.id},s.title)}</h3>${paragraphs(s.description)}${Array.isArray(s.branches)?`<ul class="atlas-tags" aria-label="Research branches">${s.branches.map(b=>`<li>${bi(b)}</li>`).join('')}</ul>`:''}<small class="atlas-muted">${count?bi(`${count} chuỗi nghiên cứu`,`${count} research chain${count>1?'s':''}`):bi('Chưa hoàn thiện · Khung nội dung','Incomplete · Content outline')}</small></article>`;
 }).join('')}</div></section>`).join('')}${data.series.length?'':missing()}</section>`;
}
export function renderAtlas(data,params){
 const guide=renderLearningGuide(data,params);if(guide!==null)return guide;
 const view=resolveAtlas(data,params);
 if(!view)return `<section class="v2-container v2-section"><h1>${bi('Không tìm thấy mục Atlas','Atlas item not found')}</h1>${anchor(data,{},pair('Trở lại Atlas','Back to Atlas'))}</section>`;
 if(view.kind==='overview')return overview(data);
 const current=view.model||view.chain||view.series;
 const allEdges=data.connections.filter(c=>view.models.some(m=>m.id===c.source_model_id||m.id===c.target_model_id));
 const modelIds=new Set(view.models.map(m=>m.id));
 const papers=data.papers.filter(p=>modelIds.has(p.model_id)||view.chains.some(c=>c.id===p.chain_id)&&(!view.chain||p.chain_id===view.chain.id));
 const principleIds=new Set(allEdges.flatMap(c=>[c.source_principle_id,c.target_principle_id]));
 const principles=data.principles.filter(p=>principleIds.has(p.id));
 const heading=`<nav class="v2-breadcrumb" aria-label="Breadcrumb"><a href="explore.html">${bi('Kiến thức AI','AI Knowledge')}</a><span>›</span>${anchor(data,{},'Atlas')}<span>›</span>${anchor(data,{series:view.series.id},view.series.title)}</nav><header class="v2-article-heading"><h1>${bi(current.title)}</h1>${paragraphs(view.model?view.model.summary:current.description)}${view.models.length?'':`<p class="atlas-muted">${bi('Chưa hoàn thiện · Khung nội dung','Incomplete · Content outline')}</p>`}</header>`;
 let body;
 if(view.model){
  const m=view.model,s=modelNotes(m),n=modelNeighbors(data,m.id);
  body=modelSections.map(([id,vi,en])=>section(id,pair(vi,en),id==='references'?references([...(m.evidence||[]),...papers.filter(p=>p.model_id===m.id).flatMap(p=>p.evidence||[])]):id==='connections'?edges(data,n.crossDomain):id==='next'?paragraphs(s.next)+(n.successors.length?edges(data,n.successors):''):id==='gap'?paragraphs(s.gap)+(n.predecessors.length?edges(data,n.predecessors):''):paragraphs(s[id]))).join('');
 } else {
  const content={
   foundations:paragraphs(view.chain?.description||view.series.description),
   principles:principles.map(p=>`<h3>${bi(p.title)}</h3>${paragraphs(p.formulation||p.notes)}${references(p.evidence||[])}`).join(''),
   evolution:view.models.length?evolutionTimeline(data,view.models):missing(),
   papers:references(papers.filter(p=>p.url).map(p=>({title:text(p.title,lang()),url:p.url}))),
   inspiration:edges(data,allEdges.filter(c=>['method_transfer','mathematical_connection','proposed_connection','inspired_by'].includes(c.relationship_type))),
   applications:data.source==='sample'&&view.models.length?paragraphs(pair(
    view.series.id==='world-models'?'Điều khiển từ ảnh và học hành vi trong mô phỏng; đánh giá an toàn robot thật vẫn là bước riêng.':view.series.id==='generative-models'?'Tổng hợp và khôi phục ảnh; đánh giá tính đúng đắn và nguồn dữ liệu riêng cho từng ứng dụng.':'Nhận dạng ảnh và backbone thị giác; chất lượng ngoài phân phối cần được đo riêng.',
    view.series.id==='world-models'?'Pixel-based control and simulated behavior learning; real-robot safety remains a separate evaluation.':view.series.id==='generative-models'?'Image synthesis and restoration; assess correctness and data provenance per application.':'Image recognition and visual backbones; out-of-distribution quality needs separate evaluation.')):missing(),
   opportunities:data.source==='sample'&&view.models.length?paragraphs(pair('Các câu hỏi học thuật minh họa nằm trong từng trang mô hình. Đây không phải ý tưởng riêng hoặc kết quả thí nghiệm mới.','Illustrative academic questions appear on each model page. These are not private ideas or new experimental results.')):missing()
  };
  const authored=(view.chain||view.series).metadata?.atlas_sections;
  for(const id of ['foundations','applications','opportunities'])if(authored&&(text(authored[id],'vi')||text(authored[id],'en')))content[id]=paragraphs(authored[id]);
  body=seriesSections.map(([id,vi,en])=>section(id,pair(vi,en),content[id])).join('');
 }
 return `${toolbar()}<div class="v2-article-layout v2-container" data-topic-open="true" data-toc-open="true">${sidebar(data,view)}<article class="v2-article-content">${heading}${body}</article>${toc(view.model?modelSections:seriesSections)}</div>`;
}
export function sourceNotice(data){
 return `<div class="atlas-source v2-container"><p>${data.source==='local'?bi('Nội dung Phase 3 cục bộ · Chỉ đọc.','Local Phase 3 collection · Read only.'):data.source==='sample'?bi('Mẫu học thuật công khai · Không có ghi chú riêng.','Public academic examples · No private notes.'):bi('Dữ liệu riêng từ Supabase · Chỉ đọc.','Private Supabase data · Read only.')} <small>${data.schema==='local'?bi('Được máy chủ phát triển xác thực quyền Admin.','Admin access verified by the development server.'):data.schema==='available'?bi('Đã truy cập endpoint Atlas.','Atlas endpoint reachable.'):bi('Endpoint Atlas chưa khả dụng; chưa xác nhận migration.','Atlas endpoint unavailable; migration not confirmed.')}</small></p><label>${bi('Nguồn','Source')} <select data-atlas-source>${data.source==='local'?`<option value="local" selected>${lang()==='en'?'Local Phase 3 collection':'Nội dung Phase 3 cục bộ'}</option>`:''}<option value="sample" ${data.source==='sample'?'selected':''}>${lang()==='en'?'Public examples':'Ví dụ công khai'}</option><option value="database" ${data.source==='database'?'selected':''}>Supabase</option></select></label></div>`;
}
