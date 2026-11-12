// The generated collection contains curated public-paper research only, never hosted private records.
import {decodeAtlasRecords} from './atlas-records.js';
export class AtlasLoadError extends Error {
 constructor(reason){super('Atlas unavailable');this.reason=reason;}
}
export async function loadAtlas({loadStatic=()=>import('../assets/atlas/collection.js')}={}) {
 let payload;
 try{payload=await loadStatic();}catch{throw new AtlasLoadError('collection_unavailable');}
 if(payload?.version!==1||!payload.data||!['series','chains','models','papers','principles','connections'].every(k=>Array.isArray(payload.data[k])))throw new AtlasLoadError('invalid_data');
 return {...decodeAtlasRecords(payload.data),source:'static',schema:'static'};
}
