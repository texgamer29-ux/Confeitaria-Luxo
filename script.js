const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22300%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23E9D6CF%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%235E4636%22 font-family=%22Inter%2C sans-serif%22 font-size=%2224%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImagem indisponível%3C/text%3E%3C/svg%3E';
const gallery = document.querySelector('.gallery');
const galleryForm = document.getElementById('gallery-form');

const setFallbackImage = (img) => {
  if (!img) return;
  img.onerror = () => {
    img.src = FALLBACK_IMAGE;
    img.alt = 'Imagem indisponível';
    img.closest('.gallery-item')?.classList.add('image-fallback');
  };
};

const createGalleryItem = ({ title, imageUrl }) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = title ? `${title} — criação` : 'Criação';
  setFallbackImage(image);

  const caption = document.createElement('div');
  caption.className = 'gallery-caption';
  caption.textContent = title || 'Inspiração exclusiva';

  item.append(image, caption);
  return item;
};

const initializeGallery = () => {
  document.querySelectorAll('.gallery-item img').forEach(setFallbackImage);
};

const addGalleryItem = ({ title, imageUrl }) => {
  if (!gallery || !imageUrl) return;
  const item = createGalleryItem({ title, imageUrl });
  gallery.appendChild(item);
};

if (galleryForm) {
  galleryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('gallery-title')?.value.trim();
    const imageUrl = document.getElementById('gallery-url')?.value.trim();

    if (!imageUrl) return;

    addGalleryItem({
      title: title || 'Inspiração personalizada',
      imageUrl,
    });

    galleryForm.reset();
  });
}

initializeGallery();

const cakeImage = document.querySelector('.cake');
const imageWrapper = cakeImage?.closest('.image-wrapper');

if (cakeImage && imageWrapper) {
  let visible = false;
  let ticking = false;

  const updateParallax = () => {
    if (!visible) {
      ticking = false;
      return;
    }

    const rect = imageWrapper.getBoundingClientRect();
    const offset = rect.top - window.innerHeight * 0.55;
    const parallax = Math.max(Math.min(offset * 0.12, 24), -24);

    cakeImage.style.transform = `translateY(${parallax}px) scale(1)`;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visible = true;
        cakeImage.classList.add('is-visible');
        updateParallax();
        window.addEventListener('scroll', handleScroll, { passive: true });
        observer.unobserve(imageWrapper);
      }
    });
  }, {
    threshold: 0.22,
  });

  observer.observe(imageWrapper);
}

// Storytelling animation for cake assembly
const layers = document.querySelectorAll('.layer');
const storytellingSection = document.querySelector('.storytelling');

if (layers.length && storytellingSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        layers.forEach((layer, index) => {
          setTimeout(() => {
            layer.classList.add('is-visible');
          }, index * 600); // Delay each layer by 600ms
        });
        observer.unobserve(storytellingSection);
      }
    });
  }, {
    threshold: 0.3,
  });

  observer.observe(storytellingSection);
}

