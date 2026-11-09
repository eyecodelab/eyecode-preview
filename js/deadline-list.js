import {deadlineFields as fields,deadlineConferences,rankingGroups,matchesDeadlineFilters} from '../assets/runtime/conference-planning.mjs';
import {conferencePlans,planCountdown} from './conference-planner.js';
import {renderDeadlineRow} from './deadline-render.js';
import {deadlineSortModes,defaultDeadlineSort,deadlinePlanGroups} from './deadline-sort.js';

export function initDeadlineList(root,text){
 const inputs=[...root.querySelectorAll('input[name="fields"]')],ranks=[...root.querySelectorAll('input[name="ranks"]')],list=root.querySelector('[data-deadline-list]'),sort=root.querySelector('[data-deadline-sort]');
 const rows=new Map([...list.querySelectorAll('.v2-deadline-row')].map(element=>[element.dataset.conferenceId,{element,key:null}]));
 const headings=new Map();
 let currentPlans=[];
 const language=()=>document.documentElement.lang==='en'?'en':'vi';
 const setText=(element,value)=>{if(element.textContent!==value)element.textContent=value;};
 const selectedFields=()=>inputs.filter(input=>input.checked).map(input=>input.value);
 function orderRows(plans=currentPlans){
  const visible=plans.filter(plan=>!rows.get(plan.conference.id).element.hidden),ordered=[];
  for(const group of deadlinePlanGroups(visible,selectedFields(),sort.value)){
   if(group.id){
    let heading=headings.get(group.id);
    if(!heading){
     heading=document.createElement('div');heading.className='v2-deadline-group';heading.dataset.deadlineGroup=group.id;
     heading.append(document.createElement('h2'),document.createElement('p'));headings.set(group.id,heading);
    }
    setText(heading.firstElementChild,text(group.label));setText(heading.lastElementChild,text(group.description));ordered.push(heading);
   }
   ordered.push(...group.plans.map(plan=>rows.get(plan.conference.id).element));
  }
  // Keep filtered rows available without counting them or showing empty groups.
  ordered.push(...plans.filter(plan=>rows.get(plan.conference.id).element.hidden).map(plan=>rows.get(plan.conference.id).element));
  const wanted=new Set(ordered);
  for(const child of [...list.children])if(!wanted.has(child))child.remove();
  // Move nodes only when the ordering changes; countdown ticks retain open details.
  ordered.forEach((element,index)=>{if(list.children[index]!==element)list.insertBefore(element,list.children[index]||null);});
 }
 function readUrl(){
  const params=new URLSearchParams(location.search),value=params.has('fields')?params.get('fields'):params.get('field');
  const selected=value===null?Object.keys(fields):value.split(',');
  for(const input of inputs)input.checked=selected.includes(input.value);
  const selectedRanks=params.has('ranks')?params.get('ranks').split(','):['a'];
  for(const input of ranks)input.checked=selectedRanks.includes(input.value);
  const mode=params.get('sort');sort.value=Object.hasOwn(deadlineSortModes,mode)?mode:defaultDeadlineSort;
 }
 function update(){
  const selected=inputs.filter(input=>input.checked).map(input=>input.value),selectedRanks=ranks.filter(input=>input.checked).map(input=>input.value);let count=0;
  for(const conference of deadlineConferences){const row=rows.get(conference.id);if(!row)continue;row.element.hidden=!matchesDeadlineFilters(conference,selected,selectedRanks);if(!row.element.hidden)count++;}
  setText(root.querySelector('[data-deadline-count]'),count+' '+text(['hội nghị','conferences']));
  root.querySelector('[data-deadline-empty]').hidden=count!==0;
  orderRows();
 }
 function refreshDeadlines(){
  const now=Date.now(),lang=language(),plans=conferencePlans(now);
  currentPlans=plans;
  const active=document.activeElement,focused=active?.closest('.v2-deadline-row'),focusId=focused?.dataset.conferenceId;
  const focusedSummary=focused?.querySelector('summary')===active;
  for(const plan of plans){
   const id=plan.conference.id,key=JSON.stringify([lang,plan.edition.id,plan.status,plan.estimate,plan.history]);
   let row=rows.get(id);
   if(!row||row.key!==key){
    const template=document.createElement('template');template.innerHTML=renderDeadlineRow(plan,lang,now);
    const element=template.content.firstElementChild;
    if(row){element.open=row.element.open;element.hidden=row.element.hidden;row.element.replaceWith(element);}
    else list.append(element);
    row={element,key};rows.set(id,row);
   }
   setText(row.element.querySelector('[data-deadline-countdown]'),planCountdown(plan,now,lang));
  }
  orderRows(plans);
  if(focusId&&document.activeElement!==active){
   // Keep keyboard focus in its series across automatic rollover/reordering.
   const element=rows.get(focusId)?.element;
   if(focusedSummary||!active.isConnected)element?.querySelector('summary').focus({preventScroll:true});
   else active.focus({preventScroll:true});
  }
 }
 for(const input of [...inputs,...ranks,sort])input.addEventListener('change',()=>{
  const url=new URL(location.href),selected=inputs.filter(input=>input.checked).map(input=>input.value);
  if(selected.length===inputs.length)url.searchParams.delete('fields');else url.searchParams.set('fields',selected.join(','));
  const selectedRanks=ranks.filter(input=>input.checked).map(input=>input.value);
  if(selectedRanks.length===1&&selectedRanks[0]==='a')url.searchParams.delete('ranks');else url.searchParams.set('ranks',selectedRanks.filter(rank=>rank in rankingGroups).join(','));
  if(sort.value===defaultDeadlineSort)url.searchParams.delete('sort');else url.searchParams.set('sort',sort.value);
  url.searchParams.delete('field');history.replaceState(history.state,'',url);update();
 });
 window.addEventListener('popstate',()=>{readUrl();refreshDeadlines();update();});
 readUrl();refreshDeadlines();update();
 return {root,update,refreshDeadlines};
}
