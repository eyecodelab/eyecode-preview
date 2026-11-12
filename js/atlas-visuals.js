// Generic, data-driven public Atlas media UI.
import {text} from './atlas-data.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lang=()=>globalThis.document?.documentElement.lang==='en'?'en':'vi';
const pair=(vi,en)=>({vi,en});
const bi=v=>`<span data-vi="${esc(text(v,'vi'))}" data-en="${esc(text(v,'en'))}">${esc(text(v,lang()))}</span>`;
const safe=u=>{try{const url=new URL(u);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}};
const external=(url,title)=>safe(url)?`<a href="${esc(safe(url))}" target="_blank" rel="noopener noreferrer">${typeof title==='string'?esc(title):bi(title)}</a>`:'';
// Construct from provider + identifier; never trust arbitrary iframe HTML or embed URLs.
export function allowedVideoEmbed(video){
 if(video?.embedAllowed!==true||!safe(video.permissionEvidence)||!safe(video.url))return null;
 if(video.provider==='youtube'&&/^[A-Za-z0-9_-]{11}$/.test(video.videoId||''))return 'https://www.youtube-nocookie.com/embed/'+video.videoId+'?autoplay=0&rel=0';
 if(video.provider==='vimeo'&&/^[0-9]{6,12}$/.test(video.videoId||''))return 'https://player.vimeo.com/video/'+video.videoId+'?autoplay=0&dnt=1';
 return null;
}
const staticAsset=original=>/^assets\/atlas\/[a-z0-9-]+\.(png|svg)$/.test(original?.assetURL||'')?original.assetURL:null;
function diagramSVG(diagram,title,mode,id){
 if(!Array.isArray(diagram?.nodes)||!Array.isArray(diagram?.edges)||diagram.nodes.length>16)return '';
 const mobile=mode==='mobile',stepX=mobile?170:220,stepY=mobile?84:92,w=mobile?148:196,h=mobile?64:70;
 const nodes=diagram.nodes.filter(n=>/^[a-z0-9-]+$/.test(n.id)&&Array.isArray(n[mode])&&n[mode].length===2&&n[mode].every(v=>Number.isInteger(v)&&v>=0&&v<=6));
 if(!nodes.length||new Set(nodes.map(n=>n.id)).size!==nodes.length)return '';
 const bounds=new Map(nodes.map(n=>[n.id,{x:n[mode][0]*stepX+12,y:n[mode][1]*stepY+14}]));
 const width=(Math.max(...nodes.map(n=>n[mode][0]))+1)*stepX,height=(Math.max(...nodes.map(n=>n[mode][1]))+1)*stepY;
 const marker='visual-arrow-'+id+'-'+mode;
 const edges=diagram.edges.map(e=>{
  const a=bounds.get(e.from),b=bounds.get(e.to);if(!a||!b||e.from===e.to)return '';
  let x1,y1,x2,y2,path;
  if(a.y===b.y){x1=a.x+(b.x>a.x?w:0);x2=b.x+(b.x>a.x?0:w);y1=y2=a.y+h/2;path=`M${x1},${y1} H${x2}`;}
  else if(a.x===b.x){x1=x2=a.x+w/2;y1=a.y+(b.y>a.y?h:0);y2=b.y+(b.y>a.y?0:h);path=`M${x1},${y1} V${y2}`;}
  else {x1=a.x+w/2;x2=b.x+w/2;y1=a.y+(b.y>a.y?h:0);y2=b.y+(b.y>a.y?0:h);const mid=(y1+y2)/2;path=`M${x1},${y1} V${mid} H${x2} V${y2}`;}
  return `<path d="${path}" marker-end="url(#${marker})"/>`;
 }).join('');
 const wrap=(value,max)=>{const lines=[];let line='';for(const word of value.split(/\s+/)){if(line&&line.length+word.length+1>max){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);return lines.slice(0,4);};
 const boxes=nodes.map(n=>{const {x,y}=bounds.get(n.id);return `<g data-visual-node="${esc(n.id)}"${n.novelty===true?' data-node-novelty="true"':''} data-node-role="${['input','output','memory'].includes(n.role)?n.role:'mechanism'}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/>${['vi','en'].map(l=>{const lines=wrap(text(n.label,l),mobile?21:26),top=y+h/2-(lines.length-1)*8;return `<text data-visual-lang="${l}" text-anchor="middle">${lines.map((line,i)=>`<tspan x="${x+w/2}" y="${top+i*16}">${esc(line)}</tspan>`).join('')}</text>`;}).join('')}</g>`;}).join('');
 return `<svg class="atlas-visual-diagram atlas-visual-${mode}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="visual-title-${id}-${mode}"><title id="visual-title-${id}-${mode}" data-vi="${esc(text(title,'vi'))}" data-en="${esc(text(title,'en'))}">${esc(text(title,lang()))}</title><defs><marker id="${marker}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z"/></marker></defs><g class="atlas-visual-edges">${edges}</g>${boxes}</svg>`;
}
export function renderVisualExplanation(visual,modelId){
 if(!visual||!visual.verified||!safe(visual.source?.url)||!/^[a-z0-9-]+$/.test(modelId||''))return '';
 const simplified=diagramSVG(visual.diagram,visual.title,'desktop',modelId)+diagramSVG(visual.diagram,visual.title,'mobile',modelId);
 const original=visual.original?.verified&&safe(visual.original.url)&&visual.original.usage&&visual.original.rights?visual.original:null;
 const video=visual.video?.verified&&safe(visual.video.url)&&safe(visual.video.evidence)?visual.video:null;
 const compact=visual.presentation==='compact';
 const embedded=original&&staticAsset(original)&&original.credit&&safe(original.rightsUrl)&&['scholarly-figure-permission','CC-BY-4.0'].includes(original.rights);
 const options=[...(simplified?[{id:'simplified',title:pair('Sơ đồ đơn giản','Simplified Figure')}]:[]),...((compact?embedded:original)?[{id:'original',title:pair('Hình gốc','Original Figure')}]:[]),...(video?[{id:'video',title:pair('Video demo','Video Demo')}]:[])];
 if(!options.length)return '';
 const io=`<div class="atlas-visual-io">${[['input','Đầu vào','Input'],['mechanism','Cơ chế chính','Core Mechanism'],['output','Đầu ra','Output']].map(([key,vi,en])=>`<p><strong>${bi(pair(vi,en))}</strong> ${bi(visual[key])}</p>`).join('')}${visual.novelty?`<p data-visual-novelty><strong>${bi(compact?pair('Điểm mới','Novelty'):pair('Điểm mới · viền xanh','Novelty · blue outline'))}</strong> ${bi(visual.novelty)}</p>`:''}</div>`;
 const caption=`<p class="atlas-visual-caption">${bi(visual.caption)}</p>`;
 const source=`<p class="atlas-visual-source">${bi(pair('Nguồn','Source'))}: ${external(visual.source.url,visual.source.title)}</p>`;
 if(compact){
  const paper=external(visual.source.paperURL||visual.source.url,pair('Bài gốc','Original Paper'));
  const originalLink=original&&!embedded?external(original.url,pair(`Xem hình gốc (Hình ${original.figure})`,`View Original Figure (Fig. ${original.figure})`)):'';
  const sourceLine=`<p class="atlas-visual-source">${paper}${originalLink?' · '+originalLink:''}</p>`;
  const credit=embedded?`<p class="atlas-visual-source" data-visual-credit>${external(original.url,original.credit)}${/^CC-BY-4\.0$/.test(original.rights)&&safe(original.rightsUrl)?' · '+external(original.rightsUrl,'CC BY 4.0'):''}</p>`:'';
  return `<section class="atlas-visual" data-atlas-visual="${modelId}" aria-labelledby="visual-heading-${modelId}"><h3 id="visual-heading-${modelId}">${bi(visual.title)}</h3><div class="atlas-visual-tabs" role="tablist" aria-labelledby="visual-heading-${modelId}">${options.map((o,i)=>`<button type="button" role="tab" id="visual-tab-${modelId}-${o.id}" data-visual-tab="${o.id}" aria-selected="${i===0}" aria-controls="visual-panel-${modelId}-${o.id}" tabindex="${i===0?0:-1}">${bi(o.title)}</button>`).join('')}</div>${options.map((o,i)=>{
   let content;
   if(o.id==='simplified')content=`<figure class="atlas-visual-figure">${simplified}</figure>${io}${sourceLine}`;
   else if(o.id==='original')content=`<div class="atlas-private-image" data-atlas-image="${esc(staticAsset(original))}"><p data-visual-loading>${bi(pair('Đang tải hình…','Loading figure…'))}</p><img loading="lazy" decoding="async" hidden alt="${esc(text(visual.title,lang()))}" data-alt-vi="${esc(text(visual.title,'vi'))}" data-alt-en="${esc(text(visual.title,'en'))}"></div>${io}${credit}`;
   else {const embed=allowedVideoEmbed(video);content=`${embed?`<div class="atlas-visual-video" data-video-embed="${esc(embed)}" data-video-title-vi="${esc(text(video.title,'vi'))}" data-video-title-en="${esc(text(video.title,'en'))}"></div>`:external(video.url,video.title)}${io}<p class="atlas-visual-source">${external(video.url,video.title)}</p>`;}
   return `<div role="tabpanel" id="visual-panel-${modelId}-${o.id}" aria-labelledby="visual-tab-${modelId}-${o.id}" tabindex="0" ${i===0?'':'hidden'}>${content}</div>`;
  }).join('')}</section>`;
 }
 return `<section class="atlas-visual" data-atlas-visual="${modelId}" aria-labelledby="visual-heading-${modelId}"><h3 id="visual-heading-${modelId}">${bi(pair('Giải thích trực quan','Visual Explanation'))}</h3><p class="atlas-visual-title">${bi(visual.title)}</p><div class="atlas-visual-tabs" role="tablist" aria-labelledby="visual-heading-${modelId}">${options.map((o,i)=>`<button type="button" role="tab" id="visual-tab-${modelId}-${o.id}" data-visual-tab="${o.id}" aria-selected="${i===0}" aria-controls="visual-panel-${modelId}-${o.id}" tabindex="${i===0?0:-1}">${bi(o.title)}</button>`).join('')}</div>${options.map((o,i)=>{
  let content;
  if(o.id==='simplified')content=`<figure class="atlas-visual-figure">${simplified}<figcaption>${bi(pair('Minh họa giáo dục do EyeCode biên soạn','EyeCode educational illustration'))}</figcaption></figure>${io}${caption}${source}`;
  else if(o.id==='original'){const asset=staticAsset(original);content=`${asset?`<div class="atlas-private-image" data-atlas-image="${esc(asset)}"><p data-visual-loading>${bi(pair('Hình gốc được tải khi mở tab','Original figure loads when this tab opens'))}</p><img loading="lazy" decoding="async" hidden alt="${esc(text(visual.title,lang()))}" data-alt-vi="${esc(text(visual.title,'vi'))}" data-alt-en="${esc(text(visual.title,'en'))}"></div>`:''}<p>${external(original.url,pair('Xem hình gốc tại nguồn','View original figure at source'))}</p>${io}${original.caption?`<p class="atlas-visual-caption">${bi(original.caption)}</p>`:''}<p class="atlas-visual-source">${bi(original.usage)}</p><p class="atlas-visual-source">${bi(pair('Nguồn','Source'))}: ${external(original.url,visual.source.title)}${safe(original.rightsUrl)?' · '+external(original.rightsUrl,original.rightsLabel||original.rights):''}</p>`;}
  else {const embed=allowedVideoEmbed(video);content=`<p class="atlas-visual-title">${bi(video.title)}</p>${embed?`<div class="atlas-visual-video" data-video-embed="${esc(embed)}" data-video-title-vi="${esc(text(video.title,'vi'))}" data-video-title-en="${esc(text(video.title,'en'))}"></div>`:''}<p>${external(video.url,pair('Xem video tại nguồn','Watch video at source'))}</p><p class="atlas-visual-caption">${bi(video.caption)}</p>${io}<p class="atlas-visual-source">${esc(video.channel||'')} · ${esc(video.speaker||'')} · ${esc(video.date||'')} · ${external(video.evidence,pair('Nguồn xác minh','Verification source'))}</p>`;}
  return `<div role="tabpanel" id="visual-panel-${modelId}-${o.id}" aria-labelledby="visual-tab-${modelId}-${o.id}" tabindex="0" ${i===0?'':'hidden'}>${content}</div>`;
 }).join('')}</section>`;
}
export function mountAtlasVisuals(root){
 const loaded=new WeakSet();let disposed=false;
 function loadImage(holder){
  if(disposed||loaded.has(holder))return;
  const path=holder.dataset.atlasImage;if(!/^assets\/atlas\/[a-z0-9-]+\.(png|svg)$/.test(path||''))return;
  loaded.add(holder);
  const status=holder.querySelector('[data-visual-loading]'),img=holder.querySelector('img');
  img.addEventListener('load',()=>{if(!disposed){img.hidden=false;status.hidden=true;}},{once:true});
  img.addEventListener('error',()=>{if(!disposed){img.hidden=true;status.hidden=false;status.innerHTML=bi(pair('Không tải được hình; hãy mở liên kết nguồn.','Figure unavailable; use the source link.'));}},{once:true});
  img.src=path;img.hidden=false;
 }
 const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);void loadImage(e.target);}},{rootMargin:'100px'}):null;
 function activate(button,focus=false){
  const section=button.closest('[data-atlas-visual]');if(!section||disposed)return;
  for(const tab of section.querySelectorAll('[role=tab]')){const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;const panel=section.querySelector('#'+tab.getAttribute('aria-controls'));if(!panel)continue;panel.hidden=!active;
   for(const video of panel.querySelectorAll('[data-video-embed]')){if(!active){video.replaceChildren();continue;}if(video.firstElementChild)continue;
    const u=new URL(video.dataset.videoEmbed);if(!['https://www.youtube-nocookie.com','https://player.vimeo.com'].includes(u.origin)||u.searchParams.get('autoplay')!=='0')continue;
    const frame=document.createElement('iframe');frame.src=u.href;frame.loading='lazy';frame.title=video.dataset[lang()==='en'?'videoTitleEn':'videoTitleVi'];frame.referrerPolicy='strict-origin-when-cross-origin';frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation');frame.setAttribute('allow','fullscreen; picture-in-picture');frame.allowFullscreen=true;video.append(frame);
   }
   if(active)for(const holder of panel.querySelectorAll('[data-atlas-image]')){if(observer)observer.observe(holder);else void loadImage(holder);}
  }
  if(focus)button.focus({preventScroll:true});
 }
 const click=event=>{const button=event.target.closest('[data-visual-tab]');if(button&&root.contains(button)){event.preventDefault();activate(button);}};
 const keydown=event=>{const button=event.target.closest('[data-visual-tab]');if(!button||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=[...button.parentElement.querySelectorAll('[role=tab]')],index=tabs.indexOf(button);activate(tabs[event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length],true);};
 const languageChange=()=>{for(const video of root.querySelectorAll('[data-video-embed]'))if(video.firstElementChild)video.firstElementChild.title=video.dataset[lang()==='en'?'videoTitleEn':'videoTitleVi'];};
 root.addEventListener('click',click);root.addEventListener('keydown',keydown);document.addEventListener('v2-language-change',languageChange);
 for(const tab of root.querySelectorAll('[data-atlas-visual] [role=tab][aria-selected=true]'))activate(tab);
 return ()=>{disposed=true;observer?.disconnect();for(const v of root.querySelectorAll('[data-video-embed]'))v.replaceChildren();root.removeEventListener('click',click);root.removeEventListener('keydown',keydown);document.removeEventListener('v2-language-change',languageChange);};
}
