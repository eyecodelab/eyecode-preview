// Generic decoding only. No curated records or private content may be imported here.
import {series as taxonomy} from './atlas-data.js';
const localized=(value,fallback)=>value&&typeof value==='object'&&!Array.isArray(value)
 && (typeof value.vi==='string'||typeof value.en==='string')
 ? {vi:typeof value.vi==='string'?value.vi:value.en,en:typeof value.en==='string'?value.en:value.vi}:fallback;
export function decodeAtlasRecords(data){
 const decode=(row,keys)=>{
  const out={...row};for(const key of keys)out[key]=localized(row.metadata?.i18n?.[key],row[key]);
  return out;
 };
 return {...data,
  series:(data.series||[]).map(row=>{
   const defaults=taxonomy.find(t=>t.slug===row.slug),out=decode(row,['title','description']);
   return {...out,group:defaults?.group,branches:Array.isArray(row.metadata?.branches)?row.metadata.branches.map(b=>localized(b,typeof b==='string'?b:'')):defaults?.branches};
  }),
  chains:(data.chains||[]).map(row=>decode(row,['title','description'])),
  models:(data.models||[]).map(row=>decode(row,['title','summary'])),
  principles:(data.principles||[]).map(row=>decode(row,['title','formulation','notes'])),
  connections:(data.connections||[]).map(row=>decode(row,['rationale'])),
  papers:data.papers||[]
 };
}
