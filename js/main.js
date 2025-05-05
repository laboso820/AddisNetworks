// Main JavaScript File

// DOM Elements
const header = document.getElementById('main-header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const faqItems = document.querySelectorAll('.faq-item');
const menuLinks = document.querySelectorAll('a[href^="#"]');
const contactForm = document.getElementById('contact-form');

// Initialize AOS-like scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  document.title = 'AddisNewtworks | High-Speed Internet Provider';
  
  // Initialize animations
  initScrollReveal();
  initHeaderScroll();
  initSmoothScroll();
  
  // Add event listeners
  addEventListeners();
});

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-aos]');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('reveal', 'active');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

// Header scroll effect
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Smooth scrolling
function initSmoothScroll() {
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Add offset for fixed header
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add event listeners
function addEventListeners() {
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
  
  // FAQ accordions
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Live chat widget
  const chatToggle = document.querySelector('.chat-toggle');
  const chatWidget = document.getElementById('chat-widget');
  const chatInput = document.querySelector('.chat-input input');
  const sendButton = document.querySelector('.send-message');
  
  chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('collapsed');
  });
  
  // Send message functionality
  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText) {
      const messagesContainer = document.querySelector('.chat-messages');
      const newMessage = document.createElement('div');
      newMessage.className = 'message user';
      newMessage.innerHTML = `
        <div class="message-content">
          <p>${messageText}</p>
        </div>
        <span class="message-time">Just now</span>
      `;
      messagesContainer.appendChild(newMessage);
      chatInput.value = '';
      
      // Auto-reply (simulated)
      setTimeout(() => {
        const botReply = document.createElement('div');
        botReply.className = 'message agent';
        botReply.innerHTML = `
          <div class="message-content">
            <p>Thanks for your message! Our team will get back to you shortly.</p>
          </div>
          <span class="message-time">Just now</span>
        `;
        messagesContainer.appendChild(botReply);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
    }
  }
  
  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerText;
      
      submitButton.innerText = 'Sending...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        submitButton.innerText = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
}

// Create scroll progress indicator
function createScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

createScrollProgressIndicator();