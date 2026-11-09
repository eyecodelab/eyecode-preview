import {timestamp,countdown} from './conference-time.js';

export const milestoneLabels={
 abstract:['Đăng ký abstract','Abstract registration'],
 extendedAbstract:['Nộp extended abstract','Extended abstract submission'],
 full:['Nộp bài hoàn chỉnh','Full paper submission'],
 supplementary:['Nộp tài liệu bổ sung','Supplementary submission'],
 rebuttal:['Phản hồi tác giả','Rebuttal / author response'],
 notification:['Thông báo kết quả','Notification'],
 cameraReady:['Nộp bản camera-ready','Camera-ready submission']
};
export const statusLabels={upcoming:['Sắp đến hạn','Upcoming'],closed:['Đã qua hạn','Deadline passed'],tba:['Chưa công bố (TBA)','To be announced (TBA)']};
// Notification is informational, never a replacement for a submission deadline.
export const submissionKinds=['abstract','extendedAbstract','full','supplementary','rebuttal','cameraReady'];
export const conferenceFields=conference=>conference.fields||[conference.field];
export const matchesFields=(conference,selected)=>conferenceFields(conference).some(field=>selected.includes(field));
export const milestoneLabel=(edition,kind)=>edition.deadlines[kind]?.label||milestoneLabels[kind];
// A mandatory abstract closes the opportunity for new submissions even if the
// later full-paper date is still ahead. Optional abstracts never take priority.
export const primaryDeadlineKind=edition=>edition.abstractRequired?'abstract':'full';
export function nextDeadline(edition,now=Date.now()){
 const kind=primaryDeadlineKind(edition),milestone=edition.deadlines[kind],at=timestamp(milestone?.at);
 if(at!==null)return {status:at>now?'upcoming':'closed',kind,next:at>now?at:null};
 // No precise countdown or guessed clock for date-only/unannounced deadlines.
 const closed=milestone?.date&&Date.parse(milestone.date+'T23:59:59-12:00')<=now;
 return {status:closed?'closed':'tba',kind,next:null};
}
export function compareDeadlineRows(a,b,now=Date.now()){
 const left=nextDeadline(a,now),right=nextDeadline(b,now),rank={upcoming:0,tba:1,closed:2};
 return rank[left.status]-rank[right.status]||(left.status==='upcoming'?left.next-right.next:b.year-a.year)||a.conferenceId.localeCompare(b.conferenceId);
}
export function dateLabel(value,lang='vi'){
 return new Intl.DateTimeFormat(lang==='en'?'en-US':'vi-VN',{year:'numeric',month:lang==='en'?'short':'2-digit',day:lang==='en'?'numeric':'2-digit',timeZone:'UTC'}).format(new Date(value+'T12:00:00Z'));
}
export function deadlineLabel(milestone,lang='vi'){
 if(!milestone)return lang==='en'?'To be announced (TBA)':'Chưa công bố (TBA)';
 return dateLabel(milestone.at?.slice(0,10)||milestone.date,lang)+' · '+(milestone.at?milestone.at.slice(11,16):lang==='en'?'Time TBA':'Giờ chưa công bố')+(milestone.timezone?' · '+milestone.timezone:'');
}
export function countdownLabel(state,now=Date.now(),lang='vi'){
 if(state.status!=='upcoming')return statusLabels[state.status][lang==='en'?1:0];
 const {days,hours,minutes}=countdown(state.next,now);
 return lang==='en'?(days?`${days}d ${hours}h`:`${hours}h ${minutes}m`):(days?`${days} ngày ${hours} giờ`:`${hours} giờ ${minutes} phút`);
}
