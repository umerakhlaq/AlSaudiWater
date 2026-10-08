/* ================================================
   AL SAUDI PURE DRINKING WATER
   Main JavaScript
   ================================================ */

(function () {
  'use strict';

  // ---- Language Switching ----
  const STORAGE_KEY = 'alsaudi_lang';

  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update toggle buttons
    const toggleBtns = document.querySelectorAll('.lang-toggle__btn');
    toggleBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });

    // Apply translations
    if (typeof applyTranslations === 'function') {
      applyTranslations(lang);
    }
  }

  function initLanguage() {
    const lang = getCurrentLang();
    setLanguage(lang);

    const toggleBtns = document.querySelectorAll('.lang-toggle__btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = btn.getAttribute('data-lang');
        setLanguage(newLang);
      });
    });
  }


  // ---- Scroll Reveal ----
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }


  // ---- Smooth Scroll for Anchor Links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }


  // ---- Contact Form Handler ----
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Build mailto link as fallback
      const subject = encodeURIComponent('Inquiry from ' + (data.name || 'Website'));
      const body = encodeURIComponent(
        'Name: ' + (data.name || '') + '\n' +
        'Company: ' + (data.company || '') + '\n' +
        'Phone: ' + (data.phone || '') + '\n' +
        'Email: ' + (data.email || '') + '\n\n' +
        'Message:\n' + (data.message || '')
      );

      window.location.href = 'mailto:info@alsaudiwater.com?subject=' + subject + '&body=' + body;

      /*
       * INTEGRATION NOTE:
       * Replace the mailto approach above with one of the following:
       *
       * Option 1: Formspree
       * Set form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
       *
       * Option 2: FormSubmit
       * Set form action="https://formsubmit.co/YOUR_EMAIL" method="POST"
       *
       * Option 3: Custom API endpoint
       * Use fetch() to POST the data to your endpoint.
       */
    });
  }


  // ---- Product Detail Modal/Page ----
  function initProductDetail() {
    const viewBtns = document.querySelectorAll('[data-product-view]');
    const detailSection = document.getElementById('product-detail');
    const backBtn = document.querySelector('[data-back-products]');
    const productsSection = document.getElementById('products-grid-section');

    if (!viewBtns.length || !detailSection) return;

    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (productsSection) productsSection.style.display = 'none';
        detailSection.style.display = 'block';
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        detailSection.style.display = 'none';
        if (productsSection) productsSection.style.display = 'block';
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }


  // ---- Lazy Loading Images ----
  function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px'
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }


  // ---- Quality Timeline Animation ----
  function initQualityTimeline() {
    const steps = document.querySelectorAll('.quality__step');
    if (!steps.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Activate steps sequentially
          steps.forEach((step, i) => {
            setTimeout(() => {
              step.classList.add('active');
            }, i * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const timeline = document.querySelector('.quality__timeline');
    if (timeline) observer.observe(timeline);
  }


  // ---- Initialize Everything ----
  function init() {
    initLanguage();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
    initProductDetail();
    initLazyLoad();
    initQualityTimeline();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
