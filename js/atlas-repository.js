import {decodeAtlasRecords} from './atlas-records.js';
import {createAdminAuthorization} from './admin-auth.js';
export {createAdminAuthorization};
export class AtlasLoadError extends Error {
 constructor(reason){super('Atlas unavailable');this.reason=reason;}
}
export const isLocalAtlasOrigin=location=>location?.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(location.hostname);
export async function loadAtlas({access,getAuth=()=>window.EyeCodeAuth,source='auto',getLocation=()=>globalThis.location,fetchLocal=(...args)=>fetch(...args),loadSamples=()=>import('./atlas-samples.js')}={}) {
 await access.requireAdmin();
 const auth=getAuth(),session=auth?.state?.session,token=session?.access_token;
 const valid=()=>access.getState().authorized&&getAuth()===auth&&auth?.state?.session?.access_token===token;
 const read=async path=>{
  if(!valid())throw new AtlasLoadError('access_lost');
  const rows=await auth.api(path,{token});
  if(!valid())throw new AtlasLoadError('access_lost');
  if(!Array.isArray(rows))throw new AtlasLoadError('invalid_data');
  return rows;
 };
 if(source==='local'||source==='auto'&&isLocalAtlasOrigin(getLocation())){
  if(!isLocalAtlasOrigin(getLocation()))throw new AtlasLoadError('local_unavailable');
  let response;
  try{response=await fetchLocal('/_dev/atlas',{headers:{Authorization:'Bearer '+token},cache:'no-store',credentials:'omit',redirect:'error'});}catch{throw new AtlasLoadError('connection_failed');}
  if(!valid())throw new AtlasLoadError('access_lost');
  if(response.ok){
   const payload=await response.json();if(!valid())throw new AtlasLoadError('access_lost');
   if(payload?.version!==1||!payload.data||!['series','chains','models','papers','principles','connections'].every(k=>Array.isArray(payload.data[k])))throw new AtlasLoadError('invalid_data');
   return {...decodeAtlasRecords(payload.data),source:'local',schema:'local'};
  }
  if(response.status!==404||source==='local')throw new AtlasLoadError(response.status===401||response.status===403?'access_lost':response.status===404?'local_unavailable':'connection_failed');
  // A filtered public/preview artifact has no local endpoint; its existing source behavior stays intact.
 }
 let schema='available';
 try {await read('/rest/v1/atlas_series?select=id&limit=1');}
 catch(error){
  if(!valid())throw new AtlasLoadError('access_lost');
  // PostgREST missing relation/schema-cache responses only. Permission/network errors never become sample access.
  if(error.status===404)schema='unavailable';
  else throw new AtlasLoadError(error.status===401||error.status===403?'access_lost':'connection_failed');
 }
 if(source!=='database'){
  const module=await loadSamples();if(!valid())throw new AtlasLoadError('access_lost');
  return {...module.sampleAtlas,source:'sample',schema};
 }
 if(schema!=='available')throw new AtlasLoadError('schema_unavailable');
 const names=['series','chains','models','principles','papers','connections'];
 const values=await Promise.all(names.map(name=>read(`/rest/v1/atlas_${name}?select=*&order=position.asc,id.asc&limit=501${name==='connections'?'&source_idea_id=is.null&target_idea_id=is.null':''}`)));
 if(values.some(rows=>rows.length>500))throw new AtlasLoadError('dataset_too_large'); // never silently truncate a research graph
 if(!valid())throw new AtlasLoadError('access_lost');
 const data=Object.fromEntries(names.map((name,i)=>[name,values[i]]));
 return {...decodeAtlasRecords(data),source:'database',schema};
}
