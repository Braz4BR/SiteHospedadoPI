const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const indicators = document.querySelectorAll('.carousel-indicators button');

let currentIndex = 0;

function updateCarousel() {
  const itemWidth = items[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // atualizar bolinhas
  indicators.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

// clicar nas bolinhas
indicators.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

window.addEventListener('resize', updateCarousel);