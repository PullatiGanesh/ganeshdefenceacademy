let currentLang = "en";
let langData = {};

function loadLang(lang){
 fetch(`assets/lang/${lang}.json`)
 .then(r=>r.json())
 .then(data=>{
  langData=data;
  applyLanguage(lang);
 });
}

function applyLanguage(){
 document.querySelectorAll("[data-lang]").forEach(el=>{
   const key = el.dataset.lang;
   if(langData[key]) el.innerHTML = langData[key];
 });
}

function changeLanguage(lang){
 currentLang = lang;
 loadLang(lang);
}

loadLang("en");
