import {initPaperBrowser} from './paper-library.js';
import {initDeadlineList} from './deadline-list.js';
import {editions} from '../assets/runtime/conferences.mjs';
import {deadlineState,countdown,compareEditions} from './conference-time.js';
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
const language=()=>document.documentElement.lang==='en'?'en':'vi';
const labels={upcoming:['Sắp đến hạn','Upcoming'],closed:['Đã đóng','Closed'],tba:['Chưa công bố','Not yet announced']};
const text=pair=>pair[language()==='en'?1:0];
const browsers=[];
for(const root of document.querySelectorAll('[data-research-browser]')){
 if(root.dataset.researchBrowser==='papers'){browsers.push(initPaperBrowser(root,text));continue;}
 if(root.dataset.researchBrowser==='deadline-list'){browsers.push(initDeadlineList(root,text));continue;}
 const controls=Array.from(root.querySelectorAll('[data-research-filter]')),input=root.querySelector('[data-research-search]');
 const cards=Array.from(root.querySelectorAll('[data-research-item]'));
 function readUrl(){const params=new URLSearchParams(location.search);for(const select of controls){const value=params.get(select.dataset.researchFilter)||'';select.value=Array.from(select.options).some(option=>option.value===value)?value:'';}if(input)input.value=params.get('q')||'';}
 function writeUrl(){const url=new URL(location.href);for(const select of controls){const key=select.dataset.researchFilter;if(select.value)url.searchParams.set(key,select.value);else url.searchParams.delete(key);}if(input?.value.trim())url.searchParams.set('q',input.value.trim());else url.searchParams.delete('q');history.replaceState(history.state,'',url);}
 function update(){
  const query=normalize(input?.value.trim()||'');let count=0;
  for(const card of cards){const matches=controls.every(select=>!select.value||card.dataset[select.dataset.researchFilter]===select.value)&&(!query||normalize(card.dataset.search||'').includes(query));card.hidden=!matches;if(matches)count++;}
  const counter=root.querySelector('[data-research-count]');if(counter)counter.textContent=count+' '+text(['kỳ hội nghị','conference editions']);
  const empty=root.querySelector('[data-research-empty]');if(empty)empty.hidden=count!==0;
 }
 function refreshDeadlines(){
  if(root.dataset.researchBrowser!=='deadlines')return;
  const now=Date.now();
  for(const card of cards){
   const edition=editions.find(ed=>ed.id===card.dataset.editionId);if(!edition)continue;
   const state=deadlineState(edition,now);card.dataset.status=state.status;
   card.querySelector('[data-deadline-status]').textContent=text(labels[state.status]);
   const counter=card.querySelector('[data-countdown]');
   if(state.status==='upcoming'){
    const time=countdown(state.next,now),kind=edition.deadlines[state.kind]?.label||({abstract:['Abstract','Abstract'],full:['Bài hoàn chỉnh','Full paper']})[state.kind];
    counter.textContent=text(kind)+': '+(language()==='en'?`${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s remaining`:`còn ${time.days} ngày ${time.hours} giờ ${time.minutes} phút ${time.seconds} giây`);
   }else counter.textContent=text(labels[state.status]);
  }
  const list=root.querySelector('[data-deadline-list]');
  const sorted=[...cards].sort((a,b)=>compareEditions(editions.find(e=>e.id===a.dataset.editionId),editions.find(e=>e.id===b.dataset.editionId),now));
  if(list&&sorted.some((card,index)=>list.children[index]!==card))for(const card of sorted)list.append(card);
 }
 root.querySelector('form')?.addEventListener('submit',event=>{event.preventDefault();writeUrl();update();});
 for(const select of controls)select.addEventListener('change',()=>{writeUrl();update();});
 input?.addEventListener('input',()=>{writeUrl();update();});
 root.querySelector('[data-research-reset]')?.addEventListener('click',()=>{for(const control of controls)control.value='';if(input)input.value='';writeUrl();update();});
 window.addEventListener('popstate',()=>{readUrl();refreshDeadlines();update();});
 browsers.push({root,update,refreshDeadlines});readUrl();refreshDeadlines();update();
}
// One interval for all deadline cards; paused in a hidden tab and recalculated on return.
let timer=null;
function tick(){for(const browser of browsers){browser.refreshDeadlines();browser.update();}}
function schedule(){if(timer!==null){clearInterval(timer);timer=null;}tick();if(!document.hidden&&browsers.some(b=>['deadlines','deadline-list'].includes(b.root.dataset.researchBrowser)))timer=setInterval(tick,1000);}
if(browsers.length){document.addEventListener('visibilitychange',schedule);document.addEventListener('v2-language-change',tick);schedule();}
