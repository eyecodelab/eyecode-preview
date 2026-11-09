// Pure presentation ordering; verified deadlines and edition selection stay in
// the existing planner. Relevance never uses CORE ranks or counts of tag matches.
import {deadlineFields} from '../assets/runtime/conference-planning.mjs';
import {compareConferencePlans} from './conference-planner.js';

export const deadlineSortModes={deadline:['Deadline gần nhất','Nearest Deadline'],relevance:['Phù hợp lĩnh vực','Field Relevance']};
export const defaultDeadlineSort='relevance';
export const deadlineRelevanceGroups=[
 {id:'primary',label:['Chuyên ngành','Primary'],description:['Hội nghị chuyên sâu về lĩnh vực nghiên cứu đã chọn.','Conferences specializing in the selected research field.']},
 {id:'related',label:['Liên quan','Related'],description:['Hội nghị có nhiều nghiên cứu về lĩnh vực đã chọn.','Conferences with substantial research in the selected field.']},
 {id:'adjacent',label:['Giao thoa','Adjacent'],description:['Hội nghị liên ngành có nghiên cứu liên quan.','Interdisciplinary conferences with relevant research.']}
];
export const fieldRelevanceTier=(conference,selected)=>Math.min(3,...selected.map(field=>{
 const index=deadlineRelevanceGroups.findIndex(group=>group.id===conference.relevance[field]);
 return index<0?3:index;
}));
export const groupsByRelevance=(selectedFields,mode)=>mode==='relevance'&&!Object.keys(deadlineFields).every(field=>selectedFields.includes(field));
export function sortDeadlinePlans(plans,selectedFields,mode=defaultDeadlineSort){
 const byRelevance=groupsByRelevance(selectedFields,mode);
 return [...plans].sort((a,b)=>(byRelevance?fieldRelevanceTier(a.conference,selectedFields)-fieldRelevanceTier(b.conference,selectedFields):0)||compareConferencePlans(a,b));
}
export function deadlinePlanGroups(plans,selectedFields,mode=defaultDeadlineSort){
 const sorted=sortDeadlinePlans(plans,selectedFields,mode);
 if(!groupsByRelevance(selectedFields,mode))return [{id:null,plans:sorted}];
 return deadlineRelevanceGroups.map((group,tier)=>({...group,plans:sorted.filter(plan=>fieldRelevanceTier(plan.conference,selectedFields)===tier)})).filter(group=>group.plans.length);
}
