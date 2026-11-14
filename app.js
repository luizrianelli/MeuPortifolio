const theme = document.querySelector('#theme');
try { document.documentElement.dataset.theme = localStorage.getItem('portfolio-theme') || 'dark'; } catch {}
function themeLabel() { theme.setAttribute('aria-label', document.documentElement.dataset.theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'); }
themeLabel();
theme.addEventListener('click', () => {
  const value = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = value;
  try { localStorage.setItem('portfolio-theme', value); } catch {}
  themeLabel();
});
const menu = document.querySelector('#menu');
const nav = document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}));
document.addEventListener('keydown', e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
const links = [...nav.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
}
document.querySelector('#copy').addEventListener('click',async()=>{
  const status = document.querySelector('#copy-status');
  try {await navigator.clipboard.writeText('luizfrianellifv@gmail.com'); status.textContent='E-mail copiado.';}
  catch {status.textContent='Copie o endereço acima ou clique nele para abrir seu e-mail.';}
});
document.querySelector('#year').textContent = '2026';
async function checkResume() {
  try {
    const response=await fetch('assets/curriculo.pdf',{method:'HEAD',cache:'no-store'});
    if(response.ok && (response.headers.get('content-type')||'').includes('application/pdf')) {
      document.querySelector('#resume-download').hidden=false;
    }
  } catch {}
}
checkResume();
window.addEventListener('focus',checkResume);

// Reserve the heading's final size so typing never moves the surrounding layout.
const nameParts=[...document.querySelectorAll('[data-typed-name]')];
const firstCursor=document.querySelector('[data-cursor-first]');
const lastCursor=document.querySelector('[data-cursor-last]');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let typingTimer;
function finishName(){
  clearTimeout(typingTimer);
  nameParts.forEach(part=>{part.textContent=part.dataset.typedName;});
  firstCursor.hidden=true;lastCursor.hidden=false;
}
if(!reducedMotion.matches && nameParts.length){
  nameParts.forEach(part=>{part.textContent='';});
  firstCursor.hidden=false;lastCursor.hidden=true;
  let partIndex=0,letterIndex=0;
  function typeNextLetter(){
    const part=nameParts[partIndex];
    part.textContent=part.dataset.typedName.slice(0,++letterIndex);
    if(letterIndex===part.dataset.typedName.length){
      partIndex++;letterIndex=0;
      if(partIndex===nameParts.length){finishName();return;}
      firstCursor.hidden=true;lastCursor.hidden=false;
    }
    typingTimer=setTimeout(typeNextLetter,85);
  }
  typingTimer=setTimeout(typeNextLetter,180);
}
reducedMotion.addEventListener('change',event=>{if(event.matches)finishName();});

const contactTitle=document.querySelector('#contact-title');
const contactParts=[...contactTitle.querySelectorAll('[data-contact-part]')];
const contactMeasures=[...contactTitle.querySelectorAll('.typing-measure')];
const contactCursors=[...contactTitle.querySelectorAll('[data-contact-cursor]')];
let contactWords=['Vamos nos','conectar.'];
let contactTimer,contactStarted=false;
function finishContactTyping(){
  clearTimeout(contactTimer);
  contactParts.forEach((part,index)=>{part.textContent=contactWords[index];});
  contactCursors.forEach((cursor,index)=>{cursor.hidden=index!==contactCursors.length-1;});
}
function prepareContactTyping(){
  clearTimeout(contactTimer);
  contactParts.forEach(part=>{part.textContent='';});
  contactCursors.forEach((cursor,index)=>{cursor.hidden=index!==0;});
}
function playContactTyping(){
  contactStarted=true;
  if(reducedMotion.matches){finishContactTyping();return;}
  prepareContactTyping();let partIndex=0,letterIndex=0;
  function typeLetter(){
    contactParts[partIndex].textContent=contactWords[partIndex].slice(0,++letterIndex);
    if(letterIndex===contactWords[partIndex].length){
      partIndex++;letterIndex=0;
      if(partIndex===contactWords.length){finishContactTyping();return;}
      contactCursors.forEach((cursor,index)=>{cursor.hidden=index!==partIndex;});
    }
    contactTimer=setTimeout(typeLetter,85);
  }
  contactTimer=setTimeout(typeLetter,180);
}
function setContactLanguage(language){
  contactWords=language==='en'?['Let’s','connect.']:['Vamos nos','conectar.'];
  contactTitle.setAttribute('aria-label',contactWords.join(' '));
  contactMeasures.forEach((measure,index)=>{measure.textContent=contactWords[index]+'_';});
  if(contactStarted)finishContactTyping();
  else if(reducedMotion.matches)finishContactTyping();
  else prepareContactTyping();
}
if(reducedMotion.matches)finishContactTyping();else prepareContactTyping();
if('IntersectionObserver' in window){
  const contactObserver=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){playContactTyping();contactObserver.disconnect();}
  },{threshold:.35});
  contactObserver.observe(contactTitle);
}else playContactTyping();
reducedMotion.addEventListener('change',event=>{if(event.matches)finishContactTyping();});
