import {mountAtlasVisuals} from './atlas-visuals.js';
import {loadAtlas} from './atlas-repository.js';
import {renderAtlas,sourceNotice,escape} from './atlas-view.js';
const mount=document.querySelector('[data-atlas-root]');
if(mount){
 let generation=0,loading=false,disposed=false,cache=null,pending=null,readerScript=null;
 let displayedRoute='';
 let scrollFrame=0,disposeVisuals=()=>{};
 const saveScroll=()=>history.replaceState({...history.state,atlasScroll:[scrollX,scrollY]},'',location.href);
 saveScroll();
 const previousRestoration=history.scrollRestoration;
 history.scrollRestoration='manual';
 const lang=()=>document.documentElement.lang==='en'?'en':'vi';
 const words=(vi,en)=>lang()==='en'?en:vi;
 function clearView(){
  disposeVisuals();disposeVisuals=()=>{};
  window.EyeCodeArticleNavigation?.dispose();
  // Scrub nodes that might briefly be retained by pending reader/observer callbacks.
  for(const node of mount.querySelectorAll('*')){node.replaceChildren();for(const attr of [...node.attributes])node.removeAttribute(attr.name);}
  mount.replaceChildren();mount.removeAttribute('aria-busy');
  document.body.classList.remove('v2-article-page','v2-reading-panel-open');
  document.documentElement.classList.remove('v2-article-document');
 }
 function forget(){cache=null;pending=null;}
 function message(reason='collection_unavailable'){
  clearView();
  const loading=reason==='loading';
  const vi=loading?'Đang tải nội dung nghiên cứu…':'Không tải được bộ sưu tập nghiên cứu. Vui lòng thử lại.';
  const en=loading?'Loading research collection…':'Could not load the research collection. Please retry.';
  mount.innerHTML=`<section class="v2-container v2-section atlas-access"><h1>AI Research Atlas</h1><p role="status"><span data-vi="${escape(vi)}" data-en="${escape(en)}">${escape(words(vi,en))}</span></p>${loading?'':`<button class="v2-button v2-secondary" type="button" data-atlas-retry>${words('Thử lại','Retry')}</button>`}</section>`;
 }
 function ensureReader(){
  if(window.EyeCodeArticleNavigation)return Promise.resolve();
  if(!readerScript)readerScript=new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.src='js/article-navigation.js';script.onload=resolve;script.onerror=()=>{readerScript=null;script.remove();reject(new Error('Reader unavailable'));};document.body.append(script);
  });
  return readerScript;
 }
 function syncLanguage(){
  const requested=new URLSearchParams(location.search).get('lang');
  if(['vi','en'].includes(requested)&&requested!==lang())document.querySelector(`[data-language="${requested}"]`)?.click();
 }
 async function render(data,ticket,{pop=false,focus=false,restoreScroll}={}){
  if(ticket!==generation||disposed)return;
  syncLanguage();clearView();
  mount.innerHTML=sourceNotice(data)+renderAtlas(data,new URLSearchParams(location.search));
  disposeVisuals=mountAtlasVisuals(mount);
  displayedRoute=location.pathname+location.search;
  if(mount.querySelector('.v2-article-layout')){
   document.documentElement.classList.add('v2-article-document');document.body.classList.add('v2-article-page');
   await ensureReader();
   if(ticket!==generation||disposed)return;
   window.EyeCodeArticleNavigation.mount();
  }
  if(ticket!==generation||disposed)return;
  if(focus){const target=location.hash?document.getElementById(location.hash.slice(1)):null;const heading=target?.querySelector('button[data-atlas-key],h2')||target||mount.querySelector('h1');if(heading?.tagName!=='BUTTON')heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});}
  requestAnimationFrame(()=>{
   if(ticket!==generation||disposed)return;
   if(location.hash)window.dispatchEvent(new Event('hashchange'));
   else {const pos=pop?restoreScroll:null;window.scrollTo({left:pos?.[0]||0,top:pos?.[1]||0,behavior:'instant'});}
   saveScroll();
  });
 }
 async function show({fresh=false,pop=false,focus=false,restoreScroll}={}){
  if(disposed)return;
  const ticket=++generation;
  if(cache&&!fresh){await render(cache,ticket,{pop,focus,restoreScroll});return;}
  loading=true;message('loading');
  try{
   if(!pending)pending=loadAtlas().finally(()=>{pending=null;});
   const data=await pending;
   if(ticket!==generation||disposed)return;
   cache=data;await render(data,ticket,{pop,focus,restoreScroll});
  }catch(error){if(ticket===generation&&!disposed){forget();message(error.reason);}}
  finally{if(ticket===generation){loading=false;mount.removeAttribute('aria-busy');}}
 }
 function navigate(url,{pop=false,restoreScroll}={}){
  if(!pop){saveScroll();history.pushState({...history.state,atlasScroll:[0,0]},'',url);}
  void show({pop,focus:!pop,restoreScroll});
 }
 mount.addEventListener('click',event=>{
  if(event.target.closest('[data-atlas-retry]')){forget();void show({fresh:true});return;}
  const control=event.target.closest('button[data-atlas-key]');
  if(control&&!event.defaultPrevented){const url=new URL(control.dataset[lang()==='en'?'atlasHrefEn':'atlasHrefVi'],location.href);if(url.origin===location.origin&&url.pathname===location.pathname){event.preventDefault();navigate(url);}return;}
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||link.target&&link.target!=='_self')return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||url.pathname!==location.pathname||link.getAttribute('href').startsWith('#'))return;
  event.preventDefault();navigate(url);
 });
 window.addEventListener('scroll',()=>{
  if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;if(!disposed&&!loading)saveScroll();});
 },{passive:true});
 window.addEventListener('popstate',event=>{
  const restoreScroll=event.state?.atlasScroll;
  if(displayedRoute===location.pathname+location.search){
   if(location.hash)window.dispatchEvent(new Event('hashchange'));
   else requestAnimationFrame(()=>window.scrollTo({left:restoreScroll?.[0]||0,top:restoreScroll?.[1]||0,behavior:'instant'}));
   return;
  }
  navigate(new URL(location.href),{pop:true,restoreScroll});
 });
 window.addEventListener('pagehide',()=>{disposed=true;generation++;cancelAnimationFrame(scrollFrame);forget();clearView();history.scrollRestoration=previousRestoration;});
 window.addEventListener('pageshow',event=>{if(event.persisted){disposed=false;location.reload();}});
 void show();
}
