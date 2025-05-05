// Testimonials Slider

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialsSlider();
});

function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  let currentSlide = 0;
  let autoSlideInterval;
  
  // Initialize
  showSlide(currentSlide);
  startAutoSlide();
  
  // Event listeners
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
    resetAutoSlide();
  });
  
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
    resetAutoSlide();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoSlide();
    });
  });
  
  // Show the specified slide
  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
  
  // Auto-slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
      showSlide(currentSlide);
    }, 5000); // Change slide every 5 seconds
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  // Pause auto-slide when hovering over the slider
  const sliderContainer = document.querySelector('.testimonials-slider');
  
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
  
  // Touch support for mobile
  let startX, endX;
  const minSwipeDistance = 50;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  sliderContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const distance = startX - endX;
    
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        // Swipe left (next)
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
      } else {
        // Swipe right (prev)
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
      }
      
      showSlide(currentSlide);
      resetAutoSlide();
    }
  }
}