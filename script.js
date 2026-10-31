const progress = document.querySelector('#progress');
const rails = [...document.querySelectorAll('.rail-link')];
const cards = [...document.querySelectorAll('.project-card')];
function updateProgress(){const range=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${range>0?scrollY/range:0})`;}
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){rails.forEach(r=>r.classList.toggle('active',r.dataset.project===e.target.id));}}},{rootMargin:'-20% 0px -55% 0px'});
 cards.forEach(c=>observer.observe(c));
 const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');reveal.unobserve(e.target);}})},{threshold:.09});
 cards.forEach(c=>reveal.observe(c));
}else{cards.forEach(c=>c.classList.add('in-view'));}
document.querySelector('#year').textContent=new Date().getFullYear();

// Inspect real screenshots without leaving the project index.
const viewer=document.createElement('dialog');
viewer.className='image-viewer';
viewer.setAttribute('aria-label','Project screenshot');
viewer.innerHTML='<div class="viewer-bar"><p id="viewer-caption"></p><button type="button" aria-label="Close screenshot">Close ×</button></div><img alt="">';
document.body.append(viewer);
let imageTrigger;
function openImage(img){imageTrigger=img;viewer.querySelector('img').src=img.src;viewer.querySelector('img').alt=img.alt;viewer.querySelector('p').textContent=img.alt;viewer.showModal();}
viewer.querySelector('button').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close();});
viewer.addEventListener('close',()=>imageTrigger?.focus());
document.querySelectorAll('.doodle-game-shots img,.neon-gallery img').forEach(img=>{img.classList.add('image-open');img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Enlarge: '+img.alt);img.addEventListener('click',()=>openImage(img));img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openImage(img);}});});
rails.forEach(rail=>rail.addEventListener('click',()=>{rails.forEach(r=>r.removeAttribute('aria-current'));rail.setAttribute('aria-current','true');}));
window.addEventListener('resize',updateProgress,{passive:true});
