// --- Menu burger (mobile) ---
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-links');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
}

// --- Lightbox (galerie + portfolio) ---
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox.querySelector('.close-lightbox');

  // Galerie simple (page d'accueil)
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
      document.body.style.overflow = 'hidden';
    });
  });

  // Portfolio (avec légende catégorie + titre)
  document.querySelectorAll('.media-container').forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('img');
      const title = container.querySelector('h3') ? container.querySelector('h3').innerText : '';
      const cat = container.querySelector('.category-tag') ? container.querySelector('.category-tag').innerText : '';
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.innerHTML = `<strong>${cat}</strong> — ${title}`;
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeBtn.click();
    });
  }
}

// --- Filtres portfolio ---
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  const items = document.querySelectorAll('.masonry-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      items.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// --- Formulaire de contact ---
// Confirmation visuelle côté client uniquement : ceci ne transmet
// pas encore le message quelque part (voir note dans le README/chat).
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    const originalText = btn.textContent;
    btn.textContent = 'Message envoyé ✓';
    btn.disabled = true;
    form.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
});
