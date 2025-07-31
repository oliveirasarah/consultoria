const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = "<div></div>";
}

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Service cards hover effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    const htmlCard = card as HTMLElement;
    card.addEventListener('mouseenter', () => {
      htmlCard.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      htmlCard.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add some dynamic content
  addDynamicStats();
  addCurrentYear();
});

// Function to animate statistics
function addDynamicStats() {
  const statsNumbers = document.querySelectorAll('.stat-number');

  statsNumbers.forEach(stat => {
    const finalValue = stat.textContent || '';
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));

    if (!isNaN(numericValue)) {
      let currentValue = 0;
      const increment = numericValue / 50;
      const prefix = finalValue.includes('+') ? '+' : '';
      const suffix = finalValue.includes('%') ? '%' : '';

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          currentValue = numericValue;
          clearInterval(timer);
        }
        stat.textContent = prefix + Math.floor(currentValue) + suffix;
      }, 30);
    }
  });
}

// Function to add current year to footer
function addCurrentYear() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('.footer-bottom p');

  yearElements.forEach(element => {
    if (element.textContent?.includes('2024')) {
      element.textContent = element.textContent.replace('2024', currentYear.toString());
    }
  });
}

// WhatsApp contact optimization
function optimizeWhatsAppLink() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Track conversion (you can add analytics here)
      console.log('WhatsApp contact initiated');
    });
  });
}

// Call WhatsApp optimization
optimizeWhatsAppLink();

// Add loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Export for potential use
export { addDynamicStats, addCurrentYear, optimizeWhatsAppLink };
