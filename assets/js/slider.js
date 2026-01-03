let slides=[],index=0,timer;

function initSlider(){
 slides=document.querySelectorAll(".slide");
 if(!slides.length) return;

 slides.forEach(s=>s.classList.remove("active"));
 slides[0].classList.add("active");
 clearInterval(timer);
 timer=setInterval(nextSlide,4000);
}

function nextSlide(){
 slides[index].classList.remove("active");
 index=(index+1)%slides.length;
 slides[index].classList.add("active");
}
function prevSlide(){
 slides[index].classList.remove("active");
 index=(index-1+slides.length)%slides.length;
 slides[index].classList.add("active");
}
