import {conferences,papers} from './conferences.mjs';

// The Recognition dropdown groups exact award types. Exact labels stay on cards and detail pages.
// "Outstanding", runner-up and honorable mentions are official awards other than the Best Paper title;
// they are never relabeled as Best Paper. Labels alone never add options: a group must occur in metadata.
export const paperSelectionLabels={best:['Best Paper','Best Paper'],other:['Giải thưởng khác','Other Awards'],pick:['EyeCode Picks','EyeCode Picks']};
const recognitionGroup={best:'best',outstanding:'other','runner-up':'other',honorable:'other',student:'other','student-honorable':'other',pick:'pick'};
export function paperSelections(paper){
 const group=recognitionGroup[paper.award?.type];
 return group?[group]:[];
}
export function resolvePaperSelection(request={},registry=papers,taxonomy=conferences){
 let field=taxonomy.some(c=>c.field===request.field)?request.field:'';
 let conference=taxonomy.find(c=>c.id===request.conference);
 if(conference&&field&&conference.field!==field)field=conference.field;
 const available=taxonomy.filter(c=>!field||c.field===field);
 conference ||= available.find(c=>registry.some(p=>p.conferenceId===c.id))||available[0];
 const members=registry.filter(p=>p.conferenceId===conference?.id);
 const years=[...new Set(members.map(p=>String(p.year)))].sort((a,b)=>Number(b)-Number(a));
 const year=years.includes(String(request.year))?String(request.year):years[0]||'';
 const selections=new Set(members.filter(p=>String(p.year)===year).flatMap(paperSelections));
 const awards=Object.keys(paperSelectionLabels).filter(type=>selections.has(type));
 return {conference:conference?.id||'',field,year,award:awards.includes(request.award)?request.award:'',years,awards};
}
export const matchesPaperSelection=(paper,selection)=>paper.conferenceId===selection.conference
 &&String(paper.year)===selection.year&&(!selection.award||paperSelections(paper).includes(selection.award));
