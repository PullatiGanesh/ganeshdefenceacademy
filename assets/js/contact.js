/**
 * CONTACT PAGE LOGIC
 */
function initContact() {
    // 1. GSAP Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
    tl.from(".contact-header", { y: -30, opacity: 0 })
      .from(".contact-card", { 
          y: 50, 
          opacity: 0, 
          stagger: 0.15,
          clearProps: "all" 
      }, "-=0.8");

    // 2. Language Refresh (Ensures translation works on this new HTML)
    if (typeof applyLanguage === "function") {
        applyLanguage();
    }
}

// 3. GLOBAL EVENT DELEGATION (This fixes the "Submit not working" issue)
// We attach it to 'document' so it survives SPA page changes
document.addEventListener('submit', function(e) {
    if (e.target && e.target.id === 'academyContactForm') {
        e.preventDefault();
        console.log("Form Submit Detected!");

        const form = e.target;
        const name = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        // Construct the WhatsApp URL
        const phone_number = "919642081090";
        const text = `*New Inquiry: Ganesh Defence Academy*%0A` +
                     `*Name:* ${name}%0A` +
                     `*Phone:* ${phone}%0A` +
                     `*Email:* ${email}%0A` +
                     `*Message:* ${message}`;

        const whatsappUrl = `https://wa.me/${phone_number}?text=${text}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Optional: Reset form
        form.reset();
    }
});