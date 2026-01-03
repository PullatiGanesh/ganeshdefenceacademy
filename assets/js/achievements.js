/* ================================
   ACHIEVEMENTS DATA
================================ */
const data = {
  "2020": {
    army: 11,
    ssc: 0,
    police: 0,
    railway: 0,
    navy: 0
  },
  "2021": {
    army: 0,
    ssc: 10,
    police: 0,
    railway: 0,
    navy: 0
  },
  "2022-2023": {
    army: 7,
    ssc: 3,
    police: 0,
    railway: 1,
    navy: 0
  },
  "2024-2025": {
    army: 9,
    ssc: 2,
    police: 1,
    railway: 0,
    navy: 1
  }
};

/* ================================
   STATE
================================ */
let currentYear = Object.keys(data)[0];
let currentCategory = "army";

/* ================================
   ICON MAP
================================ */
const icons = {
 army: `<img src="assets/images/icons/army-helmet.png" class="md:w-14 md:h-14 object-contain transition-transform" alt="Army">`,
  ssc: `<img src="assets/images/icons/ssc-gd.png" class="md:w-14 md:h-14 object-contain transition-transform" alt="SSC">`,
  police: `<img src="assets/images/icons/police-car.png" class="md:w-14 md:h-14 object-contain transition-transform" alt="Police">`,
  railway: `<img src="assets/images/icons/railway.png" class="md:w-14 md:h-14 object-contain transition-transform" alt="Railway">`,
  navy: `<img src="assets/images/icons/navy.png" class="md:w-14 md:h-14 object-contain transition-transform" alt="Navy">`
};

/* ================================
   INIT
================================ */
// document.addEventListener("DOMContentLoaded", () => {
//   generateYearTabs();
//   generateCategoryTabs();
//   updateImage();
//   updateUI();
//   enableSwipe();
// });
function initAchievements() {
  generateYearTabs();
  generateCategoryTabs();
  updateImage();
  updateUI();
  enableSwipe();
}

/* ================================
   YEAR TABS (DYNAMIC)
================================ */
function generateYearTabs() {
  const container = document.querySelector(".year-tabs");
  if (!container) return;

  container.innerHTML = "";
  Object.keys(data).forEach(year => {
    const btn = document.createElement("button");
    btn.textContent = year;
    
    // Check if this is the selected year and add the active class
    if (year === currentYear) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      // Remove 'active' from all other buttons in this container
      container.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      // Add 'active' to the clicked button
      btn.classList.add("active");
      
      changeYear(year);
    };
    container.appendChild(btn);
  });
}

/* ================================
   CATEGORY TABS (AUTO HIDE)
================================ */
/* ================================
   CATEGORY TABS (ICON ONLY)
================================ */
function generateCategoryTabs() {
    const container = document.querySelector(".filter-tabs");
    if (!container) return;
    container.innerHTML = "";
    const yearData = data[currentYear];

    Object.keys(yearData).forEach(cat => {
        if (yearData[cat] > 0) {
            const btn = document.createElement("button");
            
            // Removed ${cat.toUpperCase()} to show only the icon
            btn.innerHTML = `${icons[cat] || ""}`; 
            
            // Optional: Add a tooltip so users know what the icon means on hover
            btn.title = cat.toUpperCase();
            
            // Add padding and styling classes for icon-only buttons
            btn.className = "p-3 rounded-xl transition-all duration-300 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center";

            if (cat === currentCategory) {
                btn.classList.add("active", "border-brand", "bg-brand/10");
            }

            btn.onclick = () => {
                currentCategory = cat;
                container.querySelectorAll("button").forEach(b => b.classList.remove("active", "border-brand", "bg-brand/10"));
                btn.classList.add("active", "border-brand", "bg-brand/10");
                updateImage();
            };
            container.appendChild(btn);
        }
    });
}
/* ================================
   CHANGE YEAR
================================ */
function changeYear(year) {
  currentYear = year;
  generateCategoryTabs();
  updateImage();
  updateUI();
}

/* ================================
   CHANGE CATEGORY
================================ */
/* ================================
   CHANGE CATEGORY (UI Only)
=============================== */
function changeCategory(cat) {
    currentCategory = cat;
    
    // Update active state for category buttons
    const container = document.querySelector(".filter-tabs");
    if (container) {
        container.querySelectorAll("button").forEach(btn => {
            btn.classList.toggle("active", btn.textContent.toLowerCase().includes(cat));
        });
    }
    // No updateImage() call here because the photo stays the same for the whole year
}

/* ================================
   UPDATE IMAGE
================================ */
/* ================================
   UPDATE IMAGE (Dynamic)
================================ */
/* ================================
   UPDATE IMAGE (One Photo Per Year)
================================ */
function updateImage() {
    const img = document.getElementById("achievementImage");
    if (!img) return;

    // Path convention: assets/images/achievements/{YEAR}.jpg
    // Example: assets/images/achievements/2022-2023.jpg
    const imagePath = `assets/images/achievements/${currentYear}.jpg`;
    
    // Professional transition effect
    img.style.opacity = "0";
    img.style.transform = "scale(0.98)";

    const tempImg = new Image();
    tempImg.src = imagePath;

    tempImg.onload = () => {
        img.src = imagePath;
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
    };

    // Fallback if the year image is missing
    tempImg.onerror = () => {
        img.src = `assets/images/achievements/default.jpg`;
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
    };
}
/* ================================
   COUNTER + BAR UPDATE
================================ */
function updateUI() {
    const yearData = data[currentYear];
    let total = 0;

    Object.keys(yearData).forEach(cat => {
        const count = yearData[cat];
        
        // Animate the big number at the top
        animateCounter(cat + "Count", count);
        
        // Pass the raw count to the bar
        updateBar(cat, count);
        
        total += count;
    });

    animateCounter("totalCount", total);
}

/* ================================
   COUNTER ANIMATION
================================ */
function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;

  let count = 0;
  const step = Math.max(1, Math.ceil(target / 25));

  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count;
  }, 30);
}

/* ================================
   BAR CHART ANIMATION (RAW NUMBERS)
================================ */
/* ================================
   BAR CHART ANIMATION (BAR ONLY)
================================ */
function updateBar(category, count) {
    const bar = document.getElementById(category + "Bar");
    const valText = document.getElementById(category + "Val");
    
    if (!bar) return;

    // 1. Clear the number text so only the bar is visible
    if (valText) {
        valText.textContent = ""; 
    }

    // 2. Reset width for animation trigger
    bar.style.transition = "none";
    bar.style.width = "0%";
    
    // Force reflow
    bar.offsetHeight; 

    // 3. Set growth logic 
    // Example: If 15 is your highest expected single-year count, 
    // use (count / 15 * 100) to determine bar length.
    const maxPossibleInYear = 15; 
    const barWidth = Math.min((count / maxPossibleInYear) * 100, 100);

    setTimeout(() => {
        bar.style.transition = "width 1.5s cubic-bezier(0.1, 0.7, 1.0, 0.1)";
        bar.style.width = barWidth + "%";
    }, 50);
}
/* ================================
   IMAGE MODAL
================================ */
function openModal(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("imageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

/* ================================
   MOBILE SWIPE
================================ */
function enableSwipe() {
  let startX = 0;

  document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const years = Object.keys(data);
    let index = years.indexOf(currentYear);

    if (startX - endX > 50 && index < years.length - 1) {
      changeYear(years[index + 1]);
    }
    if (endX - startX > 50 && index > 0) {
      changeYear(years[index - 1]);
    }
  });
}
