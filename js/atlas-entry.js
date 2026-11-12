// The curated Atlas is intentionally public. Only this navigation entry uses
// the shared authenticated Admin profile; it never gates or fetches research data.
const button=document.querySelector('[data-atlas-entry]');
if(button){
 const root=button.closest('[data-filter-root]'),panel=root.querySelector('[data-atlas-panel]');
 function hide(){delete button.dataset.atlasAuthorized;button.hidden=true;if(panel)panel.hidden=true;if(button.getAttribute('aria-pressed')==='true')root.querySelector('[data-filter=""]')?.click();}
 function sync(){
  const visible=window.EyeCodeAuth?.canShowAdmin?.()===true;
  const wasVisible=button.dataset.atlasAuthorized==='true';
  if(!visible){hide();return;}
  button.hidden=false;button.dataset.atlasAuthorized='true';
  if(!wasVisible&&new URLSearchParams(location.search).get('category')==='atlas')button.click();
 }
 document.addEventListener('eyecode-auth-change',sync);
 document.addEventListener('eyecode-profile-change',sync);
 document.addEventListener('v2-language-change',sync);
 window.addEventListener('pagehide',hide);
 window.addEventListener('pageshow',sync);
 sync();
}
