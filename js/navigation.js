/* ================================================
   AL SAUDI PURE DRINKING WATER
   Navigation Module
   ================================================ */

(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Sticky navbar on scroll
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    const isOpen = hamburger.classList.contains('open');

    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');

    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // Close mobile menu
  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Set active nav link based on current page
  function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar__link');
    const mobLinks = document.querySelectorAll('.mobile-menu__link');

    const allLinks = [...navLinks, ...mobLinks];

    allLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Initialize
  function init() {
    // Scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    // Hamburger click
    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Set active link
    setActiveLink();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
