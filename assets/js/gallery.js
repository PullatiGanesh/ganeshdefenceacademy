async function initGallery() {
    const grid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recordsSelect = document.getElementById('itemsPerPage'); // Select dropdown
    
    if (!grid) return;

    let galleryData = [];
    let currentCategory = 'all';

    try {
        const response = await fetch('assets/data/gallery.json');
        const data = await response.json();
        
        // Generate full list
        data.config.forEach(cat => {
            for (let i = 1; i <= cat.count; i++) {
                galleryData.push({
                    src: `assets/images/gallery/${cat.folder}/img${i}.jpg`,
                    category: cat.folder,
                    title: `${cat.title}`
                });
            }
        });

        // --- ENHANCED FILTER & PAGINATION ENGINE ---
        const filterGallery = () => {
            const limit = parseInt(recordsSelect?.value) || 10; // Get "Show Records" value

            gsap.to(grid, { opacity: 0, duration: 0.2, onComplete: () => {
                grid.innerHTML = '';
                
                // 1. Filter by Category first
                const filteredByCategory = currentCategory === 'all' 
                    ? galleryData 
                    : galleryData.filter(item => item.category === currentCategory);

                // 2. Paginate/Slice by Records Limit
                const paginatedItems = filteredByCategory.slice(0, limit);

                paginatedItems.forEach(item => {
                    const card = document.createElement('div');
                    card.className = "break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer";
                    card.innerHTML = `
                        <img src="${item.src}" loading="lazy" class="w-full h-auto block transition-all duration-700 group-hover:scale-110" 
                             onerror="this.parentElement.style.display='none'">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <p class="text-white text-xs font-bold uppercase tracking-widest">${item.title}</p>
                        </div>`;
                    
                    card.onclick = () => openModal(item.src);
                    grid.appendChild(card);
                });

                gsap.to(grid, { opacity: 1, duration: 0.4 });
            }});
        };

        // --- LISTENERS ---

        // Listen for "Show Records" changes
        if (recordsSelect) {
            recordsSelect.onchange = () => filterGallery();
        }

        // Listen for Category changes
        filterButtons.forEach(btn => {
            btn.onclick = (e) => {
                currentCategory = btn.getAttribute('data-filter');
                
                // Update UI Classes
                filterButtons.forEach(b => {
                    b.classList.remove('bg-brand', 'text-white', 'active');
                    b.classList.add('bg-gray-200', 'text-slate-600');
                });
                btn.classList.add('bg-brand', 'text-white', 'active');
                btn.classList.remove('bg-gray-200', 'text-slate-600');

                filterGallery();
            };
        });

        filterGallery(); // Initial Load

    } catch (err) {
        console.error("Gallery initialization failed:", err);
    }
}

    // --- ATTACH LISTENERS ---
    filterButtons.forEach(btn => {
        btn.onclick = (e) => {
            const category = btn.getAttribute('data-filter');
            
            // 1. Update UI Classes
            filterButtons.forEach(b => {
                b.classList.remove('bg-brand', 'text-white', 'active');
                b.classList.add('bg-gray-200', 'text-slate-600');
            });
            btn.classList.add('bg-brand', 'text-white', 'active');
            btn.classList.remove('bg-gray-200', 'text-slate-600');

            // 2. Run Filter
            filterGallery(category);
        };
    });

    // Run once on load
    filterGallery('all');
// } catch (err) {
//         console.error("Gallery initialization failed:", err);
//     }
// }

function openModal(src) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 cursor-zoom-out";
    modal.innerHTML = `<img src="${src}" class="max-w-full max-h-full rounded-lg shadow-2xl">`;
    modal.onclick = () => modal.remove();
    document.body.appendChild(modal);
}