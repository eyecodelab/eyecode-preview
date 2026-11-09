// Lightweight shared HTML renderer for static generation and browser rollovers.
// All interpolated data is escaped; no remote HTML or browser-time source scraping.
import {dateLabel,deadlineLabel} from './deadline-time.js';
import {displayedDeadline,countdownTimestamp,planCountdown,planStatusLabel} from './conference-planner.js';
import {conferenceResourceLinks} from '../assets/runtime/conference-planning.mjs';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external='target="_blank" rel="noopener noreferrer"';
const pair=(value,lang)=>Array.isArray(value)?value[lang==='en'?1:0]:value;
const time=(date,lang)=>`<time datetime="${escape(date)}">${escape(dateLabel(date,lang))}</time>`;
const link=(url,label)=>`<a href="${escape(url)}" ${external}>${escape(label)}</a>`;
export function deadlineTypeLabel(plan,lang='vi'){
 const labels={abstract:['Đăng ký abstract','Abstract registration'],full:['Bài hoàn chỉnh','Full Paper'],extendedAbstract:['Extended abstract','Extended abstract']};
 return pair(labels[plan.type],lang);
}
function eventDates(plan,lang){
 const dates=plan.edition.conferenceDates;
 return dates?`${time(dates.start,lang)} – ${time(dates.end,lang)}`:'TBA';
}
function venue(plan,lang){return plan.venue?escape(plan.venue.city+', '+pair(plan.venue.country,lang)):'TBA';}
export function renderDeadlineRow(plan,lang='vi',now=Date.now(),hidden=false){
 const t=value=>pair(value,lang),{conference,edition}=plan,display=displayedDeadline(plan);
 const label=deadlineTypeLabel(plan,lang),deadline=display?`<time datetime="${escape(display.at||display.date)}">${escape(deadlineLabel(display,lang))}</time>`:'TBA';
 const badge=conference.id==='corl'?'A*':conference.core_rank?'CORE '+conference.core_rank:null;
 const topics=(conference.mainTopics||[]).map(topic=>`<li>${escape(topic)}</li>`).join('');
 const resources=conferenceResourceLinks(conference.id,edition.year);
 const sources=link(conference.url,t(['Website hội nghị','Conference Website']))+(conference.proceedingsUrl?link(conference.proceedingsUrl,'Proceedings'):'')+
  (resources.templateUrl?link(resources.templateUrl,'Paper Template'):'')+(resources.submissionUrl?link(resources.submissionUrl,resources.submissionLabel):'');
 return `<details class="v2-deadline-row"${hidden?' hidden':''} data-conference-id="${conference.id}" data-edition-id="${edition.id}" data-status="${countdownTimestamp(display)!==null?'upcoming':'tba'}" data-deadline-mode="${plan.status}" data-projected="${plan.projected}"><summary><div class="v2-deadline-summary-copy"><div class="v2-deadline-row-heading"><h2>${escape(conference.acronym)} ${edition.year}</h2>${badge?`<span class="v2-core-badge">${escape(badge)}</span>`:''}${plan.projected?`<span class="v2-small">${t(['Kỳ dự kiến','Projected edition'])}</span>`:''}</div><p class="v2-deadline-event">${t(['Địa điểm','Venue'])}: ${venue(plan,lang)} · ${t(['Ngày tổ chức','Conference dates'])}: ${eventDates(plan,lang)}</p><p class="v2-deadline-next"><span data-next-kind>${escape(label)}</span> · <span data-next-date>${deadline}</span></p></div><div class="v2-deadline-summary-end"><div class="v2-deadline-counter"><strong data-deadline-countdown>${escape(planCountdown(plan,now,lang))}</strong><span class="v2-deadline-timing-status">${planStatusLabel(plan,lang)}</span></div><span class="v2-deadline-expand"><span class="v2-deadline-show">${t(['Chi tiết','Details'])}</span><span class="v2-deadline-hide">${t(['Thu gọn','Collapse'])}</span><svg class="v2-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m8 4 8 8-8 8"/></svg></span></div></summary><div class="v2-deadline-expanded"><h3 lang="en">${escape(conference.name)}</h3><h4>${t(['Chủ đề chính','Main Topics'])}</h4><ul class="v2-deadline-topics" lang="en">${topics}</ul><div class="v2-paper-links">${sources}</div></div></details>`;
}
