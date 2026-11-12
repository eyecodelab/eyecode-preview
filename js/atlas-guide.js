// Generic metadata-driven learning guide. Curated public-paper research text is supplied by the generated static collection.
import {renderVisualExplanation} from './atlas-visuals.js';
import {text,pair,atlasUrl} from './atlas-data.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const language=()=>globalThis.document?.documentElement.lang==='en'?'en':'vi';
const bi=(v,en)=>{const a=en===undefined?v:pair(v,en);return `<span data-vi="${esc(text(a,'vi'))}" data-en="${esc(text(a,'en'))}">${esc(text(a,language()))}</span>`;};
const label=(vi,en)=>`aria-label="${esc(language()==='en'?en:vi)}" data-label-vi="${esc(vi)}" data-label-en="${esc(en)}"`;
const para=v=>text(v,'vi').split('\n\n').map((vi,i)=>`<p>${bi(pair(vi,text(v,'en').split('\n\n')[i]||''))}</p>`).join('');
const safe=u=>{try{const v=new URL(u);return v.protocol==='https:'&&!v.username&&!v.password?v.href:null;}catch{return null;}};
const external=(url,label)=>safe(url)?`<a href="${esc(safe(url))}" target="_blank" rel="noopener noreferrer">${typeof label==='string'?esc(label):bi(label)}</a>`:'';
export function renderLearningGuide(data,params){
 const series=data.series.find(s=>[s.id,s.slug].includes(params.get('series'))),g=series?.metadata?.learning_guide;
 if(g?.version!==1||!g.timeline)return null;
 const branches=g.branches||[],nodes=g.nodes||[],refs=g.references||[],ref=id=>refs.find(r=>r.id===id);
 const paperLinks=ids=>`<ol class="v2-references atlas-references">${[...new Set(ids||[])].map(id=>{const r=ref(id);return r?`<li>${external(r.url,r.title)} <small class="atlas-muted">${esc(r.year)}</small>${r.code?` · ${external(r.code,'Code')}`:''}</li>`:'';}).join('')}</ol>`;
 const link=(values,label,attrs='',hash='')=>{
  const route=l=>{const u=new URL(atlasUrl({series:series.id,source:data.source,lang:l}),'https://atlas.invalid/');for(const [k,v] of Object.entries(values))if(v)u.searchParams.set(k,v);return u.pathname.slice(1)+u.search+hash;};
  return `<a href="${esc(route(language()))}" data-href-vi="${esc(route('vi'))}" data-href-en="${esc(route('en'))}" ${attrs}>${bi(label)}</a>`;
 };
 const requestedModel=params.get('model')||params.get('node');
 const full=params.get('detail')==='full';
 const model=requestedModel?nodes.find(n=>n.id===requestedModel||n.canonical===requestedModel):null;
 const legacyChain=data.chains.find(c=>[c.id,c.slug].includes(params.get('chain'))&&c.series_id===series.id);
 const branchId=params.get('branch')||(!model&&legacyChain?(g.legacyBranches?.[legacyChain.slug]||(legacyChain.slug==='structured-recurrence'?'state-space':'recurrence')):null);
 const branch=branches.find(b=>b.id===branchId);
 if(requestedModel&&!model||params.has('branch')&&!branch||params.has('chain')&&!legacyChain)return `<section class="v2-container v2-section"><h1>${bi('Không tìm thấy mục Atlas','Atlas item not found')}</h1>${link({},series.title)}</section>`;
 const modelLink=n=>link({model:n.canonical||n.id},n.name);
 const typeLabels={improvement:pair('Cải tiến','Improvement'),adaptation:pair('Thích nghi','Adaptation'),combination:pair('Kết hợp','Combination'),shared:pair('Nguyên lý chung','Shared principle'),inspiration:pair('Cảm hứng có nguồn','Documented inspiration')};
 const relationLabel=edge=>g.relationshipLabels?.[edge?.relationClass]||typeLabels[edge?.type];
 const edgeName=id=>{const n=nodes.find(n=>n.id===id);if(n)return esc(n.name);const r=g.relatedNodes?.find(n=>n.id===id);return r?link({series:r.series,model:r.canonical||r.id},r.name):esc(id);};
 const edgeList=rows=>`<ul class="atlas-guide-edges">${rows.map(e=>`<li><strong>${edgeName(e.source)} · ${bi(relationLabel(e))} · ${edgeName(e.target)}</strong>${para(e.explanation)}${paperLinks(e.evidence)}</li>`).join('')}</ul>`;
 const comparison=()=>`<div class="atlas-guide-table" tabindex="0" role="region" ${g.comparisonHeadings?label('So sánh phương pháp','Method comparison'):label('So sánh cơ chế bộ nhớ','Memory mechanism comparison')}><table><thead><tr>${(g.comparisonHeadings||['Họ mô hình|Model family','Bộ nhớ|Memory','Train|Training','Inference / cost|Inference / cost','Giới hạn|Limitations']).map(s=>`<th scope="col">${bi(...s.split('|'))}</th>`).join('')}</tr></thead><tbody>${g.comparison.map(row=>`<tr>${row.map((c,i)=>i===0?`<th scope="row">${bi(c)}</th>`:`<td>${bi(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 const blocks=s=>para(s.body)+(s.diagram?`<figure class="atlas-guide-flow"><ol>${s.diagram.map(v=>`<li>${bi(v)}</li>`).join('')}</ol><figcaption>${bi('Sơ đồ giải thích do EyeCode biên soạn; không phải hình gốc của paper.','EyeCode explanatory schematic; not an original paper figure.')}</figcaption></figure>`:'')+(s.equation?`<pre class="atlas-guide-equation" tabindex="0"><code>${esc(s.equation)}</code></pre>`:'')+(s.items?`<ul>${s.items.map(v=>`<li>${bi(v)}</li>`).join('')}</ul>`:'')+(s.after?para(s.after):'')+(s.refs?paperLinks(s.refs):'');
 function quickView(selected){
  const q=g.timeline.quickViews[selected.id],r=ref(selected.ref);
  const fields=[['problem','Vấn đề','Problem'],['previous','Giới hạn trước đó','Previous Limitation'],['idea','Ý tưởng & đổi mới','Key Idea & Novelty'],['mechanism','Cách hoạt động','How It Works'],['results','Kết quả chính','Key Results'],['limitations','Giới hạn','Limitations'],['evolution','Tiến hóa','Evolution']];
  const visual=renderVisualExplanation(g.visuals?.[selected.id],selected.id);
  return `<section class="atlas-quick-view" id="model-quick-view" data-quick-model="${esc(selected.id)}" aria-labelledby="quick-view-title"><header><p class="atlas-muted">${bi('Tóm tắt mô hình','Model Quick View')}</p><h2 id="quick-view-title">${esc(selected.name)}</h2><p class="atlas-quick-paper">${external(r.url,r.title)}</p><p class="atlas-muted" data-venue>${r.venue==='arXiv preprint'?bi('Bản thảo arXiv','arXiv preprint'):esc(r.venue)} · ${esc(r.publicationYear)}${r.year!==r.publicationYear?` · ${bi('Công bố đầu tiên','First release')} ${esc(r.year)}`:''}</p></header><dl>${fields.map(([id,vi,en],i)=>`<div><dt>${i+1}. ${bi(vi,en)}</dt><dd>${bi(q[id])}</dd></div>${id==='idea'&&visual?'</dl>'+visual+'<dl>':''}`).join('')}</dl><div class="atlas-quick-resources" id="references">${external(r.url,'Paper')}${r.code?external(r.code,g.quickViewResources?pair('Official Code','Official Code'):pair('Mã nguồn chính thức','Official Code')):g.quickViewResources?`<span class="atlas-muted" data-code-unavailable>${bi(pair('Official Code: chưa xác minh','Official Code: not verified'))}</span>`:''}${link({model:selected.canonical||selected.id,detail:'full'},g.quickViewResources?pair('Ghi chú nghiên cứu','Research Notes'):g.deepDives[selected.id]?pair('Đọc chuyên sâu','Full Deep Dive'):pair('Ghi chú nghiên cứu','Research Notes'))}</div><details class="atlas-quick-evidence"><summary>${bi('Kiểm tra các quan hệ & nguồn','Inspect relationships & sources')}</summary>${edgeList(g.edges.filter(e=>e.source===selected.id||e.target===selected.id))}</details></section>`;
 }
 function timeline(){
  const config=g.timeline;
  const keyNodes=config.keys.map(id=>nodes.find(n=>n.id===id)).filter(n=>n&&(!branch||n.branch===branch.id)).sort((a,b)=>ref(a.ref).year-ref(b.ref).year);
  const selected=model||nodes.find(n=>n.id===params.get('key'));
  const owner=selected?(config.keys.includes(selected.id)?selected.id:config.variants.find(v=>v.model===selected.id)?.key):null;
  const expanded=params.get('key')==='none'?null:keyNodes.find(n=>n.id===owner);
  const context=branch?{branch:branch.id}:{};
  const route=(values,l,hash)=>{const u=new URL(atlasUrl({series:series.id,source:data.source,lang:l}),'https://atlas.invalid/');for(const[k,v]of Object.entries(values))if(v)u.searchParams.set(k,v);return u.pathname.slice(1)+u.search+hash;};
  const rows=keyNodes.map(n=>{
   const active=expanded?.id===n.id,variants=config.variants.filter(v=>v.key===n.id),values=active?{...context,key:'none'}:{...context,key:n.id,model:n.canonical||n.id};
   return `<li class="atlas-key-row" id="key-${esc(n.id)}" ${active?'data-expanded="true"':''}${config.hideEmptyVariants&&!variants.length?' data-no-variants':''}><div class="atlas-key-layout"><button type="button" class="atlas-key-button" id="key-button-${esc(n.id)}" data-atlas-key="${esc(n.id)}" data-atlas-href-vi="${esc(route(values,'vi','#key-'+n.id))}" data-atlas-href-en="${esc(route(values,'en','#key-'+n.id))}" aria-expanded="${active}" aria-controls="variants-${esc(n.id)}"><span class="atlas-key-meta"><span>${esc(ref(n.ref).year)}</span><span>${bi(branches.find(b=>b.id===n.branch).title)}</span></span><strong>${esc(n.name)}</strong><span class="atlas-key-contribution">${bi(n.summary)}</span><span class="atlas-key-indicator" aria-hidden="true">${active?'−':'+'}</span></button><div class="atlas-variant-panel" id="variants-${esc(n.id)}" role="region" aria-labelledby="key-button-${esc(n.id)}" ${active&&(!config.hideEmptyVariants||variants.length)?'':'hidden'}>${active&&(!config.hideEmptyVariants||variants.length)?`<p class="atlas-muted">${bi('Biến thể & phương pháp liên quan','Variants & Related Methods')}</p>${variants.length?`<div class="atlas-variant-cards">${variants.map(v=>{
    const node=nodes.find(x=>x.id===v.model),relations=v.path.slice(1).map((id,i)=>g.edges.find(e=>e.source===v.path[i]&&e.target===id));
    const relation=relations.at(-1),isSelected=selected?.id===node.id;
    return link({...context,key:n.id,model:node.canonical||node.id},node.name,`class="atlas-variant-card" data-variant="${esc(node.id)}" ${isSelected?'aria-current="true"':''}`,'#model-quick-view').replace('</a>',`<small>${esc(ref(node.ref).year)} · ${bi(relationLabel(relation))}</small><span>${bi(node.summary)}</span>${v.path.length>2?`<small>${bi('Qua','Via')} ${esc(nodes.find(x=>x.id===v.path[1]).name)}</small>`:''}</a>`);
   }).join('')}</div>`:`<p class="atlas-muted">${bi('Chưa tuyển chọn biến thể riêng cho mốc này. Xem quan hệ có nguồn trong tóm tắt bên dưới.','No separate variants curated for this milestone. Inspect its sourced relationships in the Quick View below.')}</p>`}`:''}</div>${active?quickView(selected||n):''}</div></li>`;
  }).join('');
  return `<p class="atlas-muted">${bi('Năm là lần công bố đầu tiên, có thể là bản thảo trước hội nghị. Trục dọc chỉ thể hiện thời gian; không có mũi tên ngụ ý kế thừa.','Years indicate first release, which may precede conference publication. The vertical axis represents time; no arrows imply ancestry.')}</p><ol class="atlas-key-timeline">${rows}</ol>${expanded?'':`<section class="atlas-quick-placeholder" id="model-quick-view"><h2>${bi('Tóm tắt mô hình','Model Quick View')}</h2><p>${bi('Chọn một mốc để mở các phương pháp liên quan và đọc tóm tắt ngay tại đây.','Select a milestone to expand related methods and read its Quick View here.')}</p></section>`}`;
 }
 let sections;
 if(model&&full){
  const original=data.models.find(m=>m.id===model.canonical);
  const notes=original?.metadata?.atlas_sections;
  sections=g.deepDives[model.id]||[
   {id:'insight',title:pair('Ý tưởng cốt lõi','Core Insight'),body:model.summary},
   {id:'origins',title:pair('Nguồn gốc & cơ chế','Origins & Mechanism'),body:notes?.origins||branches.find(b=>b.id===model.branch).origin},
   {id:'mechanism',title:pair('Cách hoạt động','How It Works'),body:notes?.mechanism||model.summary},
   {id:'training',title:pair('Dữ liệu & đánh giá','Data & Evaluation'),body:notes?.training||pair('Đây là ghi chú định hướng; recipe huấn luyện và bảng kết quả chi tiết nằm trong bài gốc. Chưa biên soạn deep dive 12 mục cho model này.','This is an orientation note; training recipes and result tables are in the primary paper. A twelve-section deep dive has not yet been authored for this model.')},
   {id:'limits',title:pair('Giới hạn','Limitations'),body:model.limit},
   {id:'connections',title:pair('Quan hệ có nguồn','Sourced Relationships'),body:pair('Phân biệt cơ chế, adaptation và quan hệ lịch sử.','Distinguish mechanisms, adaptations, and historical relationships.'),custom:edgeList(g.edges.filter(e=>e.source===model.id||e.target===model.id))},
   {id:'references',title:pair('Nguồn & code','Sources & Code'),body:pair('Đọc bài gốc để kiểm tra đúng phiên bản và setting.','Consult the original paper for its exact version and settings.'),refs:[model.ref]}
  ];
 }else if(branch){
  sections=[
   {id:'big-problem',title:pair('Vấn đề của nhánh','Branch Problem'),body:branch.problem},
   {id:'foundations',title:pair('Nguồn gốc khoa học','Scientific Origins'),body:branch.origin,...branch.lesson,refs:branch.refs.filter(id=>(g.foundationRefs||['hippo','s4','s5','mamba','mamba2','lstm','bahdanau','rwkv']).includes(id))},
   {id:'branches',title:pair('Các mốc kỹ thuật','Technical Milestones'),body:pair('Mỗi mốc nêu đổi mới và đánh đổi. Năm không tự suy ra quan hệ kế thừa.','Each milestone identifies an innovation and a trade-off. Years alone do not imply ancestry.'),custom:`<ul class="atlas-guide-milestones">${nodes.filter(n=>n.branch===branch.id).map(n=>`<li><h3>${modelLink(n)} · ${esc(ref(n.ref)?.year)}</h3>${para(n.summary)}${para(n.limit)}</li>`).join('')}</ul>`},
   {...g.sections.find(s=>s.id==='evolution'),custom:timeline()},
   {...g.sections.find(s=>s.id==='horizontal'),custom:`<details><summary>${bi('Xem các quan hệ thích nghi','Explore adaptation relationships')}</summary>${edgeList(g.edges.filter(e=>e.view==='horizontal'&&(nodes.find(n=>n.id===e.source)?.branch===branch.id||nodes.find(n=>n.id===e.target)?.branch===branch.id)))}</details>`},
   {...g.sections.find(s=>s.id==='comparison'),custom:comparison()},
   {id:'gaps',title:pair('Giới hạn & hướng tiếp theo','Limitations & Future Directions'),body:branch.limits,refs:branch.refs},
   {id:'papers',title:pair('Bài báo của nhánh','Branch Papers'),body:pair('Năm bản thảo đầu tiên; công bố hội nghị có thể muộn hơn.','First-preprint years; conference publication may be later.'),refs:[...branch.refs].sort((a,b)=>ref(a).year-ref(b).year)}
  ];
 }else if(params.get('detail')==='guide'){
  sections=g.sections.map(s=>({...s,custom:s.id==='branches'?`<ul class="atlas-guide-branches">${branches.map(b=>`<li><h3>${link({branch:b.id},b.title)}</h3>${para(b.problem)}</li>`).join('')}</ul>`:s.id==='evolution'?timeline():s.id==='horizontal'?`<details><summary>${bi(g.horizontalLabel||pair('Xem chuyển giao sang ảnh, video, robot và đa phương thức','Explore transfers to images, video, robotics, and multimodal learning'))}</summary>${edgeList(g.edges.filter(e=>e.view==='horizontal'))}</details>`:s.id==='comparison'?comparison():s.id==='papers'?branches.map(b=>`<h3>${bi(b.title)}</h3>${paperLinks([...b.refs].sort((a,b)=>ref(a).year-ref(b).year))}`).join(''):''}));
 }
 else {
  sections=[{id:'evolution',title:pair('Các mốc mô hình','Key Models Timeline'),body:'',custom:timeline()},{id:'papers',title:pair('Bài báo & mã nguồn','Papers & Code'),body:'',custom:branches.map(b=>`<details><summary>${bi(b.title)}</summary>${paperLinks([...b.refs].sort((a,b)=>ref(a).year-ref(b).year))}</details>`).join('')}];
 }
 const current=model&&full?model.name:branch?.title||series.title;
 const sidebarNodes=g.compactSidebar?nodes.filter(n=>g.timeline.keys.includes(n.id)):nodes;
 const relatedSidebarNodes=g.compactSidebar?nodes.filter(n=>!g.timeline.keys.includes(n.id)):[];
 const sidebar=`<aside class="v2-article-sidebar v2-reading-panel" id="v2-topic-panel" aria-labelledby="v2-topic-heading"><div class="v2-panel-heading"><h2 id="v2-topic-heading">${bi('Nhánh & Mô hình','Branches & Models')}</h2><button type="button" class="v2-panel-close" data-reading-close>${bi('Đóng','Close')}</button></div><nav>${`<a href="${esc(atlasUrl({source:data.source,lang:language()}))}" data-href-vi="${esc(atlasUrl({source:data.source,lang:'vi'}))}" data-href-en="${esc(atlasUrl({source:data.source,lang:'en'}))}" class="v2-sidebar-category">${bi('Tất cả 16 series','All 16 series')}</a>`}${link({},series.title,'class="v2-sidebar-category"')}<ol>${branches.map(b=>`<li>${link({branch:b.id},b.title,branch?.id===b.id&&!model?'aria-current="page"':'')}</li>`).join('')}</ol><h3>${g.compactSidebar?bi('Mô hình chính','Key Models'):bi('Mô hình & adaptations','Models & Adaptations')}</h3><ol>${sidebarNodes.map(n=>`<li>${modelLink(n).replace('<a ',`<a ${model?.id===n.id?'aria-current="page" ':''}`)}</li>`).join('')}</ol>${relatedSidebarNodes.length?`<details class="atlas-sidebar-related"${model&&!g.timeline.keys.includes(model.id)?' open':''}><summary>${bi('Biến thể & hướng liên quan','Variants & Related Directions')} (${relatedSidebarNodes.length})</summary><ol>${relatedSidebarNodes.map(n=>`<li>${modelLink(n).replace('<a ',`<a ${model?.id===n.id?'aria-current="page" ':''}`)}</li>`).join('')}</ol></details>`:''}</nav></aside>`;
 const toc=`<aside class="v2-toc v2-reading-panel" id="v2-toc-panel" aria-labelledby="v2-toc-heading"><div class="v2-panel-heading"><h2 id="v2-toc-heading">${bi('Trong bài này','On this page')}</h2><button type="button" class="v2-panel-close" data-reading-close>${bi('Đóng','Close')}</button></div><nav><ol data-reading-outline>${sections.map(s=>`<li data-heading-level="2"><a href="#${esc(s.id)}">${bi(s.title)}</a></li>`).join('')}</ol></nav></aside>`;
 const toolbar=`<div class="v2-article-tools v2-container"><button type="button" data-reading-toggle="topic" aria-controls="v2-topic-panel" aria-expanded="true">${bi('Nhánh & Mô hình','Branches & Models')} <span aria-hidden="true">⌄</span></button><button type="button" data-reading-toggle="toc" aria-controls="v2-toc-panel" aria-expanded="true">${bi('Trong bài này','On this page')} <span aria-hidden="true">⌄</span></button></div><div class="v2-reading-backdrop" data-reading-backdrop hidden></div>`;
 return `${toolbar}<div class="v2-article-layout v2-container" data-sequence-guide data-topic-open="true" data-toc-open="true">${sidebar}<article class="v2-article-content"><nav class="v2-breadcrumb" ${label('Đường dẫn','Breadcrumb')}>${link({},series.title)}${branch||model?`<span>›</span>${bi(current)}`:''}</nav><header class="v2-article-heading"><h1>${bi(current)}</h1>${model&&full?para(model.summary):branch?para(branch.problem):para(g.timeline.introduction)}${model&&full?paperLinks([model.ref]):''}${!branch&&!full?`<p class="atlas-muted">${link({detail:'guide'},pair('Nền tảng & so sánh các nhánh','Foundations & branch comparisons'))}</p>`:''}</header>${sections.map(s=>`<section class="v2-article-section" id="${esc(s.id)}"><h2>${bi(s.title)}</h2>${blocks(s)}${s.custom||''}</section>`).join('')}</article>${toc}</div>`;
}
