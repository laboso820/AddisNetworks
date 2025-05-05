// Plans Toggle and Animation

document.addEventListener('DOMContentLoaded', () => {
  initPlansToggle();
  initPlanCards();
});

function initPlansToggle() {
  const planToggle = document.getElementById('plan-type-toggle');
  const residentialPlans = document.querySelector('.residential-plans');
  const businessPlans = document.querySelector('.business-plans');
  
  if (planToggle && residentialPlans && businessPlans) {
    planToggle.addEventListener('change', () => {
      if (planToggle.checked) {
        // Show business plans
        residentialPlans.classList.add('hidden');
        businessPlans.classList.remove('hidden');
      } else {
        // Show residential plans
        businessPlans.classList.add('hidden');
        residentialPlans.classList.remove('hidden');
      }
      
      // Reset animations
      animatePlanCards();
    });
  }
}

function initPlanCards() {
  // Initial animation
  animatePlanCards();
  
  // Add hover effects
  const planCards = document.querySelectorAll('.plan-card');
  
  planCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add subtle animation on hover
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = 'var(--shadow-xl)';
      
      // Highlight "Get Started" button
      const button = card.querySelector('.btn');
      if (button && !button.classList.contains('btn-primary')) {
        button.style.backgroundColor = 'rgba(15, 52, 96, 0.1)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset styles
      card.style.transform = '';
      card.style.boxShadow = '';
      
      // Reset button
      const button = card.querySelector('.btn');
      if (button && !button.classList.contains('btn-primary')) {
        button.style.backgroundColor = '';
      }
    });
  });
}

function animatePlanCards() {
  const visiblePlans = document.querySelector('.plans-container:not(.hidden)');
  if (!visiblePlans) return;
  
  const cards = visiblePlans.querySelectorAll('.plan-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index); // Stagger the animations
  });
}

// Custom price calculator (for future implementation)
function initPriceCalculator() {
  // Placeholder for future interactive pricing calculator
  // This would allow users to customize their plans with add-ons
  
  const priceSliders = document.querySelectorAll('.price-slider');
  
  priceSliders.forEach(slider => {
    slider.addEventListener('input', updatePlanPricing);
  });
  
  const addons = document.querySelectorAll('.plan-addon-checkbox');
  
  addons.forEach(addon => {
    addon.addEventListener('change', updatePlanPricing);
  });
}

function updatePlanPricing() {
  // This function would dynamically update pricing based on selected options
  console.log('Price calculator ready for implementation');
}