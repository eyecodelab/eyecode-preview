import {editions} from '../assets/runtime/conferences.mjs';
import {deadlineConferences,seriesSchedule,historicalPrimaries,editionVenues,planningEditions} from '../assets/runtime/conference-planning.mjs';
import {primaryDeadlineKind} from './deadline-time.js';
import {timestamp,countdown} from './conference-time.js';
const datePassed=(date,now)=>Date.parse(date+'T23:59:59-12:00')<=now;
// Calculation assumptions only: never write fallback clocks into source records,
// visible source-clock labels, projections, or official calendar exports.
export function countdownTimestamp(deadline){
 if(deadline?.at)return timestamp(deadline.at);
 if(!deadline?.date)return null;
 const zone=deadline.timezone?.replace(/−/g,'-').trim();
 const offsets={AoE:'-12:00',UTC:'+00:00',GMT:'+00:00',CET:'+01:00',PST:'-08:00',HST:'-10:00'};
 const offset=zone?(zone.match(/[+-]\d{2}:\d{2}/)?.[0]||offsets[zone]):'-12:00';
 if(!offset)throw new Error('Unsupported deadline timezone: '+zone);
 return timestamp(deadline.date+'T23:59:00'+offset);
}
export const primaryType=(edition,kind=primaryDeadlineKind(edition))=>kind==='abstract'&&/extended abstract/i.test(edition.deadlines.abstract?.label?.[1]||'')?'extendedAbstract':kind;
export function primaryHistory(conferenceId,records=editions,history=historicalPrimaries,now=Date.now()){
 const all=[...records.filter(ed=>ed.conferenceId===conferenceId).map(ed=>{
  const kind=primaryDeadlineKind(ed),milestone=ed.deadlines[kind];
  return milestone?{conferenceId,year:ed.year,type:primaryType(ed,kind),date:milestone.at?.slice(0,10)||milestone.date,at:milestone.at||null,timezone:milestone.timezone||null,source:ed.source,verifiedOn:ed.verifiedOn}:null;
 }).filter(Boolean),...history.filter(h=>h.conferenceId===conferenceId)];
 const unique=new Map();
 for(const item of all){
  const existing=unique.get(item.year);
  // A separately verified clock can enrich a date-only observation for the
  // same primary/date without rewriting the original edition registry.
  if(!existing||(!existing.at&&item.at&&item.type===existing.type&&item.date===existing.date))unique.set(item.year,item);
 }
 return [...unique.values()].filter(h=>countdownTimestamp(h)<=now).sort((a,b)=>b.year-a.year);
}
export function estimateSubmission(year,type,history,interval=1){
 const previous=history.filter(h=>h.year<year&&h.type===type).sort((a,b)=>b.year-a.year)[0];
 if(!previous)return {estimate:null,samples:[],reason:'insufficient'};
 const advance=year-previous.year,samples=[previous];
 if(advance%interval!==0)return {estimate:null,samples,reason:'cycle'};
 const projectedYear=Number(previous.date.slice(0,4))+advance;
 const date=String(projectedYear).padStart(4,'0')+previous.date.slice(4);
 // Preserve the calendar day; Feb 29 is TBA when the target year has no such day.
 if(new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)return {estimate:null,samples,reason:'calendar'};
 const at=previous.at?date+previous.at.slice(10):null;
 if(at)timestamp(at);
 return {estimate:{date,at,timezone:previous.timezone||null,baseYear:previous.year,source:previous.source,cycles:advance/interval},samples,reason:null};
}
function planFor(edition,conference,history,registered){
 const kind=primaryDeadlineKind(edition),milestone=edition.deadlines[kind];
 const type=milestone?primaryType(edition,kind):seriesSchedule[conference.id].primaryType;
 const forecast=estimateSubmission(edition.year,type,history,seriesSchedule[conference.id].interval);
 return {conference,edition,kind:milestone?kind:type==='full'?'full':'abstract',type,milestone:milestone||null,
  projected:Boolean(edition.projected),venue:edition.venue||editionVenues[edition.id]||null,
  registered,history:history.filter(h=>h.year<edition.year).slice(0,3),...forecast,
  estimate:milestone?null:forecast.estimate,status:milestone?'confirmed':forecast.estimate?'estimated':'tba'};
}
export function selectConferenceEdition(conference,now=Date.now(),{records=editions,history=historicalPrimaries,additional=planningEditions}={}){
 const interval=seriesSchedule[conference.id].interval;
 const collection=[...records,...additional.filter(ed=>!records.some(record=>record.id===ed.id))].filter(ed=>ed.conferenceId===conference.id).sort((a,b)=>a.year-b.year);
 const past=primaryHistory(conference.id,collection,history,now),year=new Date(now).getUTCFullYear();
 const usable=plan=>{
  const target=countdownTimestamp(displayedDeadline(plan));
  if(target!==null)return target>now;
  if(plan.edition.conferenceDates&&datePassed(plan.edition.conferenceDates.end,now))return false;
  return plan.edition.year>=year;
 };
 for(const ed of collection){
  const plan=planFor(ed,conference,past,records.some(record=>record.id===ed.id));
  if(usable(plan))return plan;
 }
 // Project only an edition year. Never inherit a past edition's venue, dates,
 // verification date, official source, or submission timestamp.
 const latest=collection.at(-1)?.year??year-interval;
 let projectedYear=latest+interval;
 if(projectedYear<year)projectedYear+=Math.ceil((year-projectedYear)/interval)*interval;
 while(true){
  const ed={id:`${conference.id}-${projectedYear}`,conferenceId:conference.id,year:projectedYear,projected:true,deadlines:{},source:null,verifiedOn:null,conferenceDates:null};
  const plan=planFor(ed,conference,past,false);
  if(usable(plan))return plan;
  projectedYear+=interval;
 }
}
export const displayedDeadline=plan=>plan.milestone||plan.estimate;
export function compareConferencePlans(a,b){
 const left=countdownTimestamp(displayedDeadline(a)),right=countdownTimestamp(displayedDeadline(b));
 if(left===null||right===null)return Number(left===null)-Number(right===null)||a.conference.acronym.localeCompare(b.conference.acronym);
 return left-right||a.conference.acronym.localeCompare(b.conference.acronym);
}
export const conferencePlans=(now=Date.now(),options={})=>deadlineConferences.map(c=>selectConferenceEdition(c,now,options)).sort(compareConferencePlans);
export const planStatusLabel=(plan,lang='vi')=>plan.status==='confirmed'?(lang==='en'?'Official':'Chính thức'):plan.status==='estimated'?(lang==='en'?'Estimated':'Dự kiến'):'TBA';
export function planCountdown(plan,now=Date.now(),lang='vi'){
 const target=countdownTimestamp(displayedDeadline(plan));
 if(target===null)return 'TBA';
 const {days,hours,minutes}=countdown(target,now);
 const label=lang==='en'?`${days}d ${hours}h ${minutes}m`:`${days} ngày ${hours} giờ ${minutes} phút`;
 return (plan.status==='estimated'?'~ ':'')+label;
}
