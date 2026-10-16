const dialog=document.getElementById('demo-dialog');
let focusBeforeDialog;
function showDemo(){focusBeforeDialog=document.activeElement;dialog.showModal()}
function closeDemo(){dialog.close()}
document.getElementById('demo-close').addEventListener('click',closeDemo);
dialog.addEventListener('close',()=>focusBeforeDialog?.focus());
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDemo()});
document.addEventListener('click',e=>{
  const target=e.target.closest('a,button,.install-1111,.openModalAccess,.phishing-sp-content');
  if(!target||target.closest('.demo-dialog')||target.closest('.slick-dots')||target.classList.contains('ambassador-dot'))return;
  if(target.id==='btnWeb'||target.classList.contains('btn-web')){e.preventDefault();window.location.assign(new URL('web/?view=lobby&v=member1',window.location.href));return}
  if(target.closest('.btn-signup,.register-btn')){e.preventDefault();window.location.assign(new URL('web/?view=register&v=member1',window.location.href));return}
  if(target.id==='scrollToTopBtn'){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});return}
  e.preventDefault();showDemo();
});
document.querySelectorAll('.static-carousel').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('.slick-track > .slick-slide')];
 const dots=[...carousel.querySelectorAll('.slick-dots button')];
 let active=0;
 function select(i){active=i;slides.forEach((s,n)=>{s.classList.toggle('slick-active',n===i);s.classList.toggle('slick-current',n===i);s.setAttribute('aria-hidden',String(n!==i));s.tabIndex=n===i?0:-1});dots.forEach((d,n)=>{d.parentElement.classList.toggle('slick-active',n===i);d.setAttribute('aria-selected',String(n===i));d.tabIndex=n===i?0:-1})}
 dots.forEach((d,i)=>d.addEventListener('click',e=>{e.stopPropagation();select(i)}));
 select(0);
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>{if(!document.hidden&&!dialog.open)select((active+1)%slides.length)},carousel.classList.contains('phishing-sp-slide')?6500:9000);
});
const ambassador=document.querySelector('.ambassador-slider');
if(ambassador){
 const track=ambassador.querySelector('.ambassador-track'),slides=[...track.children].filter(e=>e.classList.contains('ambassador-slide')),dots=[...ambassador.querySelectorAll('.ambassador-dot')];let current=1;
 function select(i){current=i;const width=slides[i].getBoundingClientRect().width,gap=parseFloat(getComputedStyle(track).columnGap)||16;track.style.transition='transform .6s cubic-bezier(.32,.72,0,1)';track.style.transform=`translate3d(${(ambassador.clientWidth-width)/2-i*(width+gap)}px,0,0)`;slides.forEach((s,n)=>{s.classList.toggle('active',n===i);const a=s.querySelector('a');if(a)a.tabIndex=n===i?0:-1});dots.forEach((d,n)=>{d.classList.toggle('active',n===i);d.setAttribute('aria-pressed',String(n===i))})}
 dots.forEach((d,i)=>d.addEventListener('click',()=>select(i)));
 new ResizeObserver(()=>select(current)).observe(ambassador);select(current);
 let startX;ambassador.addEventListener('pointerdown',e=>startX=e.clientX);ambassador.addEventListener('pointerup',e=>{if(startX===undefined)return;const diff=e.clientX-startX;if(Math.abs(diff)>40)select((current+(diff<0?1:-1)+slides.length)%slides.length);startX=undefined});
}
