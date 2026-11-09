// Pure timezone/countdown logic shared by browser controls, static generation and tests.
export function timestamp(value) {
    if (value === null || value === undefined) return null;
    if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:Z|[+-]\d\d:\d\d)$/.test(value)) throw new Error('Deadline needs an explicit timezone-aware timestamp');
    const parsed=Date.parse(value);
    const parts=value.match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(Z|([+-])(\d\d):(\d\d))$/);
    const [,year,month,day,hour,minute,second]=parts;
    const monthDays=new Date(Date.UTC(Number(year),Number(month),0)).getUTCDate();
    if (!Number.isFinite(parsed) || Number(month)<1 || Number(month)>12 || Number(day)<1 || Number(day)>monthDays || Number(hour)>23 || Number(minute)>59 || Number(second)>59 || (parts[7]!=='Z' && (Number(parts[9])>14 || Number(parts[10])>59 || (Number(parts[9])===14 && Number(parts[10])!==0)))) throw new Error('Invalid deadline timestamp');
    return parsed;
}
export function deadlineState(edition, now=Date.now()) {
    const full=timestamp(edition.deadlines.full?.at), abstract=timestamp(edition.deadlines.abstract?.at);
    // A source with a date but no clock cannot drive a precise countdown.
    // Only classify it closed once that calendar day has ended everywhere.
    const dateOnly=edition.deadlines.full?.date;
    if (full===null && dateOnly && Date.parse(dateOnly+'T23:59:59-12:00')<=now) return {status:'closed',next:null,kind:'full',deadline:null};
    if (full !== null && full<=now) return {status:'closed',next:null,kind:'full',deadline:full};
    if (full !== null) return abstract!==null&&abstract>now ? {status:'upcoming',next:abstract,kind:'abstract',deadline:full} : {status:'upcoming',next:full,kind:'full',deadline:full};
    if (abstract!==null&&abstract>now) return {status:'upcoming',next:abstract,kind:'abstract',deadline:null};
    return {status:'tba',next:null,kind:null,deadline:null};
}
export function countdown(target,now=Date.now()) {
    const total=Math.max(0,Math.floor((target-now)/1000));
    return {days:Math.floor(total/86400),hours:Math.floor(total%86400/3600),minutes:Math.floor(total%3600/60),seconds:total%60};
}
export function compareEditions(a,b,now=Date.now()) {
    const left=deadlineState(a,now),right=deadlineState(b,now),rank={upcoming:0,tba:1,closed:2};
    return rank[left.status]-rank[right.status] || (left.status==='upcoming'?left.next-right.next:b.year-a.year) || a.conferenceId.localeCompare(b.conferenceId);
}
