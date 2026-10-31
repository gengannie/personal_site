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
