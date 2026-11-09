import {conferences,papers} from '../assets/runtime/conferences.mjs';
import {resolvePaperSelection,matchesPaperSelection,paperSelectionLabels} from '../assets/runtime/paper-selection.mjs';

export function initPaperBrowser(root,text){
 const year=root.querySelector('[data-research-filter="year"]'),award=root.querySelector('[data-research-filter="award"]');
 const chips=Array.from(root.querySelectorAll('[data-conference-select]'));
 const fields=Array.from(root.querySelectorAll('[data-conference-field]'));
 const cards=new Map(Array.from(root.querySelectorAll('[data-paper-id]'),card=>[card.dataset.paperId,card]));
 let selection;
 function readUrl(){selection=resolvePaperSelection(Object.fromEntries(new URLSearchParams(location.search)));}
 function writeUrl(push=false){
  const url=new URL(location.href);
  for(const key of ['conference','year','award','field']){
   if(selection[key])url.searchParams.set(key,selection[key]);else url.searchParams.delete(key);
  }
  // These controls no longer exist on the paper browser. Other pages keep them.
  for(const key of ['q','topic'])url.searchParams.delete(key);
  history[push?'pushState':'replaceState'](history.state,'',url);
 }
 function update(){
  year.replaceChildren(...(selection.years.length?selection.years.map(value=>new Option(value,value)):[new Option(text(['Chưa có năm','No years available']), '')]));
  year.value=selection.year;year.disabled=!selection.years.length;
  award.replaceChildren(new Option(text(['Tất cả','All']),''),...selection.awards.map(value=>new Option(text(paperSelectionLabels[value]),value)));
  award.value=selection.award;award.disabled=!selection.awards.length;
  for(const chip of chips){
   chip.hidden=Boolean(selection.field&&chip.dataset.field!==selection.field);
   if(chip.dataset.conferenceSelect===selection.conference)chip.setAttribute('aria-current','true');else chip.removeAttribute('aria-current');
  }
  for(const button of fields)button.setAttribute('aria-pressed',String(button.dataset.conferenceField===selection.field));
  const conference=conferences.find(c=>c.id===selection.conference);
  root.querySelector('[data-paper-heading]').textContent=(conference?.acronym||text(['Bài báo trong thư viện','Papers in the library']))+(selection.year?' · '+selection.year:'');
  let count=0;
  for(const paper of papers){
   const card=cards.get(paper.id);if(!card)continue;
   card.hidden=!matchesPaperSelection(paper,selection);if(!card.hidden)count++;
  }
  root.querySelector('[data-research-count]').textContent=count+' '+text(['bài báo','papers']);
  root.querySelector('[data-research-empty]').hidden=count!==0;
 }
 function choose(request){selection=resolvePaperSelection(request);update();writeUrl(true);}
 year.addEventListener('change',()=>choose({...selection,year:year.value,award:''}));
 award.addEventListener('change',()=>choose({...selection,award:award.value}));
 for(const button of fields)button.addEventListener('click',()=>{
  const field=button.dataset.conferenceField,current=conferences.find(c=>c.id===selection.conference);
  choose(!field||current?.field===field?{...selection,field}:{field});
 });
 for(const chip of chips)chip.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();choose({conference:chip.dataset.conferenceSelect,field:selection.field});
  const results=root.querySelector('#paper-results');results.focus({preventScroll:true});
  results.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 });
 window.addEventListener('popstate',()=>{readUrl();update();});
 readUrl();writeUrl();update();
 return {root,update,refreshDeadlines(){}};
}
