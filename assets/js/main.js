function initCoursesAnimations(){gsap.from(".course-card",{duration:1.2,y:100,opacity:0,rotationX:-25,stagger:0.2,ease:"expo.out",clearProps:"all"});gsap.to(".card-inner",{y:-10,duration:2,repeat:-1,yoyo:!0,ease:"sine.inOut",stagger:0.3})}
function initHomeAnimations(){gsap.from(".highlight-card",{scrollTrigger:{trigger:".highlight-card",start:"top 85%",},y:40,opacity:0,duration:0.8,stagger:0.15,ease:"power2.out"})}
let isJoinProcessOpen=!1;function toggleJoiningProcess(){const wrapper=document.getElementById("joining-steps-wrapper");const icon=document.getElementById("join-icon");const cards=document.querySelectorAll(".join-step-card");if(!isJoinProcessOpen){wrapper.style.maxHeight="500px";icon.style.transform="rotate(45deg)";gsap.fromTo(cards,{opacity:0,y:30,scale:0.8},{opacity:1,y:0,scale:1,duration:0.5,stagger:0.1,ease:"back.out(1.7)"});isJoinProcessOpen=!0}else{wrapper.style.maxHeight="0px";icon.style.transform="rotate(0deg)";gsap.to(cards,{opacity:0,y:20,duration:0.3});isJoinProcessOpen=!1}}
function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
requestAnimationFrame(raf);let currentPage="";function loadPage(page){if(currentPage===page)return;document.querySelectorAll('.nav-link').forEach(link=>{link.classList.remove('active');if(link.getAttribute('onclick')?.includes(`'${page}'`)){link.classList.add('active')}});const content=document.getElementById("content");gsap.to(content,{opacity:0,y:20,duration:0.4,ease:"power2.inOut",onComplete:()=>{updateHeaderState(page);fetch(`pages/${page}.html`).then(response=>response.text()).then(html=>{content.innerHTML=html;currentPage=page;window.scrollTo(0,0);if(page==='home')initSlider();if(page==='achievements')initAchievements();if(page==='gallery'&&typeof initGallery==='function')initGallery();if(page==='contact')initContact();if(typeof applyLanguage==="function")applyLanguage();gsap.to(content,{opacity:1,y:0,duration:0.6,ease:"power3.out"});gsap.from("#content section",{opacity:0,y:30,stagger:0.1,duration:0.8,ease:"power3.out"})})}})}
function updateHeaderState(page){const banner=document.getElementById("nav-banner");const logo=document.getElementById("nav-logo");if(page==='home'){banner.classList.remove("hidden");logo.classList.add("hidden")}else{banner.classList.add("hidden");logo.classList.remove("hidden")}}
function toggleDark(){document.documentElement.classList.toggle("dark")}
window.addEventListener('DOMContentLoaded',()=>{loadPage('home')})
function toggleMobileMenu() {
    const menuWrapper = document.getElementById('mobileMenu');
    const sheet = document.getElementById('bottomSheet');
    const fab = document.getElementById('fab-button');

    if (menuWrapper.classList.contains('hidden')) {
        // OPENING
        menuWrapper.classList.remove('hidden');
        // Small timeout to allow 'hidden' to be removed before animating
        setTimeout(() => {
            sheet.classList.remove('translate-y-full');
            fab.classList.add('scale-0', 'rotate-90'); // Hide FAB while menu is open
        }, 10);
    } else {
        // CLOSING
        sheet.classList.add('translate-y-full');
        fab.classList.remove('scale-0', 'rotate-90');
        setTimeout(() => {
            menuWrapper.classList.add('hidden');
        }, 500); // Matches the duration-500 transition
    }
}