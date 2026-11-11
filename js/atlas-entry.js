import {createAdminAuthorization} from './admin-auth.js';
const button=document.querySelector('[data-atlas-entry]');
if(button){
 const access=createAdminAuthorization();
 const root=button.closest('[data-filter-root]'),panel=root.querySelector('[data-atlas-panel]');
 let timer,checking=false;
 function hide(){delete button.dataset.atlasAuthorized;button.hidden=true;if(panel)panel.hidden=true;if(button.getAttribute('aria-pressed')==='true')root.querySelector('[data-filter=""]')?.click();}
 access.subscribe(state=>{if(state.status==='denied')hide();});
 async function check(){
  if(checking)return;checking=true;
  try{const state=await access.check();button.hidden=!state.authorized;if(state.authorized){button.dataset.atlasAuthorized='true';if(new URLSearchParams(location.search).get('category')==='atlas')button.click();}}
  finally{checking=false;}
 }
 document.addEventListener('eyecode-auth-change',()=>{clearTimeout(timer);timer=setTimeout(check,50);});
 window.addEventListener('focus',check);
 const interval=setInterval(check,60000);
 window.addEventListener('pagehide',()=>{clearInterval(interval);clearTimeout(timer);hide();access.dispose();});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
 document.addEventListener('v2-language-change',()=>{if(!access.getState().authorized)hide();});
 check();
}
