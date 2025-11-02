// Gallery Images with Modern Names
const galleryImages = [
    { src: 'images/flat main hall.jpg', title: 'Grand Living Space' },
    { src: 'images/flat kitchen.jpg', title: 'Designer Kitchen' },
    { src: 'images/flat bedroom 1.jpg', title: 'Premium Master Suite' },
    { src: 'images/flat bedroom 2.jpg', title: 'Elegant Guest Room' },
    { src: 'images/flat bedroom 3.jpg', title: 'Modern Bedroom' },
    { src: 'images/flat dining.jpg', title: 'Luxury Dining Area' },
    { src: 'images/banqute hall.jpg', title: 'Opulent Banquet Hall' },
    { src: 'images/foyer.jpg', title: 'Grand Entrance Foyer' },
    { src: 'images/golden highlight.jpg', title: 'Premium Finishes' },
    // Additional images
    { src: 'images/face 1.jpg', title: 'Majestic Facade' },
    { src: 'images/face 2.jpg', title: 'Modern Architecture' },
    { src: 'images/face 3.jpg', title: 'Stunning Exterior' },
    { src: 'images/areal v.jpg', title: 'Aerial Perspective' },
    { src: 'images/basement parking.jpg', title: 'Secure Parking' },
    { src: 'images/entry 1.jpg', title: 'Grand Welcome' }
];

// Gallery Implementation
const galleryGrid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMore');
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImage');
let currentIndex = 0;
let displayedImages = 9;

function createGalleryItem(image, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${image.src}" alt="${image.title}">
        <div class="gallery-item-overlay">
            <h3 class="gallery-item-title">${image.title}</h3>
        </div>
    `;
    div.addEventListener('click', () => openModal(index));
    return div;
}

function loadGalleryImages(start, count) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < Math.min(start + count, galleryImages.length); i++) {
        fragment.appendChild(createGalleryItem(galleryImages[i], i));
    }
    galleryGrid.appendChild(fragment);
    
    if (displayedImages >= galleryImages.length) {
        loadMoreBtn.style.display = 'none';
    }
}

loadMoreBtn.addEventListener('click', () => {
    loadGalleryImages(displayedImages, 9);
    displayedImages += 9;
});

// Modal functionality
function openModal(index) {
    currentIndex = index;
    modal.style.display = 'block';
    modalImg.src = galleryImages[currentIndex].src;
    modalImg.alt = galleryImages[currentIndex].title;
}

function closeModal() {
    modal.style.display = 'none';
}

function navigateModal(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
    modalImg.alt = galleryImages[currentIndex].title;
}

document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.modal-nav.prev').addEventListener('click', () => navigateModal(-1));
document.querySelector('.modal-nav.next').addEventListener('click', () => navigateModal(1));

// Video Tour Controls
const tourVideo = document.getElementById('tour-video');
const playPauseBtn = document.getElementById('playPause');
const muteUnmuteBtn = document.getElementById('muteUnmute');

playPauseBtn.addEventListener('click', () => {
    if (tourVideo.paused) {
        tourVideo.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        tourVideo.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

muteUnmuteBtn.addEventListener('click', () => {
    tourVideo.muted = !tourVideo.muted;
    muteUnmuteBtn.innerHTML = tourVideo.muted ? 
        '<i class="fas fa-volume-mute"></i>' : 
        '<i class="fas fa-volume-up"></i>';
});

// Initial load
loadGalleryImages(0, 9);

// SECTION INTERSECTION OBSERVER: add .in-view to sections when visible
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
            el.classList.add('in-view');
            // if amenities section, stagger reveal of cards
            if (el.id === 'amenities') {
                const items = el.querySelectorAll('.amenity-item');
                items.forEach((it, i) => {
                    setTimeout(() => it.classList.add('visible'), i * 80);
                });
            }
        } else {
            // optionally remove to allow re-animation on scroll back
            el.classList.remove('in-view');
            if (el.id === 'amenities') {
                el.querySelectorAll('.amenity-item').forEach(it => it.classList.remove('visible'));
            }
        }
    });
}, { threshold: 0.18 });

sections.forEach(s => sectionObserver.observe(s));