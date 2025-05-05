function syncHeaderHeight() {
    const header = document.querySelector('header');
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${h}px`);
  }
  
  // run once on load…
  window.addEventListener('DOMContentLoaded', syncHeaderHeight);
  // …and again any time the window resizes
  window.addEventListener('resize', syncHeaderHeight);
  