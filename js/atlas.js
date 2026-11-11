import {createAdminAuthorization,loadAtlas,isLocalAtlasOrigin} from './atlas-repository.js';
import {renderAtlas,sourceNotice,escape} from './atlas-view.js';
import {atlasUrl} from './atlas-data.js';
const mount=document.querySelector('[data-atlas-root]');
if(mount){
 const access=createAdminAuthorization();
 let generation=0,loading=false,disposed=false,cache=null,pending=null,checking=null,readerScript=null,expiryTimer;
 let displayedRoute='',hidden=false;
 let scrollFrame=0;
 const saveScroll=()=>history.replaceState({...history.state,atlasScroll:[scrollX,scrollY]},'',location.href);
 saveScroll();
 const previousRestoration=history.scrollRestoration;
 history.scrollRestoration='manual';
 const lang=()=>document.documentElement.lang==='en'?'en':'vi';
 const words=(vi,en)=>lang()==='en'?en:vi;
 const auth=()=>window.EyeCodeAuth;
 const source=()=>{const s=new URLSearchParams(location.search).get('source');return ['database','sample','local'].includes(s)?s:'auto';};
 const sessionKey=()=>{const s=auth()?.state?.session;return s?.user?.id&&s?.access_token?{id:s.user.id,token:s.access_token}:null;};
 const sameSession=(a,b)=>a&&b&&a.id===b.id&&a.token===b.token;
 function clearView(){
  window.EyeCodeArticleNavigation?.dispose();
  // Scrub nodes that might briefly be retained by pending reader/observer callbacks.
  for(const node of mount.querySelectorAll('*')){node.replaceChildren();for(const attr of [...node.attributes])node.removeAttribute(attr.name);}
  mount.replaceChildren();mount.removeAttribute('aria-busy');
  document.body.classList.remove('v2-article-page','v2-reading-panel-open');
  document.documentElement.classList.remove('v2-article-document');
 }
 function forget(){cache=null;pending=null;clearTimeout(expiryTimer);}
 function message(reason='denied'){
  clearView();
  const messages={
   loading:['Đang kiểm tra quyền Admin…','Verifying Admin access…'],
   denied:['Atlas chỉ dành cho Admin đang hoạt động. Đăng nhập bằng tài khoản hiện có trên thanh điều hướng.','Atlas requires an active Admin account. Use the existing sign-in control in the header.'],
   connection_failed:['Không thể kiểm tra endpoint Atlas. Hãy thử lại khi kết nối sẵn sàng.','Could not check the Atlas endpoint. Retry when the connection is available.'],
   local_unavailable:['Chạy npm run dev:atlas để dùng bộ sưu tập cục bộ.','Start npm run dev:atlas to use the local collection.'],
   schema_unavailable:['Endpoint Atlas chưa sẵn sàng. Cần kiểm tra migration thủ công; có thể xem ví dụ công khai sau khi xác thực Admin.','The Atlas endpoint is unavailable. Review migration setup manually; verified Admins can use public examples.'],
   dataset_too_large:['Dữ liệu vượt giới hạn bản mẫu 500 mục mỗi bảng. Không hiển thị đồ thị bị cắt.','The dataset exceeds this prototype’s 500-row limit per table. No truncated graph is displayed.']
  };
  const [vi,en]=messages[reason]||messages.denied;
  mount.innerHTML=`<section class="v2-container v2-section atlas-access"><h1>AI Research Atlas</h1><p role="status"><span data-vi="${escape(vi)}" data-en="${escape(en)}">${escape(words(vi,en))}</span></p>${reason==='loading'?'':`<button class="v2-button v2-secondary" type="button" data-atlas-retry><span data-vi="Thử lại" data-en="Retry">${words('Thử lại','Retry')}</span></button> <a href="atlas.html?source=sample"><span data-vi="Ví dụ công khai (Admin)" data-en="Public examples (Admin)">${words('Ví dụ công khai (Admin)','Public examples (Admin)')}</span></a>`}</section>`;
 }
 function armExpiry(){
  clearTimeout(expiryTimer);
  const expires=auth()?.state?.session?.expires_at*1000;
  if(Number.isFinite(expires))expiryTimer=setTimeout(()=>{forget();void show();},Math.min(2147483647,Math.max(0,expires-Date.now()+1)));
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
  if(ticket!==generation||disposed||!access.getState().authorized)return;
  syncLanguage();clearView();
  mount.innerHTML=sourceNotice(data)+renderAtlas(data,new URLSearchParams(location.search));
  displayedRoute=location.pathname+location.search;
  if(mount.querySelector('.v2-article-layout')){
   document.documentElement.classList.add('v2-article-document');document.body.classList.add('v2-article-page');
   await ensureReader();
   if(ticket!==generation||disposed||!access.getState().authorized)return;
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
  if(disposed||hidden)return;
  const ticket=++generation,requestedSource=source();
  if(cache&&!fresh&&(cache.requestedSource===requestedSource||cache.data.source===requestedSource||requestedSource==='auto'&&cache.data.source===(isLocalAtlasOrigin(location)?'local':'sample'))&&sameSession(cache.session,sessionKey())&&access.getState().authorized){await render(cache.data,ticket,{pop,focus,restoreScroll});return;}
  loading=true;
  if(!cache||!access.getState().authorized)message('loading');else mount.setAttribute('aria-busy','true');
  try{
   if(!pending||pending.source!==requestedSource){
    const job={source:requestedSource};job.promise=loadAtlas({access,source:requestedSource}).finally(()=>{if(pending===job)pending=null;});pending=job;
   }
   const data=await pending.promise;
   if(ticket!==generation||disposed||hidden||!access.getState().authorized)return;
   cache={data,requestedSource,session:sessionKey()};armExpiry();
   await render(data,ticket,{pop,focus,restoreScroll});
  }catch(error){if(ticket===generation&&!disposed){forget();message(error.reason||'connection_failed');}}
  finally{if(ticket===generation){loading=false;mount.removeAttribute('aria-busy');}}
 }
 access.subscribe(state=>{
  if(state.status==='denied'){
   generation++;loading=false;forget();message();
  }else if(state.status==='loading'&&cache){forget();clearView();}
 });
 async function recheck(){
  if(disposed||hidden||loading)return;
  if(checking)return checking;
  checking=(async()=>{
   const result=await access.check({background:true});
   if(disposed||hidden||result.reason==='superseded')return;
   if(result.authorized){
    if(cache&&cache.session?.id===sessionKey()?.id){cache.session=sessionKey();armExpiry();}
    else await show();
   }
  })().finally(()=>{checking=null;});
  return checking;
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
 mount.addEventListener('change',event=>{if(event.target.matches('[data-atlas-source]'))navigate(new URL(atlasUrl({source:event.target.value,lang:lang()}),location.href));});
 window.addEventListener('scroll',()=>{
  if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;if(!disposed&&!hidden&&!loading)saveScroll();});
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
 document.addEventListener('eyecode-auth-change',()=>{
  if(disposed||hidden||loading)return;
  if(cache&&access.getState().authorized)void recheck();else void show();
 });
 document.addEventListener('visibilitychange',()=>{
  hidden=document.visibilityState==='hidden';
  if(hidden){generation++;loading=false;forget();clearView();}else void show();
 });
 const interval=setInterval(()=>{if(cache&&!loading)void recheck();},60000);
 document.addEventListener('v2-language-change',()=>{
  const select=mount.querySelector('[data-atlas-source]');if(select){const sample=select.querySelector('[value=sample]'),local=select.querySelector('[value=local]');if(sample)sample.textContent=words('Ví dụ công khai','Public examples');if(local)local.textContent=words('Nội dung Phase 3 cục bộ','Local Phase 3 collection');}
 });
 window.addEventListener('pagehide',()=>{disposed=true;generation++;clearInterval(interval);cancelAnimationFrame(scrollFrame);forget();clearView();access.dispose();history.scrollRestoration=previousRestoration;});
 window.addEventListener('pageshow',event=>{if(event.persisted){disposed=false;location.reload();}});
 void show();
}
