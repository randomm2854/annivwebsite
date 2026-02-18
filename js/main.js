(function () {
  'use strict';

  // ----- Scroll-triggered animations -----
  var animated = document.querySelectorAll('[data-animate]');
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );
  animated.forEach(function (el) {
    observer.observe(el);
  });

  // ----- Gallery modal -----
  var modal = document.getElementById('galleryModal');
  var modalImage = document.getElementById('modalImage');
  var modalClose = document.getElementById('modalClose');
  var galleryItems = document.querySelectorAll('.gallery-item');

  var modalPlaceholder = document.getElementById('modalPlaceholder');
  function openModal(src) {
    if (!modal || !modalImage) return;
    if (src) {
      modalImage.src = src;
      modalImage.alt = 'A special memory';
      modalImage.style.display = 'block';
      if (modalPlaceholder) modalPlaceholder.style.display = 'none';
    } else {
      modalImage.removeAttribute('src');
      modalImage.style.display = 'none';
      if (modalPlaceholder) modalPlaceholder.style.display = 'block';
    }
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  if (modalImage) {
    modalImage.addEventListener('load', function () {
      if (modalPlaceholder) modalPlaceholder.style.display = 'none';
    });
    modalImage.addEventListener('error', function () {
      modalImage.style.display = 'none';
      if (modalPlaceholder) modalPlaceholder.style.display = 'block';
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      var src = item.getAttribute('data-src');
      if (img && img.src && img.src.indexOf('http') === 0) src = img.src;
      openModal(src || null);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  // ----- Love letter surprise -----
  var surpriseBtn = document.getElementById('surpriseBtn');
  var loveLetterReveal = document.getElementById('loveLetterReveal');
  var confettiContainer = document.getElementById('confettiContainer');

  function createHearts() {
    if (!confettiContainer) return;
    var symbols = ['♥', '♡'];
    for (var i = 0; i < 25; i++) {
      var el = document.createElement('span');
      el.className = 'mini-heart';
      el.textContent = symbols[i % 2];
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDelay = Math.random() * 0.5 + 's';
      el.style.animationDuration = 2.5 + Math.random() * 2 + 's';
      confettiContainer.appendChild(el);
    }
  }

  if (surpriseBtn && loveLetterReveal) {
    surpriseBtn.addEventListener('click', function () {
      surpriseBtn.style.display = 'none';
      loveLetterReveal.hidden = false;
      loveLetterReveal.classList.add('is-visible');
      createHearts();
    });
  }

  // ----- Music toggle (no autoplay) -----
  var bgMusic = document.getElementById('bgMusic');
  var musicToggle = document.getElementById('musicToggle');
  if (bgMusic && musicToggle) {
    musicToggle.addEventListener('click', function () {
      if (bgMusic.paused) {
        var play = bgMusic.play();
        if (play && typeof play.then === 'function') {
          play.then(function () {
            musicToggle.classList.add('is-playing');
          }).catch(function () {
            musicToggle.classList.remove('is-playing');
          });
        } else {
          musicToggle.classList.add('is-playing');
        }
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('is-playing');
      }
    });
  }
})();
